/**
 * Created with JetBrains WebStorm.
 * User: Sagima
 * Date: 01.07.12
 * Time: 16:08
 * To change this template use File | Settings | File Templates.
 */
 
var Arm = Arm || {} // возвращает первое истинное или последнее не истинное
extend(Arm,'Stage'); 
extend(Arm,'Object');
extend(Arm,'Rect');
extend(Arm,'Circle');


Arm.Stage = (function () { 
var collection=[], contex={}, intervalId='', fps=60
	
	var update = function() { // Метод вызывающий update()	у всех обектов типа Arm.Object, добавленных на обработку
		//log(collection)
		if( collection.length > 0) {
			for (var i=0; i<collection.length; i++) {
				
				collection[i].update();
				log("Message: Arm.Stage, update()");			}
			return true;
		} else {
		
				log("Error: Arm.Stage, update() 'collection is empty!' ");
				return false;
		}
	}
	var draw = function() { // Метод вызывающий draw() у всех обектов в обектах типа Arm.Object, добавленныйх на обработку
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
	
	var add = function(O) { // Метод добавляет обект типа Arm.Object на обработку
		if (collection.push( O )) {
			log("Message: Arm.Stage, add() 'added object!' ");
			return true;
		} else {
			
			log("Error: Arm.Stage, add() '?' ");
			return false;
		}
	}
	var remove = function(O) { // Метод удаляет обект типа Arm.Object из обработки
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
	var stop = function() { // Останавливает движок
		if ( clearInterval( intervalId ) ) {
			log("Message: Arm.Stage, stop()");
		} else {
			log("Error: Arm.Stage, stop() '?' ");
		}
	}
	var run = function() { // Запускает движок
		intervalId = setInterval( process, 1000 / fps );
		if ( intervalId ) {
			log("Message: Arm.Stage, run()");
			return true;
			} else {
			log("Error: Arm.Stage, run() '?' ");
		}
	}

// общедоступные методы -- конструктор 
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
// общедоступные методы -- прототип 

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
// вернуть конструктор, 
// создающий новое пространство имен 
return Constr;
}()); 

var CShape = (function() {
    var CShape = function() {
        this.x = '0';
        this.y = '0';
        this.stroke = '#sdc';
        this.zIndex = 0;
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
        setzIndex: function(O) {
            this.zIndex = O;
        },
        clone: function() {
            var obj = {};
            /*for(var i in this){
                alert(i)
                obj[i] = this[i];
            }*/
            copy(obj.prototype, this.prototype);
            for(var i in this.prototype){
                obj.prototype[i] = this.prototype[i];
            }
            return obj;
        }
    }
    return CShape;
}());


Arm.Rect = (function() {
    var CRect = function(O) {
        this.setX(O.x);
        this.setY(O.y);
        this.setStroke(O.stroke);
        this.setzIndex(O.zIndex);
    };
    CRect.prototype = {

    }
    CRect.prototype = CShape.prototype;
    return CRect;
}()); 

var Rect = Arm.Rect;
