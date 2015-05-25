part of simple_app;

class AuthenticationService {
	var store;

	AuthenticationService(this.store);

	Future login(Map<String, String> credentials) {
		var completer = new Completer(); // Using this to mimic an asynchronous request. Will connect to a database in the future.

		if (this.store["username"] == credentials["username"] &&
			this.store["password"] == credentials["password"]) {
			// Create session token
			var sessionToken = new Uuid().v1();

			completer.complete(sessionToken);
		} else {
			// Cannot use completeError as Redstone bug throws an exception
			completer.complete("Wrong username or password.");
		}

		return completer.future;
	}
}
