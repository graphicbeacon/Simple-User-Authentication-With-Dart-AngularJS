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

Function serveResource({String directory, String filePath}) {
  var buildPath = directory == null ? './web' : directory;
  
  return (HttpRequest req) {
    var fileLocation = filePath == null ? req.uri.path.replaceFirst(new RegExp(r'^\/'),'') : filePath;
    var filePathFull = path.join(buildPath, fileLocation);
    var response = req.response;

    if(filePathFull.startsWith(new RegExp(r'\.[^\/]'))) {
      errorPageHandler(req);
      return;
    }

    //print(filePathFull);

    File file = new File(filePathFull);
    response.headers.contentType = ContentTypes.forFile(file);
    file
      .openRead()
      .pipe(response)
      .catchError((error) {
        print("Problem opening file ${file.path}}: $error");
      });

  };
}