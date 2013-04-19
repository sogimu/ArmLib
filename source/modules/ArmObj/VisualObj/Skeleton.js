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
            _matrixOfUnchangedPoints: {},
            
            _changedPoints: [],
            _polygoneOfChangedPoints: {}

        },
        Methods: {

            AddPoint: function(point) {
                this._unchangedPoints.push(point);
                this._changedPoints.push(point);

                this._updateMatrixOfUnchangedPoints();
                return this;
            },

            HasPoint: function(point) {
                return this._polygoneOfChangedPoints.HasPoint(point);
            },

            Transform: function(transformMatrix) {
                var matrixOfChangedPoints = this._matrixOfUnchangedPoints.x(transformMatrix);
                
                var elementsOfChangedPoints = matrixOfChangedPoints.elements;
                for(var i in elementsOfChangedPoints) {
                    this._changedPoints[i].x = elementsOfChangedPoints[i][0];
                    this._changedPoints[i].y = elementsOfChangedPoints[i][1];
                    
                }
                this._updatePolygoneOfChangedPoints();
                return matrixOfChangedPoints;

            },

            _updateMatrixOfUnchangedPoints: function() {
                arrMatrix = [];
                var unchangedPoints = this._unchangedPoints;
                for(var i in unchangedPoints) {
                    arrMatrix.push([unchangedPoints[i].x,unchangedPoints[i].y,1]);
                }
                this._matrixOfUnchangedPoints = new gizmo.Math.Matrix(arrMatrix);

            },

            _updatePolygoneOfChangedPoints: function() {
                arrVectors = [];
                var changedPoints = this._changedPoints;
                for(var i in changedPoints) {
                    arrVectors.push(new gizmo.Math.Vector2D(changedPoints[i].x,changedPoints[i].y));
                }
                this._polygoneOfChangedPoints = new gizmo.Math.Polygone(arrVectors);
            }

            // Setters/Getters
        }
    });

    armlib._class.Skeleton = Skeleton;

}(gizmo));