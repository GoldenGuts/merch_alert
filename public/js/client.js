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

		const alert = document.getElementById("alert")
		const customer_name = document.getElementById("customer_name");
		const customer_product = document.getElementById("customer_product");

		customer_name.textContent = order.name;
		customer_product.textContent = order.product;

		alert.classList.add("show");

		setTimeout(() => alert.classList.remove("show"), 5000);
	});
} else {
	socket.on('message', message => {
		console.log(message);
	});
}