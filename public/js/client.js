const socket = io("https://forthefans.in:3000");

if ( window.location.href == "https://forthefans.in:3000/" ){

	const test_button = document.getElementById('test_alert');

	test_button.addEventListener('click', event => {
		socket.emit("test_alert", document.getElementById('test_input_box').value);
	});

} else if ( (window.location.href).includes('alerts/') ) {

	const alertSocket = io("https://forthefans.in:3000/alerts");

	alertSocket.on("connect", () => {
		alertSocket.emit("streamer_url", window.location.href);
	});

	alertSocket.on("order_alert", order => {
		// display the alert

		const gif = document.getElementById("image_above");
		const alert = document.getElementById("alert_container");
		const customer_name = document.getElementById("customer_name");
		const customer_product = document.getElementById("customer_product");
		const customer_note = document.getElementById("customer_note");
		
		let product;
		if(order.product == 1) 
			product = "T-Shirt";
		else if(order.product == 2) 
			product = "Poster";
		else
			product = "Something"

		const audio = new Audio('../audio/tuturu.mp3');
		audio.play();
		gif.src = "../images/logo.png"
		customer_name.textContent = order.name;
		customer_product.textContent = product;
		customer_note.textContent = order.note;

		alert.classList.add("show");
		gif.classList.add("visible");

		setTimeout(() => alert.classList.remove("show"), 15000);
		setTimeout(() => gif.classList.remove("visible"), 15000);
	});

} else {
	socket.on('message', message => {
		console.log(message);
	});
}