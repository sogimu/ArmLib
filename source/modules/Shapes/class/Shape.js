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
			primitive: true,
            fill: "#00FF00",
            stroke: "#00aa00",
			_oldX: 0,
			_oldY: 0,
			_oldWidth: 0,
			_oldHeight: 0,
			_oldLandscape: null

        },
		Methods: {
			_saveChanges: function() {
				var angelRad = this.angle;
				var m = this.centralPoint.x;
				var n = this.centralPoint.y;
				var MTrans = new gizmo.Matrix([
					[Math.cos(angelRad),Math.sin(angelRad),0],
					[-Math.sin(angelRad),Math.cos(angelRad),0],
					[-m*(Math.cos(angelRad)-1)+n*Math.sin(angelRad),-m*Math.sin(angelRad)-n*(Math.cos(angelRad)-1),1]
				]);
				
				mainPoint = (new gizmo.Matrix([[this.x,this.y,1],[this.x+this.width,this.y,1],[this.x+this.width,this.y+this.height,1],[this.x,this.y+this.height,1]])).x(MTrans).elements;
				
				var x = Math.min(mainPoint[0][0],mainPoint[1][0],mainPoint[2][0],mainPoint[3][0]);
				var y = Math.min(mainPoint[0][1],mainPoint[1][1],mainPoint[2][1],mainPoint[3][1]);
				var width = Math.max(mainPoint[0][0],mainPoint[1][0],mainPoint[2][0],mainPoint[3][0]);
				var height = Math.max(mainPoint[0][1],mainPoint[1][1],mainPoint[2][1],mainPoint[3][1]);
				this._oldX = x < 0?0:x;
				this._oldY = y < 0?0:y;
				this._oldWidth = this._oldX + (width <= 0?1:width);
				this._oldHeight = this._oldY + (height <= 0?1:height);

				this._oldLandscapes = this._context.getImageData(this._oldX,this._oldY,this._oldWidth,this._oldHeight);
			},

			_onClear: function() {
				this._saveChanges();
				
				this._onClear = function() {
					this._context.putImageData(this._oldLandscapes,this._oldX,this._oldY);
					this._saveChanges();
				}
				this._onClear();

			},
			

		}
    });
    armlib._class.Shape = Shape;
})(armlib,gizmo);
