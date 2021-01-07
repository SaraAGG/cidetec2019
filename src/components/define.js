import React from 'react';



import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';


import Input from '@material-ui/core/Input';


import { getFinal } from '../requests/requestsProducts';


import Container from '@material-ui/core/Container';

import tablePad from '../images/icons/tablePad.png'


import List from '@material-ui/core/List';

import { connect } from 'react-redux';


class Define extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list:[]
		}
		this.loadAttributes();
		this.generateSurvey = this.generateSurvey.bind(this);
	}

	loadAttributes(){
		getFinal(this.props.product.product, this.props.user.jwt).then(response=>{
			this.setState({
				list:this.props.product.class_attributes
			})
		})
	}

	generateSurvey(){
		this.props.history.push("/define/generate-survey/"+this.props.product.product)
	}




	render(){
		const {list} = this.state
		return(

				<div className="container-fluid" >
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="row">
								<div className="col-12 col-md-8 define-title">
									<h1>DEFINE</h1>
								</div>
							</div>
							<div className="row product-title">
								<div className="col-12 col-md-6">
									<h2>Product/Service</h2>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-6">
									<Card raised={true}>
										<CardHeader title="Attribute List" disableTypography={true} style={{"textAlign":"center", "fontSize":"30px"}}/>
											<CardContent style={{"overflow":"auto", "height":"302px"}}>
											<List>
												<ul>
													{
														list.map((item,index)=>{
															return(

																	<List>
																		<div classNames="row justify-content-center">
																			{index+1}.-{item}
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
						<div className="col-12 col-md-6 dis-col-def">
							<div className="row justify-content-center" style={{"marginTop":"60px"}}>
								<div className="col-12 col-md-3">
									<img src={ tablePad } />
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-8">
									<h1 style={{"fontSize":"30px"}}>In this phase the survey based on the kano model is going to be generated</h1>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"170px"}}>
								<div className="col-12 col-md-4">
									<Button
									onClick={this.generateSurvey} 
									variant="contained"
									style={{"backgroundColor":"black", "color":"white","fontFamily":"Righteous", "fontSize":"20px"}}
									>Generate Survey</Button>
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
export default connect(mapStateToProps)(Define);