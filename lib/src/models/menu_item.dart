part of simple_app;

class MenuItem {
  String url;
  String name;

  MenuItem(this.url, this.name);

  Map create() => {"name": this.name, "url": this.url};
}
