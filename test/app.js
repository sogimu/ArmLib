window.onload = function(O){

	 stats = new Stats();
		stats.setMode( 0 );
		document.body.appendChild( stats.domElement );

    stage = new CStage({container: 'container',width: 500,height: 500, fps: 50});

	var timber = new CObject({
        name: 'timber',
        collection: [ new CImage({x: 30, y: 20, width: 100, height: 50, angel: 0, name: "timber",src: 'image/thing.png'}),
                      new CImage({x: 20, y: 20,width: 80, height: 30, angel: 0, src: 'image/timber.png'}),
                      new CImage({x: 10, y: 30,width: 80, height: 30, angel: 0, src: 'image/timber.png'}),
                      new CImage({x: 40, y: 70,width: 80, height: 30, angel: 0, src: 'image/timber.png'})
        ],
        skeleton: [ {x0:0,y0:0,x1:180,y1:-100},{x0:180,y0:-100,x1:200,y1:130},{x0:200,y0:130,x1:-10,y1:100},{x0:-10,y0:100,x1:0,y1:0} ],
        center: {x: 200, y: 200},
        rotateCenter: {x: 120, y: 50},
        angel: 0,

        vars: {
			width: 150,
            height: 30,
            inc: 0.1
        },
        begin: function(stage) {

        },
        update: function(stage) {
            this.angel+=3;
            this.timber.localAngel-=1;
        },
		events: {
			onkeydown: function(e, stage) {
				var code = e.keyCode;
				switch( code ){
					case 39: {
                        if( this.x < (stage.width - this.width)) {
                            this.x += 5;
                        }
						break};

					case 37: {
                        if( this.x > 0) {
						    this.x -= 5;
                        }
						break};

                    case 38: {
                        if( this.y > 0) {
						    this.y -= 5;
                       }
						break};

                    case 40: {
                        if( this.y < (stage.height - this.height)) {
						    this.y += 5;
                       }
						break};
				}
			}
		}

		
    });
    var timber2 = new CObject({
        name: 'timber2',
        collection: [ new CImage({x: 100, y: 0, width: 200, height: 50, angel: 0, src: 'image/thing.png'}),
            new CImage({x: 0, y: 0,width: 120, height: 30, angel: 0, src: 'image/timber.png'})
        ],
        skeleton: [ {x0:0,y0:0,x1:180,y1:100},{x0:180,y0:100,x1:130,y1:130},{x0:130,y0:130,x1:0,y1:0} ],
        center: {x: 20, y: 20},
        rotateCenter: {x: 100, y: 0},
        angel: 0,

        vars: {
			width: 150,
            height: 30,
            inc: 0.1
        },
        begin: function(stage) {

        },
        update: function(stage) {
            this.angel+=1;
        },
		events: {
            collision: function(obj, e, stage) {
                stage.context.beginPath();

                for( var i in e) {
                    stage.context.moveTo(e[i].x, e[i].y);
                    stage.context.arc(e[i].x, e[i].y, 3, Math.PI * 2, false);
                    stage.context.fillStyle = "#00f";
                    stage.context.stroke();
                    stage.context.fillStyle = "#00f";
                    stage.context.fill();

                }
                stage.context.closePath();
                this.x = Math.random()*500;
                this.y = Math.random()*500;

            },
			onkeydown: function(e, stage) {
				var code = e.keyCode;
				switch( code ){
					case 39: {
                        if( this.x < (stage.width - this.width)) {
                            this.x += 15;
                        }
						break};

					case 37: {
                        if( this.x > 0) {
						    this.x -= 15;
                        }
						break};

                    case 38: {
                        if( this.y > 0) {
						    this.y -= 15;
                       }
						break};

                    case 40: {
                        if( this.y < (stage.height - this.height)) {
						    this.y += 15;
                       }
						break};
				}
			}
		}


    });

    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, src: 'image/BACKGROUNDS_MAIN_1.png'});

    stage.add( gras );

    for(var i=0; i<6; i++) {
        var item = new CObject({
            name: 'timber'+i,
            collection: [ new CImage({x: 0, y: 0,width: 63, height: 35, angel: 0, src: 'image/item.png'})],
            skeleton: [ {x0:3,y0:0,x1:51,y1:2},{x0:51,y0:2,x1:49,y1:25},{x0:49,y0:25,x1:1,y1:23},{x0:1,y0:23,x1:3,y1:0} ],
            center: {x: (i*70)+10, y: 20},
            rotateCenter: {x: 0, y: 0},
            angel: 0,

            vars: {
                width: 0,
                height: 0,
            },
            begin: function(stage) {
                this.width = this.collection[0].width;
                this.height = this.collection[0].height;
            },
            update: function(stage) {
            },
            events: {
                collision: function(obj, e, stage) {
                    this.x = Math.random()*(500-this.width);
                    this.y = Math.random()*(500-this.height);

                }
            }
        });
        stage.add( item );
    }

    var ball = new CObject({
        name: 'ball',
        collection: [ new CImage({x: -5, y: -5,width: 59, height: 53, angel: 0, src: 'image/ball.png'})],
        skeleton: [ {x0:3,y0:1,x1:51,y1:2},{x0:51,y0:2,x1:49,y1:40},{x0:49,y0:40,x1:1,y1:43},{x0:1,y0:43,x1:3,y1:1} ],
        center: {x: 250, y: 350},
        rotateCenter: {x: 0, y: 0},
        angel: 0,

        vars: {

        },
        begin: function(stage) {

        },
        update: function(stage) {
        },
        events: {
            collision: function(obj, e, stage) {

            },
            onkeydown: function(e, stage) {
                var code = e.keyCode;
                //alert(code)

                switch( code ){
                    case 39: {
                        //if( this.x < (stage.width - this.width)) {
                            this.x += 15;
                        //}
                        break};

                    case 37: {
                        if( this.x > 0) {
                            this.x -= 15;
                        }
                        break};

                    case 38: {
                        if( this.y > 0) {
                            this.y -= 15;
                        }
                        break};

                    case 40: {
                        //if( this.y < (stage.height - this.height)) {
                            this.y += 15;
                        //}
                        break};
                }
            }
        }
    });

    var item = new CObject({
        name: 'timber'+i,
        collection: [ new CImage({x: 0, y: 0,width: 63, height: 35, angel: 0, src: 'image/item.png'})],
        skeleton: [ {x0:3,y0:0,x1:51,y1:2},{x0:51,y0:2,x1:49,y1:25},{x0:49,y0:25,x1:1,y1:23},{x0:1,y0:23,x1:3,y1:0} ],
        center: {x: (i*70)+10, y: 20},
        rotateCenter: {x: 0, y: 0},
        angel: 0,

        vars: {
            width: 0,
            height: 0,
        },
        begin: function(stage) {
            this.width = this.collection[0].width;
            this.height = this.collection[0].height;
        },
        update: function(stage) {
        },
        events: {
            collision: function(obj, e, stage) {
                this.x = Math.random()*(500-this.width);
                this.y = Math.random()*(500-this.height);

            }
        }
    });

    stage.add( ball );

    stage.run();
    stage.info();

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







