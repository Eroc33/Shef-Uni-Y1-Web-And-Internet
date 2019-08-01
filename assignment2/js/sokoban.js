'use strict';
$(function(){
    function Point(x,y){
        this.x = x;
        this.y = y;
    }

    Point.prototype = {
        add: function(other){
            if(other.type !== "Point"){
                throw new Error("Adding point and non-point");
            }
            return new Point(this.x+other.x,this.y+other.y);
        },
        equals: function(other){
            if(other.type !== "Point")
                return false;
            return this.x === other.x && this.y === other.y;
        },
        type: "Point"
    };

    function Level(data){
        this.parse(data);
    }

    Level.prototype = {
        inWall: function(pos){
            return this.walls[pos.y][pos.x];
        },
        hasMovingAt: function(pos){
            var matches = this.boxes.filter(function(box){return box.pos.equals(pos);});
            return (matches.length>0);
        },
        getMovingAt: function(pos){
            var matches = this.boxes.filter(function(box){return box.pos.equals(pos);});
            return matches[0];
        },
        render: function(ctx){
            const SCALE = 16;
            ctx.clearRect(0,0,canvas.width(),canvas.height());
            ctx.fillStyle = "gray";
            this.walls.forEach(function(row,y){
                row.forEach(function(wall,x){
                    if(wall){
                        ctx.fillRect(x*SCALE,y*SCALE,SCALE,SCALE);
                    }
                });
            });

            this.boxes.forEach(function(box){
                ctx.drawImage(crateImg,box.pos.x*SCALE,box.pos.y*SCALE);
            });
            this.storage.forEach(function(row,y){
                row.forEach(function(storage,x){
                    if(storage){
                        ctx.drawImage(storageImg,x*SCALE,y*SCALE);
                        //ctx.fillRect(x*SCALE,y*SCALE,SCALE,SCALE);
                    }
                });
            });

            ctx.fillStyle = "blue";
            ctx.fillRect(this.player.pos.x*SCALE,this.player.pos.y*SCALE,SCALE,SCALE);
        },
        isComplete: function(){
            var self = this;
            return this.boxes.every(function(box){
                return (self.storage[box.pos.y][box.pos.x] === true);
            });
        },
        parse: function(data){
            var array = data.split("\n");
            this.height = array.length;
            this.width = 0;
            this.walls = new Array(this.height);
            this.storage = new Array(this.height);
            for(var i = 0 ; i< this.height;i++){
                this. walls[i] = new Array(array[i].length);
                this.width = Math.max(array[i].length,this.width);
            }
            for(var j= 0 ; j< this.height;j++){
                this.walls[j] = new Array(this.width);
                this.storage[j] = new Array(this.width);
            }
            this.boxes = [];
            for(var y = 0 ; y< this.height;y++){
                for(var x = 0 ; x < this.width;x++){
                    if( x >= this.walls[y].length) {
                        break;
                    }else{
                        switch(array[y][x]){
                            case '@':
                                this.player = new Player( new Point(x,y), this);
                                break;
                            case '#':
                                this.walls[y][x] = true;
                                break;
                            case '$':
                                this.boxes.push(new Box(new Point(x,y),this));
                                break;
                            case '.':
                                this.storage[y][x] = true;
                                break;
                            case '*':
                                this.boxes.push(new Box(new Point(x,y),this));
                                this.storage[y][x] = true;
                                break;
                        }
                    }
                }
            }
        }
    };

    function Player(pos,level){
        this.level = level;
        this.pos = pos;
    }

    Player.prototype = {
        move: function(delta){
            var newPos = this.pos.add(delta);
            if(this.level.hasMovingAt(newPos)){
                this.level.getMovingAt(newPos).move(delta)
            }
            if(this.level.inWall(newPos) || this.level.hasMovingAt(newPos)){
                return false
            }else{
                this.pos = newPos;
                return true;
            }
        }
    };

    function Box(pos,level){
        this.level = level;
        this.pos = pos;
    }

    Box.prototype = {
        move: function(delta){
            var newPos = this.pos.add(delta);
            if(this.level.inWall(newPos) || this.level.hasMovingAt(newPos)){
                return false
            }else{
                this.pos = newPos;
                return true;
            }
        }
    };

    function loadImage(file){
        var img = new Image();
        img.src = "img/"+file;
        return img;
    }

    var canvas = $("#sokoban");
    canvas[0].height = 320;
    canvas[0].width = 320;
    var context = canvas[0].getContext("2d");
    var levels = [];
    var levelNum;
    var currentLevel;
    var maxLevel;

    var crateImg = loadImage("crate.png");
    var storageImg = loadImage("storage.png");

    function onLevelLoad(level_num){
        return function(data){
            levels[level_num] = data;
            if(level_num == levelNum){
                currentLevel = new Level(levels[levelNum]);
            }
        }
    }

    function animate(){
        if(currentLevel.isComplete()){
            levelNum++;
            currentLevel = new Level(levels[levelNum]);
            if(levelNum > maxLevel){
                context.fillText("You Win!",0,0,canvas.width());
                return;
            }
        }
        currentLevel.render(context);
        requestAnimationFrame(animate);
    }

    $(document).keydown(keyPress);

    function keyPress(evt){
        switch(evt.keyCode){
        case 37:
            //left arrow
            currentLevel.player.move(new Point(-1,0));
            break;
        case 38:
            //up arrow
            currentLevel.player.move(new Point(0,-1));
            break;
        case 39:
            //right arrow
            currentLevel.player.move(new Point(1,0));
            break;
        case 40:
            //down arrow
            currentLevel.player.move(new Point(0,1));
            break;
        case 82://'r'
            currentLevel = new Level(levels[levelNum]);
            break;
        }
    }

    $.get("levels/index.json").then(function(data) {
        var level_index = JSON.parse(data);
        levelNum = level_index.min_level;
        maxLevel = level_index.max_level;
        for (var level = level_index.min_level; level <= level_index.max_level; level++) {
            var promise = $.get("levels/level" + level + ".xsb").done(onLevelLoad(level));
            if(level == level_index.max_level){
                promise.done(function(){
                    animate();
                });
            }
        }
    });
});