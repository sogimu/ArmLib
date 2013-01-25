(function image(armlib,lib){
    /**
     * Описывает класс Image. Данный класс описывает объект "изображение".
	 *
     * @constructor
     * @param {object} O
     * @param {string} O.name          Имя объекта
     * @param {number} O.zindex        z-индекс объекта относительно объекта родителя
     * @param {bool}   O.synch         Тип обекта, бывает синхронным и асинхронным, true или false, соответственно
     * @param {number} O.x             X
     * @param {number} O.y		       Y
     * @param {number} O.width         Ширина изображения
     * @param {number} O.height        Высота изображения
     * @param {object} O.centralPoint  Точка вокруг которой происходит поворот
     * @param {number} O.angle         Угол поворота
     * @param {object} O.scale         Масштабирование по x и y. Например: {x: 2, y: 3}
     * @param {string} O.fill          Цвет закраски, может быть как цветом ("#FFaa00"), так и градиентом
     * @param {string} O.stroke        Цвет линии, может быть как цветом ("#FFaa00"), так и градиентом
     * @this {armlib.class.Image}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var image = lib.Class({
        Extend: armlib._class.Shape,
        Initialize: function(O) {
			this.name = O.name || this.name;
            this.src = O.src || this.src;
			this.zindex = O.zindex || this.zindex;
            this.synch = O.synch || this.synch;
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.centralPoint = O.centralPoint || this.centralPoint;
            this.width = O.width || this.width;
            this.height = O.height || this.height
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
            this.fill = O.fill || this.fill;
            this.stroke = O.stroke || this.stroke;
			this.draw = O.draw || this.draw;
			this.onLoad = O.onLoad || this.onLoad;
            this.init();
			return this;
        },
        Statics: {
            type: 'Image',
			loaded: false,
            width: null,
            height: null,
            src: null,
            image: new Image()
        },
        Methods: {
            init: function() {
                (function(self) {
                    var image = self.image;
                    image.src = self.src;
                    image.onload = function() {
						self._onLoad();
					};
                })(this);
            },
            _draw: function() {
				if(this._connected) {
					this._draw = function() {
						this.context.save();
							this.context.beginPath();
								this.context.translate(this.centralPoint.x, this.centralPoint.y);
								this.context.rotate(this.angle);
								this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
								this.context.scale(this.scale.x, this.scale.y);
								this.context.drawImage(this.image, this.x,this.y,this.width,this.height);
								this.context.fillStyle = this.fill;
								this.context.strokeStyle = this.stroke;
							this.context.closePath();
							this.context.fill();
							this.context.stroke();
						this.context.restore();
						if(lib.isSet(this.draw)) {this.draw.call(this, this._context, this._layer,armlib,lib)};

					}
					this._draw();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}
                            }
        }
    });
    armlib.class.Image = image;
})(armlib,gizmo);
