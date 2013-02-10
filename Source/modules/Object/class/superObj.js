(function superObj(armlib,lib){
    /**
     * Описывает суперкласс.
     *
     * @this {armlib._class.superObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var superObj = lib.Class({
        Initialize: function(O, layer, armlib) {},
        Statics: {
            name: 1000*Math.random(),
			type: '',
            x: 0,
            y: 0,
            centralPoint: {x:0,y:0},
            angle: 0,
            scale: {x:1,y:1},
            _context: null,
            _layer: null,
            _owner: null,
            zindex: 0,
            synch: true, // synch or asynch
            loaded: false, // Flag which show load-state of object
            _synchObjectsList: [], // List with loading objects
            _numberSynchObjects: 0,
            _numberObjects: 0,

            _list: [], // List with child-objects
            _processList: [], // List with sorted child-objects

			_connected: false,
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
            _onDraw: function() {
				if(this._connected) {
					this._onDraw = function() {
						if(this.preDraw) {this.preDraw(this._context, this._layer,armlib,lib)};
						for(var i in this._processList) {
							this._processList[i]._onDraw.call(this._processList[i]);
						}
						if(this.onDraw) {this.onDraw(this._context, this._layer,armlib,lib)};
					}
					this._onDraw();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            onDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object before drawing
            preDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object after drawing
			
            _onBegin: function() {
				if(this._connected) {
					this._onBegin = function() {
						for(var i in this._processList) {
							this._processList[i]._onBegin();
						}
						if(lib.isSet(this.onBegin)) {this.onBegin.call(this, this._layer,armlib,lib)};
					}
					this._onBegin();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            onBegin: function(layer, armlib, lib) {}, // Constructor for object

            _onUpdate: function() {
				if(this._connected) {
					this._onUpdate = function() {
						for(var i in this._processList) {
							this._processList[i]._onUpdate();
						}
						if(lib.isSet(this.onUpdate)) {this.onUpdate.call(this, this._layer,armlib,lib)};
					}
					this._onUpdate();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            onUpdate: function(layer, armlib, lib) {}, // Function which update object

            _onLoad: function() {
				if(lib.isSet(this.owner)) {
					this.loaded = true;
					if(lib.isSet(this.onLoad)) { this.onLoad.call(this, this._layer, armlib,lib);}

					if(this.synch == true) {
						this.owner._numberSynchObjects--;
						this.owner._numberObjects--;
						if(this.owner._numberSynchObjects == 0) {
							for(var i in this.owner._synchObjectsList) {
								this.owner._synchObjectsList[i]._onBegin();
							}
							for(var i in this.owner._synchObjectsList) {
								this.owner.addToProcessList(this.owner._synchObjectsList[i]);
							}
							this.owner.synchObjectsList = {};
							this.owner._onLoad();
								
						}
					} else {
						this.owner.addToProcessList(this);
						this.owner._numberObjects--;
						this._onBegin();
						if(this.owner._numberObjects == 0) {
							this.owner._onLoad();
						}

					}
				} else {
					this.loaded = true;
				}
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
			
			addToProcessList: function(O) {
				this._processList.push(O);
                this._sortByZindex(this._processList,0,this._processList.length-1);
			},
			removeFromProcessList: function() {
				
			},
			
            addChild: function(O) { // add new child-object and let sort drawList by z-index
				O.context = this._context;
				O.layer = this._layer;
				O.owner = this;
				this._list.push(O);
				this._numberObjects++;
				
				if(O.loaded && O.synch == false) { // загруженны, ассинхронный объект, то отображаем
					this.addToProcessList(O);
				} else if(O.synch && O.loaded == false) { // если не загруженный, синхронный объект, то
					this._synchObjectsList.push(O);
					this._numberSynchObjects++;
				} else if(O.loaded && O.synch){ // если загруженный, синхронный объект
					this._synchObjectsList.push(O);
				}
				O._connected = true;
				return this;
			
            },
            removeChild: function(O) {

            },
			_load: function() {
				for(var i in this._list) {
					this._list[i]._load();
				}
			},
			setFunc: function(name,func) {
				if(lib.isSet(name)) {
					this[name] = func;
				}
				return this;
			},
			getFunc: function(O) {
			},


            // Setters/Getters

            set context(O) {
                this._context = O;
                var list = this._list;
                for(var i in list) {
                    list[i].context = O;
                }
            },
            get context() {
                return this._context;
            },

            set layer(O) {
                this._layer = O;
                var list = this._list;
                for(var i in list) {
                    list[i].layer = O;
                }
            },
            get layer() {
                return this._layer;
            }


        }
    });

    armlib._class.superObj = superObj;

}(armlib,gizmo));
