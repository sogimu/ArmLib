
var Tests =
{
    DogTest: function()
    {
        var dog = new Zoo.Dog("Bob", "Woof!", 2);
        Assert.Equal("Woof!Woof!", dog.Scream());
        Assert.Equal("Woof! { Bob }", dog.SayName());
    },

    SmartDogTest: function()
    {
        var dog = new Zoo.SmartDog("Bobby", "Woof.", 100);
        Assert.Equal("Woof.", dog.Scream());
        //Assert.Equal("Woof. { Bobby }", dog.SayName());
        Assert.Equal(100, dog.GetIq());
    }
}

// ---

var Assert = Assert || {};

Assert.Equal = function(expected, actual)
{
    if (expected !== actual)
        throw Error("Assert.Equal failed. Expected = " + expected + ", actual = " + actual);
}

// ---

// Run tests.
for (var test in Tests)
{
    Tests[test]();
}