(function layer(armlib,lib){
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
        Initialize: function(O) {
			this._setName(O.name || this.name);
			this.fps = O.fps || this.fps;
			if( O.container ) {
				this._setContainerName(O.container);
                var container = document.getElementById(O.container);
                var canvas = document.createElement('canvas');
                canvas.width = O.width || this.width;
                canvas.height = O.height || this.height;
                canvas.id = this.name;
                canvas.style['z-index'] = O.zindex || this._zindex;
                canvas.style.position = 'absolute';
                container.appendChild( canvas );
                this._context = canvas.getContext('2d');
            } else {
                throw Error('The container is not found! Choose right id of container, please!');
            }
			this._setLayer(this);
			this._setOwner(armlib);
			armlib._addLayer(this);
			return this;
        },
        Statics: {
            _type: ['Layer',''],
            _name: 1000*Math.random(),
           	_runStatus: false,

            _context: null,
            _layer: null,
            _owner: null,
            _container: null,

            _width: 500,
            _height: 500,
			_fps: 60,
			_zindex: 0,
            
  			_updating: false,
			_changeList: [],
            _list: [], // List with child-objects
			
			_armlib: armlib,
            _lib: lib
        },
        Methods: {
			
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

				this._begin();

				var step = (function(O) {
					var loops = 0, skipTicks = 1000 / O.fps,
						maxFrameSkip = 10,
						nextGameTick = (new Date).getTime();

					return function() {
						loops = 0;

						while ((new Date).getTime() > nextGameTick && loops < maxFrameSkip) {
							O._update();
							nextGameTick += skipTicks;
							loops++;
						}

						O._clear();
						O._draw();
					};
				})(this);
				
				window.onEachFrame(step);

				this._runStatus = true;
				
				this.run = function() {
					return this;
				}
				return this;
			},
			stop: function() {
				
			},

            addChild: function(O) { // add new child-object and let sort drawList by z-index
                O._setContext(this._context);
                O._setLayer(this._layer);
                O._setOwner(this);
                this._list.push(O);
                
                return this;
            
            },
            removeChild: function(O) {

            },

            // will delete
            _addChangedObj: function(O) {
                if(this.updating) {
                    //this._changeList[O.id] = 'obj';
                }
            },

            _begin: function() {
                for(var i in this._list) {
                    this._list[i]._begin();
                }{a: 1}
                
            },
            _clear: function() {
                for(var i in this._list) {
                    this._list[i]._clear();
                }
                
            },
            _update: function() {
                this._updating = true;
                for(var i in this._list) {
                    this._list[i]._update();
                }
                this._updating = false;             

            },
            _draw: function() {
                for(var i in this._list) {
                    this._list[i]._draw();
                }
                
            },

            _setType: function(type) {
                this._type = type;
            },
            getType: function() {
                return this._type;
            },

            _setName: function(name) {
                this._name = name;
            },
            getName: function() {
                return this._name;
            },

            _setRunStatus: function(status) {
                this._runStatus = status;
            },
            getRunStatus: function() {
                return this._runStatus;
            },

            _setContext: function(context) {
                this._context = context;
            },
            getContext: function() {
                return this._context;
            },

            _setLayer: function(layer) {
                this._layer = layer;
            },
            getLayer: function() {
                return this._layer;
            },

            _setOwner: function(object) {
                this._owner = object;
            },
            _getOwner: function() {
                return this._owner;
            },
            
            _setContainerName: function(name) {
            	this._container = name;
            },
            _getContainerName: function() {
            	return this._container;
            },

            // event from keyboard
            _onKeyDown: function(e) {
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onKeyDown(e);    
	                }
            	}

            },

            _onKeyPress: function(e) {
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onKeyPress(e);    
	                }
            	}
            },

            _onKeyUp: function(e) {
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onKeyUp(e);    
	                }
            	}
            },
            // event form mouse
            _onMouseDown: function(e) {
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onMouseDown(e);    
	                }
            	}

            },

            _listenMouseEvents: function() {
            	var container = document.getElementById(this._getContainerName());
            	var self = this;
            	container.onmousedown = function(e) {self._onMouseDown(e)};
            },
            _notListenMouseEvents: function() {

            },

            // Setters/Getters

            // width
            set width(O) {
                this._width = O;
            },
            get width() {
                return this._width;
            },
            
            // height
            set height(O) {
                this._height = O;
            },
            get height() {
                return this._height;
            },

            // fps
            set fps(O) {
                this._fps = O;
            },
            get fps() {
                return this._fps;
            },
                        
            // zindex
            set zindex(O) {
                this._zindex = O;
            },
            get zindex() {
                return this._zindex;
            },

        }
    });
    armlib.Layer = Layer;
})(ArmLib,gizmo);
