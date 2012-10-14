var CSkeleton = Class({
    construct: function(O){
        if( isSet(O) ) {
            this.segments = TArray(O.segments);
            this.nativeSegments = O.segments;
            this.center = isTObject(O.center) ? O.center : {x:this.nativeSegments[0].x0,y:this.nativeSegments[0].y0};
            this.nativeCenter = isTObject(O.center) ? O.center : {x:this.nativeSegments[0].x0,y:this.nativeSegments[0].y0};
            this.functions = []; // что бы вынести function из prototype

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
                    this.functions.push( segment );
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
        _update: function(O,stage) {
            var segments = this.segments;
            var nativeSegments = this.nativeSegments;
            var center = this.center;
            var nativeCenter = this.nativeCenter;
            isSet(O.x);
            isSet(O.y);

            var newPoint = O;

            var skeleton = {};
            skeleton.segments = [];
            skeleton.nativeSegments = nativeSegments;
            skeleton.center = center;
            skeleton.nativeCenter = nativeCenter;
            skeleton.functions = [];

            for(var i in this.segments)
            {
                var segment = {};
                segment.x0 = nativeSegments[i].x0 + newPoint.x;
                segment.y0 = nativeSegments[i].y0 + newPoint.y;
                segment.x1 = nativeSegments[i].x1 + newPoint.x;
                segment.y1 = nativeSegments[i].y1 + newPoint.y;
                skeleton.segments.push( segment );

                var func = {};
                func.k = (segment.y1-segment.y0)/(segment.x1-segment.x0);
                func.b = segment.y0 - func.k*segment.x0;

                func.x0 = segment.x0;
                func.x1 = segment.x1;
                skeleton.functions.push( func );

            }
            skeleton.center = { x: skeleton.nativeCenter.x + newPoint.x, y: skeleton.nativeCenter.y + newPoint.y };

            this.segments = skeleton.segments;
            this.functions = skeleton.functions;
            this.center = skeleton.center;

        }
    }
});
