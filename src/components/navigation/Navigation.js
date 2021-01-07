import React from 'react';

import MyAppBar from './myappbar';

import { connect } from 'react-redux';

import { push } from 'react-router-redux';

import { logout } from '../../actions/userAction';
import { unloadProduct } from '../../actions/productActions';

import Login from '../../components/login';



class Navigation extends React.Component{
	constructor(props){
		super(props);
		console.log("navigation props", props)
		
		this.state = {
			define:false
		}
		this.logout = this.logout.bind(this);
		this.checkDefine();
		
		

	}

	logout(){
		this.props.dispatch(logout());
		//this.props.history.push("/")
		this.props.dispatch(unloadProduct());
	}
	checkDefine(){
		if(this.props.product.final_completed===true){
		this.setState({
			define:true
			})
		}
		console.log("state", this.state.define)
		console.log(this.props.product.final_completed)
	}


	render(){
		return  <MyAppBar logout={this.logout} define={this.checkDefine}/>
	}
}

function mapStateToProps(state, ownProps){
	return {
		user: state.user,
		product:state.products
	}
}

export default connect(mapStateToProps)(Navigation)