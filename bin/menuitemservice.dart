part of simpleApp;

class MenuItemService {

  MenuItemService();

  List getAdminMenu () {
    return [
        new MenuItem('#/', 'Dashboard').create(),
        new MenuItem('#/account', 'Account').create(),
        new MenuItem('#/projects', 'Projects').create(),
        new MenuItem('#/logout', 'Logout').create()
    ];
  }

  List getDefaultMenu () {
    return [
        new MenuItem('#/', 'Dashboard').create(),
        new MenuItem('#/login', 'Login').create()
    ];
  }
}