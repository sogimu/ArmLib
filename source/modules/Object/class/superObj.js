(function superObj(armlib,lib){
    /**
     * Описывает суперкласс.
     *
     * @this {armlib._class.superObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var superObj = lib.Class({
        Initialize: function(O, layer, armlib) {},
        Statics: {
            name: 1000*Math.random(),
            loaded: false, // Flag which show load-state of object

            _context: null,
            _layer: null,
            _owner: null,

            _x: 0,
            _y: 0,
            _width: 10,
            _height: 10,
            _angle: 0,
            _centralPoint: {x:0,y:0},
            _scale: {x:1,y:1},
            _zindex: 0,
			
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
			Load: function() {
				this._load.call(this);
				return this;
				
			},
			_load: function() {
				for(var i in this._list) {
					this._list[i]._load();
				}
			},

            _onLoad: function() {
				if(lib.isSet(this.onLoad)) { this.onLoad.call(this, this._layer, armlib,lib);}

				if(lib.isSet(this.owner)) {					
					this.owner._numberObjects--;
					if(this.owner._numberObjects == 0) {
						this.owner._onLoad();								
					}
				}
				
            },
			
            onLoad: function(armlib, lib) {}, // Function for event load ending

            onKeyPress: function(e) {}, // Function for event of keyboard
            onKeyDown: function(e) {},
            onKeyUp: function(e) {},
            onMouseClick: function(e) {}, // Functions for event of mouse
            onMouseMove: function(e) {},
            onMouseDown: function(e) {},
            onMouseUp: function(e) {},
            onShow: function(layer, armlib) {}, // Function for showing and hiding event
            onHide: function(layer, armlib) {},
            
			setFunc: function(name,func) {
				if(lib.isSet(name)) {
					this[name] = func;
				}
				return this;
			},
			getFunc: function(O) {
			},

            // Setters/Getters

            set x(O) {
                this._x = O;
            },
            get x() {
                return this._x;
            },
            
            set y(O) {
                this._y = O;
            },
            get y() {
                return this._y;
            },

            set width(O) {
                this._width = O;
            },
            get width() {
                return this._width;
            },

            set height(O) {
                this._height = O;
            },
            get height() {
                return this._height;
            },

            set centralPoint(O) {
                this._centralPoint = O;
            },
            get centralPoint() {
                return this._centralPoint;
            },

            set scale(O) {
                this._scale = O;
            },
            get scale() {
                return this._scale;
            },

            set zindex(O) {
                this._zindex = O;
                if(this.owner) {
                    this.owner._sortByZindex();
                }
            },
            get zindex() {
                return this._zindex;
            },


            set context(O) {
                this._context = O;
                var list = this._list;
                for(var i in list) {
                    list[i].context = O;
                }
            },
            get context() {
                return this._context;
            },

            set layer(O) {
                this._layer = O;
                var list = this._list;
                for(var i in list) {
                    list[i].layer = O;
                }
            },
            get layer() {
                return this._layer;
            }


        }
    });

    armlib._class.superObj = superObj;

}(armlib,gizmo));
