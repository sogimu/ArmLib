
var Type = Type || {};

Type.Number = function(v)
{
    return typeof (v) == "number";
}

Type.String = function(v)
{
    return typeof (v) == "string";
}

Type.Array = function(v)
{
    return typeof (v) == "array";
}

Type.Object = function(v)
{
    return typeof (v) == "object";
}
