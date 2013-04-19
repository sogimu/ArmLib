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

            __transformMatrix: [],
            _paramsTransformMatrix: [],

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
                var e = (-m * b) - (n * (a-1));
                var f = (-m * (a-1)) + (n * b);
                

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
                var e = (-m * (a-1)) + (n * b);
                var f = (-m * b) - (n * (a-1));
                
                var MTrans = new gizmo.Math.Matrix([
                    [a,c,e],
                    [b,d,f],
                    [0,0,1]
                ]);

                //this._transformMatrix = this._transformMatrix.x(MTrans);
              
                this._transformMatrix = MTrans;

                a = this._transformMatrix.elements[0][0];
                b = this._transformMatrix.elements[1][0];
                c = this._transformMatrix.elements[0][1];
                d = this._transformMatrix.elements[1][1];
                e = this._transformMatrix.elements[0][2];
                f = this._transformMatrix.elements[1][2];

                this._paramsTransformMatrix = {a: a, b: b, c: c, d: d, e: e, f: f};

            },

            initSkeleton: function() {
                var skeleton = new armlib._class.Skeleton([]);
                skeleton.AddPoint(new gizmo.Math.Point2D(this.x,this.y));
                skeleton.AddPoint(new gizmo.Math.Point2D(this.x+this.width,this.y));
                skeleton.AddPoint(new gizmo.Math.Point2D(this.x+this.width,this.y+this.height));
                skeleton.AddPoint(new gizmo.Math.Point2D(this.x,this.y+this.height));
                
                this.Skeleton = skeleton;
                //this.Skeleton.prev = prev;
                
            },

            updateSkeleton: function() {
                this.Skeleton.Transform(this.TransformMatrix.transpose());

                var skeleton = this.Skeleton._polygoneOfChangedPoints._points;

                var ctx = b._context;

                b._context.strokeStyle = "#000000";
                    
                ctx.clearRect(0,0,500,500);
                
                ctx.beginPath();

                ctx.moveTo(skeleton[0].x,skeleton[0].y);
                for(var i in skeleton){
                    ctx.lineTo(skeleton[i*1].x,skeleton[i*1].y);
                }
                ctx.lineTo(skeleton[0].x,skeleton[0].y);
                
                ctx.closePath();
                ctx.stroke();
                var d;
                //ctx.fill();

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

            get zindex(O) {
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
            set _transformMatrix(reg) {
                this.__transformMatrix = reg;
            },
            get _transformMatrix() {
                return this.__transformMatrix;
            },

            get ParamsTransformMatrix() {
                return this._paramsTransformMatrix;

            }

        }
    });

    armlib._class.VisualObj = VisualObj;

}(armlib,gizmo));
