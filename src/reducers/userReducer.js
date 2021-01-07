export default function userReducer(state = {name:'Marco'}, action){
	switch(action.type){
		case 'LOG_IN':
			return Object.assign({},state,{ jwt: action.jwt });
		case 'LOG_OUT':
			return {};
		case 'LOAD_USER':
			return Object.assign({},state, {
				username: action.user,
				//_id: action.user._id
			})

		default:
			return state;		
	}
}