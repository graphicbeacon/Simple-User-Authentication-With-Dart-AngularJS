part of simpleApp;

class AppRoutes {

  static Function serveSpaIndex () => serveResource(filePath: 'index.html');

  static Function serveStaticDirectory () => serveResource();

  static Function errorPageHandler = errorPageHandler;

  static void login (req) {

      req.transform(UTF8.decoder).listen((data) {
        var credLinkedHash = JSON.decode(data);
        var credentials = credLinkedHash.values.toList();

        Future loginResponse = new AuthenticationService().login(credentials[0], credentials[1]);

        loginResponse.then((Map success) {
          // Create session token
          var sessionToken = new Uuid().v1();

          req.response.headers.contentType = ContentTypes.JSON;
          req.response.headers.set("SimpleAppAuthToken", sessionToken);
          req.response.write(JSON.encode(success));

        })
        .catchError((String error) {

          req.response.statusCode = 401;
          req.response.write(error);

        })
        .whenComplete(req.response.close);

      });

  }
}