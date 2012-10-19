window.onload = function(O){

	 stats = new Stats();
		stats.setMode( 0 );
		document.body.appendChild( stats.domElement );

    stage = new CStage({container: 'container',width: 500,height: 500, fps: 10});

	var timber = new CObject({
        collection: [ new CImage({x: 35,y: 43,width: 400, height: 50, angel: 0 , src: 'image/thing.png'}),
                      new CImage({width: 120, height: 30, angel: 0, src: 'image/thing.png'})
        ],
        skeleton: [ {x0:0,y0:0,x1:150,y1:0},{x0:150,y0:0,x1:150,y1:30},{x0:150,y0:30,x1:0,y1:30},{x0:0,y0:30,x1:0,y1:0} ],
        center: {x: 10, y: 10},
        rotateCenter: {x: 50, y: 50},
        angel: 0,

        vars: {
			width: 150,
            height: 30,
            inc: 0.1
        },
        begin: function(stage) {

        },
        update: function(stage) {
            this.angel+=Math.random() * 100;
            this.x = Math.random() * stage.width;
            this.y = Math.random() * stage.height;
        },
		events: {
			onkeydown: function(e, stage) {
				var code = e.keyCode;
				switch( code ){
					case 39: {
                        if( this.x < (stage.width - this.width)) {
                            this.x += 5;
                            //this.rotateCenter.x+=5;

                        }
						break};

					case 37: {
                        if( this.x > 0) {
						    this.x -= 5;
                            //this.rotateCenter.x-=5;

                        }
						break};
				}
			}
		}

		
    });


    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, src: 'image/gras.jpg'});

    stage.add( gras );
    stage.add( timber );

    stage.run();
    stage.info();



    var M1 = $M([
        [0,0,1]
    ]);

    var M2 = $M([
        [1,0],
        [0,1],
        [6,5]
    ]);

    var M = M1.x(M2);


    /*
    var wrega = new CSkeleton({ segments: [ {x0:0,y0:0,x1:150,y1:0},{x0:150,y0:0,x1:150,y1:30},{x0:150,y0:30,x1:0,y1:30},{x0:0,y0:30,x1:0,y1:0}],
        center: {x:75, y:15} });
    console.log(wrega);
    */
}





