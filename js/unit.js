/**
 * Created with JetBrains WebStorm.
 * User: Sagima
 * Date: 01.07.12
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */
 
var Arm = Arm || {}

Arm = (function(){
    var CSuperObj = (function() {
        var CSuperObj = function() {
            this.zIndex = 0;
            this.context = null;
            this.visible = true;
        };
        CSuperObj.prototype = {
            setContext: function(O) {
                this.context = O;
            },
            getContext: function() {
                return this.context;
            },
            setzIndex: function(O) {
                this.zIndex = O;
            },
            getzIndex: function() {
                return this.zIndex;
            },
            show: function() {
                this.visible = true;
            },
            hide: function() {
                this.visible = false;
            },
            clone: function() {
                var obj = new this.constructor();
                LibJS.copy(obj, LibJS.clone(this));
                return obj;
            }
        }
        return CSuperObj;
    }());

    var CObject = (function() {
        var CObject = function(O) {
            this.collection = [];
            this.objects = null;

            if(typeof(O) != 'undefined') {
                if(typeof(O.x) == 'number') {this.setX(O.x)} else {this.setX(0);}
                if(typeof(O.y) == 'number') {this.setY(O.y)} else {this.setY(0);}
                if(typeof(O.zIndex) == 'number') {this.setzIndex(O.zIndex)} else {this.setzIndex(0);}
                if(typeof(O.collection) == 'object') {this.setCollection(O.collection)} else {this.setCollection(null);}
                if(typeof(O.update) == 'function') {this.setUpdate(O.update)} else {this.setUpdate(null);}
            }

        };
        CObject.prototype = {
            add: function(O) {
                this.collection.push( O );
            },
            remove: function(O) {
                for(var i in this.collection){
                    if(this.collection[i] == O){
                        delete this.collection[i];
                    }
                }
            },
            update: function() {
            },
            _update: function() {
                this.update();
                for(var i in this.collection){

                    this.collection[i]._update();
                }
            },
            setUpdate: function(O) {
                this.update = O;
            },
            setCollection: function(O) {
                this.collection = O;
            },
            _draw: function() {
                for(var i in this.collection){
                    this.collection[i]._draw();
                }
            }
        }
        LibJS.inherit(CObject,CSuperObj);
        return CObject;
    }());

    var CShape = (function() {
        var CShape = function CShape() {
            this.x = 0;
            this.y = 0;
            this.stroke = 'black';
            this.lineWidth = 1;
            this.type = 'shape';
        };
        CShape.prototype = {
            setX: function(O) {
                this.x = O;
            },
            setY: function(O) {
                this.y = O;
            },
            setStroke: function(O) {
                this.stroke = O;
            },
            getX: function() {
                return this.x;
            },
            getY: function() {
                return this.y;
            },
            getStroke: function() {
                return this.stroke;
            },
            setLineWidth: function(O) {
                this.lineWidth = O;
            },
            getLineWidth: function() {
                return this.lineWidth;
            }
        }
        LibJS.inherit(CShape,CSuperObj);
        return CShape;
    }());

    var CRect = (function(){

        var CRect = function(O) {
            this.width = 10;
            this.height = 10;
            this.fill = '#aaa';

            if(typeof(O) != 'undefined') {
                if(typeof(O.x) == 'number') {this.setX(O.x)} else {this.setX(0);}
                if(typeof(O.y) == 'number') {this.setY(O.y)} else {this.setY(0);}
                if(typeof(O.width) == 'number') {this.setWidth(O.width)} else {this.setWidth(100);}
                if(typeof(O.height) == 'number') {this.setHeight(O.height)} else {this.setHeight(100);}
                if(typeof(O.stroke) == 'string') {this.setStroke(O.stroke)} else {this.setStroke('black');}
                if(typeof(O.fill) == 'string') {this.setFill(O.fill)} else {this.setFill('gray');}
                if(typeof(O.zIndex) == 'number') {this.setzIndex(O.zIndex)} else {this.setzIndex(0);}
                if(typeof(O.context) != 'undefined') {this.setContext(O.context);}
            }

        }
        CRect.prototype = {
            setWidth: function(O) {
                this.width = O;
            },
            setHeight: function(O) {
                this.height = O;
            },
            setFill: function(O) {
                this.fill = O;
            },
            getWidth: function() {
                return this.width;
            },
            getHeight: function() {
                return this.height;
            },
            getFill: function() {
                return this.fill;
            },

            _draw: function() {
                this.context.beginPath();
                this.context.rect(this.x, this.y, this.width, this.height);
                this.context.fillStyle = this.fill;
                this.context.fill();
                this.context.lineWidth = this.lineWidth;
                this.context.strokeStyle = this.stroke;
                this.context.stroke();
            },
            _update: function() {

            }

        }
        LibJS.inherit(CRect,CShape);
        return CRect;

    }());


    var CStage = (function(){
        var collection=[], context={}, zIndex=0;

        var _update = function() {
            for (var i in collection) {
                collection[i]._update();
                log(collection[i])
            }
            log("Message: Arm.Stage, update()");
        }
        var _draw = function() {
            for (var i in collection) {
                collection[i]._draw();
            }
            log("Message: Arm.Stage, draw()");
        }
        var _process = function() {
            _update();
            _draw();
        }
        var add = function(O) {
            O.context = context;

            if (collection.push( O )) {
                log("Message: Arm.Stage, add() 'added object!' ");
                return true;
            } else {
                log("Error: Arm.Stage, add() '?' ");
                return false;
            }
        }
        var remove = function(O) {
            for (var i in collection){
                if (collection[i] === O) {

                    delete collection[i];
                    log("Message: Arm.Stage, remove() 'remove object!' ");
                    return true;

                } else {

                    log("Error: Arm.Stage, remove() 'collection is empty!' ");
                    return false;
                }
            }
        }
        var stop = function() {
            if ( clearInterval( intervalId ) ) {
                log("Message: Arm.Stage, stop()");
            } else {
                log("Error: Arm.Stage, stop() '?' ");
            }
        }
        var run = function() {
            intervalId = setInterval( _process, 1000 / 1 );
            if ( intervalId ) {
                log("Message: Arm.Stage, run()");
                return true;
            } else {
                log("Error: Arm.Stage, run() '?' ");
            }
        }
        var setContext = function(O) {
            this.context = O;
        }
        var getContext = function() {
            return context;
        }
        var setzIndex = function(O) {
            zIndex = O;
        }
        var getzIndex = function() {
            return zIndex;
        }


        var CStage = function(O) {
            var container = document.getElementById(O.container)
            var canvas = document.createElement('canvas');
            canvas.width = O.width
            canvas.height = O.height
            canvas.style.id = '2k2nd';
            container.appendChild( canvas );
            context = canvas.getContext('2d');
        }
        CStage.prototype = {
            run: run,
            stop: stop,
            add: add,
            remove: remove
        }
        return CStage;
    }());


    var Arm = function() {

    }
    Arm.prototype = {
        CStage: CStage,
        CRect: CRect,
        CObject: CObject

    }
    return new Arm;
}());


var Stage = Arm.CStage;
var Rect = Arm.CRect;