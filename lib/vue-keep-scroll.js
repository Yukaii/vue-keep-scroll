var slice, vueKeepScroll;

vueKeepScroll = void 0;

slice = [].slice;

vueKeepScroll = {
  install: function(Vue) {
    return Vue.directive('keep-scroll', {
      bind: function(el, binding, vnode) {
        var oldAttached;
        oldAttached = void 0;
        el.addEventListener('scroll', function(e) {
          var ele;
          ele = void 0;
          ele = e.target;
          return ele.setAttribute('data-vuescrlpos', ele.scrollLeft + '-' + ele.scrollTop);
        });
        oldAttached = vnode.context.activated;
        vnode.context.activated = function() {
          var args, ele, i, len, ref, ref1;
          args = void 0;
          ele = void 0;
          i = void 0;
          len = void 0;
          ref = void 0;
          ref1 = void 0;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          ref = this.$el.querySelectorAll('[data-vuescrlpos]');
          if (ref.length > 0) {
            i = 0;
            len = ref.length;
            while (i < len) {
              ele = ref[i];
              ref1 = ele.getAttribute('data-vuescrlpos').split('-');
              ele.scrollLeft = ref1[0];
              ele.scrollTop = ref1[1];
              i++;
            }
          } else if (this.$el.hasAttribute('data-vuescrlpos')) {
            ref1 = this.$el.getAttribute('data-vuescrlpos').split('-');
            this.$el.scrollLeft = ref1[0];
            this.$el.scrollTop = ref1[1];
          }
          if (oldAttached !== void 0) {
            oldAttached.call.apply(oldAttached, [this].concat(slice.call(args)));
          } else {
            void 0;
          }
        };
        vnode.context.$on('hook:activated', vnode.context.activated);
      }
    });
  }
};

if (typeof exports === 'object') {
  module.exports = vueKeepScroll;
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return vueKeepScroll;
  });
} else if (window.Vue) {
  window.vueKeepScroll = vueKeepScroll;
  Vue.use(vueKeepScroll);
}
