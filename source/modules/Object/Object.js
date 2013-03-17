(function object(armlib,lib){
    /**
     * Описывает класс минимального объекта.
     *
     * @this {armlib.class.Object}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var object = lib.Class({
        Extend: armlib._class.ArmObj,
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
            _type: 'Object',
            _numberNotLoadedChilds: 0,

            _list: [], // List with child-objects
        },
        Methods: { // Call-back functions of ArmLib object

            addChild: function(O) { // add new child-object and let sort drawList by z-index
                O._setContext(this.getContext());
                O._setLayer(this.getLayer());
                O._setOwner(this);

                this._list.push(O);
                this._numberNotLoadedChilds++;
                this._sortByZindex();

                return this;

            },
            removeChild: function(O) {

            },

            Load: function() {
                this._load.call(this);
                return this;
                this._load();   
            },
            _load: function() {
                for(var i in this._list) {
                    this._list[i]._load.call(this._list[i]);
                }
                if(this._list.length == 0) {
                    this.__onLoad();
                }

            },

            _begin: function() {
                if(this.haveOwner()) {
                    this._begin = function() {
                        for(var i in this._list) {
                            this._list[i]._begin();
                        }
                        if(this.onBegin) {this.onBegin.call(this, this._layer,armlib,lib)};
                    }
                    this._begin();
                } else {
                    throw Error('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
                }

            },
            _onBegin: function(layer, armlib, lib) {}, // Constructor for object

            _update: function() {
                if(this.haveOwner()) {
                    this._update = function() {
                        for(var i in this._list) {
                            this._list[i]._update();
                        }
                        if(this._onUpdate) {this._onUpdate.call(this, this._layer,armlib,lib)};
                    }
                    this._update();
                } else {
                    throw Error('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
                }

            },
            _onUpdate: function(layer, armlib, lib) {}, // Function which update object

            _clear: function() {
                if(this.haveOwner()) {
                    this._clear = function() {
                        var len = this._list.length-1;
                        for(var i = len; i>=0; i--) {
                            this._list[i]._clear.call(this._list[i]);
                        }
                        if(this._onClear) {this._onClear(this._context, this._layer,armlib,lib)};
                    }
                    this._clear();
                } else {
                    throw Error('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
                }

            },
            _onClear: function(ctx, layer, armlib, lib) {}, // Function which update view of object before drawing

            _draw: function() {
                if(this.haveOwner()) {
                    this._draw = function() {
                        this._context.save();
                            this._context.beginPath();
                                this._context.translate(this.x, this.y);
                                this._context.translate(this.centralPoint.x, this.centralPoint.y);
                                this._context.rotate(this.angle);
                                this._context.translate(-this.centralPoint.x, -this.centralPoint.y);
                                this._context.scale(this.scale.x, this.scale.y);                                

                                if(this._preDraw) {this._preDraw(this._context, this._layer,armlib,lib)};
                                for(var i in this._list) {
                                    this._list[i]._draw.call(this._list[i]);
                                }
                                if(this._onDraw) {this._onDraw(this._context, this._layer,armlib,lib)};

                            this._context.closePath();
                        this._context.restore();                        
                    }
                    this._draw();
                } else {
                    console.log('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
                }

            },
            _onDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object before drawing
            _preDraw: function(ctx, layer, armlib, lib) {}, // Function which update view of object after drawing

            _sortByZindex: function() {
                this._list = gizmo.nativeSort({mas: this._list,target: '<',field: '_zindex'});
            },
            _loadedChild: function() {
                this._numberNotLoadedChilds--;
                    if(this._numberNotLoadedChilds == 0) {
                        this._onLoad();                             
                    }
            },
            getNumberNotLoadedChilds: function() {
                return this._numberNotLoadedChilds; 
            },
            
            // Setters/Getters

            _setContext: function(context) {
                this._context = context;
                for(var i in this._list) {
                    this._list[i]._setContext(context);
                }
            },

            _setLayer: function(layer) {
                this._layer = layer;
                for(var i in this._list) {
                    this._list[i]._setLayer(layer);
                }
            }

        }
    });

    armlib.Object = object;

}(ArmLib,gizmo));