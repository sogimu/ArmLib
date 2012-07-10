/**
 * Created with JetBrains WebStorm.
 * User: Sogimu
 * Date: 26.06.12
 * Time: 15:10
 * To change this template use File | Settings | File Templates.
 */

function extend( ns, ns_string ) {
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

function log(str){
    try{
        console.log(str);
    } catch(e){
        console.log(e.message);
    }
}

function clone(o) {
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
    c.prototype = clone(o.prototype);
    return c;
}

function copy(dst) {
  for(var i=1; i<arguments.length; i++) {
    var obj = arguments[i];
    for(var key in obj) {
		dst[key] = obj[key];
	}
  }
  return dst;
}

function CLASS(obj) {
	var constructor = obj.init;	
	copy(constructor.prototype, obj)
	return constructor;
}