/*
function Class(params)
{
    // provide default constructor
    var construct = params.construct || function() { };

    var newClass = construct;

    if (params.base)
    {
        var superClass = params.base;

        // classical JavaScript inheritance pattern
        var f = function() { };
        f.prototype = superClass.prototype;
        newClass.prototype = new f();
        newClass.prototype.constructor = newClass;

        // copy static members from base class
        for (var m in superClass)
        {
            if (m == 'prototype')
                continue;
            var getter = superClass.__lookupGetter__(m),
                setter = superClass.__lookupSetter__(m);

            if ( getter || setter ) {
                if ( getter ) newClass.__defineGetter__(m, getter);
                if ( setter ) newClass.__defineSetter__(m, setter);
            } else {
                newClass[m] = superClass[m];
            }
        }

        // base class accessor
        var base = function()
        {
            var t = this;

            if (arguments.length > 1)
            {
                throw Error("$base requires 0-1 parameters.");
            }

            var result;

            var tmpBase = t.$base;
            t.$base = superClass.__$base;

            if (arguments.length === 1)
            {
                // if there is a single parameter, it's a instance member name.
                var methodName = arguments[0];

                result = function()
                {
                    if (superClass.prototype[methodName])
                    {
                        var res = superClass.prototype[methodName].apply(t, arguments);
                        t.$base = tmpBase;
                        return res;
                    }
                    else
                    {
                        throw Error("Method '" + methodName + "' not found.");
                    }
                };
            }
            else if (arguments.length === 0)
            {
                // if there are no parameters it's a constructor call.
                result = function()
                {
                    superClass.apply(t, arguments);
                    t.$base = tmpBase;
                };
            }

            return result;
        };

        newClass.__$base = base;
        newClass.prototype.$base = base;
    }

    // appending new and overriding instance methods
    var methods = params.methods || {};
    for (var m in methods)
    {
        var getter = methods.__lookupGetter__(m),
            setter = methods.__lookupSetter__(m);

        if ( getter || setter ) {
            if ( getter ) newClass.prototype.__defineGetter__(m, getter);
            if ( setter ) newClass.prototype.__defineSetter__(m, setter);
        } else {
            newClass.prototype[m] = methods[m];
        }
    }

    // appending new and overriding instance methods (by sogimu)
    var vars = params.vars || {};
    for (var m in vars)
    {
        newClass.prototype['_'+m] = vars[m];

        getter = function(O) {
            var key = '_'+m;
            var value = vars[m];
            switch( Type.type( value ) ) {
                case 'String' : {
                    return function() {
                        return TString( this[key] );
                    }
                }
                case 'Number' : {
                    return function() {
                        return TNumber( this[key] );
                    }
                }

            }
            return function() {
                return this[key];
            }

        }(m);

        setter = function(O) {
            var key = '_'+m;
            return function(O) {
                this[key] = O;
            }
        }(m);

        newClass.prototype.__defineGetter__(m, getter);
        newClass.prototype.__defineSetter__(m, setter);
        //console.log( m )
    }


    // appending new and overriding static methods
    var statics = params.statics || {};
    for (var m in statics)
    {
        newClass[m] = statics[m];
    }

    return newClass;
}

var CType = Class({
    construct: function(O){
    },
    vars: {
        fr:43
    },

    methods:{
        is: function(type, obj) {
            if( this.isSet(obj) ) {
                var clas = Object.prototype.toString.call(obj).slice(8, -1);
                return obj !== undefined && obj !== null && clas === type;
            } else {
                return false;
            }
        },
        type: function(obj) {
            var clas = {}.toString.call(obj).slice(8, -1);
            return clas;
        },
        isSet: function(obj) {
            if( obj != undefined && obj != null ) {
                return true;
            } else {
                return false;
            }
        },
        TNumberPos: function(O) {
            if( this.isSet(O) && this.TNumber(O) >= 0 ) {
                return O;
            } else {
                throw TypeError( O + " < 0 or is undefined"  );
            }
        },
        TString: function(O){
            if( this.isSet(O) && this.is("String",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != String" );
            }
        },
        TNumber: function(O){
            if( this.isSet(O) && this.is("Number",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Number" );
            }
        },
        TBool: function(O){
            if( this.isSet(O) && this.is("Boolean",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Boolean" );
            }
        },
        TArray: function(O){
            if( this.isSet(O) && this.is("Array",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Array" );
            }
        },
        TFunc: function(O){
            if( this.isSet(O) && this.is("Function",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Function" );
            }
        },
        TDate: function(O){
            if( this.isSet(O) && this.is("Date",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Date" );
            }
        },
        TRegExp: function(O){
            if( this.isSet(O) && this.is("RegExp",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != RegExp" );
            }
        },
        TObject: function(O){
            if( this.isSet(O) && this.is("Object",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Object"  );
            }
        },
        TArmObject: function(O){
            if( this.isSet(O) && this.is("Object",O) === true && O.type == "object" ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != ArmObject"  );
            }
        },
        TArmShape: function(O){
            if( this.isSet(O) && this.is("Object",O) === true && O.type == "shape" ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != ArmShape"  );
            }
        }

    }
});

var Type = new CType();

TString = function(O) { return Type.TString(O) };
TNumber = function(O) { return Type.TNumber(O) };
TNumberPos = function(O) { return Type.TNumberPos(O); };
TBool = function(O) { return Type.TNumber(O) };
TArray = function(O) { return Type.TArray(O) };
TFunc = function(O) { return Type.TFunc(O) };
TDate = function(O) { return Type.TDate(O) };
TRegExp = function(O) { return Type.TRegExp(O) };
TObject = function(O) { return Type.TObject(O) };
TArmObject = function(O) { return Type.TArmObject(O) };
TArmShape = function(O) { return Type.TArmShape(O) };

isSet = function(O) { return Type.isSet(O); };

isTString = function(O) { return Type.is("String",O) == "String"?true:false; };
isTNumber = function(O) { return Type.is("Number",O) == "Number"?true:false; };
isTNumberPos = function(O) { (Type.is("Number",O) && O>=0)?true:false; };
isTBool = function(O) { return Type.is("Boolean",O); };
isTArray = function(O) { return Type.is("Array",O); };
isTFunc = function(O) { return Type.is("Function",O); };
isTDate = function(O) { return Type.is("Date",O); };
isTRegExp = function(O) { return Type.is("RegExp",O); };
isTObject = function(O) { return Type.is("Object",O); };
isTArmObject = function(O) {
    if( Type.isSet(O) && Type.is("Object",O) && Type.isSet(O.type) && O.type == "object" ) {
        return true;
    } else {
        return false;
    }
};
isTArmShape = function(O) {
    if( Type.isSet(O) && Type.is("Object",O) && Type.isSet(O.type) && O.type == "shape" ) {
        return true;
    } else {
        return false;
    }
};
*/



