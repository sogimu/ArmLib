function App(armlib,lib) {
    var Class = lib.Class;
    var Layer = armlib.Layer;

    var ArmLibObject = new Class({
        Initialize: function(O, layer, armlib) {},
        Static: {
            name: 1000*Math.random(),
            context: null,
            loadType: 'synch', // synch or asynch
            loadedFlag: false // Flag which show load-state of object
            owner: null,
            zindex: 0,
            list: {}, // List of child-objects
            drawList: {}, // List of sorted child-objects,

            low: 0,
            hight: 0
        },
        Methods: { // Call-back functions of ArmLib object
            begin: function(O, layer, armlib) {}, // Constructor for object
            update: function(layer, armlib) {}, // Functions which update object
            keyPress: function(e) {}, // Function for event of keyboard
            keyDown: function(e) {},
            keyUp: function(e) {},
            mouseClick: function(e) {}, // Functions for event of mouse
            mouseMove: function(e) {},
            mouseDown: function(e) {},
            mouseUp: function(e) {},
            objectShow: function(layer, armlib) {}, // Function for event showing and hiding
            objectHide: function(layer, armlib) {},
            sortByZindex: function() { // sort: quicksort
                var i = this.low;
                var j = this.high;
                var A = this.drawList;
                var x = A[Math.round((low+high)/2)];  // x - опорный элемент посредине между low и high
                do {
                    while(A[i] < x) ++i;  // поиск элемента для переноса в старшую часть
                    while(A[j] > x) --j;  // поиск элемента для переноса в младшую часть
                    if(i <= j){
                        // обмен элементов местами:
                        var temp = A[i];
                        A[i] = A[j];
                        A[j] = temp;
                        // переход к следующим элементам:
                        i++; j--;
                    }
                } while(i < j);
                if(low < j) qSort(A, low, j);
                if(i < high) qSort(A, i, high);
                this.drawList = A;
            },
            addChild: function(O) { // add new child-object and let sort drawList by z-index
                this.list[O.name] = O;
                this.drawList[O.name] = O;
                this.low = (O.zindex < this.low)?O.zindex:this.low;
                this.hight = (O.zindex > this.hight)?O.zindex:this.hight;
                this.sortByZindex();
            },

            // Setters/Getters
            set function list(O) {
                this.list = O;
                this.drawList = O;
                this.sortByZindex();
            },
            get function list() {
                return this.list;
            }

        }
    });
    var Unit = Class({
        Extends: armlib.Object,
        Initialize: function(O, layer, armlib) {
            this.begin = O.begin;
            this.update = O.update;
            for(var i in O.vars){
                this[i] = O.vars[i];
            }
            this.list = O.list;
            this.context = O.context;
        },
        Static: {
            x: 0,
            y: 0,
            health: 100
        },
        Methods: { // User's functions
            shoot: function(O, layer, armlib) {
                // same operators
            },
            run: function(O, layer, armlib) {

            }

        }

    });
    var layer1 = new Layer({name: "ground", zindex: 1}).addObject(new unit());
    var layer2 = new Layer({name: "units", zindex: 5}).addObject(new unit());
    armlib.addLayer(layer1);

}(armlib,lib);