export function login(jwt){
	//console.log(jwt)
	return { type: 'LOG_IN', jwt }
}


export function logout(){
	return { type: 'LOG_OUT' };
}

export function loadUser(user){
	//console.log(user);
	return { type: 'LOAD_USER', user}
}