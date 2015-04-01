part of simpleApp;

var user = {
    "username": "admin",
    "password": "superman"
};

class AppRoutes {

  static Function serveSpaIndex () => serveResource(filePath: 'index.html');

  static Function serveStaticDirectory () => serveResource();

  static Function errorPageHandler () => errorPageHandler;

  static void login (HttpRequest req) {

    req.transform(UTF8.decoder).listen((data) {

      var credLinkedHash = JSON.decode(data);
      var credentials = credLinkedHash.values.toList();

      Future loginResponse = new AuthenticationService(user).login(credentials[0], credentials[1]);

      loginResponse.then((String sessionToken) {

        List responseObject;

        // Store returned token
        user.putIfAbsent("sessionToken", () => sessionToken);
        req.session.putIfAbsent("sessionToken", () => sessionToken);

        req.response.headers.contentType = ContentTypes.TEXT;
        req.response.write(sessionToken);

      })
      .catchError((error) {

        req.response.statusCode = 401;

        req.response.write(error);

      })
      .whenComplete(req.response.close);

    });

  }

}