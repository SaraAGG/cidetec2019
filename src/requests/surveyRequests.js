function fillUserForm(user_info){
	return fetch(`http://192.168.0.103:5001/encuesta/responder/`,{
		method:'POST',
		body:JSON.stringify(user_info),
		headers:{
			'Content-Type': 'application/json',
			'Accept':'application/json'
		}		
	}).then(response=>{
		return response.json();
	})
}

export { fillUserForm }
