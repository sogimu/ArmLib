(function object(armlib,lib){
    /**
     * Описывает класс минимального объекта.
     *
     * @this {armlib.class.Object}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var object = lib.Class({
        Extend: armlib._class.superObj,
        Initialize: function(O, layer, armlib) {
            this.name = O.name || this.name;
            this.zindex = O.zindex || this.zindex;
            this._x = O.x || this._x;
            this._y = O.y || this._y;
            this.centralPoint = O.centralPoint || this.centralPoint;
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
			return this;
        },
        Statics: {
            type: 'Object',
			_numberObjects: 0,
			
            _list: [], // List with child-objects
        },
        Methods: { // Call-back functions of ArmLib object
			_onLoad: function() {	
				if(lib.isSet(this.owner)) {
					this.owner._onLoad();
					
				}

				if(lib.isSet(this.onLoad)) { this.onLoad.call(this, this._layer, armlib,lib);}
				
			},
			
			addChild: function(O) { // add new child-object and let sort drawList by z-index
				O._connected = true;
				O.context = this._context;
				O.layer = this._layer;
				O.owner = this;
				
				this._list.push(O);
				this._numberObjects++;
				this._sortByZindex();

				return this;
			
            },
            removeChild: function(O) {

            },
			
			Load: function() {
				this._load.call(this);
				return this;
				
			},
			_load: function() {
				for(var i in this._list) {
					this._list[i]._load.call(this._list[i]);
				}
				if(this._list.length == 0) {
					this._onLoad();
				}
					
			},
			
			_onDraw: function() {
				if(this._connected) {
					this._onDraw = function() {
						this.context.save();
							this.context.beginPath();
								this.context.translate(this.x, this.y);
								this.context.translate(this.centralPoint.x, this.centralPoint.y);
								this.context.rotate(this.angle);
								this.context.translate(-this.centralPoint.x, -this.centralPoint.y);
								this.context.scale(this.scale.x, this.scale.y);								
									if(this.preDraw) {this.preDraw(this._context, this._layer,armlib,lib)};
									for(var i in this._list) {
										this._list[i]._onDraw.call(this._list[i]);
									}
									if(this.onDraw) {this.onDraw(this._context, this._layer,armlib,lib)};
							this.context.closePath();
						this.context.restore();						
					}
					this._onDraw();
				} else {
					console.log('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            onDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object before drawing
            preDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object after drawing
			
			_onClear: function() {
				if(this._connected) {
					this._onClear = function() {
						var len = this._processList.length-1;
						for(var i = len; i>=0; i--) {
							this._processList[i]._onClear.call(this._processList[i]);
						}
						if(this.onClear) {this.onClear(this._context, this._layer,armlib,lib)};
					}
					this._onClear();
				} else {
					throw Error('object with type '+this.type+' and name '+this.name+' have not owner');
				}

            },
            onClear: function(ctx, layer, armlib, lib) {}, // Function which update view of object before drawing
			
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

			_sortByZindex: function(A,low,high) { // sort: Quicksort
				var A = A?A:this._list;
                var i = low = low?low:0;
                var j = high = high?high:this._list.length-1;
                var x = A[Math.round((low+high)/2)]._zindex;  // x - опорный элемент посредине между low и high
                do {
                    while(A[i]._zindex < x) ++i;  // поиск элемента для переноса в старшую часть
                    while(A[j]._zindex > x) --j;  // поиск элемента для переноса в младшую часть
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
                this._list = A;
            },

		}
    });

    armlib.class.Object = object;

}(armlib,gizmo));
