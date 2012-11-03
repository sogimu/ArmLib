/**
 * Created with JetBrains WebStorm.
 * User: sogimu
 * Date: 04.11.12
 * Time: 0:39
 * To change this template use File | Settings | File Templates.
 */

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
        inc: 5,
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
                obj.x = 500//+Math.random()*(500-obj.width);
                obj.y = 500//+Math.random()*(500-obj.height);
            }

        }
    }
});
