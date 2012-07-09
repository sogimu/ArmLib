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
	
	var update = function() { // ћетод вызывающий update()	у всех обектов в обектах типа Arm.Object, добавленныйх на обработку
		log('update');
	}
	var draw = function() { // ћетод вызывающий draw() у всех обектов в обектах типа Arm.Object, добавленныйх на обработку
		log('draw');
	}
	var process = function() {
		update();
		draw();
	}
	
	var add = function(O) { // ћетод добавл€ет обект типа Arm.Object на обработку
		collection.push( O );
		return true;
	}
	var remove = function(O) { // ћетод удал€ет обект типа Arm.Object из обработки
		return true;
	}
	var stop = function() { // «апускает движок
		clearInterval( intervalId )
	}
	var run = function() { // ќстанавливает движок
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
	constructor: Arm.Drawing.Stage, 
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

Arm.Drawing.Shape = (function () { 
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
		constructor: Arm.Drawing.Shape, 
		version: "0.1" 
	}; 
// вернуть конструктор, 
// создающий новое пространство имен 
return Constr;
}()); 

Shape = Arm.Drawing.Shape;
Drawing = Arm.Drawing;