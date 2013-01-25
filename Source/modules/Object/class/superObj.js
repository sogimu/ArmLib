(function superObj(armlib,lib){
    /**
     * Описывает супер класс.
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
            owner: null,
            zindex: 0,
            synch: true, // synch or asynch
            loaded: false, // Flag which show load-state of object
            _synchObjectsList: {}, // List with loading objects
            _numberSynchObjects: 0,

            _list: {}, // List with child-objects
            _processList: [], // List with sorted child-objects

			_connected: false,
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
            _draw: function() {
				if(this._connected) {
					this._draw = function() {
						for(var i in this._processList) {
							this._processList[i]._draw.call(this._processList[i]);
						}
						if(lib.isSet(this.draw)) {this.draw.call(this, this._context, this._layer,armlib,lib)};
					}
					this._draw();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            draw: function(ctx, layer, armlib, lib) {}, // Function which update view of object

            _begin: function() {
				if(this._connected) {
					this._begin = function() {
						for(var i in this._processList) {
							this._processList[i]._begin();
						}
						if(lib.isSet(this.begin)) {this.begin.call(this, this._layer,armlib,lib)};
					}
					this._begin();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            begin: function(layer, armlib, lib) {}, // Constructor for object

            _update: function() {
				if(this._connected) {
					this._update = function() {
						for(var i in this._processList) {
							this._processList[i]._update();
						}
						if(lib.isSet(this.update)) {this.update.call(this, this._layer,armlib,lib)};
					}
					this._update();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            update: function(layer, armlib, lib) {}, // Function which update object

            _onLoad: function() {
				if(this._connected) {
					this._onLoad = function() {
						if(this.owner._numberSynchObjects > 0) {
							this.owner._numberSynchObjects--;
							this.loaded = true;
							this.owner._synchObjectsList[this.name] = this;
							if(lib.isSet(this.onLoad)) {
								this.onLoad.call(this, armlib,lib)
							}
							if(this.owner._numberSynchObjects == 0) {
								for(var i in this.owner._synchObjectsList) {
									this.owner._synchObjectsList[i]._begin();
								}
								for(var i in this.owner._synchObjectsList) {
									this.owner.addToProcessList(this.owner._synchObjectsList[i]);
								}
								this.owner._onLoad();
							}
						}
					}
					this._onLoad();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
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
                if(this._connected) {
					this.addChild = function(O) {
						O.context = this._context;
						O.layer = this._layer;
						O.owner = this;
						this._list[O.name] = O;
						
						if(O.loaded && O.synch == false) {
							this.addToProcessList(O);
						} else if(O.loaded && O.synch) {
							this._synchObjectsList[O.name] = O;
						} else {
							this._numberSynchObjects++;
						}
						O._connected = true;
						return this;
					}
					this.addChild(O);
					return this;
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}
            },
            removeChild: function(O) {

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
                var list = this._processList;
                for(var i in list) {
                    list[i].context = O;
                }
            },
            get context() {
                return this._context;
            },

            set layer(O) {
                this._layer = O;
                var list = this._processList;
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
