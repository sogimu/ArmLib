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
		
        inc = 0.01

        r3 = new armlib.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            angle: 0.3,
            globalAlpha: 0.1,
            centralPoint: {x: 100, y: 100}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r3');
        })
        .setFunc('onUpdate', function() {
            this.angle += 0.01;
            if(this.globalAlpha == 1) {
                inc *= -1;
            }
            if(this.globalAlpha == 0) {
                inc *= -1;
            }
            this.globalAlpha += inc;
            //this.x += 0.1;
        })
        .setFunc("onMouseDown", function(e) {
            this.angle -=0.05;
            var x = e.layerY;
            var y = e.layerX;
            // this.x = x-this.width/2;
            // this.y = y-this.height/2;
            console.log(this.x,this.y)

            this.centralPoint.x = x;
            this.centralPoint.y = y;
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
            // x: 100,
            // angle: 0.1,
            // centralPoint: {x: 100, y: 100}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad obj2');
            l.addChild(this)
        })
        .setFunc('onUpdate', function() {
            //this.angle -= 0.01;
        })
        .setFunc("onMouseMove", function(e) {
            //alert("am here!");
            var x = e.layerX;
            var y = e.layerY;
            r5.x = x;
            r5.y = y;
            
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

    })(armlib,gizmo);

}