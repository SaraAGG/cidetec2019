import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container';

import TextField from '@material-ui/core/TextField';


import bannerCideteccrop from '../images/bannerCidetec.png';
import splash from '../images/Group.png';

import { connect } from 'react-redux';
	
import * as actions from '../actions/userAction';

import  { push } from 'react-router-redux';


import { BrowserRouter as ReactRouter, Route, Link } from "react-router-dom";

import { login } from '../requests/auth';


import  teal from '@material-ui/core/colors/teal';

import LoadingScreen from 'react-loading-screen';

import AppBar from '@material-ui/core/AppBar';

class Login extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			user:'',
			password:'',
			isLoading:splash
		}

	//console.log(props.user)
  	  this.handleChange = this.handleChange.bind(this);
  	  this.handleSubmit = this.handleSubmit.bind(this);
  	  this.handlePasswordChange = this.handlePasswordChange.bind(this);

  	  this.requestAuth = this.requestAuth.bind(this);
	}

	componentWillMount(){
		console.log(this.state.isLoading)
	}

	getData(){
		setTimeout(()=>{
			this.setState({
				isLoading:""
			})
		},5000)
	}
	componentDidMount(){
		this.getData()
	}
	handleChange(event){
		this.setState({
			user: event.target.value,
		})
	}
	handlePasswordChange(event){
		this.setState({
			password: event.target.value,
		})
	}

	handleSubmit(event){
		if(this.state.user ==='' || this.state.password ===''){
			alert('Algun campo es requerdo')
		}	
	}

	requestAuth(){
		const credentials ={
			username: this.state.user,
			password: this.state.password
		}
		login(credentials).then(data =>{
			console.log(data.jwt)
			//console.log(data.user)
			this.props.dispatch(actions.login(data.jwt));
			this.props.dispatch(actions.loadUser(data.username))
			this.props.history.push('/process')
		})
	}


	render(){
		return(
			<div>
			{this.state.isLoading ?  <LoadingScreen>
					<div className="container-fluid stuff"></div>
				</LoadingScreen> :
				<div className="container-fluid login-forms">	
					<div className="row justify-content-end Card-Form">
						<div className="col-12 col-md-4">
							<Card className="Card-login"raised= {true}>
								<CardHeader title="WELCOME" disableTypography={true} 
									style={{"textAlign":"center", "marginTop":"100px","fontSize":"36px","fontFamily":"Righteous" }}/>
									<CardContent>
										<div className="row justify-content-md-center login-form">
											<div className="col-12 col-md-8">						
												<TextField  placeholder="username"
												fullWidth={true}
												variant="outlined"
												onChange={this.handleChange}
												/>
											</div>
										</div>
										<div className="row justify-content-md-center login-form">
											<div className="col-12 col-md-8">
												 <TextField className="Input-Password"
												 	placeholder="password"
												 	type="password"
												 	variant="outlined"
												 	fullWidth={true}
												 	required={true}
												 	onChange ={this.handlePasswordChange}								 	
												 />
												</div>
											</div>
										<div className="row justify-content-md-center login-form">
											<div className="col-12 col-md-8">
												<Button variant="contained" 
													style={{"backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous","marginTop":"25px"}} 
													size="large"
													fullWidth={true}
													onClick={this.requestAuth}
													 >Log In
												</Button>
											</div>
										</div>
										<div className="row justify-content-md-center login-form">
											<div className="col-12 col-md-8">
												<p style={{"textAlign":"center"}}> Don't have an account? <Link to="/register"style={{"color":"black"}}>Sign Up </Link> </p> 
											</div>
										</div>
									</CardContent>
							</Card>
						</div>
					</div>
				
				</div>	
				}
				</div>
			)
	}
}

function mapStateToProps(state, ownProps){
	return {
		user: state.user
	}
}
export default connect(mapStateToProps)(Login);