library simple_app;

import 'dart:io';

import 'package:redstone/server.dart' as app;
import 'package:shelf_static/shelf_static.dart';
import 'package:di/di.dart';
import 'package:logging/logging.dart';

import '../lib/simple_app_api.dart';

final HOST = InternetAddress.LOOPBACK_IP_V4;
final PORT = 4567;

void main() {
	app.setShelfHandler(createStaticHandler("../web",
		defaultDocument: "index.html",
		serveFilesOutsidePath: false));

	app.addModule(new Module()
		..bind(SimpleAppApi)
	);
	app.setupConsoleLog(Level.ALL);
	app.start(address: HOST, port: PORT);

}