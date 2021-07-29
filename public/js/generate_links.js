async function generateLink() {
	const search_data = document.getElementById("search_box").value
	console.log("inside generate links");
	const response = fetch('https://forthefans.in:3000/check-streamer', {
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
		},
		body: search_data
	})
		.then(res => res.json())
		.then(jsonResponse => {
			console.log(jsonResponse);
		})

	document.getElementById("generated_url_block").style.display = "block";
	document.getElementById("generate").innerHTML = "DO NOT SHARE THIS URL";
	const link = search_data + (Math.floor(Math.random() * 10000) + 111);
	document.getElementById("generated_url").value = '';
	document.getElementById("generated_url").value = "https://forthefans.in:3000/alerts/"+link;
}