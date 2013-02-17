(function armObj(armlib,lib){
    /**
     * Описывает общие свойства и методы объект движка (Объект-контейнер(Object) и примитивы(Shape)).
     *
     * @this {armlib._class.armObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var armObj = lib.Class({
		Extend: armlib._class.superObj,
        Initialize: function(O, layer, armlib) {},
        Statics: {
			_angle: 0,
			centralPoint: {x:'0',y:'0'},
			scale: {x:1,y:1},
            
        },
        Methods: { // Call-back functions of ArmLib object
			_addChangedObj: function() {
				if(this._connected) 
				this._layer._addChangedObj(this.id);

			},
            set zindex(O) {
				this._zindex = O;
				this._addChangedObj();
			},
			get zindex() {
				return this._zindex;

			},
            set x(O) {
				this._x = O;
				this._addChangedObj();
				
			},
			get x() {
				return this._x;
			},
            set y(O) {
				this._y = O;
				this._addChangedObj();
				
			},
			get y(O) {
				return this._y;
			},
            // set centralPoint(O) {
				// this._centralPoint = O;
			// },
            set angle(O) {
				this._angle = O;
				this._addChangedObj();

			},
			get angle() {
				return this._angle;
			},
            // set scale(O) {
				// this._scale = O;
			// },
			// set src(O) {
				// this._src = O;
			// },
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
            // set fill(O) {
				// this._width = O;
			// },
            // set stroke(O) {
				// this._height = O;
			// },
			

        }
    });

    armlib._class.armObj = armObj;

}(armlib,gizmo));
