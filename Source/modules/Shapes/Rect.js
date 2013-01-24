(function Rect(armlib,lib){
    /**
     * Описывает класс Rect. Данный класс описывает объект "прямоугольник".
	 *
     * @constructor
     * @param {object} O
     * @param {string} O.name          Имя прямоугольника
     * @param {number} O.zindex        z-индекс объекта относительно объекта родителя
     * @param {bool} O.synch         Тип обекта, бывает синхронным и асинхронным
     * @param {number} O.x             X
     * @param {number} O.y		       Y
     * @param {number} O.width         Ширина прямоугольника
     * @param {number} O.height        Высота прямоугольника
     * @param {object} O.centralPoint  Точка вокруг которой происходит поворот
     * @param {number} O.angle         Угол поворота
     * @param {object} O.scale         Масштабирование по x и y ({x: 2, y: 3})
     * @param {string} O.fill          Цвет закраски
     * @param {string} O.stroke        Цвет линии
     * @this {armlib.class.Rect}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Rect = lib.Class({
        Extend: armlib._class.Shape,
        Initialize: function(O) {
            this.name = O.name;
            this.zindex = O.zindex;
            this.synch = O.synch;
            this.x = O.x;
            this.y = O.y;
            this.width = O.width;
            this.height = O.height;
            this.centralPoint = O.centralPoint,
            this.angle = O.angle,
            this.scale = O.scale,
            this.fill = O.fill;
            this.stroke = O.stroke;
            this.onLoad = O.onLoad;
        },
        Statics: {
            type: 'Rect',
			loaded: true,
			width: null,
            height: null,
        },
        Methods: {
            _draw: function() {
				if(this._connected) {
					this._draw = function() {
						this.context.save();
							this.context.beginPath();
								this.context.translate(this.centralPoint.x, this.centralPoint.y);
								this.context.rotate(this.angle);
								this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
								this.context.scale(this.scale.x, this.scale.y);
								this.context.rect(this.x,this.y,this.width,this.height);
											this.context.clearRect(this.x,this.y,25,25);

								this.context.fillStyle = this.fill;
								this.context.strokeStyle = this.stroke;
								if(lib.isSet(this.draw)) {this.draw.call(this, this._context, this._layer,armlib,lib)};
							this.context.closePath();
							this.context.fill();
							this.context.stroke();
							
						this.context.restore();
						//if(lib.isSet(this.draw)) {this.draw.call(this, this._context, this._layer,armlib,lib)};
					}
					this._draw();
				} else {
					console.log('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            }

        }
    });
    armlib.class.Rect = Rect;
})(armlib,gizmo);
