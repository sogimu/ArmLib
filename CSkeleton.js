var CSkeleton = Class({
    construct: function(O){
        if( isSet(O) ) {
            this.center = isTObject(O.center) ? O.center : {x:this.nativeSegments[0].x0,y:this.nativeSegments[0].y0};
            this.rotateCenter = isTObject(O.rotateCenter) ? O.rotateCenter : {x:this.nativeSegments[0].x0,y:this.nativeSegments[0].y0};
            this.angel = isTNumberPos(O.angel) ? O.angel : 0;

            this._init( TArray(O.segments) );
            this._translateTo( this.center );
            this._rotate( this.angel );
            this._setFunction();


        } else {
            throw Error("CSkeleton: constructor(), Error");
        }
    },
    vars: {
        segments: [],
        nativeSegments: [],
        center: {x:0,y:0},
        rotateCenter: {x:0,y:0},
        functions: []
    },

    methods:{
        _init: function(O) {
            var tmpSegments = [];
            for(var i in O) {
                var obj = O;
                var x0 = obj[i].x0;
                var y0 = obj[i].y0;
                var x1 = obj[i].x1;
                var y1 = obj[i].y1;
                tmpSegments.push( {p0: [x0,y0,1], p1: [x1,y1,1]} );
            }
            this.nativeSegments = tmpSegments;
            this.segments = tmpSegments;

        },
        _setFunction: function() {
            this.functions = []; // что бы вынести function из prototype

            for(var i in this._nativeSegments) {
                var obj = this._nativeSegments;
                if( isTNumberPos(obj[i]['p0'][0]) && isTNumberPos(obj[i]['p0'][1]) && isTNumberPos(obj[i]['p1'][0]) && isTNumberPos(obj[i]['p1'][1]) ) {
                    var x0 = obj[i]['p0'][0];
                    var y0 = obj[i]['p0'][1];
                    var x1 = obj[i]['p1'][0];
                    var y1 = obj[i]['p1'][1];
                    var k = ((x1-x0) != 0) ? (y1-y0)/(x1-x0) : (y1-y0)/0.001;
                    var b = y0 - k*x0;

                    var segment = {};
                    segment.k = k;
                    segment.b = b;

                    segment.x0 = x0;
                    segment.x1 = x1;
                    this.functions.push( segment );
                }
            }
        },
        _translateTo: function(O) {
            var newPoint = TPoint(O);

            var tmpSegments = [];
            for(var i in this.nativeSegments) {
                var obj = this.nativeSegments[i];
                var x0 = obj['p0'][0] + newPoint.x;
                var y0 = obj['p0'][1] + newPoint.y;
                var x1 = obj['p1'][0] + newPoint.x;
                var y1 = obj['p1'][1] + newPoint.y;
                tmpSegments.push( {p0: [x0,y0,1], p1: [x1,y1,1]} );
            }
            this.segments = tmpSegments;

            this.center = { x: newPoint.x, y: newPoint.y };
        },
        _rotate: function(O) {

        },
        _update: function() {
            this._rotate(this.angel);
            this._translateTo({x: this.x, y: this.y});
            this._setFunction();
        }
    }
});
