const canvas = document.getElementById('tank');
let context = canvas.getContext('2d');
let cw = canvas.width;
let ch = canvas.height;
// set canvas to be a tab stop (necessary to give it focus)
canvas.setAttribute('tabindex','0');

// set focus to the canvas
canvas.focus();
let x = 400;
let y = 200;
let draw = () => {
	if (canvas.getContext) {
		context.clearRect(0, 0, cw, ch);
		context.fillStyle = 'green';
		context.fillRect(x, y, 20, 20);
		context.fillRect(x+8, y-10, 4, 10);
		context.fillRect(x-2, y-2, 6, 24);
		context.fillRect(x+16, y-2, 6, 24);
	}

}

draw();
let handleKeydown = (e) => {
	if(e.target.id !== 'tank')
		return;
	switch (e.keyCode){
		case 87: y -= 7; 
			break;
		case 65: x -= 7; 
			break;
		case 83: y += 7; 
			break;
		case 68: x += 7; 
			break;
	}
	draw();
}


document.addEventListener("keydown", handleKeydown, false);


