library simpleApp;

import "dart:io";
import "dart:convert";
import "dart:collection";
import 'package:route/server.dart';
import 'package:path/path.dart' as path;
import 'package:route/url_pattern.dart';

part 'bin/urls.dart';
part 'bin/content_types.dart';
part 'bin/request_handlers.dart';

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

var dataStoreCredentials = {
  "username": "admin",
  "password": "superman"
};

void main() {

  HttpServer.bind(HOST, PORT).then((server) {
    print("Server listening at ${HOST}:$PORT");
    
    new Router(server)
      ..serve(indexUrl).listen(serveFile(filePath: 'index.html'))
      ..serve(appResourceUrl).listen(serveFile())
      
      // Rest API Endpoints
      ..serve(authUrl, method: 'POST').listen((req) {
        req.transform(UTF8.decoder).listen((data) {
          var credLinkedHash = JSON.decode(data);
          var credList = credLinkedHash.values.toList();

          if(credList[0] == dataStoreCredentials['username'] && credList[1] == dataStoreCredentials['password']) {
            var jsonResponse = JSON.encode({'redirectTo': '/'});
            req.response.headers.contentType = ContentType.parse(contentTypes['json']);
            // TODO: Use uuid to generate proper token
            req.response.headers.set("SimpleAppAuthToken", "1234");
            req.response.write(jsonResponse);
            req.response.close();
          } else {
            req.response.statusCode = 401;
            req.response.write("Invalid username and password information");
            req.response.close();
          }
        });
      })
      
      // Default Response for Not Found
      ..defaultStream.listen(errorPageHandler);
    
  }).catchError(handleError);
}