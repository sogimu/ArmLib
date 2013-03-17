(function superObj(armlib,lib){
    /**
     * Описывает суперкласс.
     *
     * @this {armlib._class.superObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var ArmObj = lib.Class({
        Initialize: function(O, layer, armlib) {},
        Statics: {
            _type: ['ArmObject',''],
            _name: 1000*Math.random(),
            _loaded: false, // Flag which show load-state of object 

            _context: null,
            _layer: null,
            _owner: null,

            _x: 0,
            _y: 0,
            _width: 10,
            _height: 10,
            _angle: 0,
            _centralPoint: {x:1,y:1},
            _scale: {x:1,y:1},
            _zindex: 0,
			
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
			
            _begin: function() { /* virtual */},
            _clear: function() { /* virtual */ },
            _update: function() { /* virtual */},
            _draw: function() { /* virtual */ },

            Load: function() {
                this._load();
            },

            _load: function() {
                for(var i in this._list) {
                    this._list[i]._load();
                }
            },

            __onLoad: function() {
				if(this._onLoad) { this._onLoad.call(this, this._layer, armlib,lib);}

				if(this.haveOwner()) {					
					this._getOwner()._loadedChild();
				}
				
            },
            _onLoad: function(armlib, lib) {}, // Function for event load ending

            _onKeyPress: function(e) {}, // Function for event of keyboard
            _onKeyDown: function(e) {},
            _onKeyUp: function(e) {},
            _onMouseClick: function(e) {}, // Functions for event of mouse
            _onMouseMove: function(e) {},
            _onMouseDown: function(e) {},
            _onMouseUp: function(e) {},
            _onShow: function(layer, armlib) {}, // Function for showing and hiding event
            _onHide: function(layer, armlib) {},
            
			setFunc: function(name,func) {
				if(name && func) {
					this['_'+name] = func;
				}
                switch(name) {
                    case "onKeyDown": armlib._addObjforOnKeyDownEvent(this); 
                    case "onKeyPress": armlib._addObjforOnKeyPressEvent(this); 
                    case "onKeyUp": armlib._addObjforOnKeyUpEvent(this); 
                }
				return this;
			},
			getFunc: function(O) {
			},

            haveOwner: function() {
                if(this._owner) {
                    return true;
                } else {
                    return false;
                }
            },

            _setType: function(type) {
                this._type = type;
            },
            getType: function() {
                return this._type;
            },

            setName: function(name) {
                this._name = name;
            },
            getName: function() {
                return this._name;
            },

            _setLoaded: function() {
                this._loaded = true;
            },
            _setUnloaded: function() {
                this._loaded = false;
            },

            _setContext: function(context) {
                this._context = context;
            },
            getContext: function() {
                return this._context;
            },

            _setLayer: function(layer) {
                this._layer = layer;
            },
            getLayer: function() {
                return this._layer;
            },
            _setOwner: function(object) {
                this._owner = object;
            },
            _getOwner: function() {
                return this._owner;
            },

            // Setters/Getters

            // x
            set x(O) {
                this._x = O;
            },
            get x() {
                return this._x;
            },
            
            // y
            set y(O) {
                this._y = O;
            },
            get y() {
                return this._y;
            },
            
            // width
            set width(O) {
                this._width = O;
            },
            get width() {
                return this._width;
            },
            
            // height
            set height(O) {
                this._height = O;
            },
            get height() {
                return this._height;
            },
            
            // angle
            set angle(O) {
                this._angle = O;
            },
            get angle() {
                return this._angle;
            },

            // centralPoint
            set centralPoint(O) {
                this._centralPoint = O;
            },
            get centralPoint() {
                return this._centralPoint;
            },
            
            // scale
            set scale(O) {
                this._scale = O;
            },
            get scale() {
                return this._scale;
            },
            
            // zindex
            set zindex(O) {
                this._zindex = O;
                if(this.haveOwner()) {
                    this._getOwner()._sortByZindex();
                }
            },
            get zindex() {
                return this._zindex;
            },

        }
    });

    armlib._class.ArmObj = ArmObj;

}(ArmLib,gizmo));
