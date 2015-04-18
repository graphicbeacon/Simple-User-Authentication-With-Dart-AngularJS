part of simpleApp;

final indexUrl = new UrlPattern(r'(\/|)');
final appResourceUrl = new UrlPattern(r'/(app|bower_components)/(.*)');
final loginUrl = new UrlPattern('/auth/login');
final logoutUrl = new UrlPattern('/auth/logout');
final navUrl = new UrlPattern('/auth/nav');
final tokenUrl = new UrlPattern('/auth/token');
