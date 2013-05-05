window.onload = function() {
    (function(armlib,lib) {

        armlib.bindWithTag({container: 'container'});
		
        

        b = new armlib.Layer({
            name: "b",
            zindex: 2,
            width: 500,
            height: 500
        });

        bg = new armlib.Layer({
            name: "bg",
            fps: 0.5,
            zindex: 0,
            width: 500,
            height: 500
        });

        l = new armlib.Layer({
            name: "l",
            fps: 30,
            zindex: 1,
            width: 500,
            height: 500
        })
        .setFunc("onMouseMove", function(e) {
            var x = e.layerX;
            var y = e.layerY;
            var obj = r3;
            obj.x = x-obj.width/2;
            obj.y = y-obj.height/2;
          
            obj.centralPoint = {x:x, y:y};
            r7.x = obj.x + 50;
            r9.y = obj.y + 50;


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
            console.log(e.keyCode)
            this.x += 5;
        });
		
        inc = 0.01

        r3 = new armlib.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
            x: 250,
            y: 250,
            width: 100,
            height: 100,
            angle: 0,
            //globalAlpha: 0.5,
            centralPoint: {x: 300, y: 300}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r3');
        })
        .setFunc('onUpdate', function() {
            //this.x += 0.5
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
            this.zindex += 1;
            
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
            r5.angle -=0.01;
        })

        r7 = new armlib.Rect({
            name: 'r7',
            zindex: 10,
            x: 250,
            y: 250,
            width: 100,
            height: 100,
            centralPoint: {x: 100, y: 100},
            fill: "#ff0000",
            stroke: "#00ff00",
            lineWidth: 5
        })
        .setFunc('onLoad', function(layer) {
            console.log('onLoad r7');
         
        })
        .setFunc('onUpdate', function() { 
            //r5.angle -=0.01;
        })

        r8 = new armlib.Line({
            name: 'r8',
            zindex: 10,
            x1: 50,
            y1: 50,
            x2: 250,
            y2: 250,
            lineWidth: 2,
            
            centralPoint: {x: 100, y: 100},
            stroke: "#aa0000"
        })
        .setFunc('onLoad', function(layer) {
            console.log('onLoad r8');
         
        })
        .setFunc('onUpdate', function() { 
            r8.angle -=0.01;
            r8.centralPoint.x += 0.1;
            r8.centralPoint.y += 0.1;

        })

        r9 = new armlib.Circle({
            name: 'r9',
            zindex: 10,
            x: 150,
            y: 150,
            radius: 50,
            lineWidth: 2,
            
            centralPoint: {x: 100, y: 100},
            fill: "#ff0000",
            stroke: "#00ff00",
            globalAlpha: 0.5
        })
        .setFunc('onLoad', function(layer) {
            console.log('onLoad r9');
         
        })
        .setFunc('onUpdate', function() { 
            this.angle += 0.1;
            if(this.globalAlpha == 1) {
                inc *= -1;
            }
            if(this.globalAlpha == 0) {
                inc *= -1;
            }
            this.globalAlpha += inc;
            
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
        .addChild(r7)
        .addChild(r8)
        .addChild(r9)

        
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