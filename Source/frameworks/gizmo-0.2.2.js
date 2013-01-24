(function() {
  var gizmo = function() {
  };
  gizmo.prototype = {types:["String", "Number", "Array", "Function", "Date", "Object", "RegExp", "Bool"], About:{}, Modules:{}, Plugins:{}};
  window.gizmo = new gizmo
})();
(function(gizmo) {
  var isSet = function(obj) {
    if(obj != undefined && obj != null) {
      return true
    }else {
      return false
    }
  };
  var itIs = function(type, obj) {
    if(gizmo.isSet(obj)) {
      var clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== null && clas == type
    }else {
      return false
    }
  };
  var typeIs = function(obj) {
    var clas = {}.toString.call(obj).slice(8, -1);
    return clas
  };
  var clone = function clone(obj) {
    if(gizmo.typeIs(obj) !== "Array" && gizmo.typeIs(obj) !== "Object") {
      return obj
    }
    var newObj = new obj.constructor;
    for(i in obj) {
      if(obj[i] && obj.hasOwnProperty(i)) {
        if(gizmo.itIs("Object", obj[i])) {
          newObj[i] = clone(obj[i])
        }else {
          if(obj[i] && gizmo.itIs("Array", obj[i])) {
            newObj[i] = [].concat(obj[i])
          }else {
            newObj[i] = obj[i]
          }
        }
      }
    }
    return newObj
  };
  gizmo.isSet = isSet;
  gizmo.itIs = itIs;
  gizmo.typeIs = typeIs;
  gizmo.clone = clone;
  gizmo.Modules["baseVariableFunction"] = {name:"Type", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043e\u043a \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u044b\u0445 \u043d\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0438\u0435, \u0443\u0442\u0438\u043d\u043d\u043e\u0439 \u0442\u0438\u043f\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 \u0442.\u0434. "}
})(gizmo);
(function(gizmo) {
  var Filter = function(O, type) {
    if(gizmo.isSet(O) && gizmo.itIs(type, O) === true && isType(type)) {
      return O
    }else {
      throw TypeError(gizmo.typeIs(O) + " != " + type);
    }
  };
  var isType = function(O) {
    if(gizmo.itIs("String", O) === true) {
      var flag = true;
      for(var i in gizmo._types) {
        if(O === gizmo._types[i]) {
          flag = false;
          break
        }
      }
      return flag
    }else {
      throw TypeError(gizmo.typeIs(O) + " <- it's not name of type");
    }
  };
  gizmo.Filter = Filter;
  gizmo.Modules["Filters"] = {name:"Filters", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:'\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f "\u0444\u0438\u043b\u044c\u0442\u0440\u0430" \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u044e\u0449\u0438\u0445 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043d\u043d\u043e\u0439 \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0439 \u0435\u0451 \u0442\u0438\u043f\u0443'}
})(gizmo);
(function(gizmo) {
  gizmo.isTString = function(O) {
    return gizmo.itIs("String", O)
  };
  gizmo.isTNumber = function(O) {
    return gizmo.itIs("Number", O)
  };
  gizmo.isTBool = function(O) {
    return gizmo.itIs("Boolean", O)
  };
  gizmo.isTArray = function(O) {
    return gizmo.itIs("Array", O)
  };
  gizmo.isTFunc = function(O) {
    return gizmo.itIs("Function", O)
  };
  gizmo.isTDate = function(O) {
    return gizmo.itIs("Date", O)
  };
  gizmo.isTRegExp = function(O) {
    return gizmo.itIs("RegExp", O)
  };
  gizmo.isTObject = function(O) {
    return gizmo.itIs("Object", O)
  };
  gizmo.Modules["Checks"] = {name:"Checks", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043c\u0435\u0442\u043e\u0434\u043e\u0432 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0442\u0438\u043f\u0430, \u0434\u043b\u044f \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u0442\u0438\u043f\u0430"}
})(gizmo);
(function(gizmo) {
  var Class = function(params, property) {
    var construct = params.Initialize || function() {
    };
    var newClass = construct;
    if(params.Extend) {
      var superClass = params.Extend;
      var newClass = function(O) {
        (function(O, self) {
          for(var i in O) {
            switch(gizmo.typeIs(O[i])) {
              case "Array":
                self[i] = [].concat(O[i]);
                break;
              case "Object":
                self[i] = gizmo.clone(O[i]);
                break
            }
          }
        })(superClass.prototype, this);
        construct.call(this, O)
      };
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
    }
    var methods = params.Methods || {};
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
    var vars = params.Statics || {};
    if(gizmo.isSet(property) && gizmo.isSet(property.checkingMode)) {
      var mode = property.checkingMode
    }else {
      var mode = false
    }
    if(!mode) {
      for(var m in vars) {
        switch(gizmo.typeIs(vars[m])) {
          case "Array":
            newClass.prototype[m] = [].concat(vars[m]);
            break;
          case "Object":
            newClass.prototype[m] = gizmo.clone(vars[m]);
            break;
          default:
            newClass.prototype[m] = vars[m]
        }
      }
    }else {
      for(var m in vars) {
        newClass.prototype["_" + m] = vars[m];
        getter = function(O) {
          var key = "_" + m;
          var value = vars[m];
          return function() {
            return gizmo.Filter(this[key], gizmo.typeIs(value))
          }
        }(m);
        setter = function(O) {
          var key = "_" + m;
          var value = vars[m];
          return function(O) {
            this[key] = gizmo.Filter(O, gizmo.typeIs(value))
          }
        }(m);
        newClass.prototype.__defineGetter__(m, getter);
        newClass.prototype.__defineSetter__(m, setter)
      }
    }
    return newClass
  };
  gizmo.Class = Class;
  gizmo.Modules["Class"] = {name:"Class", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u044e\u0449\u0438\u0439 \u043a\u043b\u0430\u0441\u0441\u044b"}
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

