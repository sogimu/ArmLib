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
		if( collection.length > 0) {
		
			for (var i in collection){
				
				collection[i].update();
				log('update()');
			}
			return true;
		} else {
		
				log("Error: Arm.Stage, update() 'collection is empty!' ");
				return false;
		}
	}
	var draw = function() { // Метод вызывающий draw() у всех обектов в обектах типа Arm.Object, добавленныйх на обработку
		if( collection.length > 0) {
			for (var i in collection){
	
				collection[i].draw();
				log('draw()');
				
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
		
			return true;
			log(collection)
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
					return true;
	
				} else {
	
					log("Error: Arm.Stage, remove() 'collection is empty!' ");
					return false;
				}
				index++;
			}
		}	
	}	
	var stop = function() { // Запускает движок
		clearInterval( intervalId )
	}
	var run = function() { // Останавливает движок
		intervalId = setInterval( process, 1000 / fps );
		return true;
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

Arm.Object = (function () { 
var x=0, y=0, fill='#0a0', stroke='#fff';
	var update = function(i) {
		log('update');
		return true;
	}
	var draw = function(i) {
		log('draw')
		return true;
	}
	var setX = function(i){
		var flag=true;
		type = typeof(i);
		this.x = ( type === 'object')? i.x: (type === 'number')? i: flag = false;
		return flag;
	}
	var setY = function(i){
		var flag=true;
		type = typeof(i);
		this.y = ( type == 'object')? i.y: (type == 'number')? i: flag = false;
		return flag;
	}
	var getX = function(){
		return (typeof(this.x) === 'number')? x: false;
	}
	var getY = function(i){
		
		return (typeof(i) === 'number')? x: false;
	}
	

	// общедоступные методы -- конструктор 
	var Constr = function(i) {
	return {
			x: x,
			y: y,
	//		update: update,
	//		draw: draw,
	//		setX: setX,
			setY: setY,
			getX: getX,
			getY: getY,
			//setFill: setFill,
			//getFill: getFill,
			//setStroke: setStroke,
			//getStroke: getStroke
		};
	}; 
// общедоступные методы -- прототип 

	Constr.prototype = { 
		constructor: Arm.Object, 
		version: "0.1" 
	}; 
// вернуть конструктор, 
// создающий новое пространство имен 
return Constr;
}()); 
