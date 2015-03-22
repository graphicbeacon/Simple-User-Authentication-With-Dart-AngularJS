library simpleApp;

import "dart:io";
import "dart:convert";
import 'package:route/server.dart';
import 'package:path/path.dart' as path;
import 'package:route/url_pattern.dart';

part 'bin/urls.dart';
part 'bin/content_types.dart';
part 'bin/request_handlers.dart';

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
          req.response.write(data);
          req.response.close();
        });
      })
      
      // Default Response for Not Found
      ..defaultStream.listen(errorPageHandler);
    
  }).catchError(handleError);
}