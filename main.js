let canvas = document.getElementById("snake");
let context = canvas.getContext('2d');//renderiza a imagem
let box = 32; 
let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box
}
let direction = "right";
let food = {
	x: Math.floor(Math.random() * 15 +1 )*box,
	y: Math.floor(Math.random() * 15 +1 )*box
	
}

function criarBg() {
	
	context.fillStyle = 'black';
	context.fillRect (0, 0, 16 * box, 16 * box);
}//função define o background

function criarCobra() {
	
	for(i=0; i < snake.length; i++){
		context.fillStyle = 'green';
		context.fillRect(snake[i].x, snake[i].y, box, box)
		}
}

function criarFood(){
	context.fillStyle = "red";
	context.fillRect(food.x, food.y, box, box);
	
}

document.addEventListener('keydown', update);

function update (Event){
	
	if(Event.keyCode == 37 &&  direction != "right") direction="left";
	if(Event.keyCode == 38 && direction != "down") direction ="up";
	if(Event.keyCode == 39 && direction != "left") direction ="right";
	if(Event.keyCode == 40 && direction != "up") direction ="down";
}

function iniciarGame() {
	
	for(i = 1; i < snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(jogo);
			const gameover = document.querySelector('.gameover')
			gameover.classList.remove('hidden');
			console.log('inciando')
		}
		
	}
	
	
	if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
	if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
	if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
	if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;
	
	criarBg();
	criarCobra();
	criarFood();
	
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	
	if(direction == 'right') snakeX += box;
	if(direction == 'left') snakeX -= box;
	if(direction == 'up') snakeY -= box;
	if(direction == 'down') snakeY += box;
	
	
	if(snakeX != food.x || snakeY != food.y){
		snake.pop();
	}
	else{
		food.x = Math.floor(Math.random() * 15 +1 )*box,
		food.y = Math.floor(Math.random() * 15 +1 )*box
	}
	
	
	let novaCabeca = {
		x: snakeX,
		y: snakeY
	}

	snake.unshift(novaCabeca)
}

let jogo = setInterval(iniciarGame, 100);
