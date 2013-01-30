(function object(armlib,lib){
    /**
     * Описывает класс минимального объекта.
     *
     * @this {armlib.class.Object}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var object = lib.Class({
        Extend: armlib._class.superObj,
        Initialize: function(O, layer, armlib) {
            this.name = O.name || this.name;
            this.zindex = O.zindex || this.zindex;
            this.synch = O.synch || this.synch;
            this.x = O.x || this.x;
            this.y = O.y || this.y;
            this.centralPoint = O.centralPoint || this.centralPoint;
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
            this.begin = O.begin || this.begin;
            this.update = O.update || this.update;
            this.draw = O.draw || this.draw;
            this.onLoad = O.onLoad || this.onLoad;
			return this;
        },
        Statics: {
            type: 'Object',
            name: 1000*Math.random()
        },
        Methods: { // Call-back functions of ArmLib object
			_draw: function() {
				if(this._connected) {
					this._draw = function() {
						this.context.save();
							this.context.beginPath();
								this.context.translate(this.x, this.y);
								this.context.translate(this.centralPoint.x, this.centralPoint.y);
								this.context.rotate(this.angle);
								this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
								this.context.scale(this.scale.x, this.scale.y);								
									for(var i in this._processList) {
										this._processList[i]._draw.call(this._processList[i]);
									}
									if(lib.isSet(this.draw)) {this.draw.call(this, this._context, this._layer,armlib,lib)};
							this.context.closePath();
						this.context.restore();						
					}
					this._draw();
				} else {
					console.log('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            }
        }
    });

    armlib.class.Object = object;

}(armlib,gizmo));
