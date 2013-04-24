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

        },
        Methods: {

            saveDrawingRectImage: function() {

                //this.ShowSaveingRect(b);

                var rect = this._drawRect.drawingRectPos;                
                this._drawRect.drawingRectImage = this._context.getImageData(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);
            },

            removeDrawingRectImage: function() {

                //this.ShowRemovingRect(b);

                var rect = this._drawRect.drawingRectPos;
                this._context.putImageData(this._drawRect.drawingRectImage, rect.p0.x, rect.p0.y);
            },

            updateDrawingRectPos: function() {
                var MTrans = this.TransformMatrix;

                var points = new gizmo.Math.Matrix([[this.x,this.x+this.width,this.x+this.width,this.x],[this.y,this.y,this.y+this.height,this.y+this.height],[1,1,1,1]]);
                
                var mainPoint = MTrans.x(points).elements;

                var x = Math.floor(Math.min(mainPoint[0][0],mainPoint[0][1],mainPoint[0][2],mainPoint[0][3]));
                var y = Math.floor(Math.min(mainPoint[1][0],mainPoint[1][1],mainPoint[1][2],mainPoint[1][3]));
                var width = Math.ceil(Math.max(mainPoint[0][0],mainPoint[0][1],mainPoint[0][2],mainPoint[0][3]) - x);
                var height = Math.ceil(Math.max(mainPoint[1][0],mainPoint[1][1],mainPoint[1][2],mainPoint[1][3]) - y);
                
                this._drawRect.drawingRectPos = {p0: {x: x    , y: y     },
                                                 p1: {x: width, y: height}}

            },

            ShowSaveingRect: function(layer) {
                var rect = this._drawRect.drawingRectPos;
                var ctx = layer._context;

                ctx.beginPath();

                    ctx.strokeStyle = "#FF0000";
                    // drawingRect
                    ctx.rect(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);
                    // centralPoint
                    ctx.rect(this.centralPoint.x-2,this.centralPoint.y-2,4,4);
                    
                ctx.closePath();
                ctx.stroke();
            },

            ShowRemovingRect: function(layer) {
                var rect = this._drawRect.drawingRectPos;
                var ctx = layer._context;

                ctx.beginPath();
                    
                    ctx.strokeStyle = "#0000FF";
                    // drawingRect
                    ctx.rect(rect.p0.x,rect.p0.y,rect.p1.x,rect.p1.y);

                ctx.closePath();
                ctx.stroke();
            },

            _begin: function() {
                this.setHaveChanges();
                
                if(this._onBegin) {
                    this._onBegin.call(this, this._layer,armlib,lib)
                };

                this.initTransformMatrix();
                this.initSkeleton();
                
                this.updateDrawingRectPos();
                this.saveDrawingRectImage();
        
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
                    this.updateSkeleton();
                    //this.initSkeleton();

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
                if(this._onMouseDown && this.Skeleton.HasPoint({x: e.x, y: e.y})) {
                	this._onMouseDown(e);
                }

            },

            __onMouseUp: function(e) {
                if(this._onMouseUp && this.Skeleton.HasPoint({x: e.x, y: e.y})) {
                    this._onMouseUp(e);
                }

            },

            __onMouseMove: function(e) {
                if(this._onMouseMove && this.Skeleton.HasPoint({x: e.x, y: e.y})) {
                    this._onMouseMove(e);
                }

            },

            // Setters/Getters
            set Skeleton(skeleton) {
                this._skeleton = skeleton;
            },

            get Skeleton() {
                return this._skeleton;
            },


		}
    });
    armlib._class.Primitive = Primitive;
})(armlib,gizmo);
