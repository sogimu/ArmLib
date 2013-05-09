(function(gizmo) {
    /**
     * * Полигон заданный точками
     *
     * @constructor
     * @param {number} x
     * @param {number} y
     * @this {armlib._class.superObj.Polygone}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var InitialProperties = gizmo.Class({
        Initialize: function(O) {
            if(O) {
                if(gizmo.isTNumber(O.x) && gizmo.isTNumber(O.y) && gizmo.isTNumber(O.angle) && gizmo.isTNumber(O.centralPoint)) {
                    this.x = O.x;
                    this.y = O.y;
                    this.angle = O.angle;
                    this.centralPoint = O.centralPoint;
                }// else {
                 //   throw Error("One of arguments are not number!");
                //}
            }
            this.update();

        },
        Statics: {
            _x: 100,
            _y: 0,
            _angle: 0.3,
            _centralPoint: {x:1, y:1},
            _transformMatrix: new gizmo.Math.Matrix([]),
            _paramsTransformMatrix: []
    
        },
        Methods: {
            update: function() {
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
            
            // Setters/Getters
            
            // x
            set x(x) {
                this._x = x;
            },
            get x() {
                return this._x;
            },
            
            // y
            set y(y) {
                this._y = y;
            },
            get y() {
                return this._y;
            },
            
            // angle
            set angle(angle) {
                this._angle = angle;
            },
            get angle() {
                return this._angle;
            },
                    
            // centralPoint
            //set centralPoint(centralPoint) {
            //    this._centralPoint = centralPoint;
            //},
            get centralPoint() {
                return this._centralPoint;
            },
            
            // transformMatrix
            get transformMatrix() {
                return this._transformMatrix;
            },
            
            // paramsTransformMatrix
            get paramsTransformMatrix() {
                return this._paramsTransformMatrix;
            }
        }
    });

    armlib._class.InitialProperties = InitialProperties;

}(gizmo));

