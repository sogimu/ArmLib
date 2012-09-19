
var snake = new CObject({

    collection: [],
    vars: {
        x: 15,
        y: 25,
        angel: 0,
        angInc: 10,
        movInc: 15,
        spX: 10,
        spY: 0,
        queue: [],
        length: 5,
        name: 'snake',
        addSegment: function(stage) {

            var head = new CCircle({x: 25,y: 25, radius: 15, stroke: '#aaa', fill: 'red'});
            this.add( head.clone() );

            this.x+=this.spX;
            this.y+=this.spY;
            this.queue.unshift({x:this.x, y:this.y});
        }

    },
    begin: function(stage) {
        this.spX = this.spY = this.movInc;

        var head = new CCircle({x: 25,y: 25, radius: 15, stroke: '#aaa', fill: 'green', name: 'head'});

        this.add( head );
        for(var i=1;i<=this.length;i++) {
            var temp = head.clone();
            temp.name = 'segment'+i;
            temp.fill = 'red';
            temp.x = this.movInc + this.spX * i;
            temp.y = this.movInc + this.spY * i;
            this.add( temp );
        }

        var x,y = this.movInc;
        for(var i=0;i<this.length+1;i++){
            this.queue.unshift( {x: x+=this.movInc,y: y+=this.movInc} );
        }

    },
    update: function(stage) {
        //this.queue.shift();
        this.queue.pop();
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
        this.queue.unshift({x:this.x, y:this.y});

        var index=0;
        for(var i in this.queue){
            this.collection[index].x = this.queue[i].x;
            this.collection[index].y = this.queue[i].y;
            index++;
        }
    },
    events: {
        intersection: function(shape1, shape2, stage) {
            if(((shape2.name == 'head') && (shape1.name != 'segment0') && (shape1.name != 'segment1')&& (shape1.name != 'segment2')) || ((shape1.name == 'head') && (shape2.name != 'segment0') && (shape2.name != 'segment1')&& (shape2.name != 'segment2'))){
                stage.stop();
                alert('Проигрыш! Вы себя покусали :)')
            }
        },
        onkeydown: function(stage, e) {
            console.log(e);
        }

    }

});
