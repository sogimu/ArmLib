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
            this._init();
			return this;
        },
        Statics: {
            _type: ['ArmLib','ArmLib'],
            _name: 'ArmLib',
            
            _list: [], // List with Layer-objects
            _onKeyDownList: {},
            _onKeyPressList: {},
            _onKeyUpList: {},
            
            _class: {},

            _armlib: this,
            _lib: lib,
        },
        Methods: {
            _init: function() {
                var self = this;
                window.onkeydown = function(e) {self._onKeyDown(e)};
                window.onkeypress = function(e) {self._onKeyPress(e)};
                window.onkeyup = function(e) {self._onKeyUp(e)}; 
            },

            addLayer: function(O) { // add new child-object and let sort drawList by z-index
                O._setOwner(this);
                this._list.push(O);
                
                return this;

            },
            removeLayer: function(O) {

            },
	
			run: function() {
				for(var i in this._list) {
                    this._list[i].run();
                }
				
				return this;
			},
			stop: function() {
			},

            _addObjforOnKeyDownEvent: function(obj) {
                if(obj._onKeyDown) {
                    this._onKeyDownList[obj.getName()] = obj;
                }
            },
            _addObjforOnKeyPressEvent: function(obj) {
                if(obj._onKeyPress) {
                    this._onKeyPressList[obj.getName()] = obj;
                }
            },
            _addObjforOnKeyUpEvent: function(obj) {
                if(obj._onKeyUp) {
                    this._onKeyUpList[obj.getName()] = obj;
                }
            },

            _onKeyDown: function(e) {
                //console.log(e.keyCode);
                for(var i in this._onKeyDownList) {
                    this._onKeyDownList[i]._onKeyDown(e);
                }
            },
            _onKeyPress: function(e) {
                //console.log(e.keyCode);
                for(var i in this._onKeyPressList) {
                    this._onKeyPressList[i]._onKeyPress(e);
                }
            },
            _onKeyUp: function(e) {
                //console.log(e.keyCode);
                for(var i in this._onKeyUpList) {
                    this._onKeyUpList[i]._onKeyUp(e);
                }
            }
        }
    });

    window.ArmLib = new ArmLib();
}(window.gizmo));