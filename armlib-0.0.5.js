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
  var itIs = function(obj, type) {
    if(gizmo.isSet(obj)) {
      var clas = Object.prototype.toString.call(obj).slice(8, -1);
      return obj !== null && clas == type
    }else {
      return false
    }
  };
  var type = function(obj) {
    var clas = {}.toString.call(obj).slice(8, -1);
    return clas
  };
  var clone = function clone(obj) {
    if(gizmo.type(obj) !== "Array" && gizmo.type(obj) !== "Object") {
      return obj
    }
    var newObj = new obj.constructor;
    for(i in obj) {
      if(obj[i] && obj.hasOwnProperty(i)) {
        if(gizmo.itIs(obj[i], "Object")) {
          newObj[i] = clone(obj[i])
        }else {
          if(obj[i] && gizmo.itIs(obj[i], "Array")) {
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
  gizmo.type = type;
  gizmo.clone = clone;
  gizmo.Modules["baseVariableFunction"] = {name:"Type", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043f\u0440\u043e\u0432\u0435\u0440\u043e\u043a \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u044b\u0445 \u043d\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0438\u0435, \u0443\u0442\u0438\u043d\u043d\u043e\u0439 \u0442\u0438\u043f\u0438\u0437\u0430\u0446\u0438\u0438 \u0438 \u0442.\u0434. "}
})(gizmo);
(function(gizmo) {
  var Filter = function(O, type) {
    if(gizmo.isSet(O) && gizmo.itIs(O, type) === true && isType(type)) {
      return O
    }else {
      throw TypeError(gizmo.type(O) + " != " + type);
    }
  };
  var isType = function(O) {
    if(gizmo.itIs(O, "String") === true) {
      var flag = true;
      for(var i in gizmo._types) {
        if(O === gizmo._types[i]) {
          flag = false;
          break
        }
      }
      return flag
    }else {
      throw TypeError(gizmo.type(O) + " <- it's not name of type");
    }
  };
  gizmo.Filter = Filter;
  gizmo.Modules["Filters"] = {name:"Filters", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:'\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f "\u0444\u0438\u043b\u044c\u0442\u0440\u0430" \u043f\u0440\u043e\u0432\u0435\u0440\u044f\u044e\u0449\u0438\u0445 \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u0435 \u043f\u0435\u0440\u0435\u0434\u0430\u043d\u043d\u043e\u0439 \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u043d\u043e\u0439 \u0435\u0451 \u0442\u0438\u043f\u0443'}
})(gizmo);
(function(gizmo) {
  gizmo.isTString = function(O) {
    return gizmo.itIs(O, "String")
  };
  gizmo.isTNumber = function(O) {
    return gizmo.itIs(O, "Number")
  };
  gizmo.isTBool = function(O) {
    return gizmo.itIs(O, "Boolean")
  };
  gizmo.isTArray = function(O) {
    return gizmo.itIs(O, "Array")
  };
  gizmo.isTFunc = function(O) {
    return gizmo.itIs(O, "Function")
  };
  gizmo.isTDate = function(O) {
    return gizmo.itIs(O, "Date")
  };
  gizmo.isTRegExp = function(O) {
    return gizmo.itIs(O, "RegExp")
  };
  gizmo.isTObject = function(O) {
    return gizmo.itIs(O, "Object")
  };
  gizmo.Modules["Checks"] = {name:"Checks", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043c\u0435\u0442\u043e\u0434\u043e\u0432 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0438 \u0442\u0438\u043f\u0430, \u0434\u043b\u044f \u043a\u0430\u0436\u0434\u043e\u0433\u043e \u0442\u0438\u043f\u0430"}
})(gizmo);
(function(gizmo) {
  var Class = function(params, property) {
    var construct = params.Initialize || function() {
    };
    if(params.Extend) {
      var superClass = params.Extend;
      var newClass = function(O) {
        (function(O, self) {
          for(var i in O) {
            switch(gizmo.type(O[i])) {
              case "Array":
                self[i] = [].concat(O[i]);
                break;
              case "Object":
                self[i] = gizmo.clone(O[i]);
                break
            }
          }
        })(superClass.prototype, this);
        (function(O, self) {
          for(var i in O) {
            switch(gizmo.type(O[i])) {
              case "Array":
                self[i] = [].concat(O[i]);
                break;
              case "Object":
                self[i] = gizmo.clone(O[i]);
                break
            }
          }
        })(params.Statics || {}, this);
        (function(O, self) {
          for(var i in O) {
            self[i] = O[i]
          }
        })(params.Methods || {}, this);
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
    }else {
      var newClass = function(O) {
        (function(O, self) {
          for(var i in O) {
            switch(gizmo.type(O[i])) {
              case "Array":
                self[i] = [].concat(O[i]);
                break;
              case "Object":
                self[i] = gizmo.clone(O[i]);
                break
            }
          }
        })(params.Statics || {}, this);
        (function(O, self) {
          for(var i in O) {
            self[i] = O[i]
          }
        })(params.Methods || {}, this);
        construct.call(this, O)
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
        switch(gizmo.type(vars[m])) {
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
            return gizmo.Filter(this[key], gizmo.type(value))
          }
        }(m);
        setter = function(O) {
          var key = "_" + m;
          var value = vars[m];
          return function(O) {
            this[key] = gizmo.Filter(O, gizmo.type(value))
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
  gizmo.nativeSort = function(O) {
    var mas = O.mas ? O.mas : [];
    var target = O.target ? O.target : ">";
    if(O.field) {
      if(target == ">") {
        mas.sort(function(a, b) {
          var s1 = a[O.field];
          var s2 = b[O.field];
          if(s1 > s2) {
            return-1
          }else {
            if(s1 < s2) {
              return 1
            }
          }
          return 0
        })
      }else {
        mas.sort(function(a, b) {
          var s1 = a[O.field];
          var s2 = b[O.field];
          if(s1 < s2) {
            return-1
          }else {
            if(s1 > s2) {
              return 1
            }
          }
          return 0
        })
      }
    }else {
      if(target == ">") {
        mas.sort(function(a, b) {
          var s1 = a;
          var s2 = b;
          if(s1 > s2) {
            return-1
          }else {
            if(s1 < s2) {
              return 1
            }
          }
          return 0
        })
      }else {
        mas.sort(function(a, b) {
          var s1 = a;
          var s2 = b;
          if(s1 < s2) {
            return-1
          }else {
            if(s1 > s2) {
              return 1
            }
          }
          return 0
        })
      }
    }
    return mas
  }, gizmo.Modules["Sorts"] = {name:"Sorts", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0432\u0432\u0435\u0434\u0435\u043d\u0438\u044f \u043c\u0435\u0442\u043e\u0434\u043e\u0432 \u0440\u0435\u0430\u043b\u0438\u0437\u0443\u044e\u0449\u0438\u0445 \u0441\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u043a\u0438"}
})(gizmo);
(function(gizmo) {
  var matrix = gizmo.Class({Initialize:function(O) {
    return this.setElements(O)
  }, Statics:{}, Methods:{create:function(elements) {
    var M = new gizmo.Matrix(elements);
    return M
  }, canMultiplyFromLeft:function(matrix) {
    if(this.elements.length === 0) {
      return false
    }
    var M = matrix.elements || matrix;
    if(typeof M[0][0] === "undefined") {
      M = Sylvester.Matrix.create(M).elements
    }
    return this.elements[0].length === M.length
  }, multiply:function(matrix) {
    if(this.elements.length === 0) {
      return null
    }
    if(!matrix.elements) {
      return this.map(function(x) {
        return x * matrix
      })
    }
    var returnVector = matrix.modulus ? true : false;
    var M = matrix.elements || matrix;
    if(typeof M[0][0] === "undefined") {
      M = Sylvester.Matrix.create(M).elements
    }
    if(!this.canMultiplyFromLeft(M)) {
      return null
    }
    var i = this.elements.length, nj = M[0].length, j;
    var cols = this.elements[0].length, c, elements = [], sum;
    while(i--) {
      j = nj;
      elements[i] = [];
      while(j--) {
        c = cols;
        sum = 0;
        while(c--) {
          sum += this.elements[i][c] * M[c][j]
        }
        elements[i][j] = sum
      }
    }
    var M = this.create(elements);
    return returnVector ? M.col(1) : M
  }, x:function(matrix) {
    return this.multiply(matrix)
  }, setElements:function(els) {
    var i, j, elements = els.elements || els;
    if(elements[0] && typeof elements[0][0] !== "undefined") {
      i = elements.length;
      this.elements = [];
      while(i--) {
        j = elements[i].length;
        this.elements[i] = [];
        while(j--) {
          this.elements[i][j] = elements[i][j]
        }
      }
      return this
    }
    var n = elements.length;
    this.elements = [];
    for(i = 0;i < n;i++) {
      this.elements.push([elements[i]])
    }
    return this
  }}});
  gizmo.Matrix = matrix;
  gizmo.Modules["Matrix"] = {name:"Matrix", version:0.1, author:"Alexander Lizin aka Sogimu", email:"sogimu@nxt.ru", description:"\u041c\u043e\u0434\u0443\u043b\u044c \u0434\u043b\u044f \u0440\u0430\u0431\u043e\u0442\u044b \u0441 \u043c\u0430\u0442\u0440\u0438\u0446\u0430\u043c\u0438. \u0421\u043e\u0437\u0434\u0430\u043d \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u0431\u0438\u0431\u043b\u0438\u043e\u0442\u0435\u043a\u0438 http://sylvester.jcoglan.com."}
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
(function ArmLib(lib) {
  var ArmLib = lib.Class({Initialize:function() {
    return this
  }, Statics:{_type:["ArmLib", "ArmLib"], _name:"ArmLib", _list:[], _class:{}, _armlib:this, _lib:lib}, Methods:{_addLayer:function(O) {
    O._setOwner(this);
    this._list.push(O);
    return this
  }, _removeLayer:function(O) {
  }, run:function() {
    this._listenKeybordMouseEvents();
    for(var i in this._list) {
      this._list[i].run()
    }
    return this
  }, stop:function() {
    this._notListenKeybordMouseEvents()
  }, _listenKeybordMouseEvents:function() {
    var self = this;
    window.onkeydown = function(e) {
      self._onKeyDown(e)
    };
    window.onkeypress = function(e) {
      self._onKeyPress(e)
    };
    window.onkeyup = function(e) {
      self._onKeyUp(e)
    };
    for(var i in this._list) {
      this._list[i]._listenMouseEvents()
    }
  }, _notListenKeybordMouseEvents:function() {
    var self = this;
    window.onkeydown = function(e) {
    };
    window.onkeypress = function(e) {
    };
    window.onkeyup = function(e) {
    };
    for(var i in this._list) {
      this._list[i]._notListenMouseEvents()
    }
  }, _onKeyDown:function(e) {
    for(var i in this._list) {
      if(this._list[i].getRunStatus()) {
        this._list[i]._onKeyDown(e)
      }
    }
  }, _onKeyPress:function(e) {
    for(var i in this._list) {
      if(this._list[i].getRunStatus()) {
        this._list[i]._onKeyPress(e)
      }
    }
  }, _onKeyUp:function(e) {
    for(var i in this._list) {
      if(this._list[i].getRunStatus()) {
        this._list[i]._onKeyUp(e)
      }
    }
  }}});
  window.ArmLib = new ArmLib
})(window.gizmo);
(function superObj(armlib, lib) {
  var ArmObj = lib.Class({Initialize:function(O, layer, armlib) {
  }, Statics:{_type:["ArmObject"], _name:1E3 * Math.random(), _loaded:false, _owner:null, _armlib:armlib, _lib:lib}, Methods:{_begin:function() {
  }, _update:function() {
  }, Load:function() {
    this._load()
  }, _load:function() {
    for(var i in this._list) {
      this._list[i]._load()
    }
  }, __onLoad:function() {
    if(this._onLoad) {
      this._onLoad.call(this, this._layer, armlib, lib)
    }
    if(this.haveOwner()) {
      this._getOwner()._loadedChild()
    }
  }, setFunc:function(name, func) {
    if(name && func) {
      this["_" + name] = func
    }
    return this
  }, getFunc:function(O) {
  }, haveOwner:function() {
    if(this._owner) {
      return true
    }else {
      return false
    }
  }, _setType:function(type) {
    this._type = type
  }, getType:function() {
    return this._type
  }, setName:function(name) {
    this._name = name
  }, getName:function() {
    return this._name
  }, _setLoaded:function() {
    this._loaded = true
  }, _setUnloaded:function() {
    this._loaded = false
  }, _setOwner:function(object) {
    this._owner = object
  }, _getOwner:function() {
    return this._owner
  }}});
  armlib._class.ArmObj = ArmObj
})(ArmLib, gizmo);
(function visualObj(armlib, lib) {
  var VisualObj = lib.Class({Extend:armlib._class.ArmObj, Initialize:function(O, layer, armlib) {
  }, Statics:{_type:["ArmObject", "VisualObj"], _context:null, _layer:null, _x:0, _y:0, _width:10, _height:10, _angle:0, _centralPoint:{x:1, y:1}, _scale:{x:1, y:1}, _zindex:0, _armlib:armlib, _lib:lib}, Methods:{_clear:function() {
  }, _draw:function() {
  }, haveLayer:function() {
    if(this._layer) {
      return true
    }else {
      return false
    }
  }, _setContext:function(context) {
    this._context = context
  }, getContext:function() {
    return this._context
  }, _setLayer:function(layer) {
    this._layer = layer
  }, getLayer:function() {
    return this._layer
  }, _setDisplayCoordinates:function(coordinates) {
    this._displayCoordinates = coordinates
  }, _getDisplayCoordinates:function() {
    return this._displayCoordinates
  }, _setPrevRawCoordinates:function(coordinates) {
    this._rawCoordinates.prev = coordinates
  }, _getPrevRawCoordinates:function() {
    return this._rawCoordinates.prev
  }, _setCurrentRawCoordinates:function(coordinates) {
    this._rawCoordinates.current = coordinates
  }, _getCurrentRawCoordinates:function() {
    return this._rawCoordinates.current
  }, set x(O) {
    this._x = O
  }, get x() {
    return this._x
  }, set y(O) {
    this._y = O
  }, get y() {
    return this._y
  }, set width(O) {
    this._width = O
  }, get width() {
    return this._width
  }, set height(O) {
    this._height = O
  }, get height() {
    return this._height
  }, set angle(O) {
    this._angle = O
  }, get angle() {
    return this._angle
  }, set centralPoint(O) {
    this._centralPoint = O
  }, get centralPoint() {
    return this._centralPoint
  }, set scale(O) {
    this._scale = O
  }, get scale() {
    return this._scale
  }, set zindex(O) {
    this._zindex = O;
    if(this.haveOwner()) {
      this._getOwner()._sortByZindex()
    }
  }, get zindex() {
    return this._zindex
  }}});
  armlib._class.VisualObj = VisualObj
})(ArmLib, gizmo);
(function primitive(armlib, lib) {
  var Primitive = lib.Class({Extend:armlib._class.VisualObj, Statics:{_type:["Primitive", ""], _fill:"#00FF00", _stroke:"#00aa00", _oldX:0, _oldY:0, _oldWidth:0, _oldHeight:0, _oldLandscape:null}, Methods:{_begin:function() {
    if(this.haveOwner()) {
      this._begin = function() {
        if(this._onBegin) {
          this._onBegin.call(this, this._layer, armlib, lib)
        }
      };
      this._begin()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _clear:function() {
    if(this.haveOwner()) {
      this._saveDisplayUnderPrimitive();
      this._clear = function() {
        this._removePrimitiveFromDisplay();
        this._saveDisplayUnderPrimitive()
      };
      this._clear()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _update:function() {
    if(this.haveOwner()) {
      this._update = function() {
        if(this._onUpdate) {
          this._onUpdate.call(this, this._layer, armlib, lib)
        }
      };
      this._update()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _saveDisplayUnderPrimitive:function() {
    var angelRad = this.angle;
    var m = this.centralPoint.x + this.x;
    var n = this.centralPoint.y + this.y;
    var MTrans = new gizmo.Matrix([[Math.cos(angelRad), Math.sin(angelRad), 0], [-Math.sin(angelRad), Math.cos(angelRad), 0], [-m * (Math.cos(angelRad) - 1) + n * Math.sin(angelRad), -m * Math.sin(angelRad) - n * (Math.cos(angelRad) - 1), 1]]);
    var mainPoint = (new gizmo.Matrix([[this.x, this.y, 1], [this.x + this.width, this.y, 1], [this.x + this.width, this.y + this.height, 1], [this.x, this.y + this.height, 1]])).x(MTrans).elements;
    var x = Math.min(mainPoint[0][0], mainPoint[1][0], mainPoint[2][0], mainPoint[3][0]);
    var y = Math.min(mainPoint[0][1], mainPoint[1][1], mainPoint[2][1], mainPoint[3][1]);
    var width = Math.max(mainPoint[0][0], mainPoint[1][0], mainPoint[2][0], mainPoint[3][0]);
    var height = Math.max(mainPoint[0][1], mainPoint[1][1], mainPoint[2][1], mainPoint[3][1]);
    this._oldX = x < 0 ? 0 : x;
    this._oldY = y < 0 ? 0 : y;
    this._oldWidth = this._oldX + (width <= 0 ? 1 : width);
    this._oldHeight = this._oldY + (height <= 0 ? 1 : height);
    this._oldLandscapes = this._context.getImageData(this._oldX, this._oldY, this._oldWidth, this._oldHeight)
  }, _removePrimitiveFromDisplay:function() {
    this._context.putImageData(this._oldLandscapes, this._oldX, this._oldY)
  }, __onKeyDown:function(e) {
    if(this._onKeyDown) {
      this._onKeyDown(e)
    }
  }, __onKeyPress:function(e) {
    if(this._onKeyPress) {
      this._onKeyPress(e)
    }
  }, __onKeyUp:function(e) {
    if(this._onKeyUp) {
      this._onKeyUp(e)
    }
  }, __onMouseDown:function(e) {
    if(this._onMouseDown && this._havePoint(e)) {
      this._onMouseDown(e)
    }
  }}});
  armlib._class.Primitive = Primitive
})(ArmLib, gizmo);
(function object(armlib, lib) {
  var object = lib.Class({Extend:armlib._class.VisualObj, Initialize:function(O, layer, armlib) {
    this.name = O.name || this.name;
    this.zindex = O.zindex || this.zindex;
    this._x = O.x || this._x;
    this._y = O.y || this._y;
    this.centralPoint = O.centralPoint || this.centralPoint;
    this.angle = O.angle || this.angle;
    this.scale = O.scale || this.scale;
    return this
  }, Statics:{_type:"Object", _numberNotLoadedChilds:0, _list:[]}, Methods:{addChild:function(O) {
    O._setContext(this.getContext());
    O._setLayer(this.getLayer());
    O._setOwner(this);
    this._list.push(O);
    this._numberNotLoadedChilds++;
    this._sortByZindex();
    return this
  }, removeChild:function(O) {
  }, Load:function() {
    this._load.call(this);
    return this;
    this._load()
  }, _load:function() {
    for(var i in this._list) {
      this._list[i]._load.call(this._list[i])
    }
    if(this._list.length == 0) {
      this.__onLoad()
    }
  }, _begin:function() {
    if(this.haveOwner()) {
      this._begin = function() {
        for(var i in this._list) {
          this._list[i]._begin()
        }
        if(this.onBegin) {
          this.onBegin.call(this, this._layer, armlib, lib)
        }
      };
      this._begin()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _onBegin:function(layer, armlib, lib) {
  }, _update:function() {
    if(this.haveOwner()) {
      this._update = function() {
        for(var i in this._list) {
          this._list[i]._update()
        }
        if(this._onUpdate) {
          this._onUpdate.call(this, this._layer, armlib, lib)
        }
      };
      this._update()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _onUpdate:function(layer, armlib, lib) {
  }, _clear:function() {
    if(this.haveOwner()) {
      this._clear = function() {
        var len = this._list.length - 1;
        for(var i = len;i >= 0;i--) {
          this._list[i]._clear.call(this._list[i])
        }
        if(this._onClear) {
          this._onClear(this._context, this._layer, armlib, lib)
        }
      };
      this._clear()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _onClear:function(ctx, layer, armlib, lib) {
  }, _draw:function() {
    if(this.haveOwner()) {
      this._draw = function() {
        this._context.save();
        this._context.translate(this.x, this.y);
        this._context.translate(this.centralPoint.x, this.centralPoint.y);
        this._context.rotate(this.angle);
        this._context.translate(-this.centralPoint.x, -this.centralPoint.y);
        this._context.scale(this.scale.x, this.scale.y);
        if(this._preDraw) {
          this._preDraw(this._context, this._layer, armlib, lib)
        }
        for(var i in this._list) {
          this._list[i]._draw.call(this._list[i])
        }
        if(this._onDraw) {
          this._onDraw(this._context, this._layer, armlib, lib)
        }
        this._context.restore()
      };
      this._draw()
    }else {
      console.log("object with type " + this.getType() + " and name " + this.getName() + " have not owner!")
    }
  }, _onDraw:function(ctx, layer, armlib, lib) {
  }, _preDraw:function(ctx, layer, armlib, lib) {
  }, _sortByZindex:function() {
    this._list = gizmo.nativeSort({mas:this._list, target:"<", field:"_zindex"})
  }, _loadedChild:function() {
    this._numberNotLoadedChilds--;
    if(this._numberNotLoadedChilds == 0) {
      this._onLoad()
    }
  }, getNumberNotLoadedChilds:function() {
    return this._numberNotLoadedChilds
  }, __onKeyDown:function(e) {
    for(var i in this._list) {
      this._list[i].__onKeyDown(e)
    }
  }, __onKeyPress:function(e) {
    for(var i in this._list) {
      this._list[i].__onKeyPress(e)
    }
  }, __onKeyUp:function(e) {
    for(var i in this._list) {
      this._list[i].__onKeyUp(e)
    }
  }, __onMouseDown:function(e) {
    for(var i in this._list) {
      this._list[i].__onMouseDown(e)
    }
  }, _setContext:function(context) {
    this._context = context;
    for(var i in this._list) {
      this._list[i]._setContext(context)
    }
  }, _setLayer:function(layer) {
    this._layer = layer;
    for(var i in this._list) {
      this._list[i]._setLayer(layer)
    }
  }}});
  armlib.Object = object
})(ArmLib, gizmo);
(function layer(armlib, lib) {
  var Layer = lib.Class({Initialize:function(O) {
    this._setName(O.name || this.name);
    this.fps = O.fps || this.fps;
    if(O.container) {
      this._setContainerName(O.container);
      var container = document.getElementById(O.container);
      var canvas = document.createElement("canvas");
      canvas.width = O.width || this.width;
      canvas.height = O.height || this.height;
      canvas.id = this.name;
      canvas.style["z-index"] = O.zindex || this._zindex;
      canvas.style.position = "absolute";
      container.appendChild(canvas);
      this._context = canvas.getContext("2d")
    }else {
      throw Error("The container is not found! Choose right id of container, please!");
    }
    this._setLayer(this);
    this._setOwner(armlib);
    armlib._addLayer(this);
    return this
  }, Statics:{_type:["Layer", ""], _name:1E3 * Math.random(), _runStatus:false, _context:null, _layer:null, _owner:null, _container:null, _width:500, _height:500, _fps:60, _zindex:0, _updating:false, _changeList:[], _list:[], _armlib:armlib, _lib:lib}, Methods:{run:function() {
    (function(O) {
      var onEachFrame;
      if(window.webkitRequestAnimationFrame) {
        onEachFrame = function(cb) {
          var _cb = function() {
            cb();
            webkitRequestAnimationFrame(_cb)
          };
          _cb()
        }
      }else {
        if(window.mozRequestAnimationFrame) {
          onEachFrame = function(cb) {
            var _cb = function() {
              cb();
              mozRequestAnimationFrame(_cb)
            };
            _cb()
          }
        }else {
          if(window.requestAnimationFrame) {
            onEachFrame = function(cb) {
              var _cb = function() {
                cb();
                requestAnimationFrame(_cb)
              };
              _cb()
            }
          }else {
            if(window.msRequestAnimationFrame) {
              onEachFrame = function(cb) {
                var _cb = function() {
                  cb();
                  msRequestAnimationFrame(_cb)
                };
                _cb()
              }
            }else {
              var fps = O.fps;
              onEachFrame = function(cb) {
                setInterval(cb, 1E3 / fps)
              }
            }
          }
        }
      }
      window.onEachFrame = onEachFrame
    })(this);
    this._begin();
    var step = function(O) {
      var loops = 0, skipTicks = 1E3 / O.fps, maxFrameSkip = 10, nextGameTick = (new Date).getTime();
      return function() {
        loops = 0;
        while((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
          O._update();
          nextGameTick += skipTicks;
          loops++
        }
        O._clear();
        O._draw()
      }
    }(this);
    window.onEachFrame(step);
    this._runStatus = true;
    this.run = function() {
      return this
    };
    return this
  }, stop:function() {
  }, addChild:function(O) {
    O._setContext(this._context);
    O._setLayer(this._layer);
    O._setOwner(this);
    this._list.push(O);
    return this
  }, removeChild:function(O) {
  }, _addChangedObj:function(O) {
    if(this.updating) {
    }
  }, _begin:function() {
    for(var i in this._list) {
      this._list[i]._begin()
    }
    a:1
  }, _clear:function() {
    for(var i in this._list) {
      this._list[i]._clear()
    }
  }, _update:function() {
    this._updating = true;
    for(var i in this._list) {
      this._list[i]._update()
    }
    this._updating = false
  }, _draw:function() {
    for(var i in this._list) {
      this._list[i]._draw()
    }
  }, _setType:function(type) {
    this._type = type
  }, getType:function() {
    return this._type
  }, _setName:function(name) {
    this._name = name
  }, getName:function() {
    return this._name
  }, _setRunStatus:function(status) {
    this._runStatus = status
  }, getRunStatus:function() {
    return this._runStatus
  }, _setContext:function(context) {
    this._context = context
  }, getContext:function() {
    return this._context
  }, _setLayer:function(layer) {
    this._layer = layer
  }, getLayer:function() {
    return this._layer
  }, _setOwner:function(object) {
    this._owner = object
  }, _getOwner:function() {
    return this._owner
  }, _setContainerName:function(name) {
    this._container = name
  }, _getContainerName:function() {
    return this._container
  }, _onKeyDown:function(e) {
    if(this.getRunStatus()) {
      for(var i in this._list) {
        this._list[i].__onKeyDown(e)
      }
    }
  }, _onKeyPress:function(e) {
    if(this.getRunStatus()) {
      for(var i in this._list) {
        this._list[i].__onKeyPress(e)
      }
    }
  }, _onKeyUp:function(e) {
    if(this.getRunStatus()) {
      for(var i in this._list) {
        this._list[i].__onKeyUp(e)
      }
    }
  }, _onMouseDown:function(e) {
    if(this.getRunStatus()) {
      for(var i in this._list) {
        this._list[i].__onMouseDown(e)
      }
    }
  }, _listenMouseEvents:function() {
    var container = document.getElementById(this._getContainerName());
    var self = this;
    container.onmousedown = function(e) {
      self._onMouseDown(e)
    }
  }, _notListenMouseEvents:function() {
  }, set width(O) {
    this._width = O
  }, get width() {
    return this._width
  }, set height(O) {
    this._height = O
  }, get height() {
    return this._height
  }, set fps(O) {
    this._fps = O
  }, get fps() {
    return this._fps
  }, set zindex(O) {
    this._zindex = O
  }, get zindex() {
    return this._zindex
  }}});
  armlib.Layer = Layer
})(ArmLib, gizmo);
(function Rect(armlib, lib) {
  var Rect = lib.Class({Extend:armlib._class.Shape, Initialize:function(O) {
    this.name = O.name || this.name;
    this.zindex = O.zindex || this.zindex;
    this.x = O.x || this.x;
    this.y = O.y || this.y;
    this.centralPoint = O.centralPoint || this.centralPoint;
    this.width = O.width || this.width;
    this.height = O.height || this.height;
    this.angle = O.angle || this.angle;
    this.scale = O.scale || this.scale;
    this.fill = O.fill || this.fill;
    this.stroke = O.stroke || this.stroke;
    return this
  }, Statics:{type:"Rect"}, Methods:{_load:function() {
    if(!this.loaded) {
      this.loaded = true;
      this._onLoad.call(this);
      this._load = function() {
        return this
      }
    }
    return this
  }, _onDraw:function() {
    if(this._connected) {
      this._onDraw = function() {
        this._context.save();
        this._context.beginPath();
        this._context.translate(this.centralPoint.x, this.centralPoint.y);
        this._context.rotate(this.angle);
        this._context.translate(-this.centralPoint.x, -this.centralPoint.y);
        this._context.scale(this.scale.x, this.scale.y);
        if(this.preDraw) {
          this.preDraw(this.__context, this._layer, armlib, lib)
        }
        this._context.rect(this.x, this.y, this.width, this.height);
        this._context.fillStyle = this.fill;
        this._context.strokeStyle = this.stroke;
        if(this.onDraw) {
          this.onDraw(this.__context, this._layer, armlib, lib)
        }
        this._context.closePath();
        this._context.fill();
        this._context.stroke();
        this._context.restore()
      };
      this._onDraw()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }}});
  armlib.Rect = Rect
})(ArmLib, gizmo);
(function image(armlib, lib) {
  var image = lib.Class({Extend:armlib._class.Primitive, Initialize:function(O) {
    this.setName(O.name || this.getName());
    this.src = O.src || this.src;
    this.zindex = O.zindex || this.zindex;
    this.x = O.x || this.x;
    this.y = O.y || this.y;
    this.centralPoint = O.centralPoint || this.centralPoint;
    this.width = O.width || this.width;
    this.height = O.height || this.height;
    this.angle = O.angle || this.angle;
    this.scale = O.scale || this.scale;
    this.fill = O.fill || this.fill;
    this.stroke = O.stroke || this.stroke;
    return this
  }, Statics:{_type:["Shape", "Image"], _loaded:false, _src:null, _image:null}, Methods:{_load:function() {
    this.image = new Image;
    this.image.src = this.src;
    var self = this;
    this.image.onload = function() {
      self._setLoaded();
      self.__onLoad.call(self)
    };
    return this
  }, _draw:function() {
    if(this.haveOwner()) {
      this._draw = function() {
        this._context.save();
        this._context.translate(this.x, this.y);
        this._context.beginPath();
        if(this._preDraw) {
          this._preDraw(this._context, this._layer, armlib, lib)
        }
        this._context.fillStyle = this.fill;
        this._context.strokeStyle = this.stroke;
        this._context.translate(this.centralPoint.x, this.centralPoint.y);
        this._context.rotate(this.angle);
        this._context.translate(-this.centralPoint.x, -this.centralPoint.y);
        this._context.drawImage(this.image, 0, 0, this.width, this.height);
        if(this._onDraw) {
          this._onDraw(this._context, this._layer, armlib, lib)
        }
        this._context.closePath();
        this._context.restore()
      };
      this._draw()
    }else {
      throw Error("object with type " + this.getType() + " and name " + this.getName() + " have not owner!");
    }
  }, _havePoint:function(point) {
    if(point.x >= this.x && point.x <= this.x + this.width && point.y >= this.y && point.y <= this.y + this.height) {
      return true
    }else {
      return false
    }
  }, set image(image) {
    this._image = image
  }, get image() {
    return this._image
  }, set src(url) {
    this._src = url
  }, get src() {
    return this._src
  }}});
  armlib.Image = image
})(ArmLib, gizmo);

