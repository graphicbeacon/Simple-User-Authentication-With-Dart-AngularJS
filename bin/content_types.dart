part of simpleApp;

class ContentTypes {
  static final CSS = ContentType.parse("text/css");
  static final DART = ContentType.parse("application/dart");
  static final HTML = ContentType.parse("text/html; charset=UTF-8");
  static final JAVASCRIPT = ContentType.parse("application/javascript");
  static final JPEG = ContentType.parse("image/jpeg");
  static final JSON = ContentType.parse("application/json");
  static final TEXT = ContentType.parse("text/plain");

  static final _extensions = <String, ContentType>{
      'css': CSS,
      'dart': DART,
      'html': HTML,
      'jpg': JPEG,
      'js': JAVASCRIPT,
      'json': JSON,
      'txt': TEXT,
  };

  static ContentType addTypeForExtension(String extension, ContentType type) =>
  _extensions[extension] = type;

  static ContentType forExtension(String extension) => _extensions[extension];

  static ContentType forFile(File file) =>
  _extensions[path.extension(file.path).replaceFirst('.','')];
}