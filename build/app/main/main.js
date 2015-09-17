//Office Fabric UI styles
require('fabric.min.css');
require('fabric.components.min.css');
//Boostrap styles
require('bootstrap.min.css');
require('bootstrap.theme.min.css');
//Extra fonts
require('font-awesome.min.css');
//App styles
require('app.css');
//Global scripts
import Ractive from 'ractive';
window.Ractive = Ractive;
//RactiveJS adaptors
import RactiveAdaptorsAmpersand from 'ractive-adaptors-ampersand';
Ractive.DEBUG = /unminified/.test(function() { /*unminified*/ });
Ractive.DEBUG_PROMISES = false;
window.Ractive.adaptors.Ampersand = RactiveAdaptorsAmpersand;
//jQuery
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
require('bootstrap.min');
require('imports?jQuery=>window.$!jquery.fabric.min');

import template  from 'main.html';
import domReady  from 'domready';
import visitCard from 'visit-card';

let log = require('bows')('MainApp');

export default new class App {
  constructor(){
    domReady(() => {
      this.init();
      window.App = this;
    });
  }
  init(){
    this._main = new Ractive({
      el: '#app-root',
      template: template,
      components: {
        'visit-card': visitCard
      },
      data: function(){
        return {
          message: 'Visit Card Demo'
        };
      },
      onrender: function(){
        log('rendered');
      },
      oncomplete: function(){
        log('completed');
      },
      onteardown: function(){
        log('removed');
      }
    });
  }
}