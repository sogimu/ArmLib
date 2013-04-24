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

    var Skeleton = gizmo.Class({
        Initialize: function(arr) {
            if(gizmo.isTArray(arr)) {
                for(var i in arr) {
                    this.AddPoint(arr[i]);
                }     
            } else {
                throw Error("Argument are not array!");
            }

        },
        Statics: {
            _unchangedPoints: [],
            _translatedPoints: [],
            _transformedPoints: [],
            
            _matrixOfTranslatePoints: {},
            _matrixOfTransformedPoints: {},
            
            _polygoneOfTransformedPoints: {}

        },
        Methods: {

            AddPoint: function(point) {
                this._unchangedPoints.push(new gizmo.Math.Point2D(point.x,point.y));
                this._translatedPoints.push(new gizmo.Math.Point2D(point.x,point.y));
                this._transformedPoints.push(new gizmo.Math.Point2D(point.x,point.y));


                this._updateMatrixOfUnchangedPoints();
                return this;
            },

            HasPoint: function(point) {
                return this._polygoneOfTransformedPoints.HasPoint(point);
            },

            Translate: function(x,y) {
                arrMatrix = [];
                var unchangedPoints = this._unchangedPoints;
             
                
                for(var i in unchangedPoints) {
                    var unX = unchangedPoints[i].x;
                    var unY = unchangedPoints[i].y;

                    this._translatedPoints[i].x = unX + x;
                    this._translatedPoints[i].y = unY + y;
                }

                var translatedPoints = this._translatedPoints;
                for(var i in translatedPoints) {
                    arrMatrix.push([translatedPoints[i].x,translatedPoints[i].y,1]);
                }
                this._matrixOfTranslatePoints = new gizmo.Math.Matrix(arrMatrix);

            },

            Transform: function(transformMatrix) {
                var matrixOfTransformedPoints = this._matrixOfTranslatePoints.x(transformMatrix);
                
                var elementsOfTransformedPoints = matrixOfTransformedPoints.elements;
                for(var i in elementsOfTransformedPoints) {
                    this._transformedPoints[i].x = elementsOfTransformedPoints[i][0];
                    this._transformedPoints[i].y = elementsOfTransformedPoints[i][1];
                    
                }
                this._updatePolygoneOfTransformedPoints();
                return matrixOfTransformedPoints;

            },

            _updateMatrixOfUnchangedPoints: function() {
                arrMatrix = [];
                var unchangedPoints = this._unchangedPoints;
                for(var i in unchangedPoints) {
                    arrMatrix.push([unchangedPoints[i].x,unchangedPoints[i].y,1]);
                }
                this._matrixOfUnchangedPoints = new gizmo.Math.Matrix(arrMatrix);

            },

            _updatePolygoneOfTransformedPoints: function() {
                arrVectors = [];
                var transformedPoints = this._transformedPoints;
                for(var i in transformedPoints) {
                    arrVectors.push(new gizmo.Math.Vector2D(transformedPoints[i].x,transformedPoints[i].y));
                }
                this._polygoneOfTransformedPoints = new gizmo.Math.Polygone(arrVectors);
            }

            // Setters/Getters
        }
    });

    armlib._class.Skeleton = Skeleton;

}(gizmo));