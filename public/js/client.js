const socket = io(); 
const test_button = document.getElementById('test_alert');

socket.on('message', message => {
	console.log(message);
})

socket.on("connect", () => {
	socket.emit("streamer_url", window.location);
});


test_button.addEventListener('click', event => {
	socket.emit("test_alert", "message");
});