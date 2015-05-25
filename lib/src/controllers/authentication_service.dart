part of simple_app;

class AuthenticationService {
  var store;

  AuthenticationService(this.store);

  Future login(Map<String, String> credentials) {
    var completer = new Completer();

    if (this.store["username"] == credentials["username"] &&
        this.store["password"] == credentials["password"]) {
      // Create session token
      var sessionToken = new Uuid().v1();

      completer.complete(sessionToken);
    } else {
      completer.completeError("Wrong username or password.");
    }

    return completer.future;
  }
}
