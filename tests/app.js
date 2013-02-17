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
            //centralPoint: {x: 50, y: 50},
			width: 500,
            height: 500,
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r1');
			//this._saveChanges();
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
			fps: 1,
			zindex: 0,
			synch: false
        })
		.setFunc('onLoad', function(){
			console.log('onLoad action');
			//this.run();
		})
		.addChild(r1)
		//.addChild(obj2)

        r3 = new armlib.class.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
			x: 10,
			y: 10,
            width: 100,
            height: 100,
			//angle: 0.5,
			centralPoint: {x: 50, y: 50},
			synch: false
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r3');
			//this._saveChanges();
		});
		
        r5 = new armlib.class.Image({
            name: 'r5',
            src: './img/images (1).jpg',
            x: 100,
            y: 10,
            width: 50,
            height: 50,
			centralPoint: {x: 125, y: 75},
			synch: false
        })
		.setFunc('onLoad', function(layer) {
			console.log('onLoad r5');
			//layer.run();
		})
		.setFunc('onUpdate', function() { this.angle-=0.1;
		})
		.setFunc('preDraw', function(ctx) {
			//ctx.clearRect(-2,-2,this.width+5,this.height+5);
		})
		.setFunc('onDraw', function(ctx) {
			ctx.moveTo(this.x + 25, this.y + 25);
			ctx.lineTo(this.x + 100,this.y + 100);
		})
		r6 = new armlib.class.Image({
            name: 'r6',
            src: './img/googlebot-kun-1b.png',
            x: 150,
            y: 100,
            width: 150,
            height: 150,
			synch: false
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r6');
			//this._saveChanges();
		})

		
        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',
			zindex: 1,
			synch: false
        })
		.setFunc('onLoad', function(){
			console.log('onLoad l');
			//this.run();
		})
		.addChild(r3)
		.addChild(r5)
		//.addChild(r6);

		armlib.setFunc('onLoad', function() {
			//this.run();
			console.log('onLoad armlib');
		});
		armlib.Load();
	
    })(armlib,gizmo);

}