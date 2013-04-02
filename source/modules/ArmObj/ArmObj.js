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
            _type: ['','','ArmObject'],
            _name: "ArmObj "+100*Math.random(),
            _isLoaded: false, // Flag which show load-state of object 

            _owner: null,

            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
			
            Load: function() {
                this._load();
                return this;
            },

            _begin: function() { /* virtual */},
            _update: function() { /* virtual */},
            
            _load: function() {
                /* viryual */
                console.log("virtual function");
            },

            __onLoad: function() {
                this._setLoaded();

                if(this._onLoad) { this._onLoad.call(this, this._layer, armlib,lib);}

                if(this.haveOwner()) {                  
                    this.owner._loadedChild();
                }

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

            _setName: function(name) {
                this._name = name;
            },

            _setLoaded: function() {
                this._isLoaded = true;
            },
            _setUnloaded: function() {
                this._loaded = false;
            },

            _setOwner: function(object) {
                this._owner = object;
            },

            // Setters/Getters

            get isLoaded() {
                return this._isLoaded;
            },

            get name() {
                return this._name;

            },
            get owner() {
                return this._owner;

            },
            get type() {
                return this._type;

            }
        }
    });

    armlib._class.ArmObj = ArmObj;

}(armlib,gizmo));
