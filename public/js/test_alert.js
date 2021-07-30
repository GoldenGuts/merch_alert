const socket = io("https://forthefans.in:3000/"); 
const test_button = document.getElementById('test_alert');

test_button.addEventListener('click', event => {
	socket_alert.emit("test_alert", "message");
});