part of simpleApp;

var user = {"username": "admin", "password": "superman"};

class AppRoutes {
  static Function serveSpaIndex() => serveResource(filePath: 'index.html');

  static Function serveStaticDirectory() => serveResource();

  static Function errorPageHandler() => errorPageHandler;

  static void login(HttpRequest req) {
    req.transform(UTF8.decoder).listen((data) {
      var credentials = JSON.decode(data);

      Future loginResponse = new AuthenticationService(user).login(
          credentials["username"], credentials["password"]);

      loginResponse.then((String sessionToken) {
        print(sessionToken);

        // Store returned token
        user["sessionToken"] = sessionToken;
        req.session["sessionToken"] = sessionToken;

        req.response.headers.contentType = ContentTypes.TEXT;
        req.response.write(sessionToken);
      }).catchError((error) {
        req.response.statusCode = 401;
        req.response.write(error);
      }).whenComplete(req.response.close);
    });
  }

  static void logout(HttpRequest req) {

    // Remove session tokens
    user.remove("sessionToken");
    req.session.remove("sessionToken");

    req.response.write("Logged out successfully.");
    req.response.close();
  }

  static void nav(HttpRequest req) {
    req.transform(UTF8.decoder).listen((String tokenJson) {
      var decodedToken = JSON.decode(tokenJson);
      var token = decodedToken["data"];

      if (token != null && token == user["sessionToken"]) {
        var adminMenu = JSON.encode(new MenuItemService().getAdminMenu());
        req.response.write(adminMenu);
      } else {
        var defaultMenu = JSON.encode(new MenuItemService().getDefaultMenu());
        req.response.write(defaultMenu);
      }

      // close after getting correct menu
      req.response.close();
    });
  }

  static void validateToken(HttpRequest req) {
    req.transform(UTF8.decoder).listen((String tokenJson) {
      var decodedToken = JSON.decode(tokenJson);
      var token = decodedToken["data"];

      print('Token $token is being matched...');

      if (token != null && token == user["sessionToken"]) {
        req.response.write('Valid token.');
      } else {
        // Remove session tokens
        // likely to have been manipulated from clientside localStorage
        // remove so user could login again to generate new token :-)
        user.remove("sessionToken");
        req.session.remove("sessionToken");

        print(
            'Session tokens ${user["sessionToken"]} ${req.session["sessionToken"]}');

        req.response.statusCode = 401;
        req.response.write('Invalid token.');
      }

      req.response.close();
    });
  }
}
