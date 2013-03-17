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

            _addLayer: function(O) { // add new child-object and let sort drawList by z-index
                O._setOwner(this);
                this._list.push(O);
                
                return this;

            },
            
            _removeLayer: function(O) {

            },
	
			run: function() {
				this._listenKeybordMouseEvents();
                for(var i in this._list) {
                    this._list[i].run();
                }
                				
				return this;
			},
			stop: function() {
                this._notListenKeybordMouseEvents();
			},

            _listenKeybordMouseEvents: function() {
                var self = this;
                window.onkeydown = function(e) {self._onKeyDown(e)};
                window.onkeypress = function(e) {self._onKeyPress(e)};
                window.onkeyup = function(e) {self._onKeyUp(e)};
                for(var i in this._list) {
                    this._list[i]._listenMouseEvents();
                } 
            },

            _notListenKeybordMouseEvents: function() {
                var self = this;
                window.onkeydown = function(e) {};
                window.onkeypress = function(e) {};
                window.onkeyup = function(e) {}; 
                for(var i in this._list) {
                    this._list[i]._notListenMouseEvents();
                }
            },
            
            _onKeyDown: function(e) {
                for(var i in this._list) {
                    if(this._list[i].getRunStatus()) {
                        this._list[i]._onKeyDown(e);
                    }
                }

            },
            _onKeyPress: function(e) {
                for(var i in this._list) {
                    if(this._list[i].getRunStatus()) {
                        this._list[i]._onKeyPress(e);
                    }
                }
            },
            _onKeyUp: function(e) {
                for(var i in this._list) {
                    if(this._list[i].getRunStatus()) {
                        this._list[i]._onKeyUp(e);
                    }
                }
            }

        }
    });

    window.ArmLib = new ArmLib();
}(window.gizmo));