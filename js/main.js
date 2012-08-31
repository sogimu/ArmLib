window.onload = function(){

    var stage = new CStage({container: 'container',width: '900',height: '300',fps: 60});

    var rect1 = new CRect({x: 12,y: 23, width: 50, height: 50, stroke: '#bbb', fill: 'green', lineWidth: 0});
    var rect2 = new CRect({x: 50,y: 10,width: 50, height: 50, stroke: '#adw', lineWidth: 6 });
    var rect3 = new CRect({x: 50,y: 50,width: 400, height: 400, stroke: '#abc', fill: '#add', lineWidth: 1 });

    var obj1 = new CObject({
        collection: [rect1, rect2],
        vars: {
            x: 10,
            y: 10,
            i: -1,
            j: 1
        },
        begin: function() {

        },
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 400) {this.i=-1;}
                if(y >= 250) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        },
        event: {
            intersection: function() {
                 for(var i in this.collection)
                 {
                    var first = this.collection[i];
                    if(first.type == 'shape')
                    {
                        for(var j in this.collection)
                        {
                            var second = this.collection[j];
                            if(second.type == 'shape' && second != first && second.x>=first.x && second.x<=first.x+first.width && second != first && second.y>=first.y && second.y<=first.y+first.height)
                            {
                                console.log('intersect');
                            }
                        }
                    }
                 }
            },
            mouse_move: function() {
            }
        }

    });
    console.log(rect1);

    //console.log(obj1.type);

    stage.add( rect3 );
    stage.add( obj1 );


    stage.run();



};