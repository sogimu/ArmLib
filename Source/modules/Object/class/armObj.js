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
			
        },
        Methods: { // Call-back functions of ArmLib object
			// set name(O) {
				// this._name = O;
			// },
            // set zindex(O) {
				// this._zindex = O;
			// },
            set x(O) {
				this._x = O;
			},
			get x() {
				return this._x;
			},
            set y(O) {
				this._y = O
			},
			get y(O) {
				return this._y;
			},
            // set centralPoint(O) {
				// this._centralPoint = O;
			// },
            // set angle(O) {
				// this._angle = O;
			// },
            // set scale(O) {
				// this._scale = O;
			// },
			// set src(O) {
				// this._src = O;
			// },
			// set width(O) {
				// this._width = O;
			// },
            // set height(O) {
				// this._height = O;
			// },
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
