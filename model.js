var Zoo = Zoo || {};

Zoo.Animal = Class
({
    construct: function(name)
    {
        this._name = name;
    },

    vars:
    {
        _name: Type.String
    },

    methods:
    {
        Scream: null,

        SayName: function()
        {
            return Zoo.Animal.QuoteName(this._name);
        }
    },

    statics:
    {
        QuoteName: function(name)
        {
            return "{ " + name + " }";
        }
    }
})

Zoo.Dog = Class
({
    base: Zoo.Animal,

    construct: function(name, bark, loudness)
    {
        this.$base()(name);
        this._bark = bark;
        this._loudness = loudness;
    },

    vars:
    {
        _bark: Type.String,
        _loudness: Type.Number
    },

    methods:
    {
        Scream: function()
        {
            var s = "";
            for (var i = 0; i < this._loudness; i++)
            {
                s += this._bark;
            }
            return s;
        },

        SayName: function()
        {
            return this._bark + " " + this.$base('SayName')();
        }
    }
})

Zoo.SmartDog = Class
({
    base: Zoo.Dog,

    construct: function(name, bark, iq)
    {
        this.$base()(name, bark, 1);
        this._iq = iq;
    },

    vars:
    {
        _iq: Type.Number
    },

    methods:
    {
        GetIq: function()
        {
            return this._iq;
        }
    }
})

Zoo.Cat = Class
({
    base: Zoo.Animal,

    construct: function(name)
    {
        this.$base()(name);
        this._caughtMice = 0;
    },

    vars:
    {
        _caughtMice: Type.Number
    },

    methods:
    {
        CatchMouse: function()
        {
            this._caughtMice++;
        },

        SayName: function()
        {
            return "Mr. Catty";
        }
    }
})