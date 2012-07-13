/**
 * Created with JetBrains WebStorm.
 * User: Lisin Aleksander aka Sogimu
 * Date: 14.07.12
 * Time: 2:18
 */

var LibJS = LibJS || {};
LibJS.inherit = (function() {
    function copy(destination) {
        for(var i=1; i<arguments.length; i++) {
            var source = arguments[i];
            for(var key in source){
                var type = typeof(source[key]);
                if( type == 'function' && key != 'constructor' && key != 'parent'){
                    destination[key] = source[key];
                } else if( type == 'object') {
                    copy(destination[key],source[key]);
                }
            }
        }
    }    
    var F = function() {};
        F.prototype = {};
    return function(Child, Parent) { 
        copy(F.prototype, Child.prototype, Parent.prototype);
        //copy(F.prototype, Child.prototype);
        Child.prototype = new F();

        Child.prototype.constructor = Child;
        Child.prototype.parent = Parent;
    }
}());
LibJS.copy = function(destination,setting) {
        for(var i=1; i<arguments.length; i++) {
            var source = arguments[i];
            for(var key in source){
                var type = typeof(source[key] );
                if( type == 'object') {
                    copy(destination[key],source[key]);
                } else {
                    destination[key] = source[key];
                }
            }
        }
    };

LibJS.iter_time = (function() {
    var start = 0;
    var i = 0;
    var time = 0;
    return function(func,arg,n){
        start = new Date();
        for(i=0;i<n;i++){
            func.apply(window, arg);
        }
        return (new Date()- start)/n;
    }
}());
LibJS.namespace = function( ns, ns_string ) {
    try{
        var parts = ns_string.split('.'),
            parent = ns,
            pl, i;
        if (parts[0] == "myApp") {
            parts = parts.slice(1);
        }
        pl = parts.length;
        for (i = 0; i < pl; i++) {
            //create a property if it doesnt exist
            if (typeof parent[parts[i]] == 'undefined') {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;

    } catch(e){
        console.log(e.message)
    }
}

LibJS.clone = function(o) {
    if(!o || 'object' !== typeof o)  {
        return o;
    }
    var c = 'function' === typeof o.pop ? [] : {};
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
};
