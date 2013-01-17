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
    if(this.isSet(obj)) {
      var clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== undefined && obj !== null && clas === type
    }else {
      return false
    }
  };
  var typeIs = function(obj) {
    var clas = {}.toString.call(obj).slice(8, -1);
    return clas
  };
  gizmo.isSet = isSet;
  gizmo.itIs = itIs;
  gizmo.typeIs = typeIs;
  gizmo.Modules["baseVariableFunction"] = {name:"Type", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041f\u043b\u0430\u0433\u0438\u043d \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043e\u043a \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u044b\u0445 \u043d\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0438\u0435, \u0443\u0442\u0438\u043d\u043d\u043e\u0439 \u0442\u0438\u043f\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 \u0442.\u0434. "}
})(gizmo);
(function(gizmo) {
  Filter = function(O, type) {
    if(gizmo.isSet(O) && gizmo.itIs("String", O) === true && this.isType(O)) {
      return O
    }else {
      throw TypeError(this.type(O) + " != String");
    }
  };
  isType = function(O) {
    if(this.is("String", O) === true) {
      var flag = true;
      for(var i in gizmo._types) {
        if(O === gizmo._types[i]) {
          flag = true
        }
      }
      return flag ? true : false
    }else {
      throw TypeError(this.type(O) + " <- it's not name of type");
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
  var Class = function(O) {
    var initialize = O.Initialize || function() {
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
          throw Error("$Extends requires 0-1 parameters.");
        }
        var result;
        var tmpExtends = t.$Extends;
        t.$Extends = superClass.__$Extends;
        if(arguments.length === 1) {
          var methodName = arguments[0];
          result = function() {
            if(superClass.prototype[methodName]) {
              var res = superClass.prototype[methodName].apply(t, arguments);
              t.$Extends = tmpExtends;
              return res
            }else {
              throw Error("Method '" + methodName + "' not found.");
            }
          }
        }else {
          if(arguments.length === 0) {
            result = function() {
              superClass.apply(t, arguments);
              t.$Extends = tmpExtends
            }
          }
        }
        return result
      };
      newClass.__$Extends = Extends;
      newClass.prototype.$Extends = Extends
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
window.framework = window.gizmo;
(function ArmLib(lib) {
  var ArmLib = lib.Class({initialize:function(O) {
  }, Static:{"class":{}}, Methods:{}});
  window.armlib = new ArmLib({})
})(framework);
(function ArmLibObject(armlib, lib) {
  var ArmLibObject = lib.Class({Initialize:function(O, layer, armlib) {
  }, Static:{name:1E3 * Math.random(), context:null, loadType:"synch", loadedFlag:false, owner:null, zindex:0, depend:false, _list:{}, drawList:{}, low:0, hight:0}, Methods:{draw:function() {
  }, begin:function(O, layer, armlib) {
  }, update:function(layer, armlib) {
  }, onLoad:function(layer, armlib, lib) {
  }, onKeyPress:function(e) {
  }, onKeyDown:function(e) {
  }, onKeyUp:function(e) {
  }, onMouseClick:function(e) {
  }, onMouseMove:function(e) {
  }, onMouseDown:function(e) {
  }, onMouseUp:function(e) {
  }, onShow:function(layer, armlib) {
  }, onHide:function(layer, armlib) {
  }, sortByZindex:function() {
    var i = this.low;
    var j = this.high;
    var A = this.drawList;
    var x = A[Math.round((low + high) / 2)];
    do {
      while(A[i] < x) {
        ++i
      }
      while(A[j] > x) {
        --j
      }
      if(i <= j) {
        var temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        i++;
        j--
      }
    }while(i < j);
    if(low < j) {
      qSort(A, low, j)
    }
    if(i < high) {
      qSort(A, i, high)
    }
    this.drawList = A
  }, addChild:function(O) {
    O.context = this.context;
    this.list[O.name] = O;
    this.drawList[O.name] = O;
    this.low = O.zindex < this.low ? O.zindex : this.low;
    this.hight = O.zindex > this.hight ? O.zindex : this.hight;
    this.sortByZindex()
  }, removeChild:function(O) {
  }, set list(O) {
    this._list = O;
    this.drawList = O;
    this.sortByZindex()
  }, get list() {
    return this._list
  }}});
  armlib.class.Object = ArmLibObject
})(armlib, gizmo);
(function Layer(armlib, lib) {
  var Layer = lib.Class({Extends:armlib.class.Object, Initialize:function(O) {
    if(O.container) {
      var container = document.getElementById(O.container);
      var canvas = document.createElement("canvas");
      canvas.width = O.width || this.width;
      canvas.height = O.width || this.height;
      canvas.style.id = O.name;
      container.appendChild(canvas);
      this.context = canvas.getContext("2d")
    }else {
      throw Error("The container is not found! Choose right id of container, please!");
    }
  }, Static:{width:500, height:500}, Methods:{}});
  armlib.class.Layer = Layer
})(armlib, gizmo);

