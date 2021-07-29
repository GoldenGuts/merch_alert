function generateLink() {
	document.getElementById("generated_url_block").style.display = "block";
	document.getElementById("generate").innerHTML = "DO NOT SHARE THIS URL";
	const link = document.getElementById("search_box").value + (Math.floor(Math.random() * 10000) + 111);
	document.getElementById("generated_url").value = '';
	document.getElementById("generated_url").value = "https://forthefans.in:3000/alerts/"+link;
}