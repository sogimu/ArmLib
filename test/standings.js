    var standings = new CObject({
        name: 'standings',
        collection: [new CText({x: 0,y: 0, size: 20, fill: '#fc0', name: 'titleLive'}),
                     new CText({x: 0,y: 30, size: 20, fill: '#cf0', name: 'titleSpeed'})],
        skeleton: [],
        center: {x: 5, y: 15},
        rotateCenter: {x: 45, y: 5},
        vars: {
            titleSpeed: 'Скорость: ',
            titleLive: 'Жизнь: ',
            live: 3,
            speed: 1
            
        },
        begin: function(stage) {
            this.collection[0].text = this.titleLive + this.live;
            this.collection[1].text = this.titleSpeed + this.speed;
            
        },
        update: function(stage) {
            this.collection[0].text = this.titleLive + this.live;
            this.collection[1].text = this.titleSpeed + this.speed;
            
			var flag = true;
					
			for(var i in stage.collection){
				if( String(stage.collection[i].name).slice(0,4) == 'item') {
					if(stage.collection[i].x != 900) {
						flag = false;
						break;
					}
				}
			   
			}
			if( flag == true ) {
				stage.add(new CText({x: stage.width*1/3,y: stage.height/2, size: 100, fill: '#00f', text: "Победа!", name: "win"}))
				setTimeout("stage.stop()",0);
			}
			
        }
    });
