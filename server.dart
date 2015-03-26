library simpleApp;

import "dart:io";
import "dart:convert";
import "dart:async";

import 'package:route/server.dart';
import 'package:path/path.dart' as path;
import 'package:route/url_pattern.dart';
import 'package:uuid/uuid.dart';

part 'bin/urls.dart';
part 'bin/content_types.dart';
part 'bin/request_handlers.dart';
part 'bin/authenticationservice.dart';

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

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
          var credentials = credLinkedHash.values.toList();

          Future loginResponse = new AuthenticationService().login(credentials[0], credentials[1]);

          loginResponse.then((Map success) {
            req.response.headers.contentType = ContentType.parse(contentTypes['json']);
            req.response.headers.set("SimpleAppAuthToken", success["sessionToken"]);
            req.response.write(JSON.encode(success));
          })
          .catchError((String error) {
            req.response.statusCode = 401;
            req.response.write(error);
          })
          .whenComplete(req.response.close);

        });
      })
      
      // Default Response for Not Found
      ..defaultStream.listen(errorPageHandler);
    
  }).catchError(handleError);
}