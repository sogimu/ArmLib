gizmo = {Class:{}, About:{}, Plugins:{}};
(function(gizmo) {
})(gizmo);
(function(gizmo) {
  var Class = function(O) {
    var initialize = O.initialize || function() {
    };
    var newClass = initialize;
    if(O.Extends) {
      var superClass = O.Extends;
      var f = function() {
      };
      f.prototype = superClass.prototype;
      newClass.prototype = new f;
      newClass.prototype.constructor = newClass;
      for(var m in superClass) {
        if(m == "prototype") {
          continue
        }
        var getter = superClass.__lookupGetter__(m), setter = superClass.__lookupSetter__(m);
        if(getter || setter) {
          if(getter) {
            newClass.__defineGetter__(m, getter)
          }
          if(setter) {
            newClass.__defineSetter__(m, setter)
          }
        }else {
          newClass[m] = superClass[m]
        }
      }
      var Extends = function() {
        var t = this;
        if(arguments.length > 1) {
          throw Error("$base requires 0-1 parameters.");
        }
        var result;
        var tmpBase = t.$Extends;
        t.$Extends = superClass.__$Extends;
        if(arguments.length === 1) {
          var methodName = arguments[0];
          result = function() {
            if(superClass.prototype[methodName]) {
              var res = superClass.prototype[methodName].apply(t, arguments);
              t.$base = tmpBase;
              return res
            }else {
              throw Error("Method '" + methodName + "' not found.");
            }
          }
        }else {
          if(arguments.length === 0) {
            result = function() {
              superClass.apply(t, arguments);
              t.$Extends = tmpBase
            }
          }
        }
        return result
      };
      newClass.__$Extends = base;
      newClass.prototype.$Extends = base
    }
    var methods = O.Methods || {};
    for(var m in methods) {
      var getter = methods.__lookupGetter__(m), setter = methods.__lookupSetter__(m);
      if(getter || setter) {
        if(getter) {
          newClass.prototype.__defineGetter__(m, getter)
        }
        if(setter) {
          newClass.prototype.__defineSetter__(m, setter)
        }
      }else {
        newClass.prototype[m] = methods[m]
      }
    }
    var static = O.Static || {};
    for(var m in static) {
      newClass.prototype[m] = static[m]
    }
    return newClass
  };
  gizmo.Class = Class;
  gizmo.Plugins["Class"] = {name:"Class", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041f\u043b\u0430\u0433\u0438\u043d \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0439 \u043a\u043b\u0430\u0441\u0441\u044b"}
})(gizmo);
(function(gizmo) {
  var ajax = gizmo.Class({construct:function(O) {
    this.action = O.action;
    this.formId = O.id;
    this.onSubmit = O.onSubmit;
    this.onComplete = O.onComplete;
    this.createIframe();
    this.createForm()
  }, vars:{formId:"", form:{}, iframe:{}, onSubmit:function() {
  }, onComplete:function() {
  }}, methods:{createForm:function() {
    var form = document.getElementById(this.formId);
    form.action = this.action;
    form.target = this.iframeName;
    form.enctype = "multipart/form-data";
    form.method = "POST";
    this.form = form
  }, createIframe:function() {
    var name = "rFrame";
    this.iframeName = name;
    var iframe = document.createElement("iframe");
    iframe.name = name;
    iframe.style.display = "none";
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(iframe);
    this.iframe = iframe
  }, send:function() {
    if(this.onSubmit() !== false) {
      this.form.submit();
      return true
    }else {
      return false
    }
  }}});
  gizmo.Plugins["iframeAJAX"] = {name:"iframeAJAX", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041f\u043b\u0430\u0433\u0438\u043d \u0434\u043b\u044f AJAX \u043d\u0430 iframe"};
  gizmo.iframeAjax = ajax
})(gizmo);
window.framework = window.gizmo;
(function ArmLib(lib) {
  var ArmLib = new lib.Class({initialize:function(O) {
  }, Static:{}, Methods:{}});
  window.armlib = new ArmLib({})
})(framework);

