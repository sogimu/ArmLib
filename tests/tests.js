
var Tests =
{
    clone: function() {
        var a = new CRect({x: 50, y: 50, fill: 'red'});

        var obj1 = new CObject({
            collection: [a],
            vars: {
                name: 'obj1'
            },
            begin: function() {

            }
        });
        var obj2 = obj1.clone();

        Assert.UnEqual(obj1, obj2);
    },
    func_clone: function() {
        var history = [];
        var clone = function(obj){
            if(obj == null || typeof(obj) != 'object'){
                return obj;
            } else {
                var flag = false;
                for(var i in history){
                    if(history[i] == obj) {
                        flag = true;
                        break;
                    }
                }
                if(flag) {
                    return obj;
                }
                history.push(obj);

                if(typeof obj.constructor == 'function') {
                    var temp = new obj.constructor();
                    for(var key in obj)
                    {
                        if(obj.hasOwnProperty(key)) {
                            temp[key] = clone(obj[key]);
                        }
                    }
                } else {
                    var temp = obj;
                }

                return temp;
            }
        }

        var obj1 = {
            a: 'awerf',
            b: null,
            c: {name: 'fill', number: 34, parent: null},
            d: function() { alert('function!');}
        };
        obj1['b'] = obj1;
        obj1['c'].parent = obj1['c'];

        var obj2 = clone( obj1 );
        console.log(obj1);
        console.log(obj2);

    }

}



var Assert = Assert || {};

Assert.Equal = function(expected, actual)
{
    if (expected !== actual) {
        throw Error("Assert.Equal failed. Expected = " + expected + ", actual = " + actual);
    }
}
Assert.UnEqual = function(expected, actual)
{
    if (!(expected !== actual)) {
        throw Error("Assert.UnEqual failed. Expected = " + expected + ", actual = " + actual);
    }
}

// ---

// Run tests.
for (var test in Tests)
{
    Tests[test]();
    console.log('Test[ '+test+' ] was made!')
}

