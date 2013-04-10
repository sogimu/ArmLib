window.onload = function() {
    (function(armlib,lib) {

        armlib.bindWithTag({container: 'container'});
		
        

        b = new armlib.Layer({
            name: "b",
            zindex: 2,
            width: 1300,
            height: 600
        });

        bg = new armlib.Layer({
            name: "bg",
            fps: 0.5,
            zindex: 0,
            width: 1300,
            height: 600
        });

        l = new armlib.Layer({
            name: "l",
            fps: 0,
            zindex: 1,
            width: 1300,
            height: 600
        });
        
        r1 = new armlib.Image({
            name: "r1",
            src: "./img/gras.jpg",
            //zindex: 0,
            //x: 0,
            //y: 0,
            width: 500,
            height: 500,
            //centralPoint: {x: 70, y: 70}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r1');
            bg.addChild(this);
        })
        .setFunc("onKeyDown", function(e) {
            this.x += 5;
        });
		
        r3 = new armlib.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            //angle: 0.3,
            centralPoint: {x: 50, y: 50}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r3');
        })
        .setFunc('onUpdate', function() {
            //this.angle += 0.01;
            this.x += 1;
        })
		
        r5 = new armlib.Image({
            name: 'r5',
            src: './img/images (1).jpg',
            zindex: 10,
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            centralPoint: {x: 100, y: 100}
        })
        .setFunc('onLoad', function(layer) {
            console.log('onLoad r5');
         
        })
        .setFunc('onUpdate', function() { 
            //r5.angle -=0.01;
        })
        .setFunc('preDraw', function(ctx) {})
        .setFunc('onDraw', function(ctx) {
            //ctx.drawImage(this.image, 20,0,this.width,this.height);

            // this._context.beginPath();
            //     ctx.moveTo(this.x, this.y);
            //     ctx.lineTo(this.x+250,this.y + 250);
            // this._context.closePath();
            // this._context.stroke();
        })
        
        obj2 = new armlib.Object({
            name: 'obj2',
            x: 0,
            angle: 0
        })
        .setFunc('onLoad', function() {
            console.log('onLoad obj2');
            l.addChild(this)
        })
        .addChild(r3)
        .addChild(r5)
        
        loadQuane = new armlib.Object({
            name: "loadQuane",
        })
        .setFunc("onLoad", function() {
            console.log('onLoad loadQuane');
            armlib.run();
            //armlib.stop();
        })
        .addChild(r1)
        .addChild(obj2)
        .Load();

            //console.log(new gizmo.Matrix([]));
            //console.log(/*gizmo.clone(*/new gizmo.Matrix/*([])*//*)*/);
        
        
    })(armlib,gizmo);

}