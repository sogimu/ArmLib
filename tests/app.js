window.onload = function() {
    (function(armlib,lib) {
        r0 = new armlib.class.Rect({
            name: 'rect0',
            width: 5,
            height: 5,
			x: 400,
			y: 250,
            fill: '#FF0000',
            stroke: '#aa0000'
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r0');
		})

		r1 = new armlib.class.Image({
            name: 'r1',
            src: './img/gras.jpg',
            width: 500,
            height: 500,
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r1');
		});
		obj2 = new armlib.class.Object({
			name: 'obj2',
            zindex: 1,
			x: 50,
			y: 50,
		})
		.setFunc('onLoad', function() {
			console.log('onLoad obj2');			
		})
		.addChild(r0);
		
		action = new armlib.class.Layer({
            container: 'container',
            name: 'action',
			fps: 5,
			zindex: 0,
			synch: false
        })
		.setFunc('onLoad', function(){
			console.log('onLoad action');
			this.run();
		})
		.addChild(r1)
		//.addChild(obj2)

        r3 = new armlib.class.Image({
            name: 'r3',
            src: 'http://www.gazprom.ru/f/posts/11/061858/nosov_01.jpg',
            zindex: 6,
            width: 50,
            height: 100,
			synch: false
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r3');
		});
		
        r5 = new armlib.class.Image({
            name: 'r5',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6QEi-g0hm8843xgjoKicbK-pvDQGXcFBpooF8RFo9Y8UEru8v',
            x: 0,
            y: 0,
            width: 150,
            height: 150,
			centralPoint: {x: 125, y: 75},
			synch: false
        })
		.setFunc('onLoad', function(layer) {
			console.log('onLoad r5');
			layer.run();
		})
		.setFunc('onUpdate', function() { this.angle-=0.01;})
		.setFunc('preDraw', function(ctx) {
			ctx.clearRect(-2,-2,this.width+5,this.height+5);
		})
		.setFunc('onDraw', function(ctx) {
			ctx.moveTo(25,25);
			ctx.lineTo(100,100);
		})
		r6 = new armlib.class.Image({
            name: 'r6',
            src: 'http://lh5.ggpht.com/-yrD9VPTixAE/Tl34wHv7KvI/AAAAAAAACik/Gvb0fqjTyrk/s512/googlebot-kun-1b.png',
            x: 150,
            y: 100,
            width: 150,
            height: 150,
			synch: false
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r6');
		})

		
        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',
			zindex: 1,
			synch: false
        })
		.setFunc('onLoad', function(){
			console.log('onLoad l');
		})
		.addChild(r3)
		.addChild(r5)
		.addChild(r6);

		armlib.setFunc('onLoad', function() {
			this.run();
			console.log('onLoad armlib');
		});
		armlib.Load();
	
    })(armlib,gizmo);

}