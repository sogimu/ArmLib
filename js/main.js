window.onload = function(){

    var stage = new CStage({container: 'container',width: '500',height: '500',fps: 50});

    var rect1 = new CRect({x: 50,y: 50, width: 40, height: 40, stroke: '#bbb', fill: 'green', lineWidth: 0, name: 'rect1'});
    var rect2 = new CRect({x: 50,y: 75,width: 30, height: 30, stroke: '#adw', lineWidth: 2, name: 'rect2'});
    var rect3 = new CRect({x: 50,y: 50,width: 400, height: 200, stroke: '#abc', fill: '#add', lineWidth: 1, name: 'rect3'});

    var obj1 = new CObject({
        collection: [new CRect({x: 50,y: 50,width: 30, height: 30, stroke: '#adw', lineWidth: 1, name: 'rect1', fill: 'green'})/*, new CRect({x: 50,y: 50,width: 30, height: 30, stroke: '#adw', lineWidth: 1, name: 'rect2', fill: 'green'})*/],
        vars: {
            x: 10,
            y: 10,
            i: -1,
            j: 1
        },
        begin: function() {
            if(1*Math.random()>0.5){this.i = 1;} else {this.i = -1;}
            if(1*Math.random()>0.5){this.j = 1;} else {this.j = -1;}
        },
        update: function(stage) {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= stage.width-this.collection[i].width) {this.i=-1;}
                if(y >= stage.height-this.collection[i].height) {this.j=-1;}
                this.collection[i].x = x + this.i *(i+1)* 5 * Math.random();
                this.collection[i].y = y + this.j *(i+1)* 5 * Math.random();
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

//    stage.add( obj1 );
/*
    var clone = function(o) {
        //if(!o || 'object' !== typeof o)  {
        //    return o;
        //}
        //var c = 'function' === typeof o.pop ? [] : {};
        var p, v;
        for(p in o) {
            if(o.hasOwnProperty(p)) {
                v = o[p];
                if(v && 'object' === typeof v) {
                    c[p] = clone(v);
                }
                else {
                    c[p] = v;
                }
            }
        }
        return c;
    }
*/
    var clone = function(arg,deep){
        if(deep == 0){return arg};

        var tmp = deep;
        var o = function(){};

        for(var i in arg)
        {
            if(!arg.hasOwnProperty(i))
            {
                if(typeof arg[i] != 'object'){
                    o.prototype[i] = arg[i];
                } else {
                    o.prototype[i] = clone(arg[i], tmp--);
                }
            }
        }
        tmp = deep;
        var obj = new o();

        for(var i in arg)
        {
            if(arg.hasOwnProperty(i))
            {
                if(typeof arg[i] != 'object'){
                    obj[i] = arg[i];
                } else {
                    obj[i] = clone(arg[i], tmp--);
                }

            }
        }
        return obj;
    }

    console.log( obj1);
    console.log( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.add( clone(obj1, 10));
    stage.run();
    //stage.stop();

    //console.log(o)

    }