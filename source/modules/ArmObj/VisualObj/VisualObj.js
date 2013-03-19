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
            
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
            
            _clear: function() { /* virtual */ },
            _draw: function() { /* virtual */ },

           haveLayer: function() {
                if(this._layer) {
                    return true;
                } else {
                    return false;
                }
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

            _setDisplayCoordinates: function(coordinates) {
                this._displayCoordinates = coordinates;
            },
            _getDisplayCoordinates: function() {
                return this._displayCoordinates;
            },

            _setPrevRawCoordinates: function(coordinates) {
                this._rawCoordinates.prev = coordinates;
            },
            _getPrevRawCoordinates: function() {
                return this._rawCoordinates.prev;
            },

            _setCurrentRawCoordinates: function(coordinates) {
                this._rawCoordinates.current = coordinates;
            },
            _getCurrentRawCoordinates: function() {
                return this._rawCoordinates.current;
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

    armlib._class.VisualObj = VisualObj;

}(ArmLib,gizmo));
