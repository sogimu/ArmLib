CSuperObj = Class({

    construct: function(){
    },
	vars:{
		zIndex: 0,
		context: null,
		visible: true
    },
    methods:{
		setContext: function(O) {
			this.context = O;
		},
		getContext: function() {
			return this.context;
		}
    }
});
