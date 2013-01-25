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
window.framework = window.gizmo;
(function ArmLib(lib) {
  var ArmLib = lib.Class({initialize:function(O) {
    this.synch = O.synch;
    return this
  }, Statics:{name:"ARMLIB", type:"ARMLIB", owner:null, synch:true, loaded:false, _synchObjectsList:{}, _numberSynchObjects:0, _list:{}, _processList:[], _armlib:this, _lib:lib, "class":{}, _class:{}}, Methods:{_draw:function() {
    if(lib.isSet(this.draw)) {
      this.draw.call(this, this._context, this._layer, armlib, lib)
    }
    for(var i in this._processList) {
      this._processList[i]._draw()
    }
  }, draw:function(ctx, layer, armlib, lib) {
  }, _begin:function() {
    if(lib.isSet(this.begin)) {
      this.begin.call(this, this._layer, armlib, lib)
    }
    for(var i in this._processList) {
      this._processList[i]._begin()
    }
  }, begin:function(layer, armlib, lib) {
  }, _update:function() {
    if(lib.isSet(this.update)) {
      this.update.call(this, this._layer, armlib, lib)
    }
    for(var i in this._processList) {
      this._processList[i]._update()
    }
  }, update:function(layer, armlib, lib) {
  }, _onLoad:function() {
    this.loaded = true;
    if(lib.isSet(this.onLoad)) {
      this.onLoad.call(this, armlib, lib)
    }
  }, onLoad:function(armlib, lib) {
  }, onKeyPress:function(e) {
  }, onKeyDown:function(e) {
  }, onKeyUp:function(e) {
  }, onMouseClick:function(e) {
  }, onMouseMove:function(e) {
  }, onMouseDown:function(e) {
  }, onMouseUp:function(e) {
  }, onShow:function(layer, armlib) {
  }, onHide:function(layer, armlib) {
  }, _sortByZindex:function(A, low, high) {
    var i = low;
    var j = high;
    var x = A[Math.round((low + high) / 2)].zindex;
    do {
      while(A[i].zindex < x) {
        ++i
      }
      while(A[j].zindex > x) {
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
      this._sortByZindex(A, low, j)
    }
    if(i < high) {
      this._sortByZindex(A, i, high)
    }
    this._processList = A
  }, setFunc:function(name, func) {
    if(lib.isSet(name)) {
      this[name] = func
    }
    return this
  }, getFunc:function(O) {
  }, addToProcessList:function(O) {
    this._processList.push(O);
    this._sortByZindex(this._processList, 0, this._processList.length - 1)
  }, removeFromProcessList:function() {
  }, addLayer:function(O) {
    O.owner = this;
    this._list[O.name] = O;
    if(O.loaded && O.synch == false) {
      this.addToProcessList(O)
    }else {
      if(O.loaded && O.synch) {
        this._synchObjectsList[this.name] = O
      }else {
        this._numberSynchObjects++
      }
    }
    O._connected = true;
    return this
  }, removeLayer:function(O) {
  }}});
  window.armlib = new ArmLib({synch:true})
})(framework);
(function superObj(armlib, lib) {
  var superObj = lib.Class({Initialize:function(O, layer, armlib) {
  }, Statics:{name:1E3 * Math.random(), type:"", x:0, y:0, centralPoint:{x:0, y:0}, angle:0, scale:{x:1, y:1}, _context:null, _layer:null, owner:null, zindex:0, synch:true, loaded:false, _synchObjectsList:{}, _numberSynchObjects:0, _list:{}, _processList:[], _connected:false, _armlib:armlib, _lib:lib}, Methods:{_draw:function() {
    if(this._connected) {
      this._draw = function() {
        for(var i in this._processList) {
          this._processList[i]._draw.call(this._processList[i])
        }
        if(lib.isSet(this.draw)) {
          this.draw.call(this, this._context, this._layer, armlib, lib)
        }
      };
      this._draw()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }, draw:function(ctx, layer, armlib, lib) {
  }, _begin:function() {
    if(this._connected) {
      this._begin = function() {
        for(var i in this._processList) {
          this._processList[i]._begin()
        }
        if(lib.isSet(this.begin)) {
          this.begin.call(this, this._layer, armlib, lib)
        }
      };
      this._begin()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }, begin:function(layer, armlib, lib) {
  }, _update:function() {
    if(this._connected) {
      this._update = function() {
        for(var i in this._processList) {
          this._processList[i]._update()
        }
        if(lib.isSet(this.update)) {
          this.update.call(this, this._layer, armlib, lib)
        }
      };
      this._update()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }, update:function(layer, armlib, lib) {
  }, _onLoad:function() {
    if(this._connected) {
      this._onLoad = function() {
        if(this.owner._numberSynchObjects > 0) {
          this.owner._numberSynchObjects--;
          this.loaded = true;
          this.owner._synchObjectsList[this.name] = this;
          if(lib.isSet(this.onLoad)) {
            this.onLoad.call(this, armlib, lib)
          }
          if(this.owner._numberSynchObjects == 0) {
            for(var i in this.owner._synchObjectsList) {
              this.owner._synchObjectsList[i]._begin()
            }
            for(var i in this.owner._synchObjectsList) {
              this.owner.addToProcessList(this.owner._synchObjectsList[i])
            }
            this.owner._onLoad()
          }
        }
      };
      this._onLoad()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }, onLoad:function(armlib, lib) {
  }, onKeyPress:function(e) {
  }, onKeyDown:function(e) {
  }, onKeyUp:function(e) {
  }, onMouseClick:function(e) {
  }, onMouseMove:function(e) {
  }, onMouseDown:function(e) {
  }, onMouseUp:function(e) {
  }, onShow:function(layer, armlib) {
  }, onHide:function(layer, armlib) {
  }, _sortByZindex:function(A, low, high) {
    var i = low;
    var j = high;
    var x = A[Math.round((low + high) / 2)].zindex;
    do {
      while(A[i].zindex < x) {
        ++i
      }
      while(A[j].zindex > x) {
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
      this._sortByZindex(A, low, j)
    }
    if(i < high) {
      this._sortByZindex(A, i, high)
    }
    this._processList = A
  }, addToProcessList:function(O) {
    this._processList.push(O);
    this._sortByZindex(this._processList, 0, this._processList.length - 1)
  }, removeFromProcessList:function() {
  }, addChild:function(O) {
    if(this._connected) {
      this.addChild = function(O) {
        O.context = this._context;
        O.layer = this._layer;
        O.owner = this;
        this._list[O.name] = O;
        if(O.loaded && O.synch == false) {
          this.addToProcessList(O)
        }else {
          if(O.loaded && O.synch) {
            this._synchObjectsList[O.name] = O
          }else {
            this._numberSynchObjects++
          }
        }
        O._connected = true;
        return this
      };
      this.addChild(O);
      return this
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }, removeChild:function(O) {
  }, setFunc:function(name, func) {
    if(lib.isSet(name)) {
      this[name] = func
    }
    return this
  }, getFunc:function(O) {
  }, set context(O) {
    this._context = O;
    var list = this._processList;
    for(var i in list) {
      list[i].context = O
    }
  }, get context() {
    return this._context
  }, set layer(O) {
    this._layer = O;
    var list = this._processList;
    for(var i in list) {
      list[i].layer = O
    }
  }, get layer() {
    return this._layer
  }}});
  armlib._class.superObj = superObj
})(armlib, gizmo);
(function shape(armlib, lib) {
  var Shape = lib.Class({Extend:armlib._class.superObj, Statics:{centralPoint:{x:0, y:0}, angle:0, scale:{x:1, y:1}, fill:"#00FF00", stroke:"#00aa00", zindex:0}});
  armlib._class.Shape = Shape
})(armlib, gizmo);
(function object(armlib, lib) {
  var object = lib.Class({Extend:armlib._class.superObj, Initialize:function(O, layer, armlib) {
    this.name = O.name || this.name;
    this.zindex = O.zindex || this.zindex;
    this.synch = O.synch || this.synch;
    this.x = O.x || this.x;
    this.y = O.y || this.y;
    this.centralPoint = O.centralPoint || this.centralPoint;
    this.angle = O.angle || this.angle;
    this.scale = O.scale || this.scale;
    this.begin = O.begin || this.begin;
    this.update = O.update || this.update;
    this.draw = O.draw || this.draw;
    this.onLoad = O.onLoad || this.onLoad;
    return this
  }, Statics:{type:"Object", name:1E3 * Math.random()}, Methods:{_draw:function() {
    if(this._connected) {
      this._draw = function() {
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.x, this.y);
        this.context.translate(this.centralPoint.x, this.centralPoint.y);
        this.context.rotate(this.angle);
        this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
        this.context.scale(this.scale.x, this.scale.y);
        for(var i in this._processList) {
          this._processList[i]._draw.call(this._processList[i])
        }
        if(lib.isSet(this.draw)) {
          this.draw.call(this, this._context, this._layer, armlib, lib)
        }
        this.context.closePath();
        this.context.restore()
      };
      this._draw()
    }else {
      console.log("object with type " + this.type + " and name " + this.name + " have not owner")
    }
  }}});
  armlib.class.Object = object
})(armlib, gizmo);
(function Layer(armlib, lib) {
  var Layer = lib.Class({Extend:armlib._class.superObj, Initialize:function(O) {
    if(O.container) {
      var container = document.getElementById(O.container);
      var canvas = document.createElement("canvas");
      canvas.width = O.width;
      canvas.height = O.height;
      canvas.style.id = O.name;
      container.appendChild(canvas);
      this._context = canvas.getContext("2d");
      this.name = O.name;
      this._layer = this;
      this.owner = armlib
    }else {
      throw Error("The container is not found! Choose right id of container, please!");
    }
    this.synch = this.synch;
    this.onLoad = O.onLoad || this.onLoad;
    armlib.addLayer(this);
    return this
  }, Statics:{type:"Layer", width:500, height:500}, Methods:{}});
  armlib.class.Layer = Layer
})(armlib, gizmo);
(function Rect(armlib, lib) {
  var Rect = lib.Class({Extend:armlib._class.Shape, Initialize:function(O) {
    this.name = O.name || this.name;
    this.zindex = O.zindex || this.zindex;
    this.synch = O.synch || this.synch;
    this.x = O.x || this.x;
    this.y = O.y || this.y;
    this.centralPoint = O.centralPoint || this.centralPoint;
    this.width = O.width || this.width;
    this.height = O.height || this.height;
    this.angle = O.angle || this.angle;
    this.scale = O.scale || this.scale;
    this.fill = O.fill || this.fill;
    this.stroke = O.stroke || this.stroke;
    this.draw = O.draw || this.draw;
    return this
  }, Statics:{type:"Rect", loaded:true, width:null, height:null}, Methods:{_draw:function() {
    if(this._connected) {
      this._draw = function() {
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.centralPoint.x, this.centralPoint.y);
        this.context.rotate(this.angle);
        this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
        this.context.scale(this.scale.x, this.scale.y);
        this.context.rect(this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.fill;
        this.context.strokeStyle = this.stroke;
        if(lib.isSet(this.draw)) {
          this.draw.call(this, this._context, this._layer, armlib, lib)
        }
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        this.context.restore();
        if(lib.isSet(this.draw)) {
          this.draw.call(this, this._context, this._layer, armlib, lib)
        }
      };
      this._draw()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }}});
  armlib.class.Rect = Rect
})(armlib, gizmo);
(function image(armlib, lib) {
  var image = lib.Class({Extend:armlib._class.Shape, Initialize:function(O) {
    this.name = O.name || this.name;
    this.src = O.src || this.src;
    this.zindex = O.zindex || this.zindex;
    this.synch = O.synch || this.synch;
    this.x = O.x || this.x;
    this.y = O.y || this.y;
    this.centralPoint = O.centralPoint || this.centralPoint;
    this.width = O.width || this.width;
    this.height = O.height || this.height;
    this.angle = O.angle || this.angle;
    this.scale = O.scale || this.scale;
    this.fill = O.fill || this.fill;
    this.stroke = O.stroke || this.stroke;
    this.draw = O.draw || this.draw;
    this.onLoad = O.onLoad || this.onLoad;
    this.init();
    return this
  }, Statics:{type:"Image", loaded:false, width:null, height:null, src:null, image:new Image}, Methods:{init:function() {
    (function(self) {
      var image = self.image;
      image.src = self.src;
      image.onload = function() {
        self._onLoad()
      }
    })(this)
  }, _draw:function() {
    if(this._connected) {
      this._draw = function() {
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.centralPoint.x, this.centralPoint.y);
        this.context.rotate(this.angle);
        this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
        this.context.scale(this.scale.x, this.scale.y);
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.context.fillStyle = this.fill;
        this.context.strokeStyle = this.stroke;
        this.context.closePath();
        this.context.fill();
        this.context.stroke();
        this.context.restore();
        if(lib.isSet(this.draw)) {
          this.draw.call(this, this._context, this._layer, armlib, lib)
        }
      };
      this._draw()
    }else {
      throw Error("object with type " + this.type + " and name " + this.name + " have not owner");
    }
  }}});
  armlib.class.Image = image
})(armlib, gizmo);

