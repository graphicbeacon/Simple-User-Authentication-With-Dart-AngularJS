part of simpleApp;

void errorPageHandler(HttpRequest request) {
  request.response
    ..statusCode = HttpStatus.NOT_FOUND
    ..write('Not found')
    ..close();
}

void handleError(error) {
  print("Problems: $error");
}

Function serveFile({String filePath}) {
  var buildPath = './web';
  
  return (HttpRequest req) {
    var fileLocation = filePath == null ? req.uri.path.replaceFirst(new RegExp(r'^\/'),'') : filePath;
    var filePathFull = path.join(buildPath, fileLocation);
    var response = req.response;

    print(filePathFull);

    File file = new File(filePathFull);
    response.headers.contentType = ContentType.parse(contentTypes[file.path.split('.').last]);
    file
      .openRead()
      .pipe(response)
      .catchError((error) {
        print("There was a problem opening the file at ${file.path}}: $error");
      });

  };
}