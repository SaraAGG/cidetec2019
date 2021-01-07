
function login(credentials){
	return fetch(`http://192.168.0.103:5001/login`,{
		method:'POST',
		body: JSON.stringify(credentials),
		headers:{
			'Content-Type': 'application/json',
			'Accept':'application/json'
		}
	}).then(response=>{
		return response.json();
	})
}

function register(data){
	return fetch(`http://192.168.0.103:5001/register`,{
		method:'POST',
		body: JSON.stringify(data),
		headers:{
			'Content-Type': 'application/json',
			'Accept':'application/json'
		}
	}).then(response=>{
		return response.json();
	})
}


function getEmail(jwt){
	return fetch(`http://192.168.0.103:5001/me/email/`,{
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

function getNotification(){
	return fetch(`http://192.168.0.103:5001/email/notification/`,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json'
		}
	}).then(response=>{
		return response.json();
	})
}

export { getNotification };
export { getEmail };
export { register };
export { login };
