function Class(a){var c=a.construct||function(){};if(a.base){var b=a.base,d=function(){};d.prototype=b.prototype;c.prototype=new d;c.prototype.constructor=c;for(var e in b)if("prototype"!=e){var d=b.__lookupGetter__(e),f=b.__lookupSetter__(e);d||f?(d&&c.__defineGetter__(e,d),f&&c.__defineSetter__(e,f)):c[e]=b[e]}d=function(){var a=this;if(1<arguments.length)throw Error("$base requires 0-1 parameters.");var c,d=a.$base;a.$base=b.__$base;if(1===arguments.length){var e=arguments[0];c=function(){if(b.prototype[e]){var c=
b.prototype[e].apply(a,arguments);a.$base=d;return c}throw Error("Method '"+e+"' not found.");}}else 0===arguments.length&&(c=function(){b.apply(a,arguments);a.$base=d});return c};c.__$base=d;c.prototype.$base=d}var g=a.methods||{};for(e in g)d=g.__lookupGetter__(e),f=g.__lookupSetter__(e),d||f?(d&&c.prototype.__defineGetter__(e,d),f&&c.prototype.__defineSetter__(e,f)):c.prototype[e]=g[e];d=a.vars||{};for(e in d)c.prototype["_"+e]=d[e];a=a.statics||{};for(e in a)c[e]=a[e];return c};var CSuperObj=Class({construct:function(){},vars:{context:null,x:0,y:0},methods:{set x(a){this._x=a},get x(){return this._x},set y(a){this._y=a},get y(){return this._y},set context(a){this._context=a},get context(){return this._context},clone:function(){var a=[],c=function(b){if(null==b||"object"!=typeof b)return b;for(var d in a)if(a[d]==b)return b;a.push(b);if("function"==typeof b.constructor){d=new b.constructor;for(var e in b)if(b.hasOwnProperty(e))if("_context"==e)d[e]=b[e];else{var f=b.__lookupGetter__(e),
g=b.__lookupSetter__(e);f||g?(f&&d.prototype.__defineGetter__(e,f),g&&d.prototype.__defineSetter__(e,g)):d[e]=c(b[e])}}else return b;delete d.name;return d};return c(this)}}});var CObject=Class({base:CSuperObj,construct:function(a){if("undefined"!=typeof a){if("object"==typeof a.vars)for(var c in a.vars)this[c]=a.vars[c];"function"==typeof a.begin&&(this.begin=a.begin);"function"==typeof a.update&&(this.update=a.update);this.collection={};if("object"==typeof a.collection&&a.collection instanceof Array&&1<=a.collection.length)for(var b in a.collection)("shape"==a.collection[b].type||"object"==a.collection[b].type)&&this.add(a.collection[b]);this.skeleton=a.skeleton||this.skeleton;
if("object"==typeof a.events)for(b in a.events)"function"==typeof a.events[b]&&(this[b]=a.events[b])}},vars:{collection:{},skeleton:[],type:"object",count:-1},methods:{add:function(a){if("object"==typeof a&&("shape"==a.type||"object"==a.type))a.context=this.context,"undefined"!=typeof a.name?(this.count++,this.collection[this.count]=a,this[a.name]=a):(this.count++,this.collection[this.count]=a);else throw Error("Object: add() -> Incorrect object!");},remove:function(a){try{if("object"==typeof a&&
("shape"==a.type||"object"==a.type))for(var c in this.collection)this.collection[c]==a&&delete this.collection[c];else throw Error("Object: remove(O) -> O is not shape or object!");}catch(b){console.log(b)}},set collection(a){try{if("object"==typeof a){this._collection=a;for(var c in a)if("shape"==a[c].type||"object"==a[c].type)this.add(a[c]);else throw Error("Object: set collection(O) -> O is not shape or object!");}else throw Error("Object: set collection(O) -> is not js'object!");}catch(b){console.log(b)}},
get collection(){return this._collection},set context(a){this._context=a;for(var c in this.collection)this.collection[c].context=a},get context(){return this._context},set type(a){this._type=a},get type(){return this._type},set count(a){this._count=a},get count(){return this._count},set skeleton(a){this._skeleton=[];for(var c in a)if(0<=a[c].x0&&0<=a[c].y0&&0<=a[c].x1&&0<=a[c].y1){var b=a[c].x0+this.x,d=a[c].y0+this.y,e=a[c].x1+this.x,f=a[c].y1+this.y,g=(f-d)/(e-b),i=d-g*b,h={};h.k=g;h.b=i;h.limits=
{x0:b,x1:e};h.points={x0:b,y0:d,x1:e,y1:f};this._skeleton.push(h)}},get skeleton(){return this._skeleton},_begin:function(a){"function"==typeof this.__begin&&this.__begin.call(this,a);for(var c in this.collection){var b=this.collection[c];"function"==typeof b._begin&&b!=this&&b._begin.call(b,a)}},_clean:function(a){var c=this.collection[b],b;for(b in this.collection)c._clean.call(c,a)},_updateSkeleton:function(a){var c=[],b;for(b in this.skeleton){var d={};d.x0=b.x0+this.x;d.y0=b.y0+this.y;d.x1=b.x1+
this.x;d.y1=b.y1+this.y;c.push(d)}this.skeleton=c;for(b in this.collection)c=this.collection[b],c._updateSkeleton&&c._updateSkeleton.call(c,a)},_update:function(a){"function"==typeof this.update&&this.update.call(this,a);for(var c in this.collection){var b=this.collection[c];b._update&&b._update.call(b,a)}},_draw:function(a){for(var c in this.collection){var b=this.collection[c];b._draw.call(b,a)}},_event:function(a){this.__intersection.call(this,a);for(var c in this.collection)"function"==typeof this.collection[c]._event&&
this.collection[c]._event.call(this.collection[c],a)},__intersection:function(a){var c=function(a,b){var c=a.x-a.lineWidth,d=a.x+a.width+a.lineWidth,e=a.y-a.lineWidth,f=a.y+a.height+a.lineWidth,h=b.x-b.lineWidth,g=b.x+b.width+b.lineWidth,i=b.y-b.lineWidth,k=b.y+b.height+b.lineWidth;if(h>=c&&g<=d||h>=c&&g>=d&&h<=d||h<=c&&g<=d&&g>=c||h<=c&&g>=d)if(i>=e&&k<=f||i>=e&&k>=f&&i<=f||i<=e&&k<=f&&k>=e||i<=e&&k>=f)return!0;return!1},b=function(a,b){var c=a.y,d=a.radius,e=b.y,f=b.radius;return Math.sqrt(Math.pow(a.x-
b.x,2)+Math.pow(c-e,2))<=d+f?!0:!1},d=function(a,e){for(var f in a.collection){var g=a.collection[f],i;for(i in e.collection){var j=e.collection[i];if(g!=j)return"rect"==g.shapeType&&"rect"==j.shapeType&&!1==h?c(g,j)||!1:"circle"==g.shapeType&&"circle"==j.shapeType&&!1==h?b(g,j)||!1:"object"==g.type&&"object"==j.type&&!1==h?d(g,j)||!1:!1}}},e;for(e in this.collection){var f=this.collection[e],g;for(g in this.collection){var i=this.collection[g];if(i!=f){var h=!1;"rect"==f.shapeType&&("rect"==i.shapeType&&
!1==h)&&(h=c(f,i)||!1);"circle"==f.shapeType&&("circle"==i.shapeType&&!1==h)&&(h=b(f,i)||!1);"object"==f.type&&("object"==i.type&&!1==h)&&(h=d(f,i)||!1);h&&"function"==typeof this.intersection&&this.intersection.call(this,f,i,a)}}}},_onkeydown:function(a,c){"function"==typeof this.onkeydown&&this.onkeydown.call(this,a,c);for(var b in this.collection){var d=this.collection[b];"function"==typeof d._onkeydown&&(d=this.collection[b],d._onkeydown.call(d,a,c))}}}});CShape=Class({base:CSuperObj,construct:function(){},vars:{parent:"no",stroke:"black",lineWidth:1,angel:0,type:"shape"},methods:{set stroke(a){this._stroke=a},get stroke(){return this._stroke},set lineWidth(a){this._lineWidth=a},get lineWidth(){return this._lineWidth},set parent(a){this._parent=a},get parent(){return this._parent},set type(a){this._type=a},get type(){return this._type},set angel(a){this._angel=a*Math.PI/180},get angel(){return 180*this._angel/Math.PI}}});var CRect=Class({base:CShape,construct:function(a){"undefined"!=typeof a&&(this.x=a.x||this.x,this.y=a.y||this.y,this.angel=a.angel||this.angel,this.stroke=a.stroke||this.stroke,this.fill=a.fill||this.fill,this.context=a.context||this.context,this.name=a.name||this.name,"undefined"!=typeof a.width&&0<a.width&&(this.width=a.width),"undefined"!=typeof a.height&&0<a.height&&(this.height=a.height),"undefined"!=typeof a.lineWidth&&0<a.lineWidth&&(this.lineWidth=a.lineWidth))},vars:{width:100,height:100,
fill:"gray",shapeType:"rect"},methods:{set width(a){this._width=a},get width(){return this._width},set height(a){this._height=a},get height(){return this._height},set fill(a){this._fill=a},get fill(){return this._fill},_clean:function(){},_draw:function(){this.context.save();this.context.translate(this.x+this.width/2,this.y+this.height/2);this.context.rotate(this.angel*Math.PI/180);this.context.translate(-(this.x+this.width/2),-(this.y+this.height/2));this.context.beginPath();this.context.rect(this.x,
this.y,this.width,this.height);this.context.closePath();this.context.fillStyle=this.fill;this.context.lineWidth=this.lineWidth;this.context.strokeStyle=this.stroke;this.context.fill();this.context.stroke();this.context.restore()}}});var CCircle=Class({base:CShape,construct:function(a){"undefined"!=typeof a&&("number"==typeof a.x&&(this.x=a.x),"number"==typeof a.y&&(this.y=a.y),"string"==typeof a.stroke&&(this.x=a.stroke),"string"==typeof a.fill&&(this.fill=a.fill),"undefined"!=typeof a.name&&(this.name=a.name),"undefined"!=typeof a.context&&(this.x=a.stroke),"undefined"!=typeof a.radius&&0<a.radius&&(this.radius=a.radius),"undefined"!=typeof a.lineWidth&&0<a.lineWidth&&(this.lineWidth=a.lineWidth))},vars:{radius:100,fill:"gray",
shapeType:"circle"},methods:{set radius(a){this._radius=a},get radius(){return this._radius},set fill(a){this._fill=a},get fill(){return this._fill},_clean:function(){this.context.clearRect(this.x-this.radius-this.lineWidth,this.y-this.radius-this.lineWidth,this.x+this.radius+this.lineWidth,this.y+this.radius+this.lineWidth)},_draw:function(){this.context.beginPath();this.context.arc(this.x,this.y,this.radius,0,2*Math.PI,!1);this.context.closePath();this.context.fillStyle=this.fill;this.context.fill();
this.context.lineWidth=this.lineWidth;this.context.strokeStyle=this.stroke;this.context.stroke()}}});CImage=Class({base:CShape,construct:function(a){"undefined"!=typeof a&&(this.x=a.x||this.x,this.y=a.y||this.y,this.angel=a.angel||this.angel,this.angle=a.angle||this.angle,this.stroke=a.stroke||this.stroke,this.image=a.image||this.image,this.context=a.context||this.context,this.name=a.name||this.name,"undefined"!=typeof a.width&&0<a.width&&(this.width=a.width),"undefined"!=typeof a.height&&0<a.height&&(this.height=a.height),"undefined"!=typeof a.lineWidth&&0<a.lineWidth&&(this.lineWidth=a.lineWidth))},
vars:{width:100,height:100,shapeType:"image"},methods:{set width(a){this._width=a},set height(a){this._height=a},get width(){return this._width},get height(){return this._height},set image(a){this._image=a},get image(){return this._image},_clean:function(){},_draw:function(){this.context.save();this.context.translate(this.x+this.width/2,this.y+this.height/2);this.context.rotate(this.angel*Math.PI/180);this.context.translate(-(this.x+this.width/2),-(this.y+this.height/2));this.context.drawImage(this.image,
this.x,this.y,this.width,this.height);this.context.restore()}}});var CStage=Class({construct:function(a){"undefined"!=typeof a.fps&&(this.fps=a.fps);"undefined"!=typeof a.width&&(this.width=a.width);"undefined"!=typeof a.height&&(this.height=a.height);if("undefined"!=typeof a.container){var a=document.getElementById(a.container),c=document.createElement("canvas");c.width=this.width;c.height=this.height;c.style.id="2k2nd";a.appendChild(c);this.context=c.getContext("2d")}else throw Error("The container is not found! Choose right name of container, please!");this._init()},
vars:{collection:[],context:{},events:{},fps:10,intervalId:null,width:500,height:500},methods:{add:function(a){if("object"==typeof a&&("shape"==a.type||"object"==a.type))a.context=this.context,this.collection.push(a);else throw Error("Stage: add(O) -> O is not shape or object!");},remove:function(a){if("object"==typeof a&&("shape"==a.type||"object"==a.type))for(var c in this.collection)this.collection[c]==a&&delete this.collection[c];else throw Error("Stage: remove(O) -> O is not shape or object!");
},_init:function(){var a=this;document.onkeydown=function(c){a._onkeydown(c)}},_begin:function(a){for(var c in this.collection){var b=this.collection[c];"function"==typeof b._begin&&b.begin.call(b,a)}},_clean:function(a){this.context.clearRect(0,0,a.width,a.height)},_updateSkeleton:function(a){for(var c in this.collection){var b=this.collection[c];"function"==typeof b._updateSkeleton&&b._updateSkeleton.call(b,a)}},_update:function(a){for(var c in this.collection){var b=this.collection[c];"function"==
typeof b._update&&b._update.call(b,a)}},_draw:function(a){for(var c in this.collection){var b=this.collection[c];"function"==typeof b._draw&&b._draw.call(b,a)}},_event:function(a){for(var c in this.collection){var b=this.collection[c];"function"==typeof b._event&&b._event.call(b,a)}},_onkeydown:function(a){for(var c in this.collection){var b=this.collection[c];"function"==typeof b._onkeydown&&b._onkeydown.call(b,a,this)}},_process:function(){this._clean.call(this,this);this._update.call(this,this);
this._draw.call(this,this);this._event.call(this,this)},run:function(){this._begin.call(this,this);var a=this;if(this.intervalId=setInterval(function(){a._process.call(a)},1E3/this.fps))console.log("Stage, run()");else throw Error("Stage, can't run!");},stop:function(){try{clearInterval(this.intervalId),console.log("Stage, stop()")}catch(a){console.log(a)}},set collection(a){this._collection=a},get collection(){return this._collection}}});