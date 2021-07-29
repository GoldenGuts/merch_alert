const generateLink = async () => {
	const search_data = document.getElementById("search_box").value	
	const rawResponse = await fetch('https://forthefans.in:3000/check-streamer', {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'text/plain'
	  },
	  body: search_data
	});
	const content = await rawResponse.json();

	if(!content.length) {
		document.getElementById("generated_url_block").style.display = "block";
		document.getElementById("generate").innerHTML = "DO NOT SHARE THIS URL";
		const link = search_data + (Math.floor(Math.random() * 10000) + 111);
		document.getElementById("generated_url").value = '';
		document.getElementById("generated_url").value = "https://forthefans.in:3000/alerts/"+link;	
	} else {
		console.log(content);
	}
};