const form = document.getElementById('main_form');
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

let button = document.getElementById("generate");
let url = document.getElementById("generated_url");
const search_data = document.getElementById("search_box");	

search_data.addEventListener("change", stateHandle);
button.disabled = true;

function stateHandle() {
	if((search_data.value).length === 4 || (search_data.value).length == 4) {
	    button.disabled = false;
	} else {
	    button.disabled = true;
	}
}

const generateLink = async () => {
	button.disabled = true;
	const rawResponse = await fetch('https://forthefans.in:3000/check-streamer', {
	  method: 'POST',
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'text/plain'
	  },
	  body: search_data.value
	});
	const content = await rawResponse.json();

	if(content.name) {
		document.getElementById("generated_url_block").style.display = "block";
		button.innerHTML = "Generate Again?";
		console.log(content)
		const link = content.unique_url;
		url.value = '';
		url.value = "https://forthefans.in:3000/alerts/" + link;	
	} else {
		document.getElementById("generated_url_block").style.display = "block";
		button.innerHTML = "Found The Link!!";
		console.log(content)
		const link = content[0].RowDataPacket.unique_url;
		url.value = '';
		url.value = "https://forthefans.in:3000/alerts/"+link;
	}
};