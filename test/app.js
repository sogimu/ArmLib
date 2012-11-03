window.onload = function(O){

	 stats = new Stats();
		stats.setMode( 0 );
		document.body.appendChild( stats.domElement );

    stage = new CStage({container: 'container',width: 500,height: 500, fps: 70});

    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, src: 'image/BACKGROUNDS_MAIN_1.png'});

    stage.add( gras );

    for(var i=0; i<7; i++) {
        for(var j=0; j<3; j++) {
            var item = new CObject({
                name: 'timber'+i+":"+j,
                collection: [ new CImage({x: -30, y: -17,width: 63, height: 35, angel: 0, src: 'image/item.png'})],
                skeleton: [ {x0:-25,y0:-17,x1:25,y1:-17},{x0:25,y0:-17,x1:25,y1:15},{x0:25,y0:15,x1:-25,y1:15},{x0:-25,y0:15,x1:-25,y1:-17} ],
                center: {x: (i*70)+40, y: (j*70)+27},
                rotateCenter: {x: 0, y: 0},
                angel: 0,

                vars: {
                    width: 0,
                    height: 0
                },
                begin: function(stage) {
                    this.width = this.collection[0].width;
                    this.height = this.collection[0].height;
                },
                update: function(stage) {
                },
                events: {
                    collision: function(obj, e, stage) {
                        this.x = 500+Math.random()*(500-this.width);
                        this.y = 500+Math.random()*(500-this.height);
                    }
                }
            });
            stage.add( item );
        }
    }

    var ball = new CObject({
        name: 'ball',
        collection: [ new CImage({x: -17, y: -15,width: 34, height: 30, angel: 0, src: 'image/ball.png'})],
        skeleton: [ {x0:-15,y0:-14,x1:17,y1:-15},{x0:17,y0:-17,x1:19,y1:17},{x0:19,y0:17,x1:-17,y1:15},{x0:-17,y0:15,x1:-15,y1:-14} ],
        center: {x: 250, y: 350},
        rotateCenter: {x: 0, y: 0},
        angel: 0,

        vars: {
            width: 0,
            height: 0,
            inc: 2.5,
            factorX: 1,
            factorY: -1

        },
        begin: function(stage) {
            this.width = this.collection[0].width;
            this.height = this.collection[0].height;

        },
        update: function(stage) {
            if( this.x > (stage.width-this.width/2) ) {
                this.factorX = -1;
            }
            if( this.x < this.width/2 ) {
                this.factorX = 1;
            }
            if( this.y > (stage.height-this.height/2) ) {
                this.x = 250;
                this.y = 350;
                this.factorX = 1;
                this.factorY = -1;
            }
            if( this.y < this.height/2 ) {
                this.factorY = 1;
            }

            this.x+= (this.inc * this.factorX);
            this.y+= (this.inc * this.factorY);
        },
        events: {
            collision: function(obj, e, stage) {
                if(obj.name == "timberr") {
                    this.factorY = -1;
                } else {
                    if(e[0].x >= this.x) {
                        this.factorX = -1;
                        this.angel+=15;
                    }
                    if(e[0].x < this.x) {
                        this.factorX = 1;
                        this.angel-=15;
                    }
                    if(e[0].y >= this.y) {
                        this.factorY = -1;
                    }
                    if(e[0].y < this.y) {

                        this.factorY = 1;
                    }
                }

            }
        }
    });

    var timberr = new CObject({
        name: 'timberr',
        collection: [new CImage({x: -60, y: -15,width: 120, height: 30, angel: 0, src: 'image/timber.png'})],
        skeleton: [ {x0:-60,y0:-15,x1:60,y1:-15} ],
        center: {x: 200, y: 440},
        rotateCenter: {x: 0, y: 0},
        angel: 0,

        vars: {
            width: 0,
            height: 0,
            inc: 10
        },
        begin: function(stage) {
            this.width = this.collection[0].width;
            this.height = this.collection[0].height;
        },
        update: function(stage) {
        },
        events: {
            onkeydown: function(e, stage) {
                var code = e.keyCode;
                switch( code ){
                    case 39: {
                        if( this.x < (stage.width - this.width/2)) {
                            this.x += this.inc;
                        }
                        break};

                    case 37: {
                        if( this.x > this.width/2) {
                            this.x -= this.inc;
                        }
                        break};
                }
            }
        }


    });


    stage.add( timberr );
    stage.add( ball );

    stage.run();
    //stage.info();

    //console.log( stage.collectionObjects )
/*
    var segments = [ {x0:100,y0:50,x1:100,y1:105},{x0:50,y0:75,x1:150,y1:70} ];

    console.log(segments)

    stage.context.beginPath();
    for(var j in segments) {
        var obj = segments;
        stage.context.moveTo( obj[j].x0, obj[j].y0 );
        stage.context.lineTo( obj[j].x1, obj[j].y1 );
    }
    stage.context.strokeStyle = "#0df";
    stage.context.stroke();
    stage.context.closePath();

    var tmpSegments = [];
    var obj = segments;
    for(var i in obj) {
        var A = obj[i].y0 - obj[i].y1;
        var B = (obj[i].x1 - obj[i].x0)+0.00001;
        var C = obj[i].x0*obj[i].y1 - obj[i].x1*obj[i].y0;
        var x0 = obj[i].x0;
        var x1 = obj[i].x1;
        tmpSegments.push( {A:A, B:B, C:C, x0:x0, x1:x1} );
    }

    console.log(tmpSegments);



    var __collision = function( a,b ) {
        function det (a,b,c,d) {
            return a * d - b * c;
        }

        function own (x, x0, x1) {
            if( ( (x0 < x1) && (x >= x0 && x <= x1) ) || ( (x0 > x1) && (x >= x1 && x <= x0) ) || ( (x0 == x1) && (Math.round(x) == x0) ) ) {
                return true;
            } else {
                return false;
            }
        }
        if( (b.x0 >= a.x0 && b.x0 <= a.x1) || (b.x1 >= a.x0 && b.x1 <= a.x1) || (a.x0 >= b.x0 && a.x0 <= b.x1) || (a.x1 >= b.x0 && a.x1 <= b.x1) ){
            var EPS = 10E-9;
            var zn = det (a.A, a.B, b.A, b.B);
            if (Math.abs(zn) < EPS)
                return {flag: false};
            var x = - det (a.C, a.B, b.C, b.B) / zn;
            if( own(x, a.x0, a.x1) && own(x, b.x0, b.x1) ) {
                var y = - det (a.A, a.C, b.A, b.C) / zn;
                var obj = {x: x, y:y, flag: true};
                return obj;
            } else {
                return {flag: false};
            }
        } else {
            return {flag: false};
        }

    }

    var res = __collision(tmpSegments[0], tmpSegments[1])
    if( res.flag ) {
        console.log("there is collesion in ("+res.x+","+res.y+")");
        stage.context.beginPath();
        stage.context.moveTo(res.x, res.y);
        stage.context.arc(res.x, res.y, 2, Math.PI * 2, false);
        stage.context.stroke();
        stage.context.fillStyle = "#abc";
        stage.context.fill();
        stage.context.closePath();
    } else {
        console.log("there is no collesion");

    }*/
}







