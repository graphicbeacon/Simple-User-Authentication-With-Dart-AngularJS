library simple_app;

import 'dart:io';
import 'dart:convert';
import 'dart:async';

// Dart pub packages
import 'package:redstone/server.dart' as app;
import 'package:uuid/uuid.dart';

import 'src/utils.dart';

// Source file dependencies/utilities
part 'src/models/menu_item.dart';
part 'src/controllers/authentication_service.dart';
part 'src/controllers/menu_item_service.dart';

// Temporary for now
var user = {"username": "admin", "password": "superman"};

@app.Group('/auth')
class SimpleAppApi {

	@app.Route('/login', methods: const [app.POST])
	login(@app.Body(app.JSON) Map payload) {
		var token = payload["data"];

		Future loginResponse = new AuthenticationService(user).login(payload);

		loginResponse.then((String sessionToken) {
			print(sessionToken);

			// Store returned token
			user["sessionToken"] = sessionToken;
			app.request.session["sessionToken"] = sessionToken;


			// TODO: Include username param in response
			app.chain.interrupt(
				statusCode: HttpStatus.ACCEPTED,
				responseValue: sessionToken
			);
		})
		.catchError((error) {
			// TODO: Set correct response types
			app.chain.interrupt(
				statusCode: HttpStatus.UNAUTHORIZED,
				responseValue: error
			);
		});
	}


	@app.Route('/logout', methods: const [app.POST])
	logout(@app.Body(app.JSON) Map payload) {
		print(payload);
		var token = payload["data"];
		// TODO: Process received token to check if session exists

		// Remove session tokens
		user.remove("sessionToken");
		app.request.session.remove("sessionToken");

		// TODO: Set correct response types
		app.chain.interrupt(
			statusCode: HttpStatus.ACCEPTED,
			responseValue: "Logged out successfully."
		);
	}

	@app.Route('/nav', methods: const [app.POST])
	nav(@app.Body(app.JSON) Map payload) {
		var token = payload["data"];

		if (token != null && token == user["sessionToken"]) {
			var adminMenu = JSON.encode(new MenuItemService().getAdminMenu());
			return adminMenu;
		} else {
			var defaultMenu = JSON.encode(new MenuItemService().getDefaultMenu());
			return defaultMenu;
		}
	}

	@app.Route('/token', methods: const [app.POST])
	validateToken(@app.Body(app.JSON) Map payload) {

		var token = payload["data"];

		print('Token $token is being matched...');

		if (token != null && token == user["sessionToken"]) {
			return "Valid token.";
		} else {
			// Remove session tokens
			// likely to have been manipulated from clientside localStorage
			// remove so user could login again to generate new token :-)
			user.remove("sessionToken");
			app.request.session.remove("sessionToken");

			print('Session tokens ${user["sessionToken"]} ${app.request.session["sessionToken"]}');

			// TODO: Return correct response type
			app.chain.interrupt(
				statusCode: HttpStatus.UNAUTHORIZED,
				responseValue: "Invalid token"
			);
		}

	}
}
