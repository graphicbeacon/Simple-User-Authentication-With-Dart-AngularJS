part of simple_app;

class MenuItemService {
  MenuItemService();

  List getAdminMenu() {
    return [
      new MenuItem('#/dashboard', 'Dashboard').create(),
      new MenuItem('#/account', 'Account').create(),
      new MenuItem('#/projects', 'Projects').create(),
      new MenuItem('#/logout', 'Logout').create()
    ];
  }

  List getDefaultMenu() {
    return [
      new MenuItem('#/', 'Home').create(),
      new MenuItem('#/login', 'Login').create()
    ];
  }
}
