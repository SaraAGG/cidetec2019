import React from 'react';

import processImg from '../images/stdv.jpg'

import Button from '@material-ui/core/Button';


import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from "react-router-dom";

import { connect }  from 'react-redux';

import { getAllProjects } from '../requests/requestsProducts';
import List from '@material-ui/core/List';
import * as actions from '../actions/productActions';




class Process extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			openMenu:false,
			anchorEl:null,
			products:[]
		}

		this.handleMenuOpen = this.handleMenuOpen.bind(this);
		this.handleCloseMenu = this.handleCloseMenu.bind(this);
		this.getProjects();
}
	
	handleMenuOpen(event){
		this.setState({
			anchorEl:event.currentTarget,
			openMenu:true
		})
		console.log(this.state.setAnchorEl)
	}

	handleCloseMenu(){
		this.setState({
			openMenu:false
		})
	}

	getProjects(){
		getAllProjects(this.props.user.jwt).then(response=>{
			console.log(response.docs.product_name)
			this.state.products = [...response.docs.product_name]
			console.log("estado del producto ", this.state.products)
		}).catch(error=>{
			console.log(error)
		})
		//console.log("yoooo",this.state.products)
	}
	getValue(item){
		this.props.dispatch(actions.loadSingleProduct(item))
		this.props.history.push('/emphatize/'+item)
	}

	render(){
		const {openMenu, anchorEl, products} = this.state
		return(
						<div className="container">
							<div className="row justify-content-center">
								<div className="col-12 col-md-8">
									<h1 style={{"marginTop":"100px", "textAlign":"center"}}>SYSTEMATIZED DESIGN THINKING</h1>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-8">
									<img src={processImg} />
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-8">
									<Link to="/registrar-producto">
										<Button style={{"backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous"}} 
										fullWidth={true}
										variant="contained"
										 >Start Process</Button>
									</Link>

								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-8">
									<Button
									aria-controls="simple-menu"
									aria-haspopup="true" 
									onClick = {this.handleMenuOpen}
									style={{"border":"5px solid", "marginTop":"25px", "fontSize":"24px", "fontFamily":"Righteous"}}
									fullWidth={true}
									color="black"
									variant="outlined"
									> Continue Process</Button>
								</div>
								<Menu id="simple-menu" anchorEl={anchorEl} keepMounted
								open={openMenu}
								onClose={this.handleCloseMenu}>
									{	
										products.map((key,index)=>{
											return(
												<List key={index}>
													<Button onClick={(e)=>{this.getValue(key)}} style={{"color":"black","fontSize":"24px", "fontFamily":"Righteous"}}>Product: {key}</Button>
												</List>
											)
										})	
									}
								</Menu>
							</div>
						</div>

			)
	}
}

function mapStateToProps(state, ownProps){
	return {
		user: state.user,
		product:state.user
	}
}
export default connect(mapStateToProps)(Process);