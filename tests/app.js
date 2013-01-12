var a = gizmo.Class({
	Static: {
		var1: 1,
		var2: 2
	}, 
	Methods: {
		getVar: function(name) {
			return this[name];
		}
	}
});

A = new a();
console.log(A.getVar('var1'));
console.log(A.getVar('var2'));