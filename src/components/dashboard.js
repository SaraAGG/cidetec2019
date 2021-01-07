import React from 'react';

import Button from '@material-ui/core/Button';


import { getProducts, getAuth } from '../requests/requestsProducts';

import ProductHorizontal from './horizontalProduct';


import { connect } from 'react-redux';

import * as actions from '../actions/productActions';

class Dashboard extends React.Component{

	constructor(props){
		super(props);

		//this.loadProducts();
		this.loadAuth();
		console.log(this.props.user.jwt)
		this.state = {
			myproducts:{}
		}

		//this.products()
	}

	loadAuth(){
		getAuth(this.props.user.jwt).then(response=>{
			this.setState({
				myproducts:response.docs
			})
			//console.log(response.docs)
			console.log(this.state.myproducts)
		})

	}

	//loadProducts(){
	//	this.props.dispatch(actions.loadAll() )
	//}	
	
	products(){
		return this.props.products.map((product, index)=>{
			return <ProductHorizontal products = {product}/>
			});
	}
	render(){
		return (
				<div>
				{this.products()}
				</div>
			)
	}
}


function mapStateToProps(state, ownProps){
	return {
		products: state.products,
		user: state.user
	}
}
export default connect(mapStateToProps)(Dashboard);