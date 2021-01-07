import React from 'react';



import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';

import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';

import Mesa from '../images/icons/mesa.png';
import ChexBoxOne from '../images/icons/checkOneBox.png';

import { addFinalAttributes, updateClassification, getDerivation } from '../requests/requestsProducts';

import * as actions from '../actions/productActions';

import  { push } from 'react-router-redux';
import { connect } from 'react-redux';

class Classification extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			list:[],
			final_list:[],
			lista:[],
			attr:[],
			other:''
		}

		this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
		this.handleItemPushFinalList = this.handleItemPushFinalList.bind(this);
		this.postItemsFinal = this.postItemsFinal.bind(this);
		
		this.getAttributesFromStorage();
	}

	handleCheckBoxChange(event){
		if(event.target.checked){
			if(this.state.lista.includes(event.target.value)){

			}else{
				this.state.lista.push(event.target.value)
			}
		}
	}

	handleItemPushFinalList(event){
		if(this.state.final_list.includes(this.state.lista)){	
		}else{
			this.setState({
				final_list:this.state.lista
			})
		}
		console.log(this.state.final_list)
	}

	deleteItem(newItem){
		const newItems = this.state.final_list.filter(item=>{
			return (item !== newItem)
		})
		this.setState({
			final_list:[...newItems],
			lista:[...newItems]
		})
	}
	postItemsFinal(){
		const data = {
			"final_attributes":this.state.final_list
		}
		/*
		if(this.state.list !== data.attributes){
			console.log("Esta wea es true", true)
			updateClassification(this.props.product.product, data, this.props.user.jwt).then(response=>{
				console.log(response)
				if(response.status == 200){
					this.props.history.push("/emphatize/final-attributes/"+this.props.product.product)
				}
			})
		}
		*/
		console.log(data)
		addFinalAttributes(this.props.product.product, data, this.props.user.jwt).then(response=>{
			console.log(response)
			this.props.dispatch(actions.derivationAttributes(data.final_attributes))
			if(response.status == 200){
					this.props.history.push("/emphatize/final-attributes/"+this.props.product.product)
			}
		}).catch(error=>{console.log(error)})
		console.log(data)
	}
	getAttributesFromStorage(){
		getDerivation(this.props.product.product, this.props.user.jwt).then(response=>{
			const api_attributes = response.docs.derivation.attributes
			this.setState({
				list:[...api_attributes]
			})
		})
	}
	
	render(){
		const {list, final_list} = this.state
		return (

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
									<h2>E3.-Attributes Classification</h2>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-8">
									<Card raised={true}>
										<CardHeader title="Attributes List" disableTypography={true} style={{"textAlign":"center", "fontSize":"30px"}}/>
											<CardContent style={{"overflow":"auto", "height":"302px"}}>
												<List>
													<ul>
														{
															list.map((item,index)=>{
															return(
																	<List>
																		<div className="row justify-content-around">
																			<div className="col-12 col-md-3">
																				{index+1}.-{item}
																			</div>
																			<div className="col-12 col-md-3">
																				<Checkbox  value={item} onChange={this.handleCheckBoxChange}color="default"/>
																			</div>
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
								<div className="col-12 col-md-2">
									<div className="row justify-content-center">
										<p style={{"zIndex":"10", "position":"absolute", "marginLeft":"300px", "marginTop":"60px", "width":"350px", "fontSize":"14px"}}>Click into the arrow to add final attributes</p>
										<Button 
										onClick={this.handleItemPushFinalList}
										variant="outlined"
										style={{"border":"3px solid", "color":"black", "zIndex":"10","position":"absolute", "marginLeft":"230px","marginTop":"100px", "width":"250px"}}> <Icon> arrow_right_alt</Icon> </Button>
									</div>
								</div>
							</div>
						</div>
						<div>
						</div>
						<div className="col-12 col-md-6 dis-col">
							<div className="row justify-content-center" style={{"marginTop":"60px"}}>
								<div className="col-12 col-md-3">
									<img src={Mesa}/>
								</div>
								<div className="col-12 col-md-3">
									<img src={ChexBoxOne}/>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"50px"}}>
								<div className="col-12 col-md-8">
									<Card raised={true}>
										<CardHeader title="Finals" disableTypography={true} style={{"fontSize":"30px", "textAlign":"center"}} />
											<CardContent style={{"overflow":"auto", "height":"302px"}}>
											<List>
												<ul>
												{
														final_list.map((item,index)=>{
															return(
																	<List key={index}>
																		<div className="row justify-content-around">
																			<div className="col-12 col-md-3">
																				{index+1}.-{item}
																			</div>
																			<div className="col-12 col-md-3">
																				<Button onClick={(e)=>this.deleteItem(item)}
																				variant="outlined"
																				style={{"border":"3px solid", "fontSize":"12px", "fontFamily":"Righteous", "color":"red"}}
																				>Remove</Button>
																			</div>
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
							<div className="row justify-content-center">
								<div className="col-12 col-md-2">
									<Button 
									onClick={this.postItemsFinal}
									variant="contained"
									fullWidth={true} 
									style={{"backgroundColor":"black", "color":"white", "fontSize":"20px", "fontFamily":"Righteous", "marginTop":"25px"}}
									>Finish</Button>
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
export default connect(mapStateToProps)(Classification);