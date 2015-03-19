import "dart:io";
import "package:http_server/http_server.dart" show VirtualDirectory;

final HTTP_ROOT_PATH = Platform.script.resolve('web').toFilePath();
final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

VirtualDirectory virDir;

void directoryHandler(dir, request) {
  var indexUri = new Uri.file(dir.path).resolve('index.html');
  virDir.serveFile(new File(indexUri.toFilePath()), request);
}

void handleError(error) {
  print("Problems processing request $error");  
}

void main() {
  virDir = new VirtualDirectory(Platform.script.resolve('web').toFilePath())
    ..allowDirectoryListing = true
    ..directoryHandler = directoryHandler;

  HttpServer.bind(InternetAddress.LOOPBACK_IP_V4, PORT).then((server) {
    server.listen((request) {
      virDir.serveRequest(request);
    }).onError(handleError);
  }).catchError(handleError);
}