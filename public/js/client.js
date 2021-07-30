const socket = io("https://forthefans.in:3000");

if ( window.location.href == "https://forthefans.in:3000/" ){

	const test_button = document.getElementById('test_alert');

	test_button.addEventListener('click', event => {
		socket.emit("test_alert", document.getElementById('test_input_box').value);
	});

} else if ( (window.location.href).includes('alerts/') ) {
	socket.on("connect", () => {
		socket.emit("streamer_url", window.location.href);
	});
} else {
	socket.on('message', message => {
		console.log(message);
	})
}