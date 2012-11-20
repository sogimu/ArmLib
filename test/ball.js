/**
 * Created with JetBrains WebStorm.
 * User: sogimu
 * Date: 04.11.12
 * Time: 0:39
 * To change this template use File | Settings | File Templates.
 */

var ball = new CObject({
    name: 'ball',
    collection: [ new CImage({x: -20, y: -17,width: 39, height: 35, angel: 0, src: 'image/ball.png'})],
    skeleton: [ {x0:-12,y0:0,x1:-9,y1:-9},{x0:-9,y0:-9,x1:0,y1:-12},{x0:0,y0:-12,x1:9,y1:-9},{x0:9,y0:-9,x1:12,y1:0},{x0:12,y0:0,x1:9,y1:9},{x0:9,y0:9,x1:0,y1:12},{x0:0,y0:12,x1:-9,y1:9},{x0:-9,y0:9,x1:-12,y1:0} ],
    center: {x: 0, y: 0},
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
		this.x = stage.width/2-80;
		this.y = 4*(stage.height)/5;
		
        this.width = this.collection[0].width;
        this.height = this.collection[0].height;

    },
    update: function(stage, interpolation) {
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
            
			for(var i in stage.collection){
                if(stage.collection[i].name == 'standings') {
                    if(stage.collection[i].live > 1) {
                        stage.collection[i].live-=1;
                    } else {
                        stage.stop();
                        stage.collection[i].live-=1;
						stage.add(new CText({x: stage.width*1/5,y: stage.height/2, size: 100, fill: '#f00', text: "Вы проиграли!", name: "end"}))
                
                    }
                }
            }
        }
        if( this.y < this.height/2 ) {
            this.factorY = 1;
        }
				
        this.x+= (this.inc * this.factorX * interpolation);
        this.y+= (this.inc * this.factorY * interpolation);
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
                obj.x = 900;
                obj.y = 900;
			
				for(var i in stage.collection){
					if(stage.collection[i].name == 'standings') {
						this.inc+=0.05;
						stage.collection[i].speed+=1;
					}
				}
			}
        }
    }
});
