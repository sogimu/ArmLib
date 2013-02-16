(function shape(armlib,lib){
    /**
     * Описывает вспомогательный класс Shape. Данный класс содержит основные методы и свойства всех примитивов
     *
     * @constructor
     * @this {armlib._class.Shape}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Shape = lib.Class({
        Extend: armlib._class.superObj,
        Statics: {
            centralPoint: {x:0,y:0},
            angle: 0,
            scale: {x:1,y:1},
            fill: "#00FF00",
            stroke: "#00aa00",
            zindex: 0,
			_oldX: 0,
			_oldY: 0,
			_oldWidth: 10,
			_oldHeight: 10,
			_oldLandscape: null

        },
		Methods: {
			_saveChanges: function() {
				this._oldX = this.x;
				this._oldY = this.y;
				this._oldWidth = this.width;
				this._oldHeight = this.height;
				this._oldLandscapes = this._context.getImageData(this.x,this.y,this.width,this.height);
			},
			_onClear: function() {
				this._saveChanges();
				this._onClear = function() {
					this._context.putImageData(this._oldLandscapes,this._oldX,this._oldY);
					this._saveChanges();
				}
				this._onClear();

			}

		}
    });
    armlib._class.Shape = Shape;
})(armlib,gizmo);
