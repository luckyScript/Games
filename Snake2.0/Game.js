/**
 * Created by Kay on 2/26/16.
 */
function Game() {
    this.map = new Map();
    this.snake = new Snake();
    this.food = new Food();
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.fail = false;
}
Game.prototype = {
    drawMap:function() {
        this.canvas.width = this.map.width;
        this.canvas.height = this.map.height;
        this.ctx.beginPath();
        this.ctx.rect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.fillStyle = this.map.backgroundColor;
        this.ctx.closePath();
        this.ctx.fill();
    },
    drawFood:function() {
        this.ctx.drawImage(this.food.image,this.food.x-10,this.food.y-10,20,20);
        //console.log(this.food.x+" "+this.food.y);
    },
    drawSnake:function() {
        this.ctx.beginPath();
        for(var i = 0;i < this.snake.len;i++) {
            this.ctx.beginPath();
            this.ctx.rect(this.snake.body[i][0]-10,this.snake.body[i][1]-10,20,20);
            this.ctx.fillStyle = "red";
            this.ctx.closePath();
            this.ctx.fill();
        }
    },
    initGame:function() {
        this.drawMap();
        this.food.init();
        this.drawFood();
        this.snake.init();
        this.drawSnake();
    },
    updateGame: function() {
        if(!this.fail){
            this.testFail();
            this.snake.keyWatch();
            this.testEat();
            this.ctx.clearRect(0,0,800,600);
            this.drawMap();
            this.drawFood();
            this.drawSnake();
        }else {

        }
    },
    testEat:function() {
        if(this.snake.x == this.food.x&&this.snake.y == this.food.y) {
            this.snake.move(1);
            this.food.init();
            console.log(this.snake.len);
        }else{
            this.snake.move(0);
        }
    },
    testFail:function() {
        var newArr = [];
        for(var i = 0;i<this.snake.body.length;i++) {
            newArr[i] = this.snake.body[i];
        }
        newArr.shift();
        console.log(newArr);
        for(i = 0;i<newArr.length;i++) {
            if(newArr[i][0] == this.snake.x&&newArr[i][1] == this.snake.y) {
                this.fail = true;
                alert("咬到了自己,失败了,您的成绩是" + this.snake.len);
            }
        }
        //console.log(this.snake.x+" "+this.snake.y);
        if (this.snake.x < 10 || this.snake.x > this.map.width-10 || this.snake.y < 10 || this.snake.y > this.map.height-10) {
            this.fail = true;
            alert("碰到了墙壁,失败了,您的成绩是" + this.snake.len);
        }
    }
};
