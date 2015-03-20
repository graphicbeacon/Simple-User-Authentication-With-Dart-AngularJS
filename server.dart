import "dart:io";
import "package:http_server/http_server.dart" show VirtualDirectory;

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

VirtualDirectory virDir;

void directoryHandler(directory, request) {
  var indexUri = new Uri.file(directory.path).resolve('index.html');
  virDir.serveFile(new File(indexUri.toFilePath()), request);
}

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
  var buildPath = 'web';

  virDir = new VirtualDirectory(buildPath)
    ..allowDirectoryListing = true
    ..directoryHandler = directoryHandler
    ..errorPageHandler = errorPageHandler;

  HttpServer.bind(HOST, PORT).then((server) {
    server.listen((request) {
      print(request.uri);

      virDir.serveRequest(request);
    }).onError(handleError);
  }).catchError(handleError);
}