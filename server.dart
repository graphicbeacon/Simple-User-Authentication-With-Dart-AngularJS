import "dart:io";
import 'package:route/server.dart';
import 'package:path/path.dart' as path;

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

Map<String, String> contentTypes = const {
    "html": "text/html; charset=UTF-8",
    "dart": "application/dart",
    "js": "application/javascript",
    "jpg": "image/jpeg",
    "png": "image/png",
    "txt": "text/plain",
    "json": "application/json"
};

void errorPageHandler(HttpRequest request) {
  request.response
    ..statusCode = HttpStatus.NOT_FOUND
    ..write('Not found')
    ..close();
}

void handleError(error) {
  print("Problems: $error");
}

void main() {
  var buildPath = './web';

  // TODO: Ensure that all requests have a valid response.
  // This contains a status code, content type, message
  // TODO: Use Route package
  
  HttpServer.bind(HOST, PORT).then((server) {
    server.asBroadcastStream()
      ..where((r) => new RegExp(r"^(\/|\/index\.html|)$").hasMatch(r.uri.path)).listen((req){
        File index = new File("${buildPath}/index.html");
        req.response.headers.contentType = ContentType.parse(contentTypes[index.path.split('.').last]);
        index.openRead().pipe(req.response);
      })
      ..where((r) => new RegExp(r"^\/(app|bower\_components)").hasMatch(r.uri.path)).listen((req){
        File file = new File("${buildPath}${req.uri.path}");
        req.response.headers.contentType = ContentType.parse(contentTypes[file.path.split('.').last]);
        file.openRead().pipe(req.response);
      })
      ..handleError(handleError);
  }).catchError(handleError);
}