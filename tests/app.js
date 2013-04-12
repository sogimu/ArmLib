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
            fps: 100,
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
        /*
        objects = [];
        imgs = ["googlebot-kun-1b.png", "item.png", "nosov_01.jpg", "images (1).jpg"];

        for(var i=0;i<5000;i++) {
            var img = imgs[Math.floor(4*Math.random())];
            objects.push(new armlib.Image({
                name: i+'e',
                src: "./img/"+img,
                zindex: 6,
                x: Math.random()*1100,
                y: Math.random()*800,
                width: 250,
                height: 250,
                //angle: 0.3,
                centralPoint: {x: Math.random()*1100, y: Math.random()*800}
            })
            .setFunc('onLoad', function() {
                console.log('onLoad r3');
                obj2.addChild(this);
            })
            .setFunc('onUpdate', function() {
                this.angle += 0.01;
                this.x += 0.1;
                //this.zindex = 100*Math.random();
                //console.log(this.name, this.zindex);
            })
            .Load())
        }*/
		
        r3 = new armlib.Image({
            name: 'r3',
            src: './img/nosov_01.jpg',
            zindex: 6,
            x: 70,
            y: 200,
            width: 100,
            height: 100,
            //angle: 0.3,
            centralPoint: {x: 70, y: 200}
        })
        .setFunc('onLoad', function() {
            console.log('onLoad r3');
        })
        .setFunc('onUpdate', function() {
            this.angle += 0.05;
            this.x += 0.1;
        })
        .setFunc("onMouseDown", function(e) {
            this.angle -=0.05;
            var x = e.layerX;
            var y = e.layerY;
            this.x = x;
            this.y = y;
            console.log(this.x,this.y)

            this.centralPoint.x = x + this.width/2;
            this.centralPoint.y = y + this.height/2;
            console.log(this.centralPoint)
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
        
        /*var Point = function(x,y) {
            this._x = x;
            this._y = y;
        };
        Point.prototype = {
            _x:0,
            _y:0,
            get x() {
                return this._x;
            },
            get y() {
                return this._y;
            }
        };

        sgn = function(x) {
            if(x>0) {
                return 1;
            } else if(x<0) {
                return -1;
            } else {
                return 0;
            }
        }

        det4x4 = function(matrix) {
            return matrix[0][0]*matrix[1][1] - matrix[1][0]*matrix[0][1];
        }

        vector2DMult = function(V,W) {
            return V.x * W.x + V.y * W.y;
        }

        vector2DModule = function(V,W) {
            return Math.sqrt(V.x * V.x + V.y * V.y);
        }

        ang = function(V, W) {
            var d = det4x4([[V.x,V.y],[W.x,W.y]]);
            if((vector2DModule(V)*vector2DModule(W)) == 0) {
                return 0;
            }
            if(d != 0) {
                return sgn(d)*Math.acos(vector2DMult(V,W)/(vector2DModule(V)*vector2DModule(W)));
            } else {
                return Math.acos(vector2DMult(V,W)/(vector2DModule(V)*vector2DModule(W)));
            }
        }

        var canvas = document.getElementById("container")
        var canvas1 = document.createElement('canvas');
        canvas1.width = 500;
        canvas1.height = 500;
        canvas1.style.id = '2k2nd';
        container.appendChild( canvas1 );

        ctx = canvas1.getContext('2d');

        // V = new Point(500, 0);
        // W = new Point(70.7106, 70.7106);

        polygone = [];
        polygone = [new Point(10,10),new Point(250,10),new Point(250,250),new Point(10,110)];

        polygone.push(new Point(100, 100));
        
        polygone.push(new Point(120, 120));
        
        polygone.push(new Point(180, 130));
        
        polygone.push(new Point(150, 50));
        
        polygone.push(new Point(120, 70));
        
        var Poligon = gizmo.Class({
            Initialize: function(reg) {
                if(gizmo.isArray(reg)) {
                    for(var i in reg) {
                        this.poligon.push(reg[i]);
                    } 
                } else {
                    throw Error("argument are not array!");
                }
            },
            Statics: {
                _polygone: []
            },
            Methods: {
                havePoint: function(e) {
                    var normedPolygon = [];
                    
                    var polygon = this.polygon;
                    for(var i in polygon){
                        normedPolygon.push(new Point(polygone[i].x - e.x, polygone[i].y - e.y));
                    }

                    var angleSum = 0;
                    for(var i=0;i<normedPolygon.length-1;i++) {
                        angleSum += ang(normedPolygon[i], normedPolygon[i+1]);
                    }
                    angleSum += ang(normedPolygon[normedPolygon.length-1], normedPolygon[0]);

                    if((angleSum - 2*Math.PI < 0.01) && (angleSum - 2*Math.PI > -0.01)) {
                        return true;
                    } else {
                        return false;
                    }

                }
            }
        });

        
        
        window.onmousemove = function(e){
            //ctx.clearRect(0,0,500,500);
            point = new Point(e.layerX,e.layerY);
            
            ctx.moveTo(polygone[0].x,polygone[0].y);
            for(var i in polygone){
                ctx.lineTo(polygone[i].x,polygone[i].y);
            }
            ctx.lineTo(polygone[0].x,polygone[0].y);
            
            ctx.closePath();
            ctx.stroke();

            normedPolygon = [];
                
            for(var i in polygone){
                normedPolygon.push(new Point(polygone[i].x - point.x, polygone[i].y - point.y));
            }

            angleSum = 0;
            for(var i=0;i<normedPolygon.length-1;i++) {
                angleSum += ang(normedPolygon[i], normedPolygon[i+1]);
            }
            angleSum += ang(normedPolygon[normedPolygon.length-1], normedPolygon[0]);

            if(angleSum - 2*Math.PI < 0.01 && angleSum - 2*Math.PI > -0.01) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 1, 0, Math.PI * 2, false);
                ctx.fillStyle = "#00ff00";
                //ctx.stroke();
                ctx.fill();
                ctx.closePath();

                //console.log("Into!", point.x,point.y)
            } else {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 1, 0, Math.PI * 2, false);
                ctx.fillStyle = "#ff0000";
                //ctx.stroke();
                ctx.fill();
                ctx.closePath();

                //console.log("Not Into!", point.x,point.y)
            }

        }

*/

    })(armlib,gizmo);

}