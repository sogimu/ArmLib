
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

            newClass[m] = superClass[m];
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
        newClass.prototype[m] = methods[m];
    }

    // appending new and overriding instance methods (by sogimu)
    var vars = params.vars || {};
    for (var m in vars)
    {
        newClass.prototype[m] = vars[m];
    }


    // appending new and overriding static methods
    var statics = params.statics || {};
    for (var m in statics)
    {
        newClass[m] = statics[m];
    }

    return newClass;
}