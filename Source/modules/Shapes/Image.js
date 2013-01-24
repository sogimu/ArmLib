(function image(armlib,lib){
    /**
     * Описывает класс Layer. Данный класс описывает работу с отдельным обектом canvas как работу со "слоем" на
     * котором могут находиться объекты.
     *
     * @constructor
     * @param {object} O
     * @param {string} O.name      Имя слоя.
     * @param {string} O.container id DOM-элемента, являющегося хранилищем для слоя.
     * @param {number} O.width     Ширина слоя.
     * @param {number} O.height    Высота слоя.
     * @this {armlib.class.Layer}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var image = lib.Class({
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
            this.src = O.src;
            this.onLoad = O.onLoad;
            this.init();
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
					console.log('object with type '+this.type+' and name '+this.name+' have not owner');
				}
                            }
        }
    });
    armlib.class.Image = image;
})(armlib,gizmo);
