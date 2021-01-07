import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';

import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';


import Logo from '../images/logo.png';

import { connect } from 'react-redux';

//import * as actions from '../actions/userAction';
import * as actions from '../actions/productActions';


import  { push } from 'react-router-redux';

import { getAuth } from '../requests/requestsProducts';
import { registerProduct } from '../requests/requestsProducts';


import { getSingleProduct } from '../requests/requestsProducts';



import { BrowserRouter as ReactRouter, Route, Link } from "react-router-dom";

import  teal from '@material-ui/core/colors/teal';

import swal from 'sweetalert';


class RegisterProduct extends React.Component{
	constructor(props){
		super(props);



		this.state = {
			product:'',
			type_product:'',
			number_surveys:''
		}

		this.handleProductChange = this.handleProductChange.bind(this);
		this.handleTypeProductChange = this.handleTypeProductChange.bind(this);
		this.handleWishedSurveys = this.handleWishedSurveys.bind(this);
		this.postRegistProductData = this.postRegistProductData.bind(this);

		//this.auth();
	}

	handleProductChange(event){
		this.setState({
			product:event.target.value
		})
	}

	handleTypeProductChange(event){
		this.setState({
			type_product:event.target.value
		})
	}

	handleWishedSurveys(event){
		this.setState({
			number_surveys:event.target.value
		})
		console.log(this.state.number_surveys)
	}

	newProcess(){
		
	}

/* pasar el producto al redux storage */

	postRegistProductData(){

		if(this.state.product === '' || this.state.type_product ==='' || this.state.number_surveys === ''){
			swal("Hey there!", "Please fill out all the fields", "warning");
		}else{
			const data = {
				"product_name":this.state.product,
				"product_type":this.state.type_product,
				"number_surveys":this.state.number_surveys,
				//"username":this.props.user.jwt
				}
				console.log(data['product_name'])
				registerProduct(data, this.props.user.jwt).then(response=>{
					if(response.docs){
					 	console.log(response.docs)
					 	console.log(data['product_name'])
				 		//getSingleProduct(data['product_name'], this.props.user.jwt)
				 		this.props.dispatch(actions.loadSingleProduct(data['product_name']))
					 	this.props.history.push('/emphatize/'+this.props.product.product)
					 }
				})
			//console.log(data)
		}
		
	}
	componentDidMount(){
		this.props.dispatch(actions.unloadProduct({}))
	}
	/*
	auth(){
		getAuth(this.props.user.jwt).then(this.props.user.jwt).then(response=>{
			console.log(response)
		})
	}
	*/
	render(){
		return(
				<div className="container-fluid">
					<div className="row justify-content-around product-Form">
						<div className="col-12 col-md-4">
							<Card raised={true}>
								<CardHeader title="Product Registration" disableTypography={true} style={{"textAlign":"center", "marginTop":"50px","fontSize":"36px","fontFamily":"Righteous" }}/>
								<CardContent>
									<div className="row justify-content-center">
										<div className="col-12 col-md-10">
											<TextField variant="outlined" 
											placeholder="product" 
											onChange = {this.handleProductChange}
											fullWidth={true}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-12 col-md-10">
											<RadioGroup className="radio-Form" onChange={this.handleTypeProductChange}>
												<FormControlLabel control={<Radio color="primary" value="0"/> } label="New Product" labelPlacement="start" style={{"fontSize":"24px",  "fontFamily":"Righteous"}}/>
												<FormControlLabel control={<Radio color="primary" value="1"/> } label="Known Product" labelPlacement="start"/>
											</RadioGroup>
											<div className="row justify-content-end">
												<InputLabel htmlFor="age-native-simple" style={{"fontFamily":"Righteous", "fontSize":"18px", "marginRight":"10px"}}>Number Wished Surveys </InputLabel>
												<NativeSelect onChange={this.handleWishedSurveys} variant="filled"						
												>
													<option value=""/>
													<option value={10}>10</option>
													<option value={20}>20</option>
													<option value={30}>30</option>
													<option value={40}>40</option>
													<option value={50}>50</option>
													<option value={60}>60</option>
												</NativeSelect>
											</div>
										</div>
									</div>
									<div className="row justify-content-center" style={{"marginTop":"100px", "marginBottom":"50px"}}>
										<div className="col-12 col-md-6">
											<Button style={{"backgroundColor":"black", "color":"white", "fontSize":"22px", "fontFamily":"Righteous", "margin":"0"}} variant="contained" 
											onClick={this.postRegistProductData}
											fullWidth={true}
											size="large"		
											> Continue </Button>
										</div>
									</div>
								</CardContent>

							</Card>
						</div>
						<div className="col-12 col-md-4">
							<div className="row justify-content-center" style={{"marginTop":"70px", "fontSize":"25px"}}>
								<p>Please fill out the product or service that will be validated in this process. It can be a new product or a known one with new features. Please indicate how many surveys you need to validate your product.</p>
							</div>
							<div className="row justify-content-start">
								<img src={Logo} style={{"width":"400x","height":"400px"}}/>
							</div>
						</div>
					</div>
				</div>
			)
	}
}

function mapStateToProps(state, ownProps){
	return {
		user: state.user,
		product: state.products
	}
}
export default connect(mapStateToProps)(RegisterProduct);