var CSkeleton = Class({
    construct: function(O){
        if( isSet(O) ) {
            this.segments = TArray(O.segments);
            this.nativeSegments = O.segments;
            this.center = isTObject(O.center) ? O.center : {x:this.nativeSegments[0].x0,y:this.nativeSegments[0].y0};
            this.nativeCenter = isTObject(O.center) ? O.center : {x:this.nativeSegments[0].x0,y:this.nativeSegments[0].y0};

            for(var i in this._nativeSegments) {
                var obj = this._nativeSegments;
                if(obj[i].x0>=0 && obj[i].y0>=0 && obj[i].x1>=0 && obj[i].y1>=0) {
                    var x0 = obj[i].x0;
                    var y0 = obj[i].y0;
                    var x1 = obj[i].x1;
                    var y1 = obj[i].y1;
                    var k = (y1-y0)/(x1-x0);
                    var b = y0 - k*x0;

                    var segment = {};
                    segment.k = k;
                    segment.b = b;

                    segment.x0 = x0;
                    segment.x1 = x1;
                    this._functions.push( segment );
                }
            }
        } else {
            throw Error("CSkeleton: constructor(), Error");
        }
    },
    vars: {
        segments: [],
        nativeSegments: [],
        center: {x:0,y:0},
        nativeCenter: {x:0,y:0},
        functions: []
    },

    methods:{
    }
});
