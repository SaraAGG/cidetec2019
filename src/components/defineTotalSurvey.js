import React from 'react';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';

import GraphIcon from '../images/icons/grafiquita.png'

import { connect } from 'react-redux';

import { getTotalSurveysByUser, getTotalSurveysCounter } from '../requests/requestsProducts';


class DefineTotalSurvey extends React.Component{
	constructor(props){
		super(props);

		this.state = {

			total_survey:'',
			counter_survey:'',
			disabled:true
		}
		this.getTotalSurveys();
		this.getSurveysSofar();
		this.toMethodology = this.toMethodology.bind(this);
	}

	getTotalSurveys(){
		getTotalSurveysByUser(this.props.product.product, this.props.user.jwt).then(response=>{
			this.setState({
				total_survey:response.docs.number_surveys
			})
		}).catch(error=>{console.log(error)})
	}

	getSurveysSofar(){
		getTotalSurveysCounter(this.props.product.product, this.props.user.jwt).then(response=>{
			this.setState({
				counter_survey:response.docs
			})
		}).catch(error=>{console.log(error)})
	}


	toMethodology(){
		this.props.history.push("/define/methodology/"+this.props.product.product)
	}

	render(){
		const {total_survey, counter_survey, disabled} = this.state
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="row">
							<div className="col-12 col-md-8 define-title">
								<h1> DEFINE </h1>
							</div>
						</div>
						<div className="row product-title">
							<div className="col-12 col-md-6">
								<h1>Analysis</h1>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12 col-md-6">
								<Card raised={true}>
									<CardHeader disableTypography={true} style={{"textAlign":"center", "fontSize":"30px"}} title="Total Surveys"/>
										<CardContent style={{"height":"300px"}}>
											<div className="row">
												<div className="col-12 col-md-10">
													<h5>Total of answered Surveys: </h5>
														<h5>{counter_survey} /{total_survey} </h5>
												</div>
											</div>
										</CardContent>
								</Card>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 dis-col-def">
						<div className="row justify-content-end" style={{"marginTop":"100px"}}>
							<div className="col-12 col-md-4">
								<img src={GraphIcon}/>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"100px"}}>
							<div className="col-12 col-md-8">		
								<h3>In this screen is shown the total number of surveys done againts the wished surveys</h3>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"100px"}}>
							<div className="col-12 col-md-4">
								<Button
								onClick ={this.toMethodology} 
								fullWidth={true}
								//disabled={disabled}
								style={{"backgroundColor":"black","color":"white","fontSize":"20px", "fontFamily":"Righteous"}}
								>Generate Analysis</Button>
							</div>
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
		product:state.products
	}
}
export default connect(mapStateToProps)(DefineTotalSurvey);