part of simpleApp;


class AuthenticationService {

  var store;

  AuthenticationService(this.store);

  Future login(String username, String plainTextPassword) {

    var completer = new Completer();

    if(this.store["username"] == username && this.store["password"] == plainTextPassword) {
      // Create session token
      var sessionToken = new Uuid().v1();

      completer.complete(sessionToken);
    } else {
      completer.completeError("Wrong username or password.");
    }

  return completer.future;

  }

}