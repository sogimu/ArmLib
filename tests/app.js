window.onload = function() {
    (function(armlib,lib) {
        r0 = new armlib.class.Rect({
            name: 'rect0',
            x: 0,
            y: 0,
            width: 5,
            height: 5,
            fill: '#FF0000',
            stroke: '#aa0000'
        });

        r4 = new armlib.class.Rect({
            name: 'rect4',
            x: 0,
            y: 0,
            width: 150,
            height: 200,
            fill: '#FFBB00',
            stroke: '#aa0000'
        });

		
        r1 = new armlib.class.Rect({
            name: 'rect1',
            x: 10,
            y: 50,
            width: 10,
            height: 10,
            fill: '#00FF00',
            stroke: '#00aa00'
        });	

        r3 = new armlib.class.Image({
            name: 'r3',
            src: './img/item.png',
            zindex: 3,
			x: 0,
            y: 0,
            width: 100,
            height: 100,
            fill: '#0000FF',
            stroke: '#00FF00'
        }).setFunc('onLoad', function() {
			console.log('onLoad r3');
		});

        r5 = new armlib.class.Image({
            name: 'r5',
            src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFSBRNDcJSw6L6YHkXuIVioEY3MtAImY9Y4EU5M3cdXT_tWBesEQ',
            x: 50,
            y: 0,
            width: 150,
            height: 150,
            fill: '#0000FF',
            stroke: '#00FF00'
        }).setFunc('onLoad', function() {
			console.log('onLoad r5');
		});
		
        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',			
            width: 300,
            height: 300
        }).setFunc('onLoad', function(){
			console.log('onLoad l');
		});

        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',			
            width: 300,
            height: 300
        }).setFunc('onLoad', function(){
			console.log('onLoad l');
		});

		
		obj1 = new armlib.class.Object({
			name: 'obj1',
			x: 50,
			y: 50,
		}).setFunc('onLoad', function() {
			console.log('onLoad obj1');			
		});
		l.addChild(obj1);
		
				
		obj1.addChild(r3).addChild(r5).addChild(r0).addChild(r1)
		
		armlib.setFunc('onLoad', function() {
			this._draw();
			console.log('onLoad armlib');
		});
	
    })(armlib,gizmo);

}