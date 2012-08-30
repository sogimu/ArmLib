
var OOP = OOP || {};

OOP.MakeCheck = function(inst, vars)
{
    for (var member in inst)
    {
        if (member == '$base' || typeof(inst[member]) == 'function')
            continue;
        
        var found = false;
        for (var v in vars)
        {
            if (member === v)
            {
                if (!vars[v](inst[member]))
                    throw Error("'" + member + "' variable has a wrong type (" + typeof(inst[member]) + ").");
                
                found = true;
                break;
            }
        }
        
        if (!found)
            throw Error("'" + member + "' variable is not defined.");
    }
}

OOP.WrapWithCheck = function(func, cls)
{
    return function()
    {
        OOP.MakeCheck(this, cls.__$vars);
        var result = func.apply(this, arguments);
        OOP.MakeCheck(this, cls.__$vars);
        return result;
    }
}

function Class(params)
{
    // provide default constructor
    var construct = params.construct || function() { };
    
    // collecting vars list
    var vars = {};
    
    if (params.base)
    {
        vars = params.base.__$vars;
    }
    
    // appending new and overriding vars
    var newVars = params.vars || {};
    for (var v in newVars)
    {
        vars[v] = newVars[v];
    }
    
    // wrapping constructor with type check
    var newClass = function()
    {
        var result = construct.apply(this, arguments);
        OOP.MakeCheck(this, vars);
        return result;
    }        
        
    newClass.__$vars = vars;
    
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
            if (m == 'prototype' || m == '__$vars')
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
    
    // wrap all instance methods with type check
    for (var m in newClass.prototype)
    {
        newClass.prototype[m] = OOP.WrapWithCheck(newClass.prototype[m], newClass);
    }

    // appending new and overriding static methods
    var statics = params.statics || {};
    for (var m in statics)
    {
        newClass[m] = statics[m];
    }
    
    return newClass;
}