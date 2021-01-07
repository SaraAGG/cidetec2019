function getProfessions(jwt){
	return fetch(`http://192.168.0.103:5001/clients/professions/`,{
		method:'GET',
		headers:{
			'Content-Type':'application/json',
			'Accept':'application/json',
			'Authorization':'Bearer '+jwt
		}
	}).then(response=>{
		console.log(response)
		return response.json()

	}).catch(error=>{console.log(error)})
}

function postDefineProfile(data,jwt){
	return fetch(`http://192.168.0.103:5001/clients/query/users/`,{
		method:'POST',
		body:JSON.stringify(data),
		headers:{
			'Content-Type':'application/json',
			'Authorization':'Bearer '+jwt
		}
	})
}


export { postDefineProfile };
export { getProfessions };


