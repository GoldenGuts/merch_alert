const socket = io("https://forthefans.in:3000/alerts"); 

socket.on('message', message => {
	console.log(message);
})

socket.on("connect", () => {
	socket.emit("streamer_url", window.location.href);
});