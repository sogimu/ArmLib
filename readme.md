ArmLib
======

ArmLib is compact JavaScript engine for work into browser with Canvas HTML5 technology.

Supported browsers:

* Firefox 3.5+
* Google Chrome
* Opera 10+


Example
=======
<code>
var stage = new Arm\.Stage\(\{container: 'container',width: '500',height: '500'\}\)\;

var ball = new CObject\(\{
	name: 'ball', 
	collection: \[ new CImage\(\{x: -17, y: -15,width: 34, height: 30, angel: 0, src: 'image/ball.png'\}\)\],
	skeleton: \[ {x0:-15,y0:-14,x1:17,y1:-15},{x0:17,y0:-17,x1:19,y1:17},{x0:19,y0:17,x1:-17,y1:15},{x0:-17,y0:15,x1:-15,y1:-14} ],
	center: {x: 250, y: 350},
	rotateCenter: {x: 0, y: 0},
	angel: 0,
	
	vars: {
		width: 0,
		height: 0,
		inc: 5,
		factorX: 1,
		factorY: -1

	},
	begin: function(stage) {
		this.width = this.collection[0].width;
		this.height = this.collection[0].height;

	},
	update: function(stage) {
		this.x += 5;
		this.y += 5;
	},
	events: { 
		collision: function(obj, e, stage) {

		},
		onkeydown: function(e, stage) {

		}
	}
});

var rect = new CRect({x: 15, y: 15,width: 100, height: 30, angel: 0});

var image = new CImage({x: 15, y: 50, width: 100, height: 100, src: 'image/label.png'});


stage.add(ball);  
stage.add(rect);
stage.add(image);

stage.run(); 
stage.info();
</code>