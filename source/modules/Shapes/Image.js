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
            this.synch = lib.isSet(O.synch)?O.synch:this.synch;
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.centralPoint = O.centralPoint || this.centralPoint;
            this.width = O.width || this.width;
            this.height = O.height || this.height
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
            this.fill = O.fill || this.fill;
            this.stroke = O.stroke || this.stroke;
			return this;
        },
        Statics: {
            type: 'Image',
			loaded: false,
            src: null,
            image: null,
        },
        Methods: {
			_load: function() {
				this.image = new Image();
				this.image.src = this.src;
				var self = this;
				this.image.onload = function() {
					self._onLoad();
				};
				return this;
			},
            _onDraw: function() {
				if(this._connected) {
					this._onDraw = function() {
							
						this._context.save();
							
							this._context.beginPath();
								if(this.preDraw) {this.preDraw(this._context, this._layer,armlib,lib)};
								this._context.fillStyle = this.fill;
								this._context.strokeStyle = this.stroke;
								
								this._context.translate(this.centralPoint.x, this.centralPoint.y);
								this._context.rotate(this.angle);
								this._context.translate(-this.centralPoint.x, -this.centralPoint.y);
								this._context.scale(this.scale.x, this.scale.y);
								//this._onClear();
								this._context.drawImage(this.image, this.x,this.y,this.width,this.height);
								
								if(this.onDraw) {this.onDraw(this._context, this._layer,armlib,lib)};
							this._context.closePath();
							//this._context.fill();
							//this._context.stroke();
						this._context.restore();
					}
					this._onDraw();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}
            }
        }
    });
    armlib.class.Image = image;
})(armlib,gizmo);