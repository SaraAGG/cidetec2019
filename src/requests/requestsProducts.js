	

function getAuth(jwt){
	return fetch(`http://192.168.0.103:5001/register_product/`,{
		method:'POST',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}



function registerProduct(data, jwt){
	return fetch(`http://192.168.0.103:5001/register_product/`,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type': 'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}		
	}).then(response=>{
		return response.json();
	})
}

function getSingleProduct(slug, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}


function registerInterview(slug, data, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/interview/`+slug,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}

function addAttributes(slug, data, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/derivation/`+slug,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}


function addFinalAttributes(slug, data, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/classification/`+slug,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}


function addDefinitiveAttributes(slug, data, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/final_attributes/`+slug,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}

function getInterview(slug, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/check/interview/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}


function getDerivation(slug, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/check/derivation/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}

function getClassification(slug, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/check/classification/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}

function getFinal(slug, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/check/final/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}

function getFinalPublic(slug,user){
	return fetch(`http://192.168.0.103:5001/emphatize/check/final/public/`+slug,{
		method:'POST',
		body:JSON.stringify(user),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
		}
	}).then(response=>{
		return response.json()
	})
}

function updateClassification(slug, data, jwt){
	return fetch(`http://192.168.0.103:5001/emphatize/update/classification`+slug,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}


function getAllProjects(jwt){
	return fetch(`http://192.168.0.103:5001/projects/`,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json();
	})
}

//Function publica CLIENTES A CONTESTAR LA ENCUESTA
function postSurvey(product, data, username){
	return fetch(`http://192.168.0.103:5001/survey/`+username+`/`+product,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json'
		}
	})
}

function Email(url,jwt){
	return fetch(`http://192.168.0.103:5001/email/`,{
		method:'POST',
		body:JSON.stringify(url),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json()
	})
}

function getTotalSurveysByUser(slug, jwt){
	return fetch(`http://192.168.0.103:5001/survey/total/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json();
	})
}

function getTotalSurveysCounter(slug, jwt){
	return fetch(`http://192.168.0.103:5001/survey/count/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json();
	})
}

function getMethodology(slug, jwt){
	return fetch(`http://192.168.0.103:5001/metholody/`+slug,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		return response.json();
	})
}

function postMethodology(slug,data,jwt){
	return fetch(`http://192.168.0.103:5001/metholody/type`+slug,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}


export { postMethodology };
export { getMethodology }; 
export { getTotalSurveysByUser }
export { getTotalSurveysCounter };
export { getFinalPublic };
export { Email };
export { postSurvey };
export { addDefinitiveAttributes };
export { getAllProjects };
export { updateClassification };
export { addFinalAttributes }
export { getFinal };
export { getClassification };
export { getDerivation };
export { getInterview };
export { addAttributes };
export { registerInterview };
export { registerProduct };
export { getAuth };
export { getSingleProduct };	