(function superObj(armlib,lib){
    /**
     * Описывает суперкласс.
     *
     * @this {armlib._class.superObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var ArmObj = lib.Class({
        Initialize: function(O, layer, armlib) {},
        Statics: {
            _type: ['ArmObject'],
            _name: 1000*Math.random(),
            _loaded: false, // Flag which show load-state of object 

            _owner: null,

            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
			
            _begin: function() { /* virtual */},
            _update: function() { /* virtual */},
            
            Load: function() {
                this._load();
            },

            _load: function() {
                for(var i in this._list) {
                    this._list[i]._load();
                }
            },

            __onLoad: function() {
                if(this._onLoad) { this._onLoad.call(this, this._layer, armlib,lib);}
                
                if(this.haveOwner()) {                  
                    this._getOwner()._loadedChild();
                }
                
            },
            
			setFunc: function(name,func) {
				if(name && func) {
					this['_'+name] = func;        
				}
                
				return this;
			},
			getFunc: function(O) {
			},

            haveOwner: function() {
                if(this._owner) {
                    return true;
                } else {
                    return false;
                }
            },

            _setType: function(type) {
                this._type = type;
            },
            getType: function() {
                return this._type;
            },

            setName: function(name) {
                this._name = name;
            },
            getName: function() {
                return this._name;
            },

            _setLoaded: function() {
                this._loaded = true;
            },
            _setUnloaded: function() {
                this._loaded = false;
            },

            _setOwner: function(object) {
                this._owner = object;
            },
            _getOwner: function() {
                return this._owner;
            },

            // Setters/Getters
        }
    });

    armlib._class.ArmObj = ArmObj;

}(ArmLib,gizmo));
