import { getProfessions } from "../requests/clientsRequests";

export function loadSingleProduct(product){
	console.log(product)
	return { type:'LOAD_PRODUCT', product };
}

export function unloadProduct(){
	return { type : 'IN_LOG_OUT' };
}

export function loadClassification(classification){
	console.log("soy la classification ", classification)
	return { type : 'CLASSIFICATION', classification };
}

export function derivationAttributes(derivation){
	console.log("soy la derivation", derivation)
	return { type: 'DERIVATION', derivation}
}

export function emphatizeCompleted(final){
	return { type : 'FINAL_COMPLETED', final}
}
