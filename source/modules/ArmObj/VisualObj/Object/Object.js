(function object(armlib,lib){
    /**
     * Описывает класс минимального объекта.
     *
     * @this {armlib.class.Object}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var object = lib.Class({
        Extend: armlib._class.VisualObj,
        Initialize: function(O, layer, armlib) {
            this._setName(O.name || this.name);
            this.zindex = O.zindex || this.zindex;
            this._x = O.x || this._x;
            this._y = O.y || this._y;
            this.centralPoint = O.centralPoint || this.centralPoint;
            this.angle = O.angle || this.angle;
            this.scale = O.scale || this.scale;
            return this;
        },
        Statics: {
            _type: ['Object','','ArmObject'],
            _name: "Object "+100*Math.random(),
            _numberNotLoadedChilds: 0,

            _list: [], // List with child-objects
        },
        Methods: { // Call-back functions of ArmLib object

            addChild: function(O) { // add new child-object and let sort drawList by z-index
                O._setContext(this.context);
                O._setLayer(this.layer);
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
            },

            getNumberNotLoadedChilds: function() {
                return this._numberNotLoadedChilds; 
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
                if(this._onBegin) {
                    this._onBegin.call(this, this._layer,armlib,lib)
                };

                for(var i in this._list) {
                    this._list[i]._begin();
                }             

                if(this.haveChanges()) {
                    this.initTransformMatrix();
                }
            },

            _clear: function() {
                if(this._onClear) {this._onClear(this._context, this._layer,armlib,lib)};

                for(var i=this._list.length-1;i>=0;i--) {

                    this._list[i]._clear.call(this._list[i]);
                }

            },

            _update: function() {
                if(this._onUpdate) {this._onUpdate.call(this, this._layer,armlib,lib)};

                if(this.haveChanges()) {
                    this.updateTransformMatrix();
                    for(var i in this._list) {
                        this._list[i].multipluyTransformMatrix(this.TransformMatrix);
                    }
                }

                for(var i in this._list) {
                    this._list[i]._update();
                }
                
            },

            _draw: function() {
                for(var i in this._list) {
                    this._list[i]._draw.call(this._list[i]);
                }
                this.setHaveNotChanges();

            },

            _sortByZindex: function() {
                this._list = gizmo.nativeSort({mas: this._list,target: '<',field: '_zindex'});
            },

            _loadedChild: function() {
                this._numberNotLoadedChilds--;
                    if(this._numberNotLoadedChilds == 0) {
                        this.__onLoad();                             
                    }
            },

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
            },

            // private events from keyboard 
            __onKeyDown: function(e) {
                for(var i in this._list) {
                    this._list[i].__onKeyDown(e);
                }
            },

            __onKeyPress: function(e) {
                for(var i in this._list) {
                    this._list[i].__onKeyPress(e);
                }
            },

            __onKeyUp: function(e) {
                for(var i in this._list) {
                    this._list[i].__onKeyUp(e);
                }
            },

            // private events from mouse

            __onMouseDown: function(e) {
                for(var i in this._list) {
                    this._list[i].__onMouseDown(e);    
                }

            },
            
            // Setters/Getters

        }
    });

    armlib.Object = object;

}(armlib,gizmo));