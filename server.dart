library simpleApp;

import "dart:io";
import "dart:convert";
import "dart:async";

import 'package:route/server.dart';
import 'package:path/path.dart' as path;
import 'package:route/url_pattern.dart';
import 'package:uuid/uuid.dart';

// Utilities
part 'bin/urls.dart';
part 'bin/request_handlers.dart';

// Classes
part 'bin/contenttypes.dart';
part 'bin/menuitem.dart';
part 'bin/menuitemservice.dart';
part 'bin/approutes.dart';
part 'bin/authenticationservice.dart';

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

void main() {

  HttpServer.bind(HOST, PORT).then((server) {
    print("Server listening at ${HOST}:$PORT");
    
    new Router(server)
      ..serve(indexUrl).listen(AppRoutes.serveSpaIndex())
      ..serve(appResourceUrl).listen(AppRoutes.serveStaticDirectory())
      
      // Rest API Endpoints
      ..serve(authUrl, method: 'POST').listen(AppRoutes.login)
      ..serve(navUrl, method: 'POST').listen(AppRoutes.nav)
      ..serve(tokenUrl, method: 'POST').listen(AppRoutes.validateToken)
      
      // Default Response for Not Found
      ..defaultStream.listen(AppRoutes.errorPageHandler());
    
  }).catchError(handleError);
}