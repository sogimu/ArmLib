window.onload = function() {
    (function(armlib,lib) {
		
		l = new armlib.Layer({
            container: 'container',
            name: 'l',
			zindex: 1,
			width: 1300,
			height: 600
        });

		b = new armlib.Layer({
            container: 'container',
            name: 'b',
			zindex: 0,
			width: 1300,
			height: 600
        });
		
		
		/*r0 = new armlib.class.Rect({
            name: 'r0',
            width: 5,
            height: 5,
            zindex: 15,
			x: 40,
			y: 25,
            fill: '#FF0000',
            stroke: '#aa0000'
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r0');
		});*/

		r6 = new armlib.Image({
             name: 'r6',
             src: './img/googlebot-kun-1b.png',
             x: 150,
             y: 100,
             width: 150,
             height: 150,
			 angle: 0.3
        })
		.setFunc('onLoad', function() {
			 console.log('onLoad r6');
		})
		.setFunc('onUpdate', function() {
			//this.angle += 0.01;
		})

		r1 = new armlib.Image({
            name: 'r1',
            src: './img/gras.jpg',
			width: b.width,
            height: b.height
        })
        .setFunc('onLoad', function() {
			//b.addChild(this);
			console.log('onLoad r1');
			
		})
		.setFunc('onUpdate', function() {
			//this.y += 1;
		})
		.setFunc("onKeyDown", function(e) {
			if(e.keyCode === 38) {
				this.angle+=0.1;
			}
			if(e.keyCode === 40) {
				this.angle-=0.1;
			}
		})
		.setFunc("onKeyPress", function(e) {
			//console.log(e.keyCode);
			if(e.keyCode === 97) {
				this.x-=5;
			}
			if(e.keyCode === 100) {
				this.x+=5;
			}
			if(e.keyCode === 119) {
				this.y-=5;
			}
			if(e.keyCode === 115) {
				this.y+=5;
			}
		});
		//r1.Load();
		
		/*.setFunc('onMouseDown', function(e) {
			console.log("onKeyDown on r1");
			console.log("X="+e.x);
			console.log("Y="+e.y);
		});*/
		
        r3 = new armlib.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
			x: 0,
			y: 0,
            width: 100,
            height: 100,
			//angle: 0.3,
			centralPoint: {x: 0, y: 0}
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r3');
		})
		.setFunc('onBegin', function() {
			this.angle = 0.3;
		})
		.setFunc('onUpdate', function() {
			this.angle += 0.01;
			this.x += 1;
		});

		/*
		.setFunc("onKeyDown", function(e) {
			if(e.keyCode == 38) {
				this.angle+=0.1;
			}
			if(e.keyCode == 40) {
				this.angle-=0.1;
			}
		})
		.setFunc("onKeyPress", function(e) {
			//console.log(e.keyCode);
			if(e.keyCode == 97) {
				this.x-=5;
			}
			if(e.keyCode == 100) {
				this.x+=5;
			}
			if(e.keyCode == 119) {
				this.y-=5;
			}
			if(e.keyCode == 115) {
				this.y+=5;
			}
		})*/
		
		
        r5 = new armlib.Image({
            name: 'r5',
            src: './img/images (1).jpg',
            zindex: 10,
            x: 100,
          y: 10,
            width: 50,
            height: 50,
			centralPoint: {x: 125, y: 75}
        })
		.setFunc('onLoad', function(layer) {
			console.log('onLoad r5');
		})
		.setFunc('onUpdate', function() { 
			//r5.x-=0.05	; 
			//r5.angle +=0.1;
		})
		.setFunc('preDraw', function(ctx) {})
		.setFunc('onDraw', function(ctx) {
			ctx.moveTo(this.x + 25, this.y + 25);
			ctx.lineTo(this.x + 100,this.y + 100);
		})

		obj1 = new armlib.Object({
			name: 'obj1',
            zindex: 1,
			//x: 50,
			//y: 50,
		})

		obj2 = new armlib.Object({
			name: 'obj2',
            zindex: 1,
			//x: 50,
			//y: 50,
		})
		.setFunc('onLoad', function() {
			console.log('onLoad obj2');
			l.addChild(obj2);
			//armlib.run();
			//console.log('run armlib');

		})
		.setFunc('onUpdate', function() {
			//this.angle+=0.01;
		})
		.addChild(r5)
		.addChild(r6)
		//.addChild(r1)
		.addChild(r3)
		//.addChild(obj1);
		//.Load();
	        for(var i=0;i<100;i++) {
	        obj2.addChild(new armlib.Image({
	            name: "rf"+i,
	            src: './img/nosov_01.jpg',
	            zindex: 6,
				x: Math.random()*1300,
				y: Math.random()*600,
	            width: 150,
	            height: 150,
				angle: 0,
				centralPoint: {x: 50, y: 50},
	        })
			.setFunc('onLoad', function() {
				console.log("onLoad "+"rf"+i);
			})
			.setFunc('onUpdate', function() {
				this.angle += 0.02;
				//this.width = Math.random()*100;
				//this.height = Math.random()*100;
				//this.x+=1;
				//this.zindex = 1;
			}));
    	}


		obj3 = new armlib.Object({
			name: "obj3"
		})
                .addChild(obj2)
		.addChild(r1)
		.setFunc("onLoad", function() {
			console.log("onLoad obj3");
			//l.addChild(this);
			armlib.run();
		})
		.Load();

    })(ArmLib,gizmo);

}