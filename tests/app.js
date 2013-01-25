window.onload = function() {
    (function(armlib,lib) {
        r0 = new armlib.class.Rect({
            name: 'rect0',
			onLoad: function() {
                console.log('onLoad r0');
            },
            zindex: 1,
            x: 0,
            y: 0,
            width: 5,
            height: 5,
            centralPoint: {x:0,y:0},
            angle: 0,
            scale: {x:1,y:1},
            fill: '#FF0000',
            stroke: '#aa0000'
        });
		/*r0.setFunc('draw',function(ctx){
			//ctx.clearRect(0,0,5,15);
		});*/

        r1 = new armlib.class.Rect({
            name: 'rect1',
			onLoad: function() {
                console.log('onLoad r1');
            },
            zindex: 1,
            synch: true,
            x: 10,
            y: 50,
            width: 10,
            height: 10,
            centralPoint: {x:0,y:0},
            angle: 0,
            scale: {x:1,y:1},
            fill: '#00FF00',
            stroke: '#00aa00'
        });	
		/*
		r1.setFunc('draw',function(ctx){
			//ctx.clearRect(0,0,25,25);
		});*/


        r3 = new armlib.class.Image({
            name: 'img0',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFSBRNDcJSw6L6YHkXuIVioEY3MtAImY9Y4EU5M3cdXT_tWBesEQ',
            zindex: 0.5,
            synch: true,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            centralPoint: {x:100,y:100},
            angle: 0,
            scale: {x:1,y:1},
            fill: '#0000FF',
            stroke: '#00FF00'
        }).setFunc('onLoad', function(){
			console.log('onLoad r3');
		});

		
        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',
			synch: true,

            width: 300,
            height: 300
        }).setFunc('onLoad', function(){
			console.log('onLoad l');
		});
		
        obj1 = new armlib.class.Object({
            name: 'obj1',
        }).setFunc('draw',function(ctx, layer, armlib, lib) {
			//ctx.clearRect(0,0,30,50);
		}).setFunc('onLoad', function(){
			console.log('onLoad obj1');
		}).setFunc('update', function() {
			alert('update obj1');
		});
		
		l.addChild(obj1);
		
		obj1.addChild(r0).addChild(r1).addChild(r3);
	
		armlib.setFunc('onLoad', function() {
			console.log('onLoad armlib');
			this._draw();
		});
    })(armlib,gizmo);

	var t = function(){alert('до');};

	var d = function() {
		t = JSON.parse('');
	}
}