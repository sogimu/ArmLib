window.onload = function() {
    (function(armlib,lib) {
        // action = new armlib.class.Layer({
            // container: 'container',
            // name: 'action',
			// fps: 1,
			// zindex: 0
        // });
		
		l = new armlib.class.Layer({
            container: 'container',
            name: 'l',
			zindex: 1
        });
		
		
		r0 = new armlib.class.Rect({
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
		});

		r1 = new armlib.class.Image({
            name: 'r1',
            src: './img/gras.jpg',
			width: 500,
            height: 500,
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r1');
			//action.addChild(this);
		});
		
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
        })
		.setFunc('onLoad', function() {
			console.log('onLoad r3');
		})
		
        r5 = new armlib.class.Image({
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
		.setFunc('onUpdate', function() { this.angle-=0.1;})
		.setFunc('preDraw', function(ctx) {})
		.setFunc('onDraw', function(ctx) {
			ctx.moveTo(this.x + 25, this.y + 25);
			ctx.lineTo(this.x + 100,this.y + 100);
		})

		obj2 = new armlib.class.Object({
			name: 'obj2',
            zindex: 1,
			x: 50,
			y: 50,
		})
		.setFunc('onLoad', function() {
			console.log('onLoad obj2');
			l.addChild(obj2);
		})
		.addChild(r5)
		.addChild(r0)
		.addChild(r1)
		.addChild(r3)
		.Load();
		//debugger
		
		// r6 = new armlib.class.Image({
            // name: 'r6',
            // src: './img/googlebot-kun-1b.png',
            // x: 150,
            // y: 100,
            // width: 150,
            // height: 150,
			// synch: false
        // })
		// .setFunc('onLoad', function() {
			// console.log('onLoad r6');
			// l.addChild(this);
		// })

    })(armlib,gizmo);

}