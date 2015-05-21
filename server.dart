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

  AppRoutes route = new AppRoutes();
  Future server = HttpServer.bind(HOST, PORT);

  server.then((server) {
    print("Server listening at ${HOST}:$PORT");
    
    new Router(server)
      ..serve(indexUrl).listen(route.serveSpaIndex())
      ..serve(appResourceUrl).listen(route.serveStaticDirectory())
      
      // Rest API Endpoints
      ..serve(loginUrl, method: 'POST').listen(route.login)
      ..serve(logoutUrl, method: 'POST').listen(route.logout)
      ..serve(navUrl, method: 'POST').listen(route.nav)
      ..serve(tokenUrl, method: 'POST').listen(route.validateToken)
      
      // Default Response for Not Found
      ..defaultStream.listen(route.errorPageHandler);
    
  }).catchError(handleError);
}