var gizmoJs = gizmoJs || {};

(function() {

    var Type = {};
    Type.is = function(type, obj) {
        if( this.isSet(obj) ) {
            var clas = Object.prototype.toString.call(obj).slice(8, -1);
            return obj !== undefined && obj !== null && clas === type;
        } else {
            return false;
        }
    }
    Type.type = function(obj) {
        var clas = {}.toString.call(obj).slice(8, -1);
        return clas;
    },
        Type.isSet = function(obj) {
            if( obj != undefined && obj != null ) {
                return true;
            } else {
                return false;
            }
        },
        Type.TNumberPos = function(O) {
            if( this.isSet(O) && this.TNumber(O) >= 0 ) {
                return O;
            } else {
                throw TypeError( O + " < 0 or is undefined"  );
            }
        },
        Type.TString = function(O){
            if( this.isSet(O) && this.is("String",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != String" );
            }
        },
        Type.TNumber = function(O){
            if( this.isSet(O) && this.is("Number",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Number" );
            }
        },
        Type.TBool = function(O){
            if( this.isSet(O) && this.is("Boolean",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Boolean" );
            }
        },
        Type.TArray = function(O){
            if( this.isSet(O) && this.is("Array",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Array" );
            }
        },
        Type.TFunc = function(O){
            if( this.isSet(O) && this.is("Function",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Function" );
            }
        },
        Type.TDate = function(O){
            if( this.isSet(O) && this.is("Date",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Date" );
            }
        },
        Type.TRegExp = function(O){
            if( this.isSet(O) && this.is("RegExp",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != RegExp" );
            }
        },
        Type.TObject = function(O){
            if( this.isSet(O) && this.is("Object",O) === true ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != Object"  );
            }
        },
        Type.TArmObject = function(O){
            if( this.isSet(O) && this.is("Object",O) === true && O.type == "object" ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != ArmObject"  );
            }
        },
        Type.TArmShape = function(O){
            if( this.isSet(O) && this.is("Object",O) === true && O.type == "shape" ) {
                return O;
            } else {
                throw TypeError( this.type(O) + " != ArmShape"  );
            }
        }

    var Class = function(params)	{
        // provide default constructor
        var construct = params.construct || function() { };

        var newClass = construct;

        if (params.base)
        {
            var superClass = params.base;

            // classical JavaScript inheritance pattern
            var f = function() { };
            f.prototype = superClass.prototype;
            newClass.prototype = new f();
            newClass.prototype.constructor = newClass;

            // copy static members from base class
            for (var m in superClass)
            {
                if (m == 'prototype')
                    continue;
                var getter = superClass.__lookupGetter__(m),
                    setter = superClass.__lookupSetter__(m);

                if ( getter || setter ) {
                    if ( getter ) newClass.__defineGetter__(m, getter);
                    if ( setter ) newClass.__defineSetter__(m, setter);
                } else {
                    newClass[m] = superClass[m];
                }
            }

            // base class accessor
            var base = function()
            {
                var t = this;

                if (arguments.length > 1)
                {
                    throw Error("$base requires 0-1 parameters.");
                }

                var result;

                var tmpBase = t.$base;
                t.$base = superClass.__$base;

                if (arguments.length === 1)
                {
                    // if there is a single parameter, it's a instance member name.
                    var methodName = arguments[0];

                    result = function()
                    {
                        if (superClass.prototype[methodName])
                        {
                            var res = superClass.prototype[methodName].apply(t, arguments);
                            t.$base = tmpBase;
                            return res;
                        }
                        else
                        {
                            throw Error("Method '" + methodName + "' not found.");
                        }
                    };
                }
                else if (arguments.length === 0)
                {
                    // if there are no parameters it's a constructor call.
                    result = function()
                    {
                        superClass.apply(t, arguments);
                        t.$base = tmpBase;
                    };
                }

                return result;
            };

            newClass.__$base = base;
            newClass.prototype.$base = base;
        }

        // appending new and overriding instance methods
        var methods = params.methods || {};
        for (var m in methods)
        {
            var getter = methods.__lookupGetter__(m),
                setter = methods.__lookupSetter__(m);

            if ( getter || setter ) {
                if ( getter ) newClass.prototype.__defineGetter__(m, getter);
                if ( setter ) newClass.prototype.__defineSetter__(m, setter);
            } else {
                newClass.prototype[m] = methods[m];
            }
        }

        // appending new and overriding instance methods (by sogimu)
        var vars = params.vars || {};
        for (var m in vars)
        {
            newClass.prototype['_'+m] = vars[m];

            getter = function(O) {
                var key = '_'+m;
                var value = vars[m];
                switch( type( value ) ) {
                    case 'String' : {
                        return function() {
                            return TString( this[key] );
                        }
                    }
                    case 'Number' : {
                        return function() {
                            return TNumber( this[key] );
                        }
                    }
                    case 'Boolean' : {
                        return function() {
                            return TBool( this[key] );
                        }
                    }
                    case 'Array' : {
                        return function() {
                            return TArray( this[key] );
                        }
                    }
                    case 'Date' : {
                        return function() {
                            return TDate( this[key] );
                        }
                    }
                    default: {
                        return function() {
                            return this[key];
                        }
                    }

                }
            }(m);

            setter = function(O) {
                var key = '_'+m;
                var value = vars[m];
                switch( type( value ) ) {
                    case 'String' : {
                        return function(O) {
                            this[key] = TString(O);
                        }
                    }
                    case 'Number' : {
                        return function(O) {
                            this[key] = TNumber(O);
                        }
                    }
                    case 'Boolean' : {
                        return function(O) {
                            this[key] = TBool(O);
                        }
                    }
                    case 'Array' : {
                        return function(O) {
                            this[key] = TArray(O);
                        }
                    }
                    case 'Date' : {
                        return function(O) {
                            this[key] = TDate(O);
                        }
                    }
                    default: {
                        return function(O) {
                            this[key] = O;
                        }
                    }
                }
            }(m);

            newClass.prototype.__defineGetter__(m, getter);
            newClass.prototype.__defineSetter__(m, setter);
            //console.log( m )
        }


        // appending new and overriding static methods
        var statics = params.statics || {};
        for (var m in statics)
        {
            newClass[m] = statics[m];
        }

        return newClass;
    }


    gizmoJs.Type = Type;
    gizmoJs.Class = Class;
    return function() {
        window.Type = gizmoJs.Type;
        window.TString = window.Type.TString;
        window.TNumber = window.Type.TNumber;
        window.is = window.Type.is;
        window.type = window.Type.type;
        window.isSet = window.Type.isSet;
        window.TNumberPos = window.Type.TNumberPos;
        window.TBool = window.Type.TBool;
        window.TArray = window.Type.TArray;
        window.TFunc = window.Type.TFunc;
        window.TDate = window.Type.TDate;
        window.TRegExp = window.Type.TRegExp;
        window.TObject = window.Type.TObject;
        window.TArmObject = window.Type.TArmObject;
        window.TArmShape = window.Type.TArmShape;
        window.isTString = function(O) { return Type.is("String",O) == "String"?true:false; };
        window.isTNumber = function(O) { return Type.is("Number",O) == "Number"?true:false; };
        window.isTNumberPos = function(O) { (Type.is("Number",O) && O>=0)?true:false; };
        window.isTBool = function(O) { return Type.is("Boolean",O); };
        window.isTArray = function(O) { return Type.is("Array",O); };
        window.isTFunc = function(O) { return Type.is("Function",O); };
        window.isTDate = function(O) { return Type.is("Date",O); };
        window.isTRegExp = function(O) { return Type.is("RegExp",O); };
        window.isTObject = function(O) { return Type.is("Object",O); };
        window.isTArmObject = function(O) {
            if( Type.isSet(O) && Type.is("Object",O) && Type.isSet(O.type) && O.type == "object" ) {
                return true;
            } else {
                return false;
            }
        };
        window.isTArmShape = function(O) {
            if( Type.isSet(O) && Type.is("Object",O) && Type.isSet(O.type) && O.type == "shape" ) {
                return true;
            } else {
                return false;
            }
        };
        window.Class = gizmoJs.Class;
    };
})()()
