CShape = Class({
    base: CSuperObj,
    construct: function(){
    },
    vars: {
        parent: 'no',
        stroke: 'black',
        lineWidth: 1,
        angel: 0,
        type: 'shape'
    },

    methods:{
        set stroke(O) {
            this._stroke = O;
        },
        get stroke() {
            return this._stroke;
        },
        set lineWidth(O) {
            this._lineWidth = O;
        },
        get lineWidth() {
            return this._lineWidth;
        },
        set parent(O) {
            this._parent = O;
        },
        get parent() {
            return this._parent;
        },
        set type(O) {
            this._type = O;
        },
        get type() {
            return this._type;
        },
        set angel(O) {
            var radians = O*Math.PI/180;
            this._angel = radians;
        },
        get angel() {
            var degree = this._angel*180/Math.PI;
            return degree;
        }
    }
});
