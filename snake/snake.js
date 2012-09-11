//var image = new Image();
//image.src = 'image/avatar_1(100x100).png';
//var head = new CImage({x: 25,y: 25, width: 50, height: 50, stroke: '#aaa', image: image, name: 'head'});

var snake = new CObject({

    collection: [],
    vars: {
        x: 15,
        y: 25,
        angel: 1,
        angInc: 7,
        movInc: 20,
        spX: 10,
        spY: 0,
        queue: [],
        name: 'snake',
        addSegment: function(stage) {

            var head =new CCircle({x: 25,y: 25, radius: 15, stroke: '#aaa', fill: 'red'});
            this.add( head.clone() );

            this.x+=this.spX;
            this.y+=this.spY;
            this.queue.push({x:this.x, y:this.y});
        }

    },
    begin: function(stage) {
        /*
        this.spX = this.spY = this.movInc;
        var x,y = 25;
        for(var i=0;i<this.collection.length;i++){
            this.queue.push( {x: x+=this.movInc,y: y+=this.movInc} );
        }*/
        var head = new CCircle({x: 25,y: 25, radius: 15, stroke: '#aaa', fill: 'green', name: 'head'});

        var segment = [];

        //segment.push( head );
        this.add( head );
        for(var i=0;i<11;i++) {
            var temp = head.clone();
            temp.name = 'segment'+i;
            temp.fill = 'red';
            this.add( temp );
            //segment.push( temp );
        }
        //this.collection = segment;
        //console.log()

    },
    update: function(stage) {
        /*this.queue.shift();
        var flag = true;
        if(this.x >= stage.width && flag){
            this.x = 1;
            flag = false;
        }
        if(this.x <= 0 && flag){
            this.x = stage.width-1;
            flag = false;
        }
        if(this.y >= stage.height && flag){
            this.y = 1;
            flag = false;
        }
        if(this.y <= 0 && flag){
            this.y = stage.height-1;
            flag = false;
        }

        this.x+=this.spX;
        this.y+=this.spY;
        this.queue.push({x:this.x, y:this.y});

        var index=0;
        for(var i in this.queue){
            this.collection[index].x = this.queue[i].x;
            this.collection[index].y = this.queue[i].y;
            index++;
        }*/
    },
    events: {
        intersection: function(shape1, shape2, stage) {

            if(((shape2.name == 'head') && (shape1.name != 'segment12') && (shape1.name != 'segment11')&& (shape1.name != 'segment10')) || ((shape1.name == 'head') && (shape2.name != 'segment12') && (shape2.name != 'segment11')&& (shape2.name != 'segment10'))){
                //stage.stop();
                //alert('Проигрыш! Вы себя покусали :)')
            }
        }
    }

});
