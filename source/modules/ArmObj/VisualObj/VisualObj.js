(function visualObj(armlib,lib){
    /**
     * Описывает суперкласс.
     *
     * @this {armlib._class.superObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var VisualObj = lib.Class({
        Extend: armlib._class.ArmObj,
        Initialize: function(O, layer, armlib) {},
        Statics: {
            _type: ['ArmObject','VisualObj'],
            
            _context: null,
            _layer: null,
                        
            _x: 0,
            _y: 0,
            _width: 10,
            _height: 10,
            _angle: 0,
            _centralPoint: {x:1,y:1},
            _scale: {x:1,y:1},
            _zindex: 0,

            _transformMatrix: [],
            _paramsTransformMatrix: [],

            _haveChanges: true,
            
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
        
            haveLayer: function() {
                if(this._layer) {
                    return true;
                } else {
                    return false;
                }
            },

            haveChanges: function() {
                return this._haveChanges;
            },

            setHaveNotChanges: function() {
                this._haveChanges = false;
            },

            setHaveChanges: function() {
                this._haveChanges = true;
            },

            _clear: function() {
                /* virtual */
                console.log("virtual function");

            },
            
            _begin: function() {
                /* virtual */
                console.log("virtual function");

            },

            _draw: function() {
                /* virtual */
                console.log("virtual function");

            },
            
            
            _updateTransformMatrix: function() {
                
                var angelRad = this.angle;
                var m = this.centralPoint.x;
                var n = this.centralPoint.y;

                var a = Math.cos(angelRad);
                var b = Math.sin(angelRad);
                var c = -b;
                var d = a;
                var f = (-m * (a-1)) + (n * b);
                var e = (-m * b) - (n * (a-1));

                this._paramsTransformMatrix = {a: a, b: b, c: c, d: d, e: e, f: f};

                var MTrans = new gizmo.Matrix([
                    [a,c,0],
                    [b,d,0],
                    [e,f,1]
                ]);

                this._transformMatrix = MTrans;

            },

            _setContext: function(context) {
                this._context = context;
            },

            _setLayer: function(layer) {
                this._layer = layer;
            },
            
            // Setters/Getters

            // x
            set x(O) {
                this._x = O;
                this._haveChanges = true;
            },
            get x() {
                return this._x;
            },
            
            // y
            set y(O) {
                this._y = O;
                this._haveChanges = true;
            },
            get y() {
                return this._y;
            },
            
            // width
            set width(O) {
                this._width = O;
                this._haveChanges = true;
            },
            get width() {
                return this._width;
            },
            
            // height
            set height(O) {
                this._height = O;
                this._haveChanges = true;
            },
            get height() {
                return this._height;
            },
            
            // angle
            set angle(angle) {
                var twoPI = Math.PI*2;
                if(angle > twoPI) {
                    this._angle = twoPI%twoPI;
                } else {
                    this._angle = angle;
                }
                this._haveChanges = true;
            },
            get angle() {
                return this._angle;
            },

            // centralPoint
            set centralPoint(O) {
                this._centralPoint = O;
                this._haveChanges = true;
            },
            get centralPoint() {
                return this._centralPoint;
            },
            
            // scale
            set scale(O) {
                this._scale = O;
                this._haveChanges = true;
            },
            get scale() {
                return this._scale;
            },
            
            // zindex
            set zindex(O) {
                this._zindex = O;
                if(this.haveOwner()) {
                    this.owner._sortByZindex();
                }
                this._haveChanges = true;
            },

            // context
            get context() {
                return this._context;
            },

            // layer
            get layer() {
                return this._layer;
            },

            get TransformMatrix() {
                return this._transformMatrix;

            },

            get ParamsTransformMatrix() {
                return this._paramsTransformMatrix;

            },

        }
    });

    armlib._class.VisualObj = VisualObj;

}(armlib,gizmo));