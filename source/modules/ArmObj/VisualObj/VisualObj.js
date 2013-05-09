(function visualObj(armlib,lib){
    /**
     * Описывает суперкласс.
     *
     * @this {armlib._class.superObj}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var VisualObj = lib.Class({
        Extend: armlib._class.ArmObj,
        Initialize: function(O, layer, armlib) {},
        Statics: {
            _type: ['ArmObject','VisualObj'],
            
            _context: null,
            _layer: null,
                        
            _x: 0,
            _y: 0,
            _angle: 0,
            _centralPoint: {x:1,y:1},
            _scale: {x:1,y:1},
            _zindex: 0,
            _globalAlpha: 1,

            _transformMatrix: [],
            _paramsTransformMatrix: [],
            _initialProperties: new armlib._class.InitialProperties({x:0,y:0,angle:0.3,centralPoint: {x: 100, y:100}}),
            
            _skeleton: {},

            _haveChanges: true,
            _changes: {x:0, y:0, width:0, height:0, angle:0, scale: {x:1,y:1}, centralPoint: {x:0, y:0}},
            
            _armlib: armlib,
            _lib: lib
        },
        Methods: { // Call-back functions of ArmLib object
        
            haveLayer: function() {
                if(this._layer) {
                    return true;
                } else {
                    return false;
                }
            },

            haveChanges: function() {
                return this._haveChanges;
            },

            setHaveNotChanges: function() {
                this._changes = {x:0, y:0, width:0, height:0, angle:0, scale: {x:0,y:0}, centralPoint: {x:0, y:0}, zindex: 0, globalAlpha: 1};
                this._haveChanges = false;
            },

            setHaveChanges: function() {
                this._haveChanges = true;
            },

            _clear: function() {
                /* virtual */
                console.log("virtual function");

            },
            
            _begin: function() {
                /* virtual */
                console.log("virtual function");

            },

            _draw: function() {
                /* virtual */
                console.log("virtual function");

            },
            
            initTransformMatrix: function() {
                
                var angelRad = this.angle;
                var n = this.centralPoint.x;
                var m = this.centralPoint.y;

                var a = Math.cos(angelRad);
                var b = Math.sin(angelRad);
                var c = -b;
                var d = a;
                var f = (-m * (a-1)) + (n * b);
                var e = (-m * b) - (n * (a-1));
                

                var MTrans = new gizmo.Math.Matrix([
                    [a,c,e],
                    [b,d,f],
                    [0,0,1]
                ]);

                this._transformMatrix = MTrans;

                a = this._transformMatrix.elements[0][0];
                b = this._transformMatrix.elements[1][0];
                c = this._transformMatrix.elements[0][1];
                d = this._transformMatrix.elements[1][1];
                e = this._transformMatrix.elements[0][2];
                f = this._transformMatrix.elements[1][2];

                this._paramsTransformMatrix = {a: a, b: b, c: c, d: d, e: e, f: f};


            },

            updateTransformMatrix: function() {
                
                var angelRad = this.angle;
                var n = this.centralPoint.x;
                var m = this.centralPoint.y;

                var a = Math.cos(angelRad);
                var b = Math.sin(angelRad);
                var c = -b;
                var d = a;
                var f = (-m * (a-1)) + (n * -b);
                var e = (-m * -b) - (n * (a-1));
                                
                var MTrans = new gizmo.Math.Matrix([
                    [a,c,e],
                    [b,d,f],
                    [0,0,1]
                ]);

                this._transformMatrix = MTrans;

                a = this._transformMatrix.elements[0][0];
                b = this._transformMatrix.elements[1][0];
                c = this._transformMatrix.elements[0][1];
                d = this._transformMatrix.elements[1][1];
                e = this._transformMatrix.elements[0][2];
                f = this._transformMatrix.elements[1][2];

                this._paramsTransformMatrix = {a: a, b: b, c: c, d: d, e: e, f: f};

            },

            initSkeleton: function(points) {
                var skeleton = new armlib._class.Skeleton([]);
                
                if(points) {
                    for(var index in points) {
                        skeleton.AddPoint(new gizmo.Math.Point2D(points[index].x, points[index].y));

                    }
                } else {
                    skeleton.AddPoint(new gizmo.Math.Point2D(this.x-this.x,this.y-this.y));
                    skeleton.AddPoint(new gizmo.Math.Point2D(this.x+this.width-this.x,this.y-this.y));
                    skeleton.AddPoint(new gizmo.Math.Point2D(this.x+this.width-this.x,this.y+this.height-this.y));
                    skeleton.AddPoint(new gizmo.Math.Point2D(this.x-this.x,this.y+this.height-this.y));
                    
                }
                this.Skeleton = skeleton;
                this.Skeleton.Translate(0,0);
            },

            updateSkeleton: function() {
                this.Skeleton.Translate(this.x,this.y);
                this.Skeleton.Transform(this.TransformMatrix.transpose());

                //this.Skeleton.Show(b);

            },

            _setContext: function(context) {
                this._context = context;
            },

            _setLayer: function(layer) {
                this._layer = layer;
            },
            
            // Setters/Getters

            // x
            set x(O) {
                this._changes.x = (O - this._x);
                this._x = O;
                this._haveChanges = true;
            },
            get x() {
                return this._x;
            },
            
            // y
            set y(O) {
                this._changes.y = (O - this._y);
                this._y = O;
                this._haveChanges = true;
            },
            get y() {
                return this._y;
            },
            
            // width
            set width(O) {
                this._changes.width = (O - this._width);
                this._width = O;
                this._haveChanges = true;
            },
            get width() {
                return this._width;
            },
            
            // height
            set height(O) {
                this._changes.height = (O - this._height);
                this._height = O;
                this._haveChanges = true;
            },
            get height() {
                return this._height;
            },
            
            // angle
            set angle(angle) {
                var twoPI = Math.PI*2;
                if(angle > twoPI) {
                    this._changes.angle = (angle - this._angle);
                    this._angle = angle%Math.PI;
                } else {
                    this._changes.angle = (angle - this._angle);
                    this._angle = angle;
                }
                this._haveChanges = true;
            },
            get angle() {
                return this._angle;
            },

            // centralPoint
            set centralPoint(O) {
                this._changes.centralPoint.x = (O.x - this.centralPoint.x);
                this._changes.centralPoint.y = (O.y - this.centralPoint.y);
                this._centralPoint = O;
                this._haveChanges = true;
            },
            get centralPoint() {
                return this._centralPoint;
            },
            
            // scale
            set scale(O) {
                this._changes.scale.x = (O.x - this._scale.x);
                this._changes.scale.y = (O.y - this._scale.y);
                this._scale = O;
                this._haveChanges = true;
            },
            get scale() {
                return this._scale;
            },
            
            // zindex
            set zindex(O) {
                this._changes.zindex = (O - this._zindex);
                this._zindex = O;
                if(this.haveOwner()) {
                    this.owner._sortByZindex();
                }
                this._haveChanges = true;
            },

            get zindex() {
                return this._zindex;

            },

            // globalAlpha
            set globalAlpha(value) {
                if(value >= 0 && value <= 1) {
                    this._changes.globalAlpha = (value - this._globalAlpha);
                    this._globalAlpha = value;
                } else if(value < 0) {
                    this._changes.globalAlpha = (0 - this._globalAlpha);
                    this._globalAlpha = 0;
                } else if(value > 1) {
                    this._changes.globalAlpha = (1 - this._globalAlpha);
                    this._globalAlpha = 1;
                }
                this._haveChanges = true;
            },
            get globalAlpha() {
                return this._globalAlpha;
            },


            // context
            get context() {
                return this._context;
            },

            // layer
            get layer() {
                return this._layer;
            },

            get TransformMatrix() {
                return this._transformMatrix;

            },
            set transformMatrix(reg) {
                this.__transformMatrix = reg;
            },
            get transformMatrix() {
                return this._transformMatrix;
            },

            get ParamsTransformMatrix() {
                return this._paramsTransformMatrix;

            },
                    
            get initialProperties() {
                return this._initialProperties;

            }

        }
    });

    armlib._class.VisualObj = VisualObj;

}(armlib,gizmo));
