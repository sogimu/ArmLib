/**
 * Created with JetBrains WebStorm.
 * User: sogimu
 * Date: 04.11.12
 * Time: 0:38
 * To change this template use File | Settings | File Templates.
 */

var timberr = new CObject({
    name: 'timberr',
    collection: [new CImage({x: -60, y: -15,width: 120, height: 30, angel: 0, src: 'image/timber.png'})],
    skeleton: [ {x0:-60,y0:-15,x1:60,y1:-15} ],
    center: {x: 200, y: 600},
    rotateCenter: {x: 0, y: 0},
    angel: 0,

    vars: {
        width: 0,
        height: 0,
        inc: 0
    },
    begin: function(stage) {
		this.x = (stage.width/2) - (this.width/2);
		this.y = 9*(stage.height)/10;

        this.width = this.collection[0].width;
        this.height = this.collection[0].height;
    },
    update: function(stage,interpolation) {
		if(this.inc >= 0.3) this.inc -= 0.3;
		if(this.inc <= -0.3) this.inc += 0.3;
		
		this.x += this.inc;
		
		if( this.x > (stage.width - this.width/2) ) {
			this.x = (stage.width - this.width/2);
			this.inc = 0;
		}
		if( this.x < this.width/2 ) {
			this.x = this.width/2;
			this.inc = 0;
		}
		
    },
    events: {
        onkeydown: function(e, stage) {
            var code = e.keyCode;
            switch( code ){
                case 39: {
						this.inc += 5;
                    
                    break};

                case 37: {
						this.inc -= 5;
                    break};
            }
        }
    }


});

