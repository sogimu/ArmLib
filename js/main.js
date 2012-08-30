window.onload = function(){

    var stage = new CStage({container: 'container',width: '900',height: '500',fps: 100});

    var rect1 = new CRect({x: 12,y: 23, width: 15, height: 15, stroke: '#bbb'});
    var rect2 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect3 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect4 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect5 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect6 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect7 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect8 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect9 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var rect10 = new CRect({x: 250,y: 10,width: 15, height: 15, stroke: '#adw'});
    var ball = new CRect({x: 0,y: 0, width: 15, height: 15, stroke: '#aww', fill: 'red'});

    var obj1 = new CObject({
        x: 10,
        y: 10,
        collection: [rect1],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 4 * Math.random();
                this.collection[i].y = y + this.j * 4 * Math.random();
            }
        }
    });

    var obj2 = new CObject({
        x: 10,
        y: 10,
        collection: [rect2],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });
    var obj3 = new CObject({
        x: 10,
        y: 10,
        collection: [rect2],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj4 = new CObject({
        x: 10,
        y: 10,
        collection: [rect3],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj5 = new CObject({
        x: 10,
        y: 10,
        collection: [rect4],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj6 = new CObject({
        x: 10,
        y: 10,
        collection: [rect5],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj7 = new CObject({
        x: 10,
        y: 10,
        collection: [rect6],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 900) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj8 = new CObject({
        x: 10,
        y: 10,
        collection: [rect7],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 485) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj9 = new CObject({
        x: 10,
        y: 10,
        collection: [rect8],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 485) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj10 = new CObject({
        x: 10,
        y: 10,
        collection: [rect9],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 485) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });    var obj11 = new CObject({
        x: 10,
        y: 10,
        collection: [rect10],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 485) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });
    var obj3 = new CObject({
        x: 10,
        y: 10,
        collection: [ball],
        update: function() {
            for(var i in this.collection) {
                var x = this.collection[i].x;
                var y = this.collection[i].y;

                if(x <= 0) {this.i=1;}
                if(y <= 0) {this.j=1;}
                if(x >= 485) {this.i=-1;}
                if(y >= 485) {this.j=-1;}

                this.collection[i].x = x + this.i * 3 * Math.random();
                this.collection[i].y = y + this.j * 3 * Math.random();
            }
        }
    });

    obj1.i = -1;
    obj1.j = 1;
    obj2.i = 1;
    obj2.j = 1;
    obj3.i = 1;
    obj3.j = -1;
    obj4.i = 1;
    obj4.j = -1;
    obj5.i = 1;
    obj5.j = -1;
    obj6.i = 1;
    obj6.j = -1;
    obj7.i = 1;
    obj7.j = -1;
    obj8.i = 1;
    obj8.j = -1;
    obj9.i = 1;
    obj9.j = -1;
    obj10.i = 1;

    stage.add( obj1 );
    stage.add( obj2 );
    stage.add( obj3 );
    stage.add( obj4 );
    stage.add( obj5 );
    stage.add( obj6 );
    stage.add( obj7 );
    stage.add( obj8 );
    stage.add( obj9 );
    stage.add( obj10 );


    //obj.update();


    stage.run();
/*
    stage._process();
*/
};