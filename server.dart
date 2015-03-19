import "dart:io";
import "package:http_server/http_server.dart" show VirtualDirectory;

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

void handleError(error) {
  print("Problems: $error");  
}

void main() {
  VirtualDirectory virDir = new VirtualDirectory('web');

  HttpServer.bind(HOST, PORT).then((server) {
    server.listen((request) {
      virDir.serveFile(new File('web/index.html'), request);
    }).onError(handleError);
  }).catchError(handleError);
}