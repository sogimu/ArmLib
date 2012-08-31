CSuperObj = Class({

    construct: function(){
    },
	vars:{
		context: null,
        x: 0,
        y: 0
    },
    methods:{
        setX: function(O) {
            this.x = O;
        },
        setY: function(O) {
            this.y = O;
        },
        getX: function() {
            return this.x;
        },
        getY: function() {
            return this.y;
        },
		setContext: function(O) {
			this.context = O;
		},
		getContext: function() {
			return this.context;
		}
    }
});
