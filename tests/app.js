window.onload = function() {
    (function(armlib,lib) {
        r0 = new armlib.class.Rect({
            name: 'rect0',
            width: 5,
            height: 5,
			x: 50,
			y: 50,
            fill: '#FF0000',
            stroke: '#aa0000'
        });	

        r3 = new armlib.class.Image({
            name: 'r3',
            src: './img/item.png',
            zindex: 3,
            width: 50,
            height: 100,
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
        }).setFunc('onLoad', function() {
			console.log('onLoad r5');
		});
		
		obj1 = new armlib.class.Object({
			name: 'obj1',
			x: 50,
			y: 50,
			angle: 0.3
		}).setFunc('onLoad', function() {
			console.log('onLoad obj1');			
		}).addChild(r3).addChild(r5);

		obj2 = new armlib.class.Object({
			name: 'obj2',
			x: 50,
			y: 50,
		}).setFunc('onLoad', function() {
			console.log('onLoad obj2');			
		}).addChild(r0);
		
        l = new armlib.class.Layer({
            container: 'container',
            name: 'ground',
			zindex: 2,
            width: 300,
            height: 300
        }).setFunc('onLoad', function(){
			console.log('onLoad l');
		}).addChild(obj1);

        action = new armlib.class.Layer({
            container: 'container',
            name: 'action',
			zindex: 1,
            width: 300,
            height: 300
        }).setFunc('onLoad', function(){
			console.log('onLoad l');
		}).addChild(obj2);

		
		armlib.setFunc('onLoad', function() {
			this._draw();
			console.log('onLoad armlib');
		});
		armlib._load();
	
    })(armlib,gizmo);

}