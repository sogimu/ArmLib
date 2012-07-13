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
        this.x = '0';
        this.y = '0';
        this.stroke = '#sdc';
        this.zIndex = 0;
    };
    CShape.prototype = {
        setX: function(O) {
            if(typeof(O) != 'undefined')
            this.x = O;
        },
        setY: function(O) {
            this.y = O;
        },                    
        setStroke: function(O) {
            this.stroke = O;
        },
        setzIndex: function(O) {
            this.zIndex = O;
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
        if(typeof(O) != 'undefined') {
        this.setX(O.x);
        this.setY(O.y);
        this.setStroke(O.stroke);
        this.setzIndex(O.zIndex);
        }
    };
    LibJS.inherit(CRect,CShape);
    return CRect;
}()); 

var Rect = Arm.CRect;
