part of simpleApp;


class AuthenticationService {

  var user = {
      "username": "admin",
      "password": "superman"
  };

  AuthenticationService();

  Future login(String username, String plainTextPassword) {

    var completer = new Completer();

    if(user["username"] != username || user["password"] != plainTextPassword) {
      completer.completeError("Wrong username or password.");
    }

    var uuid = new Uuid();
    var sessionToken = uuid.v1();

    completer.complete({ "redirectTo" : "/", "sessionToken" : sessionToken });

    return completer.future;

  }

}