'use strict';

/**
 * Setup namespace
 */
if (typeof ubuntu === 'undefined') {
  var ubuntu = {};
}

if (ubuntu.hasOwnProperty('cookiePolicy')) {
  throw TypeError("Namespace 'ubuntu' not available");
}

// The cookie policy injection and interaction
ubuntu.cookiePolicy = function () {
  var context = null;

  return {
    setup: function setup() {
      if (this.getCookie('_cookies_accepted') !== 'true') {
        var range = document.createRange();
        var cookieNode = range.createContextualFragment('<div class="p-notification--cookie-policy"><p class="p-notification__content">We use cookies to improve your experience. By your continued use of this site you accept such use.<br /> To change your settings please <a href="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy#cookies">see our policy</a>. <a href="" class="p-notification__close js-close">Close</a></p></div>');
        document.body.insertBefore(cookieNode, document.body.lastChild);
        this.context = document.querySelector('.p-notification--cookie-policy');
        this.context.querySelector('.js-close').addEventListener('click', function (e) {
          e.preventDefault();
          this.close();
        }.bind(this));
      }
    },

    close: function close() {
      this.context.style.display = 'none';
      this.setCookie('_cookies_accepted', 'true', 3000);
    },

    setCookie: function setCookie(name, value, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      document.cookie = name + '=' + value + '; ' + expires;
    },

    getCookie: function getCookie(name) {
      var name = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    }
  };
}();