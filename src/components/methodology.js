import React from 'react';



import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';


import { getMethodology, postMethodology } from '../requests/requestsProducts';


class Methodology extends React.Component{
	constructor(props){
	super(props);
	
		this.state = {
			//product_type:'',
			new_product:false,
			meth:''
		}		
		this.getData();
		//this.onMethodologyChange= this.onMethodologyChange.bind(this);
		this.postDataMethodology = this.postDataMethodology.bind(this);
	}

	getData(){
		getMethodology(this.props.product.product, this.props.user.jwt).then(response=>{
			if(response.docs.product_type === '0'){
				this.setState({
					new_product:true,
					meth:response.docs.product_type
				})
			}else{
				this.setState({
					meth:response.docs.product_type
				})
			}
			console.log(response.docs.product_type)
			console.log(this.state.meth)
		}).catch(error=>{console.log(error)})
	}

	
	onMethodologyChange(event){
		this.setState({
			meth:event.target.value
		})
	}
	

	postDataMethodology(){

		console.log(this.state.meth)
		const data = {
			"methodology_type":this.status.methodology_type
		}
		console.log(data)
		//postMethodology(this.props.product.product, data, this.props.user.jwt).then(response=>{
		//	console.log(response.docs)
		//}).catch(error=>{console.log(error)})
	}



render(){
	const {new_product} = this.state
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
									<h1>Methodology</h1>
								</div>
							</div>
							{new_product ?
								<div className="row justify-content-center">
									<div className="col-12 col-md-6">
										<h1>New Product/Service: YANG</h1>
									</div>
								</div>
								:
								<div className="row justify-content-center">
									<div className="col-12 col-md-6">
										<Card raised={true}>
											<CardHeader disableTypography={true} style={{"fontSize":"36px","textAlign":"center"}} title="Knwon Product"/>
												<CardContent style={{"height":"302px"}}>
													<RadioGroup onChange= {this.onMethodologyChange}>
														<FormControlLabel control={<Radio color="primary" value="0"/> } label="Yang" labelPlacement="end" style={{"fontSize":"24px",  "fontFamily":"Righteous"}}/>
														<FormControlLabel control={<Radio color="primary" value="1"/> } label="Tontini" labelPlacement="end" style={{"fontSize":"24px",  "fontFamily":"Righteous"}}/>
													</RadioGroup>
												</CardContent>
										</Card>
									</div>
								</div>
							}
						</div>
						<div className="col-12 col-md-6 dis-col-def">
							<div className="row justify-content-center" style={{"marginTop":"250px"}}>
								<div className="col-12 col-md-10">
									<h4>Yang Methodology uses the Refined Kano’s Model and the relevance satisfaction model</h4>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-10">
									<h4>Tontini model is a modified version of Kano’s model, which in addition to classifying the attributes, presents the satisfaction and dissatisfaction score of each attribute.</h4>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-3">
									<Button variant="contained"methodology_type
									onClick={this.postDataMethodology}
									fullWidth={true}
									style={{"backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}>Send</Button>
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
export default connect(mapStateToProps)(Methodology);