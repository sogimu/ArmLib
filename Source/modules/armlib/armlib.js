window.framework = window.gizmo;

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
        initialize: function(O){
            this.synch = O.synch;
			return this;
        },
        Statics: {
            name: 'ArmLib',
			type: 'ArmLib',
            owner: null,
            synch: true, // synch or asynch
            loaded: false, // Flag which show load-state of object
            _synchObjectsList: {}, // List with loading objects
            _numberSynchObjects: 0,
            _numberObjects: 0,
			
            _list: {}, // List with Layer-objects
            _processList: [], // List with sorted layer-objects

            _armlib: this,
            _lib: lib,

            class: {},
            _class: {}
        },
        Methods: {
			_onDraw: function() {
                if(lib.isSet(this.onDraw)) {this.onDraw.call(this, this._context, this._layer,armlib,lib)};

                for(var i in this._processList) {
                    this._processList[i]._onDraw();
                }
            },
            onDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object

            _onBegin: function() {
                if(lib.isSet(this.onBegin)) {this.onBegin.call(this, this._layer,armlib,lib)};

                for(var i in this._processList) {
                    this._processList[i]._onBegin();
                }
            },
            onBegin: function(layer, armlib, lib) {}, // Constructor for object

            _onUpdate: function() {
                if(lib.isSet(this.onUpdate)) {this.onUpdate.call(this, this._layer,armlib,lib)};

                for(var i in this._processList) {
                    this._processList[i]._onUpdate();
                }
            },
            onUpdate: function(layer, armlib, lib) {}, // Function which update object

            _onLoad: function() {
				this.loaded = true;
				if(lib.isSet(this.onLoad)) {this.onLoad.call(this, armlib,lib);}
				
            },
            onLoad: function(armlib, lib) {}, // Function for event load ending

            onKeyPress: function(e) {}, // Function for event of keyboard
            onKeyDown: function(e) {},
            onKeyUp: function(e) {},
            onMouseClick: function(e) {}, // Functions for event of mouse
            onMouseMove: function(e) {},
            onMouseDown: function(e) {},
            onMouseUp: function(e) {},
            onShow: function(layer, armlib) {}, // Function for showing and hiding event
            onHide: function(layer, armlib) {},
            _sortByZindex: function(A,low,high) { // sort: Quicksort
                var i = low;
                var j = high;
                var x = A[Math.round((low+high)/2)].zindex;  // x - опорный элемент посредине между low и high
                do {
                    while(A[i].zindex < x) ++i;  // поиск элемента для переноса в старшую часть
                    while(A[j].zindex > x) --j;  // поиск элемента для переноса в младшую часть
                    if(i <= j){
                        // обмен элементов местами:
                        var temp = A[i];
                        A[i] = A[j];
                        A[j] = temp;
                        // переход к следующим элементам:
                        i++; j--;
                    }
                } while(i < j);
                if(low < j) this._sortByZindex(A, low, j);
                if(i < high) this._sortByZindex(A, i, high);
                this._processList = A;
            },
			setFunc: function(name,func) {
				if(lib.isSet(name)) {
					this[name] = func;
				}
				return this;
			},
			getFunc: function(O) {
			},
			
			addToProcessList: function(O) {
				this._processList.push(O);
                this._sortByZindex(this._processList,0,this._processList.length-1);
			},
			removeFromProcessList: function() {
				
			},
			
            addLayer: function(O) { // add new layer-object and let sort drawList by z-index
                O.owner = this;
                this._list[O.name] = O;
				this._numberObjects++;
				
                if(O.loaded && O.synch == false) {
					this.addToProcessList(O);
                } else if(O.synch && O.loaded == false) {
					this._synchObjectsList[O.name] = O;
					this._numberSynchObjects++;
				} else if(O.loaded == true && O.synch) {
					this._synchObjectsList[O.name] = O;
                }
				O._connected = true;	
				return this;
            },
            removeLayer: function(O) {

            },
			run: function() {
				for(var i in this._processList) {
                    this._processList[i].run();
                }
				this.run = function() {
					return this;
				}
				return this;
			},
			stop: function() {
			},
			Load: function() {
				for(var i in this._list) {
					this._list[i].Load();
				}
				return this;
			}
        }
    });

    window.armlib = new ArmLib({
        synch: true
    });
}(framework));