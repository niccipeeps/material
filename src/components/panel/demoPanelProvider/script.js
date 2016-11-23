(function() {
  'use strict';

  angular
      .module('panelProviderDemo', ['ngMaterial'])
      .config(PanelProviderConfig)
      .controller('PanelProviderCtrl', PanelProviderCtrl)
      .controller('PanelMenuCtrl', PanelMenuCtrl);

  function PanelProviderConfig($mdPanelProvider) {
    var preset = {
      attachTo: angular.element(document.body),
      controller: PanelMenuCtrl,
      controllerAs: 'ctrl',
      template: '' +
          '<div class="menu-panel" md-whiteframe="4">' +
          '  <div class="menu-content">' +
          '    <div class="menu-item" ng-repeat="item in ctrl.items">' +
          '      <button class="md-button">' +
          '        <span>{{item}}</span>' +
          '      </button>' +
          '    </div>' +
          '    <md-divider></md-divider>' +
          '    <div class="menu-item">' +
          '      <button class="md-button" ng-click="ctrl.closeMenu()">' +
          '        <span>Close Menu</span>' +
          '      </button>' +
          '    </div>' +
          '  </div>' +
          '</div>',
      panelClass: 'menu-panel-container',
      focusOnOpen: false,
      zIndex: 100,
      propagateContainerEvents: true,
      groupName: 'menus'
    };

    $mdPanelProvider.definePreset('demoPreset', preset);
  }

  function PanelProviderCtrl($mdPanel) {
    this.navigation = {
      name: 'navigation',
      items: [
        'Home',
        'About',
        'Contact'
      ]
    };
    this.favorites = {
      name: 'favorites',
      items: [
        'Add to Favorites'
      ]
    };
    this.more = {
      name: 'more',
      items: [
        'Account',
        'Sign Out'
      ]
    };

    $mdPanel.newPanelGroup('menus', {
      maxOpen: 2
    });

    this.showMenu = function($event, menu) {
      var config = {
        id: 'menu_' + menu.name,
        position: $mdPanel.newPanelPosition()
            .relativeTo($event.srcElement)
            .addPanelPosition(
              $mdPanel.xPosition.ALIGN_START,
              $mdPanel.yPosition.BELOW
            ),
        locals: {
          items: menu.items
        },
        openFrom: $event
      };

      $mdPanel.open('demoPreset', config);
    };
  }

  function PanelMenuCtrl(mdPanelRef) {
    this.closeMenu = function() {
      mdPanelRef && mdPanelRef.close();
    };
  }
})();
