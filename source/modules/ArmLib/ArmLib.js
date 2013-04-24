(function ArmLib(lib){
    /**
     * Создает экземпляр ArmLib и сохраняет ссылку на него в глобальной перменной ArmLib.
     *
     * @constructor
     * @param {object} O
     * @this {ArmLib}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var ArmLib = lib.Class({
        Initialize: function() {
			return this;
        },
        Statics: {
            _type: ['ArmLib','ArmLib'],
            _name: 'ArmLib',

            _list: [], // List with Layer-objects
            
            _class: {},

            _armlib: this,
            _lib: lib,
        },
        Methods: {

            bindWithTag: function(O) {
                if(O.container) {
                    var tag = document.getElementById("container");
                    
                    if(tag) {
                        this._container = tag;
                    
                    } else {
                        throw Error("have't use tag with id = "+O.container+"!");
                        createContainer();
                    
                    }
                } else {
                    createContainer();
                }

                function createContainer() {
                    try {
                        var container = document.createElement('div');
                        container.id = "ArmLibContainer";
                        document.body.appendChild( container);

                        this._container = container;
                    }
                    catch(e) {
                        throw Error("Error with creating container!");
                    }
                }
            },
	
            run: function() {
                this.ListenMouseKeyboardEvents();
                
                for(var i in this._list) {
                    this._list[i].run();
                    
                }
                return this;
            },
            stop: function() {
                this.NotListenMouseKeyboardEvents();

                for(var i in this._list) {
                    this._list[i].stop();
                    
                }
                return this;
            },

            _addLayer: function(O) { // add new child-object and let sort drawList by z-index
                O._setOwner(this);
                this._list.push(O);
                
                return this;

            },
            
            _removeLayer: function(O) {

            },


            _listenKeybordEvents: function() {
                var self = this;
                window.onkeydown = function(e) {self.__onKeyDown(e)};
                window.onkeypress = function(e) {self.__onKeyPress(e)};
                window.onkeyup = function(e) {self.__onKeyUp(e)};
                 
            },
            _notListenKeybordEvents: function() {
                var self = this;
                window.onkeydown = null;
                window.onkeypress = null;
                window.onkeyup = null; 
                
            },

            _listenMouseEvents: function() {
                var self = this;
                this.container.onmousedown = function(e) {
                    self.__onMouseDown(e)
                };
                this.container.onmouseup = function(e) {self.__onMouseUp(e)};
                this.container.onmousemove = function(e) {self.__onMouseMove(e)};

            },
            _notListenMouseEvents: function() {
                this.container.onmousedown = null;
                this.container.onmouseup = null;
                this.container.onmousemove = null;

            },

            ListenMouseKeyboardEvents: function() {
                this._listenKeybordEvents();
                this._listenMouseEvents();

            },
            NotListenMouseKeyboardEvents: function() {
                this._notListenKeybordEvents();
                this._notListenMouseEvents();

            },


            _sendEvent: function(event) {
                for(var i in this._list) {
                    if(this._list[i].getRunStatus()) {
                        this._list[i]._eventStack.push(event);
                    }
                }
            },
            
            __onKeyDown: function(e) {
                var event = {name:"onKeyDown", type:"keyboard", e: e};
                this._sendEvent(event);

            },
            __onKeyPress: function(e) {
                var event = {name:"onKeyPress", type:"keyboard", e: e};
                this._sendEvent(event);

            },
            __onKeyUp: function(e) {
                var event = {name:"onKeyUp", type:"keyboard", e: e};
                this._sendEvent(event);

            },
            
            __onMouseDown: function(e) {
                var event = {name:"onMouseDown", type:"mouse", e: e};
                this._sendEvent(event);

            },

            __onMouseUp: function(e) {
                var event = {name:"onMouseUp", type:"mouse", e: e};
                this._sendEvent(event);

            },

            __onMouseMove: function(e) {
                var event = {name:"onMouseMove", type:"mouse", e: e};
                this._sendEvent(event);

            },


            // Setters/Getters

            // container
            set container(O) {
                this._container = O;
            },
            get container() {
                return this._container;
            },


        }
    });

    window.armlib = new ArmLib();
}(window.gizmo));