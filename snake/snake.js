window.onload = function() {
    var canvas = document.querySelector('canvas');
    canvas.width = 800;
    canvas.height = 600;
    var ctx = canvas.getContext('2d');

    function Snake(x,y) {
        this.x = x;
        this.y = y;
        this.element = [[x,y],[x,y+10],[x,y+20]];
        ate = false;
        defaultMove = true;
        food.appear();
        this.initSnake = function() {  
            ctx.beginPath();
            ctx.rect(0,0,800,600);
            ctx.fillStyle = "blue"
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.rect(this.element[0][0],this.element[0][1],10,10)
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            for(var i = 1;i < this.element.length;i++) {
                ctx.rect(this.element[i][0],this.element[i][1],10,10);
            }
            ctx.closePath();
            ctx.fill();
        }
        this.updateSnake = function() {
            var that = this;
            if(defaultMove){
                direction = "right"
            }
            if(!ate){
                this.element.pop();
            }else{
                ate = false;
            }
            if(direction == "right") {
                var newX = this.element[0][0]+10;
                var newY = this.element[0][1];
            }else if(direction == "down") {
                newX = this.element[0][0];
                newY = this.element[0][1]+10;
            }else if(direction == "left") {
                newX = this.element[0][0]-10;
                newY = this.element[0][1];
            }else if(direction == "up") {
                newX = this.element[0][0];
                newY = this.element[0][1]-10;
            }
            document.onkeydown = function(event) {
                defaultMove = false;
                event = event||window.event;
                if (event.keyCode == 40) {
                    event.preventDefault();
                    if (that.element[0][0] == that.element[1][0]){
                        return false; 
                    }else{
                        direction = "down";
                    }
                }else if(event.keyCode == 37) {
                    event.preventDefault();
                    if (that.element[0][1] == that.element[1][1]){
                        return false;
                    }else {
                        direction = "left";
                    }
                }else if(event.keyCode == 38) {
                    event.preventDefault();
                    if (that.element[0][0] == that.element[1][0]){
                        return false;
                    }else {
                        direction = "up";
                    }
                }else if(event.keyCode == 39) {
                    event.preventDefault();
                    if (that.element[0][1] == that.element[1][1]){
                        return false;
                    }else {
                        direction = "right";
                    }
                }
            }
            this.element.unshift([newX,newY]);
            console.log(direction);
            ctx.clearRect(0,0,800,600);
            this.initSnake();
            this.eating();
            food.appear();
        }
        this.eating = function() {
            var headX = this.element[0][0];
                headY = this.element[0][1];
            ate = Math.abs(headX - food.x) <= 10 && Math.abs(headY - food.y) <= 10;
            if(ate) {
                food.newFood();
            }
        }
    }
    function Food() {
        this.x = parseInt(80*Math.random())*10;
        this.y = 400;
        this.newFood = function() {
            this.x = parseInt(80*Math.random())*10;
            this.y = parseInt(60*Math.random())*10;
        }
        this.appear = function() {
            ctx.beginPath();
            ctx.arc(this.x,this.y,5,0,2*Math.PI);
            ctx.fillStyle = "green";
            ctx.closePath();
            ctx.fill();
        }
    }
    Snake.prototype = {
        length : 3
    }
    food = new Food();
    var eatSnake = new Snake(100,400);
    eatSnake.initSnake();
    window.setInterval(function() {
        eatSnake.updateSnake();
    },500);
}