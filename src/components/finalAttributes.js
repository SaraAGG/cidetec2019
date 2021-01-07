import React from 'react';




import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';

import  { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { getClassification, addDefinitiveAttributes } from '../requests/requestsProducts';


import FullCheckBox from '../images/icons/fullChecbox.png'

class FinalAttributes extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			list:[]
		}
		this.pushToFinal = this.pushToFinal.bind(this);
		this.goBackToClassification = this.goBackToClassification.bind(this);
		this.getFinalAttributes();
	}
	getFinalAttributes(){
		getClassification(this.props.product.product, this.props.user.jwt).then(response=>{
			console.log(response.docs)
			this.setState({
				list:[... response.docs.classification.final_attributes]
			})
		}).catch(error=>{console.log(error)})
	}
	
	pushToFinal(){
		const data = {
			"final_attributes":this.state.list
		}
		console.log(data)
		addDefinitiveAttributes(this.props.product.product,data, this.props.user.jwt).then(response=>{
			if(response.status === 200){
				this.props.history.push("/emphatize/"+this.props.product.product)
			}
		}).catch(error=>{console.log(error)})
		this.props.history.push("/emphatize/"+this.props.product.product)
	}

	goBackToClassification(){
		this.props.history.push("/emphatize/classification/"+this.props.product.product)
	}

	render(){
		const {list} = this.state;
		return(
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="row">
									<div className="col-12 col-md-8 emp-title">
										<h1> EMPHATIZE </h1>
									</div>					
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-8">
									<h2>E4.-Final Attributes</h2>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-8">
									<Card raised={true}>
										<CardHeader title="Attributes List" disableTypography = {true} style={{"textAlign":"center", "fontSize":"30px"}}/>
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
						<div className="col-12 col-md-6 dis-col">
							<div className="row justify-content-end" style={{"marginTop":"80px"}}>
								<div className="col-12 col-md-6">
									<img src={FullCheckBox} />
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"70px"}}>
								<div className="col-12 col-md-8">
									<h1 style={{"fontSize":"30px"}}>Congratulations! These are your final attributes </h1>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"90px", "fontSize":"18px"}}>
								<div className="col-12 col-md-4">
									<p>Are you sure to continue?</p>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"50px"}}>
								<div className="col-12 col-md-2">
									<Button onClick={this.goBackToClassification} color="secondary"variant="outlined" style={{"fontFamily":"Righteous", "fontSize":"20px"}}>Cancel</Button>
								</div>
								<div className="col-12 col-md-2">
									<Button
									onClick={this.pushToFinal	}
									 variant="contained" 
									 style={{"color":"white","backgroundColor":"black", "fontSize":"20px", "fontFamily":"Righteous"}}>Finish</Button> 
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
export default connect(mapStateToProps)(FinalAttributes);