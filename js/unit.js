/**
 * Created with JetBrains WebStorm.
 * User: Sagima
 * Date: 01.07.12
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */
 
var Arm = Arm || {} // РІРѕР·РІСЂР°С‰Р°РµС‚ РїРµСЂРІРѕРµ РёСЃС‚РёРЅРЅРѕРµ РёР»Рё РїРѕСЃР»РµРґРЅРµРµ РЅРµ РёСЃС‚РёРЅРЅРѕРµ
namespace(Arm,'Stage'); 
namespace(Arm,'Object');
namespace(Arm,'Rect');
namespace(Arm,'Circle');


Arm.Stage = (function () { 
var collection=[], contex={}, intervalId='', fps=60
	
	var update = function() { // РњРµС‚РѕРґ РІС‹Р·С‹РІР°СЋС‰РёР№ update()	Сѓ РІСЃРµС… РѕР±РµРєС‚РѕРІ С‚РёРїР° Arm.Object, РґРѕР±Р°РІР»РµРЅРЅС‹С… РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ
		//log(collection)
		if( collection.length > 0) {
			for (var i=0; i<collection.length; i++) {
				
				collection[i].update();
				log("Message: Arm.Stage, update()");}
			return true;
		} else {
		
				log("Error: Arm.Stage, update() 'collection is empty!' ");
				return false;
		}
	}
	var draw = function() { // РњРµС‚РѕРґ РІС‹Р·С‹РІР°СЋС‰РёР№ draw() Сѓ РІСЃРµС… РѕР±РµРєС‚РѕРІ РІ РѕР±РµРєС‚Р°С… С‚РёРїР° Arm.Object, РґРѕР±Р°РІР»РµРЅРЅС‹Р№С… РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ
		if( collection.length > 0) {
			for (var i=0; i<collection.length; i++) {
	
				collection[i].draw();
				log("Message: Arm.Stage, draw()");
				
			}	
			return true;
		} else {
		
			log("Error: Arm.Stage, draw() 'collection is empty!' ");
			return false;
		}
	}
	var process = function() {
		update();
		draw();
	}
	
	var add = function(O) { // РњРµС‚РѕРґ РґРѕР±Р°РІР»СЏРµС‚ РѕР±РµРєС‚ С‚РёРїР° Arm.Object РЅР° РѕР±СЂР°Р±РѕС‚РєСѓ
		if (collection.push( O )) {
			log("Message: Arm.Stage, add() 'added object!' ");
			return true;
		} else {
			
			log("Error: Arm.Stage, add() '?' ");
			return false;
		}
	}
	var remove = function(O) { // РњРµС‚РѕРґ СѓРґР°Р»СЏРµС‚ РѕР±РµРєС‚ С‚РёРїР° Arm.Object РёР· РѕР±СЂР°Р±РѕС‚РєРё
		if( collection.length > 0) {
			var index = 0;
			
			for (var i in collection){
				if (collection[i] === O) {
		
					collection.splice(index, 1);
					log("Message: Arm.Stage, remove() 'remove object!' ");
					return true;
	
				} else {
	
					log("Error: Arm.Stage, remove() 'collection is empty!' ");
					return false;
				}
				index++;
			}
		}	
	}	
	var stop = function() { // РћСЃС‚Р°РЅР°РІР»РёРІР°РµС‚ РґРІРёР¶РѕРє
		if ( clearInterval( intervalId ) ) {
			log("Message: Arm.Stage, stop()");
		} else {
			log("Error: Arm.Stage, stop() '?' ");
		}
	}
	var run = function() { // Р—Р°РїСѓСЃРєР°РµС‚ РґРІРёР¶РѕРє
		intervalId = setInterval( process, 1000 / fps );
		if ( intervalId ) {
			log("Message: Arm.Stage, run()");
			return true;
			} else {
			log("Error: Arm.Stage, run() '?' ");
		}
	}

// РѕР±С‰РµРґРѕСЃС‚СѓРїРЅС‹Рµ РјРµС‚РѕРґС‹ -- РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ 
var Constr = function(O) {
		var container = document.getElementById(O.container)
		var canvas = document.createElement('canvas');
		canvas.width = O.width
		canvas.height = O.height
		canvas.style.id = '2k2nd';
		container.appendChild( canvas );
		contex = canvas.getContext('2d');
		return true;
}; 
// РѕР±С‰РµРґРѕСЃС‚СѓРїРЅС‹Рµ РјРµС‚РѕРґС‹ -- РїСЂРѕС‚РѕС‚РёРї 

Constr.prototype = { 
	constructor: Arm.Stage, 
	version: "0.1",
	add: add,
	remove: remove,
	update: update,
	draw: draw,
	run: run,
	stop: stop
}; 
// РІРµСЂРЅСѓС‚СЊ РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ, 
// СЃРѕР·РґР°СЋС‰РёР№ РЅРѕРІРѕРµ РїСЂРѕСЃС‚СЂР°РЅСЃС‚РІРѕ РёРјРµРЅ 
return Constr;
}()); 

