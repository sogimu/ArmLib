window.onload = function(){

    var stage = new CStage({container: 'container',width: '900',height: '300',fps: 50});

    var rect1 = new CRect({x: 50,y: 50, width: 40, height: 40, stroke: '#bbb', fill: 'green', lineWidth: 0, name: '0'});
    var rect2 = new CRect({x: 50,y: 50,width: 30, height: 30, stroke: '#adw', fill: 'red', lineWidth: 2, name: '1'});
    var rect3 = new CRect({x: 50,y: 50,width: 50, height: 50, stroke: '#abc', fill: '#add', lineWidth: 1, name: '2'});

    var obj1 = new CObject({

        collection: [ rect1, rect2, rect3],
        vars: {
            x: 10,
            y: 10,
            ind: [{i: -1,j: -1},{i: -1,j: -1},{i: -1,j: -1}]
        },
        begin: function(stage) {
            if(1*Math.random()>0.5){this.i = 1;} else {this.i = -1;}
            if(1*Math.random()>0.5){this.j = 1;} else {this.j = -1;}
            for(var i in this.collection)
            this.collection[i].x = stage.width * Math.random();
            this.collection[i].y = stage.height * Math.random();
            //this.collection[0].fill = 'rgb('+Math.floor(250*Math.random())+','+Math.floor(250*Math.random())+','+Math.floor(250*Math.random())+')';
            //rect1.name = 0;
            //var rect2 = rect1.clone();
            //rect2.name = 1;
            //var rect3 = rect1.clone();
            //rect3.name = 2;

        },
        update: function(stage) {

            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;
                //console.log(this.i)
                //console.log(this.j)
                if(x <= 0) {this.ind[i].i=1;}
                if(y <= 0) {this.ind[i].j=1;}
                if(x >= stage.width-this.collection[i].width) {this.ind[i].i=-1;}
                if(y >= stage.height-this.collection[i].height) {this.ind[i].j=-1;}
                this.collection[i].x = x + this.ind[i].i * 2 * Math.random();
                this.collection[i].y = y + this.ind[i].j * 2 * Math.random();
            }

        },
        event: {
            intersection: function(shape1, shape2) {
                console.log(shape1.name);
                shape1.parent.ind[shape2.name].i*=-1;
                shape1.parent.ind[shape2.name].j*=1;
     //           shape1.x+=10*shape1.parent.ind[shape1.name].i;
     //           shape1.y+=10*shape1.parent.ind[shape1.name].j;
                shape2.parent.ind[shape1.name].i*=1;
                shape2.parent.ind[shape1.name].j*=-1;
     //           shape2.x+=5*shape2.parent.ind[shape2.name].i;
     //           shape2.y+=5*shape2.parent.ind[shape2.name].j;

                //shape1.fill = 'rgb('+Math.floor(250*Math.random())+','+Math.floor(250*Math.random())+','+Math.floor(250*Math.random())+')';
                //shape2.fill = 'rgb('+Math.floor(250*Math.random())+','+Math.floor(250*Math.random())+','+Math.floor(250*Math.random())+')';
                //console.log(shape1.name+' x '+shape2.name);
            },
        }

    });

    stage.add( obj1 );
    stage.run();

    }