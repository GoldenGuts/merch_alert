const form = document.getElementById('main_form');
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

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

	if(content.name) {
		document.getElementById("generated_url_block").style.display = "block";
		document.getElementById("generate").innerHTML = "Generate Again?";
		const link = content.unique_url;
		document.getElementById("generated_url").value = '';
		document.getElementById("generated_url").value = "https://forthefans.in:3000/alerts/"+link;	
	} else {
		document.getElementById("generated_url_block").style.display = "block";
		document.getElementById("generate").innerHTML = "Found The Link!!";
		const link = content[0].RowDataPacket.unique_url;
		document.getElementById("generated_url").value = '';
		document.getElementById("generated_url").value = "https://forthefans.in:3000/alerts/"+link;
	}
};