import React from 'react';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { Modal } from '@material-ui/core';

import GroupQuestion from '../images/icons/groupQuestion.png'


import { Link } from "react-router-dom"

import { connect }  from 'react-redux';

import RadioForm from './surveyRadio';

import { Email, getFinal } from '../requests/requestsProducts';

import { getEmail,  } from '../requests/auth';

import List from '@material-ui/core/List';

import swal from 'sweetalert';

class DefineSurvey extends React.Component{
	constructor(props){
		super(props);
		console.log("define survey props", props)
			
			//const url ="/define"+this.props.product.product
			this.state = {
				onOpen:false,
				openSend:false,
				emailField:'',
				list:[],
				emailHasChanged:''

			}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.openModalSend = this.openModalSend.bind(this);
		this.closeModalSend = this.closeModalSend.bind(this);
		this.postEmail = this.postEmail.bind(this);
		this.getMyEmail();
		this.loadAttributes();
		this.onEmailChange = this.onEmailChange.bind(this);
		this.toDefineProfile = this.toDefineProfile.bind(this);
		this.toSurveyCounter = this.toSurveyCounter.bind(this);
	}

	openModalSend(event){
		this.setState({
			openSend:true
		})
	}
	closeModalSend(event){
		this.setState({
			openSend:false
		})
	}
	openModal(event){
		this.setState({
			onOpen:true
		})
	}
	closeModal(event){
		this.setState({
			onOpen:false
		})
	}

	getMyEmail(){
		getEmail(this.props.user.jwt).then(response=>{
			console.log("hola", response.docs)
			this.setState({
				emailField:response.docs
			})
		}).catch(error=>{console.log(error)})
	}

	loadAttributes(){
			getFinal(this.props.product.product, this.props.user.jwt).then(response=>{
				this.setState({
					list:this.props.product.class_attributes
				})
			})
		}

	postEmail(){
		const url = {
			"url":"survey/"+this.props.user.username+"/"+this.props.product.product,
			"email":this.state.emailField
		}
		Email(url,this.props.user.jwt).then(response=>{
			console.log(url)
			if(response == 200){
				swal("The email has been sent","","success");
				this.setState({
					onOpen:false,
				})
			}
		})
	}
	onEmailChange(event){
		this.setState({
			emailField:event.target.value
		})
		console.log(this.state.emailHasChanged)
	}

	toDefineProfile(event){
		this.props.history.push("/define/define-profile/"+this.props.product.product)
	}

	toSurveyCounter(event){
		this.props.history.push("/define/define-total-survey/"+this.props.product.product)
	}

	render(){
		const {onOpen, openSend, list, emailField} =this.state
		return(

			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-6">
							<div className="row">
								<div className="col-12 col-md-8 define-title">
									<h1> DEFINE </h1>
								</div>
							</div>
							<div className="row justify-content-start interview-head">
								<div className="col-12 col-md-6">
									<h2>Define Survey Example </h2>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-8">
									<div style={{"overflow":"auto", "height":"302px"}}>
										<Card raised={true}>
											<CardContent>
											<List>
												<ul>
													{
														list.map((key,index)=>{
															return(

																	<List>
																		<div classNames="row justify-content-center">
																			<h5 style={{"fontWeight":"bold", "color":"black"}}>How would you feel if the product have the <h5 style={{"color":"blue", "display":"inline-block"}}>{key}</h5> attribute </h5>
																			<h5 style={{"fontWeight":"bold", "color":"black"}}>How would you feel if the product do <h5 style={{"color":"red", "display":"inline-block"}}>NOT</h5> have the <h5 style={{"color":"blue", "display":"inline-block"}}>{key}</h5> attribute</h5>
																		</div>
																	</List>
																)
														})
													}
												</ul>
											</List>				
											</CardContent>
										</Card>
									</div>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px", "marginLeft":"10px"}}>
								<div className="col-12 col-md-3">
									<Button
									onClick={this.openModal} 
									variant="outlined"
									style={{"width":"150px","border":"3px solid", "fontFamily":"Righteous", "color":"#1DA1F2"}}
									>Share <Icon> share </Icon> </Button>
								</div>
								<div className="col-12 col-md-3">

									<Button
									onClick={this.toDefineProfile}
									variant="contained"
									style={{"backgroundColor":"black", "color":"white", "fontFamily":"Righteous"}}
									>Define Profile</Button>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 dis-col-def">
							<div className="row justify-content-end" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-3">
									<img src={GroupQuestion} />
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-6">
										<h3>This is an example of what your survey will look like, so you can share it</h3>
								</div>
							</div>
							<div className="row  justify-content-center" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-3">
									<Button
									onClick={this.toSurveyCounter}
									fullWidth={true}
									style={{"backgroundColor":"black", "color":"white","fontSize":"20px", "fontFamily":"Righteous"}}
									variant="contained"
									>Next</Button>
								</div>
							</div>
	

						</div>
					</div>
					<div className="row justify-content-center">
						<div className="col-12 col-md-6">
								<Modal
								open={onOpen}
								onClose={this.closeModal}
								>
									<Card raised={true} style={{"margin":"auto", "marginTop":"250px","width":"25%"}}>
										<CardHeader title="The survey will be send to this email" disableTypography={true} style={{"fontSize":"18px", "textAlign":"center", "marginTop":"100px"}} />
											<CardContent style={{"height":"250px"}}>
											<div className="row justify-content-center">
												<div className="col-12 col-md-10">
													<TextField fullWidth={true}
													placeholder={emailField}
													onChange={this.onEmailChange}
													
													/>
												</div>
												<div className="row justify-content-center">
													<div className="col-12 col-md-3">
														<Modal
														open={openSend}
														onClose={this.closeModalSend}>
															<Card style={{"margin":"auto", "marginTop":"350px", "width":"10%"}}>
																<CardContent style={{"textAlign":"center"}}>
																	<div className="row justify-content-center">
																		<p style={{"fontSize":"10px"}}> The survey has been sent</p>
																	</div>
																	<div className="row justify-content-center">
																		<Button
																		onClick={this.closeModalSend}
																	style={{"color":"green"}}>OK </Button>
																	</div>
																</CardContent>
															</Card>
														</Modal>
													</div>
												</div>
											</div>
											<div className="row justify-content-end">
												<div className="col-12 col-md-3">
													<Button 
													onClick={this.postEmail}
													style={{"marginTop":"100px", "color":"green"}}>Send</Button>
												</div>
											</div>

										</CardContent>
									</Card>
								</Modal>
						</div>
					</div>

			</div>
			)
	}
}

function mapStateToProps(state, ownProps){
	return {
		user: state.user,
		product:state.products
	}
}
export default connect(mapStateToProps)(DefineSurvey);