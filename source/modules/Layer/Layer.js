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
			if(O.fps) {this.fps = O.fps};
			this.width = O.width || this.width;
            this.height = O.height || this.height;
            
            this._setContainerName(armlib.container);
            var container = armlib.container;
            var canvas = document.createElement('canvas');
            canvas.width = O.width || this.width;
            canvas.height = O.height || this.height;
            canvas.id = this.name;
            canvas.style['zIndex'] = O.zindex || this._zindex;
            
            canvas.style.position = 'absolute';
            container.appendChild( canvas );
            this._canvas = canvas;
            this._context = canvas.getContext('2d');
        
			this._setLayer(this);
			this._setOwner(armlib);
			armlib._addLayer(this);

            this._init();

			return this;
        },

        Statics: {
            _type: ["Layer","",""],
            _name: 100*Math.random(),
           	_isRuning: false,

            _context: null,
            _layer: null,
            _owner: null,
            _container: null,
            _canvas: null,

            _width: 500,
            _height: 500,
			_fps: 0,
			_zindex: 0,
            
  			_updating: false,
			_changeList: [],
            _list: [], // List with child-objects

            _eventStack: new armlib._class.EventStack(),
			
            _onEachFrame: null,
            _cancelAnimationFrame: null,
            _request: null,
			_armlib: armlib,
            _lib: lib
        },

        Methods: {
  
            run: function() {
                this._begin();
                
                this.run = function() {
                    this.stop();
                    armlib.ListenMouseKeyboardEvents();

                    var step = (function(O) {
                        return function() {
                            O._clear();

                            O._update();
                            O._draw();                            
                        };
                    })(this);

                    step();
                    
                    this._onEachFrame(step);

                    this._setRunStatus(true);

                    return this;

                }

                this.run();

                return this;

            },
            
            stop: function() {
                if(this._request) {
                    armlib.NotListenMouseKeyboardEvents();
                    this._cancelAnimationFrame.call(window,this._request);
                }
            },

            addChild: function(O) { // add new child-object and sort drawList by z-index
                if(O.isLoaded) {
                    O._setContext(this._context);
                    O._setLayer(this._layer);
                    this._list.push(O);
                } else {
                    console.log("Object "+O.name+" don't loaded!");
                }
                
                return this;
            
            },
            removeChild: function(O) {

            },

            setFunc: function(name,func) {
                if(name && func) {
                    this['_'+name] = func;        
                }
                
                return this;
            },

            getFunc: function(O) {
                if(name && func) {
                    return this['_'+name];        
                }

            },

            _init: function() {
                var self = this;

                var _onEachFrame;
                if(this.fps != 0) {
                    var fps = this.fps;
                    _onEachFrame = function(cb) {
                        this._request = setInterval(cb, 1000 / fps);
                    }

                    this._cancelAnimationFrame = window.clearInterval;

                } else {
                    if (window.webkitRequestAnimationFrame) {
                    _onEachFrame = function(cb) {
                        var _cb = function() { 
                            cb(); 
                            self._request = webkitRequestAnimationFrame(_cb);
                        }
                        _cb();
                    };
                    } else if (window.mozRequestAnimationFrame) {
                        _onEachFrame = function(cb) {
                            var _cb = function() { 
                                cb();
                                self._request = mozRequestAnimationFrame(_cb);
                            }
                            _cb();
                        };
                    } else if (window.requestAnimationFrame) {
                        _onEachFrame = function(cb) {
                            var _cb = function() { 
                                cb();
                                self._request = requestAnimationFrame(_cb);
                            }
                            _cb();
                        };
                    } else if (window.msRequestAnimationFrame) {
                        _onEachFrame = function(cb) {
                            var _cb = function() { 
                                cb();
                                self._request = msRequestAnimationFrame(_cb);
                            }
                            _cb();
                        };
                    }

                    this._cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
                }

                this._onEachFrame = _onEachFrame;

                
                
            },

            _begin: function() {
                for(var i in this._list) {
                    this._list[i]._begin();
                }
                
            },
            _clear: function() {
                //for(var i=0;i<this._list.length;i++) {
                
                for(var i=this._list.length-1;i>=0;i--) {
                    this._list[i]._clear();
                }
                
            },
            _update: function() {
                this._doEvents();
                for(var i in this._list) {
                    this._list[i]._update();
                }             

            },
            _draw: function() {
                //b._context.clearRect(0,0,b.width,b.height);
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

            _setRunStatus: function(status) {
                this._isRuning = status;
            },
            getRunStatus: function() {
                return this._isRuning;
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

            _doEvents: function() {
                var event;
                while (event = this._eventStack.pop()) {
                    //console.log(event);
                    //console.log(this._name);
                    
                    switch(event.name) {
                        case "onKeyDown": this.__onKeyDown(event.e); break;
                        case "onKeyUp": this.__onKeyUp(event.e); break;
                        case "onKeyPress": this.__onKeyPress(event.e); break;
                        
                        case "onMouseMove": this.__onMouseMove(event.e); break;
                        case "onMouseDown": this.__onMouseDown(event.e); break;
                        case "onMouseUp": this.__onMouseUp(event.e); break;

                    }
                }
                    
            },

            // event from keyboard
            __onKeyDown: function(e) {
                if(this._onKeyDown) {
                    this._onKeyDown(e);
                }
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onKeyDown(e);    
	                }
            	}

            },

            __onKeyPress: function(e) {
                if(this._onKeyPress) {
                    this._onKeyPress(e);
                }
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onKeyPress(e);    
	                }
            	}
            },

            __onKeyUp: function(e) {
                if(this._onKeyUp) {
                    this._onKeyUp(e);
                }
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onKeyUp(e);    
	                }
            	}
            },

            // event form mouse
            __onMouseDown: function(e) {
                if(this._onMouseDown) {
                    this._onMouseDown(e);
                }
                if(this.getRunStatus()) {
	                for(var i in this._list) {
                        this._list[i].__onMouseDown(e);    
	                }
            	}

            },

            __onMouseUp: function(e) {
                if(this._onMouseUp) {
                    this._onMouseUp(e);
                }
                if(this.getRunStatus()) {
                    for(var i in this._list) {
                        this._list[i].__onMouseUp(e);    
                    }
                }

            },

            __onMouseMove: function(e) {
                if(this._onMouseMove) {
                    this._onMouseMove(e);
                }
                if(this.getRunStatus()) {
                    for(var i in this._list) {
                        this._list[i].__onMouseMove(e);    
                    }
                }

            },


            // Setters/Getters

            // name
            get name() {
                return this._name;
            },

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

                if(this.getRunStatus()) {            
                    this.stop();
                    this._init();
                    this.run();
                } else {
                    this._init();
                }
                
            },
            get fps() {
                return this._fps;
            },
                        
            // zindex
            set zindex(O) {
                this._zindex = O;
                this._canvas.style['z-index'] = O;
            },
            get zindex() {
                return this._zindex;
            },

        }
    });
    armlib.Layer = Layer;
})(armlib,gizmo);
