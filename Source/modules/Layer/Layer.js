(function Layer(armlib,lib){
	/**
	 * Описывает класс Layer. Данный класс описывает работу с отдельным обектом canvas как работу со "слоем" на
     * котором могут находиться объекты.
	 *
	 * @constructor
	 * @param {object} O
	 * @param {string} O.name      Имя объекта
     * @param {number} O.zindex    Положение слоя относительно других слоев. Чем больше - тем ближе к пользователю
     * @param {bool}   O.synch     Тип слоя, бывает синхронным и асинхронным, true или false, соответственно
	 * @param {string} O.container id DOM-элемента, являющегося хранилищем для слоя
	 * @param {number} O.width     Ширина слоя
	 * @param {number} O.height    Высота слоя
	 * @param {number} O.zindex    
	 * @this {armlib.class.Layer}
	 * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
	 * @version 0.1
	 */

	var Layer = lib.Class({
        Extend: armlib._class.superObj,
        Initialize: function(O) {
			this.name = O.name || this.name;
			this.fps = O.fps || this.fps;
			if( O.container ) {
                var container = document.getElementById(O.container);
                var canvas = document.createElement('canvas');
                canvas.width = O.width || this.width;
                canvas.height = O.height || this.height;
                canvas.id = this.name;
                canvas.style['z-index'] = O.zindex || this.zindex;
                canvas.style.position = 'absolute';
                container.appendChild( canvas );
                this._context = canvas.getContext('2d');
            } else {
                throw Error('The container is not found! Choose right id of container, please!');
            }
			this._layer = this;
			this.owner = armlib;
			this.synch = lib.isSet(O.synch)?O.synch:this.synch;
			this.onLoad = O.onLoad || this.onLoad;
			armlib.addLayer(this);
			return this;
        },
        Statics: {
            type: 'Layer',
			fps: 60,
            width: 500,
            height: 500
        },
        Methods: {
			Load: function() {
				for(var i in this._list) {
					this._list[i]._load();
				}
			},
			run: function() {
				(function(O) {
					var onEachFrame;
					if (window.webkitRequestAnimationFrame) {
						onEachFrame = function(cb) {
							var _cb = function() { cb(); webkitRequestAnimationFrame(_cb); }
							_cb();
						};
					} else if (window.mozRequestAnimationFrame) {
						onEachFrame = function(cb) {
							var _cb = function() { cb(); mozRequestAnimationFrame(_cb); }
							_cb();
						};
					} else if (window.requestAnimationFrame) {
						onEachFrame = function(cb) {
							var _cb = function() { cb(); requestAnimationFrame(_cb); }
							_cb();
						};
					} else if (window.msRequestAnimationFrame) {
						onEachFrame = function(cb) {
							var _cb = function() { cb(); msRequestAnimationFrame(_cb); }
							_cb();
						};
					} else {
						var fps = O.fps;
						onEachFrame = function(cb) {
							setInterval(cb, 1000 / fps);
						}
					}

					window.onEachFrame = onEachFrame;
				})(this);
				
				var step = (function(O) {
					var loops = 0, skipTicks = 1000 / O.fps,
						maxFrameSkip = 10,
						nextGameTick = (new Date).getTime();

					return function() {
						loops = 0;

						while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
							O._onUpdate();
							nextGameTick += skipTicks;
							loops++;
						}
						O._onClear();
						O._onDraw();
					};
				})(this);
				
				window.onEachFrame(step);
				this.run = function() {
					return this;
				}
				return this;
			},
			stop: function() {
				
			}
        }
    });
    armlib.class.Layer = Layer;
})(armlib,gizmo);