var CShape = (function() {
    var CShape = function CShape() {
        this.x = 0;
        this.y = 0;
        this.stroke = 'black';
        this.lineWidth = 1;
        this.zIndex = 0;
        this.context = 'undefined';
    };
    CShape.prototype = {
        setX: function(O) {
            if(typeof(O) == 'number') this.x = O;
        },
        setY: function(O) {
            if(typeof(O) == 'number') this.y = O;
        },                    
        setStroke: function(O) {
            if(typeof(O) == 'string') this.stroke = O;
        },
        setzIndex: function(O) {
            if(typeof(O) == 'number') this.zIndex = O;
        },
        setContext: function(O) {
            if(typeof(O) != 'undefined') this.context = O;
        },
        getContext: function() {
            if(typeof(this.context) == 'undefined') return this.context;
        },
        getX: function() {
            if(typeof(this.x) == 'number') return this.x;
        },
        getY: function() {
            if(typeof(this.y) == 'number') return this.y;
        },
        getStroke: function() {
            if(typeof(this.stroke) == 'string') return this.stroke;
        },
        getzIndex: function() {
            if(typeof(this.zIndex) == 'number') return this.zIndex;
        },
        getLineWidth: function() {
            if(typeof(this.lineWidth) == 'number') return this.lineWidth;
        },

        clone: function() {
            var obj = new this.constructor();
            LibJS.copy(obj, LibJS.clone(this));
            return obj;
        }
    }
    return CShape;
}());

Arm.CRect = (function() {
    var CRect = function CRect(O) {
        this.fill = 'gray';

        if(typeof(O) != 'undefined') {
            if(typeof(O.x) == 'number') {this.setX(O.x)} else {this.setX(0);}
            if(typeof(O.y) == 'number') {this.setY(O.y)} else {this.setY(0);}
            if(typeof(O.width) == 'number') {this.setWidth(O.width)} else {this.setWidth(100);}
            if(typeof(O.height) == 'number') {this.setHeight(O.height)} else {this.setHeight(100);}
            if(typeof(O.stroke) == 'string') {this.setStroke(O.stroke)} else {this.setStroke('black');}
            if(typeof(O.fill) == 'string') {this.setFill(O.fill)} else {this.setFill('gray');}
            if(typeof(O.zIndex) == 'number') {this.setzIndex(O.zIndex)} else {this.setzIndex(0);}
            if(typeof(O.context) != 'undefined') {this.setContext(O.context)} else {this.setContext(Arm.Stage.getContext());}
        }
    };
    CRect.prototype = {
        setWidth: function(O) {
            if(typeof(O) == 'number') this.width = O;
        },
        setHeight: function(O) {
            if(typeof(O) == 'number') this.height = O;
        },
        setFill: function(O) {
            if(typeof(O) == 'string') this.fill = O;
        },
        getWidth: function() {
            if(typeof(this.width) == 'number') return this.width;
        },
        getHeight: function() {
            if(typeof(this.height) == 'number') return this.height;
        },
        getFill: function() {
            if(typeof(this.fill) == 'number') return this.fill;
        },

        draw: function() {
            this.context.beginPath();
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.fillStyle = this.fill;
            this.context.fill();
            this.context.lineWidth = this.lineWidth;
            this.context.strokeStyle = this.stroke;
            this.context.stroke();
        }
    };
    LibJS.inherit(CRect,CShape);
    return CRect;
}()); 

var Rect = Arm.CRect;
