window.onload = function(O){

	 stats = new Stats();
		stats.setMode( 0 );
		document.body.appendChild( stats.domElement );
    stage = new CStage({container: 'container',width: 500,height: 500, fps: 1000});

    var image1 = new Image();
    image1.src = 'image/timber.png';

	var timber = new CObject({
        /*backbone: new CBackbone({
            view: [ new CImage({x: 0, y: 0, width: 400, height: 50, angel: 0, image: image1, name: 'timber'}) ],
            bones: { segments: [ {x0:0,y0:0,x1:150,y1:0},{x0:150,y0:0,x1:150,y1:30},{x0:150,y0:30,x1:0,y1:30},{x0:0,y0:30,x1:0,y1:0}],
                center: {x:75, y:15} }
        }),*/
        collection: [ new CImage({x: 0, y: 0, width: 400, height: 50, angel: 0, image: image1, name: 'timber'}) ],
        skeleton: new CSkeleton({ segments: [ {x0:0,y0:0,x1:150,y1:0},{x0:150,y0:0,x1:150,y1:30},{x0:150,y0:30,x1:0,y1:30},{x0:0,y0:30,x1:0,y1:0}],
                      center: {x:75, y:15} }),
        vars: {
            x: 23,
            y: 50,
			width: 150,
            height: 30,
            angel: 0,
            inc: 0.1
        },
        begin: function(stage) {
            this.x = 23;
            this.y = 23;
			this.timber.x = this.x;
            this.timber.y = this.y;
            this.timber.width = this.width;
            this.timber.height = this.height;
            this.timber.angel = this.angel;

        },
        update: function(stage) {
            this.timber.x = this.x;
            if( this.skeleton._center.x > stage.width) {
                this.inc *= -1;
            }
            if( this.skeleton._center.x < 0 ) {
                this.inc *= -1;
            }


            this.skeleton.nativeCenter.x+= this.inc;
            this.timber.center = this.skeleton.center;
            this.timber.angel = this.angel+=10;
            if( this.timber.y < (stage.height-this.timber.height)/2 ) {
                this.timber.y = this.y++;
            }

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
				}
			}
		}

		
    });

    var image2 = new Image();
    image2.src = 'image/gras.jpg';

    var gras = new CImage({x: 0,y: 0, width: stage.width, height: stage.height, angel: 0, center: {x:50,y:50}, image: image2});

    stage.add( gras );
    stage.add( new CLine({x0: 24,y0: 34, x1:54,y1:56}) );
    stage.add( timber );

    stage.run();
    stage.info();
	


    var wrega = new CSkeleton({ segments: [ {x0:0,y0:0,x1:150,y1:0},{x0:150,y0:0,x1:150,y1:30},{x0:150,y0:30,x1:0,y1:30},{x0:0,y0:30,x1:0,y1:0}],
        center: {x:75, y:15} });
    console.log(wrega);
}





