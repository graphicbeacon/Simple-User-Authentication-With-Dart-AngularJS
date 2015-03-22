part of simpleApp;

final indexUrl = new UrlPattern(r'(\/|)');
final appResourceUrl = new UrlPattern(r'/(app|bower_components)/(.*)');
final authUrl = new UrlPattern(r'/auth/login');