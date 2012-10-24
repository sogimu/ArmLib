window.onload = function(O){

	 stats = new Stats();
		stats.setMode( 0 );
		document.body.appendChild( stats.domElement );

    stage = new CStage({container: 'container',width: 500,height: 500, fps: 1000});

	var timber = new CObject({
        collection: [ new CImage({x: 30, y: 20, width: 100, height: 50, angel: 0, name: "timber",src: 'image/thing.png'}),
                      new CImage({x: 20, y: 20,width: 80, height: 30, angel: 0, src: 'image/timber.png'}),
                      new CImage({x: 10, y: 30,width: 80, height: 30, angel: 0, src: 'image/timber.png'}),
                      new CImage({x: 40, y: 70,width: 80, height: 30, angel: 0, src: 'image/timber.png'})
        ],
        skeleton: [ {x0:0,y0:0,x1:180,y1:-100},{x0:180,y0:-100,x1:200,y1:130},{x0:200,y0:130,x1:0,y1:100},{x0:0,y0:100,x1:0,y1:0} ],
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


    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, src: 'image/gras.jpg'});

    stage.add( gras );
    stage.add( timber );
    stage.add( timber2 )

    stage.run();
    stage.info();


    console.log( stage.collectionObjects )

    var M1 = $M([
        [0,0,1]
    ]);

    var M2 = $M([
        [1,0],
        [0,1],
        [6,5]
    ]);

    var M = M1.x(M2);

}







