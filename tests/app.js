window.onload = function() {
    (function(armlib,lib) {

        armlib.bindWithTag({container: 'container'});
		
        l = new armlib.Layer({
            name: "l",
            fps: 0,
            zindex: 1,
            width: 1300,
            height: 600
        });

        // b = new armlib.Layer({
        //     name: "b",
        //     zindex: 0,
        //     width: 1300,
        //     height: 600
        // });

        bg = new armlib.Layer({
            name: "bg",
            fps: 0.5,
            zindex: 0,
            width: 1300,
            height: 600
        });
        
        r1 = new armlib.Image({
            name: "r1",
            src: "./img/gras.jpg",
            zindex: 0,
            x: 0,
            y: 0,
            width: 500,
            height: 500,
            centralPoint: {x: 70, y: 70}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r1');
            bg.addChild(this);
        })
        .setFunc("onKeyDown", function(e) {
            this.x += 1;
        });
		
        r3 = new armlib.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
            x: 25,
            y: 35,
            width: 100,
            height: 100,
            //angle: 0.3,
            centralPoint: {x: 70, y: 70}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r3');
        })
        .setFunc('onUpdate', function() {
            this.angle += 0.10;
            //this.x += 1;
        })
		
        r5 = new armlib.Image({
            name: 'r5',
            src: './img/images (1).jpg',
            zindex: 10,
            x: 150,
            y: 10,
            width: 100,
            height: 100,
            centralPoint: {x: 25, y: 25}
        })
        .setFunc('onLoad', function(layer) {
            console.log('onLoad r5');
         
        })
        .setFunc('onUpdate', function() { 
            r5.angle -=0.05;
        })
        .setFunc('preDraw', function(ctx) {})
        .setFunc('onDraw', function(ctx) {
            ctx.moveTo(this.x + 25, this.y + 25);
            ctx.lineTo(this.x + 100,this.y + 100);
        })
        
        obj2 = new armlib.Object({
            name: 'obj2',
            x: 100,
            //angle: 0.3
        })
        .setFunc('onLoad', function() {
            console.log('onLoad obj2');
            l.addChild(this)
        })
        .addChild(r3)
        .addChild(r5)
        
        loadQuane = new armlib.Object({
            name: "loadQuane",
            x: 100,
            y: 100
        })
        .setFunc("onLoad", function() {
            console.log('onLoad loadQuane');
            armlib.run();
            //bg.run();
            //l.stop();
            //b.stop();
        })
        .addChild(r1)
        .addChild(obj2)
        .Load();
        
    })(armlib,gizmo);

}