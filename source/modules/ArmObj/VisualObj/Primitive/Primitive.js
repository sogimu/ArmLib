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
			_oldX: 0,
			_oldY: 0,
			_oldWidth: 0,
			_oldHeight: 0,
			_oldLandscape: null

        },
		Methods: {

            _begin: function() {
				if(this.haveOwner()) {
					this._begin = function() {
						if(this._onBegin) {this._onBegin.call(this, this._layer,armlib,lib)};
					}
					this._begin();
				} else {
					throw Error('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
				}

            },


			_clear: function() {
				if(this.haveOwner()) {
					this._saveDisplayUnderPrimitive();
				
					this._clear = function() {
						//this._context.clearRect(0,0,this._layer.width,this._layer.height);

						this._removePrimitiveFromDisplay();
						this._saveDisplayUnderPrimitive();
						
					}
					this._clear();
				} else {
					throw Error('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
				}

			},
            _update: function() {
				if(this.haveOwner()) {
					this._update = function() {
						if(this._onUpdate) {this._onUpdate.call(this, this._layer,armlib,lib)};
					}
					this._update();
				} else {
					throw Error('object with type '+this.getType()+' and name '+this.getName()+' have not owner!');
				}

            },

            _saveDisplayUnderPrimitive: function() {
				var angelRad = this.angle;
				var m = this.centralPoint.x + this.x;
				var n = this.centralPoint.y + this.y;

				var MTrans = new gizmo.Matrix([
					[Math.cos(angelRad),Math.sin(angelRad),0],
					[-Math.sin(angelRad),Math.cos(angelRad),0],
					[-m*(Math.cos(angelRad)-1)+n*Math.sin(angelRad),-m*Math.sin(angelRad)-n*(Math.cos(angelRad)-1),1]
				]);

				//this.x = 10;
				//this.y = 10;
				//this.width = 50;
				//this.height = 50;
				var points = new gizmo.Matrix([[this.x,this.y,1],[this.x+this.width,this.y,1],[this.x+this.width,this.y+this.height,1],[this.x,this.y+this.height,1]]);
				var mainPoint = points.x(MTrans).elements;
				
				var x = Math.min(mainPoint[0][0],mainPoint[1][0],mainPoint[2][0],mainPoint[3][0]);
				var y = Math.min(mainPoint[0][1],mainPoint[1][1],mainPoint[2][1],mainPoint[3][1]);
				var width = Math.max(mainPoint[0][0],mainPoint[1][0],mainPoint[2][0],mainPoint[3][0]);
				var height = Math.max(mainPoint[0][1],mainPoint[1][1],mainPoint[2][1],mainPoint[3][1]);
				this._oldX = x < 0?0:x;
				this._oldY = y < 0?0:y;
				this._oldWidth = /*width;//*/(width <= 0?1:width);
				this._oldHeight = /*height;//*/(height <= 0?1:height);
				
				//if(this.d <1) {
					//console.log([this._oldX,this._oldY,this._oldWidth,this._oldHeight]);
					//this._context.beginPath();
						//l._context.rect(this._oldX,this._oldY,this._oldWidth-this._oldX,this._oldHeight-this._oldY);
					//this._context.closePath();
						//this._context.fill();
						//this._context.stroke();						
					//this.d+=1;
				//}

				this._oldLandscapes = this._context.getImageData(this._oldX,this._oldY,this._oldWidth-this._oldX,this._oldHeight-this._oldY);
			},

            _removePrimitiveFromDisplay: function() {
            	this._context.putImageData(this._oldLandscapes,this._oldX,this._oldY);
            	
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
                if(this._onMouseDown && this._havePoint(e)) {
                	this._onMouseDown(e);
                }

            },

            // Setters/Getters

		}
    });
    armlib._class.Primitive = Primitive;
})(ArmLib,gizmo);
