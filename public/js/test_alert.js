const socket = io("https://forthefans.in:3000/alerts"); 
const test_button = document.getElementById('test_alert');

test_button.addEventListener('click', event => {
	socket.emit("test_alert", "message");
});