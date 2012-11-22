ArmLib = new new Class({
    initialize: function(O){
	},
	Globalization: function(O) {
		if( $defined(O) ) {
			if(O == true) {
				window.$Stage = this.$Stage;
				window.$Shapes = this.Shapes;
				window.$Rect = this.Shapes.$Rect;
				window.$Line = this.Shapes.$Line;
				window.$Image = this.Shapes.$Image;
				window.$Text = this.Shapes.$Text;
				window.$Circle = this.Shapes.$Circle;
				window.$Arc = this.Shapes.$Arc;
				window.$Curves = this.Shapes.$Curves;
				window.$Object = this.$Object;
			
			} else if(O == false){
				delete window.$Stage;
				delete window.$Shapes;
				delete window.$Rect;
				delete window.$Line;
				delete window.$Image;
				delete window.$Text;
				delete window.$Circle;
				delete window.$Arc;
				delete window.$Curves;
				delete window.$Object;

			}
		}
	},
	Stage: {},
	Shapes: {
		Rect: null,
		Line: null,
		Image: null,
		Text: null,
		Circle: null,
		Arc: null,
		Curves: null,
	},
	Object: {}
});