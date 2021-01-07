import React from 'react';



import { Link } from "react-router-dom";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


import * as actions from '../actions/productActions';

import { getInterview, getDerivation, getClassification, getFinal } from '../requests/requestsProducts';

import { connect } from 'react-redux';

class Empathize extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			emphatize:false,
			derivation:false,
			classification:false,
			final:false,
			disabled:true
		}
		this.checkInterview();
		this.checkDerivation();
		this.checkClassification();
		this.checkFinal();
		this.toDefine = this.toDefine.bind(this);
	}
	checkInterview(){
		getInterview(this.props.product.product, this.props.user.jwt).then(response=>{
				const check_me = response.docs
				console.log("check me check me ", check_me)
				if(check_me.interview){
					this.setState({
						emphatize:true
					})
				}
		}).catch(error=>{console.log(error)});
	}
	checkDerivation(){
		getDerivation(this.props.product.product, this.props.user.jwt).then(response=>{
			const check_me = response.docs
			console.log("check me derivation", check_me)
			if(check_me.derivation){
				this.setState({
					derivation:true
				})
			}
		}).catch(error=>{console.log(error)});
	}
	checkClassification(){
		getClassification(this.props.product.product, this.props.user.jwt).then(response=>{
			const check_me = response.docs
			console.log("check check me classification", check_me)
			localStorage.setItem(check_me.classification.final_attributes, "final_attributes")
			if(check_me.classification){
				this.setState({
					classification:true
				})
			}
		}).catch(error=>{console.log(error)});
	}
	checkFinal(){
		getFinal(this.props.product.product, this.props.user.jwt).then(response=>{
			const check_me = response.docs
			console.log("check me final", check_me)
			if(check_me.final){
				this.setState({
					final:true,
					disabled:false
				})
				this.props.dispatch(actions.emphatizeCompleted(this.state.final))
				this.props.dispatch(actions.loadClassification(response.docs.final.final_attributes))
			}else{
				this.props.dispatch(actions.emphatizeCompleted(false))
			}
		}).catch(error=>{console.log(error)})
	}

	toDefine(){
		this.props.history.push("/define/"+this.props.product.product)		
	}
	render(){
		const {emphatize, derivation, classification, final, disabled} = this.state
		return(
				<div className="container-fluid dis-col">
						<div className="row" style={{"backgroundColor":"white"}}>
							<div className="col-12 col-md-6 dis-other-col">
							<div className="row">
								<div className="col-12 col-md-8 emp-title">
									<h1> EMPHATIZE </h1>
								</div>
							</div> 
							<div className="row product-title">
								<div className="col-12 col-md-6">
									<h2>Product/Service</h2>
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-8">
									<Paper className="table">
										<Table size="medium" padding="checkbox">
											<TableHead>
												<TableRow component="tr">
													<TableCell className="table-head"  align="center" size="small" style={{"padding":"25px", "color":"black", "fontSize":"30px", "fontFamily":"Righteous"}} >Phase</TableCell>
													<TableCell className="table-head" align="center" size="small" style={{"padding":"25px", "color":"black", "fontSize":"30px","fontFamily":"Righteous"}} >Type</TableCell>
													<TableCell className="table-head" align="center" size="small" style={{"padding":"25px", "color":"black", "fontSize":"30px", "fontFamily":"Righteous"}} >Status</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												<TableRow component="tr" scope="row">
													<TableCell align="center" style={{"color":"black", "fontSize":"24px", "fontFamily":"Righteous"}} >
														<Link to={"interview/"+this.props.product.product} style={{"color":"#29B6F6"}}>
															E1
														</Link>
													</TableCell>
													<TableCell align="center" style={{"fontSize":"24px","fontFamily":"Righteous","color":"rgba(0,0,0,60%)"}}>
														Interview 
													</TableCell>
													<TableCell align="center">
														<Checkbox checked={emphatize} disabled={true} style={{"color":"black"}} />
													</TableCell>
												</TableRow>
												<TableRow component="tr" scope="row">
													<TableCell align="center" style={{"color":"black", "fontSize":"24px", "fontFamily":"Righteous"}} >
													<Link to={"derivation/"+this.props.product.product} style={{"color":"#29B6F6"}}>
														E2
													</Link>
													</TableCell>
													<TableCell align="center" style={{"fontSize":"24px","fontFamily":"Righteous","color":"rgba(0,0,0,60%)"}}>
														Derivation 
													</TableCell>
													<TableCell align="center">
														<Checkbox checked={derivation} disabled={true} style={{"color":"black"}}/>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell align="center" style={{"color":"black", "fontSize":"24px", "fontFamily":"Righteous"}} >
													<Link to={"classification/"+this.props.product.product} style={{"color":"#29B6F6"}}>
														E3
													</Link>
													</TableCell>
													<TableCell align="center" style={{"fontSize":"24px","fontFamily":"Righteous","color":"rgba(0,0,0,60%)"}}>
														Classification 
													</TableCell>
													<TableCell align="center">
														<Checkbox checked={classification} disabled={true} style={{"color":"black"}}/>
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell  align="center" style={{"color":"black", "fontSize":"24px", "fontFamily":"Righteous"}} >
													<Link to={"final-attributes/"+this.props.product.product} style={{"color":"#29B6F6"}}>
														E4
													</Link>
													</TableCell>
													<TableCell align="center" style={{"fontSize":"24px","fontFamily":"Righteous","color":"rgba(0,0,0,60%)"}}>
														Final 
													</TableCell>
													<TableCell align="center">
														<Checkbox checked={final} disabled={true} style={{"color":"black"}} />
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</Paper>
								</div>
							</div>
					</div>
					<div className="col-12 col-md-6 dis-col">
						<div className="row justify-content-center">
							<div className="col-12 col-md-6">
								<h1 style={{"marginTop":"250px", "fontSize":"30px", "textAlign":"center"}}>It is necessary to complete the four steps to continue</h1>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12 col-md-4">
								<Button
								onClick={this.toDefine}
								fullWidth={true}
								disabled={disabled}
								variant="contained" 
								style={{"marginTop":"80px","backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}>Next</Button>
							</div>
						</div>
						<div>
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
export default connect(mapStateToProps)(Empathize);