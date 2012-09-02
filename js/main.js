window.onload = function(){

    var stage = new CStage({container: 'container',width: '300',height: '300',fps: 10});

    var rect1 = new CRect({x: 100,y: 100, width: 40, height: 40, stroke: '#bbb', fill: 'green', lineWidth: 0, name: 'rect1'});
    var rect2 = new CRect({x: 140,y: 75,width: 30, height: 30, stroke: '#adw', lineWidth: 2, name: 'rect2'});
    var rect3 = new CRect({x: 50,y: 50,width: 400, height: 200, stroke: '#abc', fill: '#add', lineWidth: 1, name: 'rect3'});

    var obj1 = new CObject({
        collection: [rect1, rect2],
        vars: {
            x: 10,
            y: 10,
            i: -1,
            j: 1,
        },
        begin: function() {

        },
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 200) {this.i=-1;}
                if(y >= 200) {this.j=-1;}
                this.collection[i].x = x + this.i *(i+1)* 3 * Math.random();
                this.collection[i].y = y + this.j *(i+1)* 3 * Math.random();
            }

        },
        event: {
            intersection: function(shape1, shape2) {
                console.log(shape1.name+' x '+shape2.name);
            },
            mouse_move: function() {
            }
        }

    });

    stage.add( rect3 );
    stage.add( obj1 );

    stage.run();

    }