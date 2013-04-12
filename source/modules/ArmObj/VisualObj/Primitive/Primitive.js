(function primitive(armlib,lib){
    /**
     * Описывает вспомогательный класс Shape. Данный класс содержит основные методы и свойства всех примитивов
     *
     * @constructor
     * @this {armlib._class.Shape}
     * @author <a href="mailto:sogimu@nxt.ru">Alexander Lizin aka Sogimu</a>
     * @version 0.1
     */

    var Primitive = lib.Class({
        Extend: armlib._class.VisualObj,
        Statics: {
            _type: ['Primitive',''],
            _fill: "#00FF00",
            _stroke: "#00aa00",
            
            _drawRect: {drawingRectPos: {p0: {x: 0, y: 0},p1: {x: 0, y: 0}}, drawingRectImage: new Image()},
            /*_poligon: {
                        global: [],
                        local: [new gizmo.Point(this.x,this.y),new gizmo.Point(this.x+this.width,this.y), new gizmo.Point(this.x+this.width, this.y+this.height), new gizmo.Point(this.x, this.y+this.height)]
                      }*/

        },
        Methods: {

            saveDrawingRectImage: function() {
                var rect = this._drawRect.drawingRectPos;

                b._context.beginPath();
                    b._context.strokeStyle = "#FF0000";
                    b._context.rect(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);
                b._context.closePath();
                b._context.stroke();

                
                this._drawRect.drawingRectImage = this._context.getImageData(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);
            },

            removeDrawingRectImage: function() {
                var rect = this._drawRect.drawingRectPos;

                b._context.beginPath();
                    b._context.strokeStyle = "#0000FF";
                    b._context.rect(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);
                b._context.closePath();
                b._context.stroke();

                var rect = this._drawRect.drawingRectPos;
                this._context.putImageData(this._drawRect.drawingRectImage, rect.p0.x, rect.p0.y);
            },

            updateDrawingRectPos: function() {
                // var angelRad = this.angle;
                // var m = this.centralPoint.x// + this.x;
                // var n = this.centralPoint.y// + this.y;

                // var MTrans = new gizmo.Matrix([
                //     [Math.cos(angelRad),Math.sin(angelRad),0],
                //     [-Math.sin(angelRad),Math.cos(angelRad),0],
                //     [-m*(Math.cos(angelRad)-1)+n*Math.sin(angelRad),-m*Math.sin(angelRad)-n*(Math.cos(angelRad)-1),1]
                // ]);
                
                var MTrans = this.TransformMatrix;

                var points = new gizmo.Math.Matrix([[this.x,this.y,1],[this.x+this.width,this.y,1],[this.x+this.width,this.y+this.height,1],[this.x,this.y+this.height,1]]);
                var mainPoint = points.x(MTrans).elements;

                var x = Math.floor(Math.min(mainPoint[0][0],mainPoint[1][0],mainPoint[2][0],mainPoint[3][0]));
                var y = Math.floor(Math.min(mainPoint[0][1],mainPoint[1][1],mainPoint[2][1],mainPoint[3][1]));
                var width = Math.ceil(Math.max(mainPoint[0][0],mainPoint[1][0],mainPoint[2][0],mainPoint[3][0]) - x);
                var height = Math.ceil(Math.max(mainPoint[0][1],mainPoint[1][1],mainPoint[2][1],mainPoint[3][1]) - y);
                
                this._drawRect.drawingRectPos = {p0: {x: x, y: y},p1: {x: width, y: height}}
                /*this._oldX = x < 0?0:x;
                //this._oldX -= 5;
                this._oldY = y < 0?0:y;
                //this._oldX -= 5;
                this._oldWidth = width;//(width <= 0?1:width);
                //this._oldWidth += 5;
                this._oldHeight = height;//(height <= 0?1:height);
                //this._oldHeight += 5;*/
            },

            _begin: function() {
                if(this._onBegin) {
                    this._onBegin.call(this, this._layer,armlib,lib)
                };

                if(this.haveChanges()) {
                    this.initTransformMatrix();
                    this.updateDrawingRectPos();
                    this.saveDrawingRectImage();
                }
            },
            
            _clear: function() {
                    this.removeDrawingRectImage();

            },

            _update: function() {
                if(this._onUpdate) {
                    this._onUpdate.call(this, this._layer,armlib,lib)
                };

                if(this.haveChanges()) {
                    this.updateTransformMatrix();
                    this.updateDrawingRectPos();
                    this.saveDrawingRectImage();
                }

            },

            _draw: function() {
                /* virtual */
                console.log("virtual function");
                
            },


            // private events from keyboard
            
            __onKeyDown: function(e) {
            	if(this._onKeyDown) {
            		this._onKeyDown(e);
            	}
            },
            __onKeyPress: function(e) {
            	if(this._onKeyPress) {
            		this._onKeyPress(e);
            	}
            },
            __onKeyUp: function(e) {
            	if(this._onKeyUp) {
            		this._onKeyUp(e);
            	}
            },

            // private events from mouse

            __onMouseDown: function(e) {
                if(this._onMouseDown) {
                	this._onMouseDown(e);
                }

            },

            // Setters/Getters

		}
    });
    armlib._class.Primitive = Primitive;
})(armlib,gizmo);
