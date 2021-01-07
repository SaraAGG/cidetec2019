export default function productReducer(state ={name:'Marco'}, action){
	switch(action.type){
		case 'LOAD_PRODUCT':
			return Object.assign({},state,{ product: action.product });
		case 'IN_LOG_OUT':
			return {};
		case 'DERIVATION':
			return Object.assign({}, state, { loaded_attributes: action.derivation})
		case 'CLASSIFICATION':
			return Object.assign({}, state, { class_attributes: action.classification });
		case 'FINAL_COMPLETED':
			return Object.assign({}, state, { final_completed : action.final });
		default:
			return state;
	}
}