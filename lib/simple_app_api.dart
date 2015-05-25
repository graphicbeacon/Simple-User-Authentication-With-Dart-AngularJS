library simple_app;

import 'dart:io';
import 'dart:convert';
import 'dart:async';

// Dart pub packages
import 'package:redstone/server.dart' as app;
import 'package:shelf/shelf.dart' as shelf;
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
	login(@app.Body(app.JSON) Map payload) async {

		var credentials = payload["data"];
		var loginResponse = await new AuthenticationService(user).login(credentials);

		if(loginResponse != "Wrong username or password.") {

			var sessionToken = loginResponse;
			// Store returned token
			user["sessionToken"] = sessionToken;
			app.request.session["sessionToken"] = sessionToken;

			return new shelf.Response.ok(
				sessionToken,
				headers: {
					"Content-Type": ContentTypes.TEXT.toString()
				}
			);

		} else {

			var error = loginResponse;
			return new shelf.Response(
				HttpStatus.UNAUTHORIZED,
				body: error,
				headers: {
					"Content-Type" : ContentTypes.TEXT.toString()
				}
			);

		}
	}


	@app.Route('/logout', methods: const [app.POST])
	logout(@app.Body(app.JSON) Map payload) {
		print(payload);
		var token = payload["data"];
		// TODO: Process received token to check if session exists

		// Remove session tokens
		user.remove("sessionToken");
		app.request.session.remove("sessionToken");

		return new shelf.Response.ok(
			"Logged out successfully.",
			headers: {
				'Content-Type': ContentTypes.TEXT.toString()
			}
		);
	}

	@app.Route('/nav', methods: const [app.POST])
	nav(@app.Body(app.JSON) Map payload) {
		var token = payload["data"];

		if (token != null && token == user["sessionToken"]) {
			var adminMenu = JSON.encode(new MenuItemService().getAdminMenu());

			return new shelf.Response.ok(
				adminMenu,
				headers: {
					"Content-Type": ContentTypes.JSON.toString()
				}
			);

		} else {
			var defaultMenu = JSON.encode(new MenuItemService().getDefaultMenu());

			return new shelf.Response.ok(
				defaultMenu,
				headers: {
					"Content-Type": ContentTypes.JSON.toString()
				}
			);
		}
	}

	@app.Route('/token', methods: const [app.POST])
	validateToken(@app.Body(app.JSON) Map payload) {

		var token = payload["data"];

		print('Token $token is being matched...');

		if (token != null && token == user["sessionToken"]) {

			return new shelf.Response.ok(
				"Valid token.",
				headers: {
					"Content-Type": ContentTypes.TEXT.toString()
				}
			);

		} else {
			// Remove session tokens
			// likely to have been manipulated from clientside localStorage
			// remove so user could login again to generate new token :-)
			user.remove("sessionToken");
			app.request.session.remove("sessionToken");

			print('Session tokens ${user["sessionToken"]} ${app.request.session["sessionToken"]}');

			return new shelf.Response(
				HttpStatus.UNAUTHORIZED,
				body: "Invalid token.",
				headers: {
					"Content-Type": ContentTypes.TEXT.toString()
				}
			);
		}

	}
}
