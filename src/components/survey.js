import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

import { withRouter } from 'react-router-dom';
import { getSingleProduct } from '../requests/requestsProducts';

import { fillUserForm }  from '../requests/surveyRequests';

import List from '@material-ui/core/List';

import GuestForm from './guestForm';

import Input from '@material-ui/core/Input';

import  { push } from 'react-router-redux';
import  { Redirect } from 'react-router-dom'

import swal from 'sweetalert';
//agregar redirect

import * as actions from '../actions/productActions';


class Survey extends React.Component{
constructor(props){
	super(props);
	const slug = props.match.params.slug;
	console.log(slug);
	console.log(props);

	this.loadSingleProduct(slug);

	this.handleChangeRadioButtonsSurvey = this.handleChangeRadioButtonsSurvey.bind(this);
	this.handleChangesShowSurvey = this.handleChangesShowSurvey.bind(this);
	this.handleChangeName = this.handleChangeName.bind(this);
	this.handleChangeLastName = this.handleChangeLastName.bind(this);
	this.handleChangeStreet = this.handleChangeStreet.bind(this);
	this.handleChangeLocation = this.handleChangeLocation.bind(this);
	this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
	this.handleChangeCity = this.handleChangeCity.bind(this);
	this.handleChangeCountry = this.handleChangeCountry.bind(this);
	this.handleChangeEmail = this.handleChangeEmail.bind(this);
	this.handleChangeGender = this.handleChangeGender.bind(this);
	this.handleChangeAge = this.handleChangeAge.bind(this);
	this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
	this.handleChangeWorkPlace = this.handleChangeWorkPlace.bind(this);

	this.requestsInfo = this.requestsInfo.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);

	this.submitForm = this.submitForm.bind(this);



	this.state={

		disableSubmit:true,
		showUserForm:true,
		showSurvey:false,
		product:{},
		attr:[],
		positive:{},
		negative:{},
		firstName:'',
		lastName:'',
		street:'',
		location:'',
		postalCode:'',
		city:'',
		country:'',
		email:'',
		gender:'',
		age:'',
		occupation:'',
		workplace:'',
	}
}


loadSingleProduct(slug){
		getSingleProduct(slug).then(response=>{
		let json = response.docs;
		this.setState({
			product:json,
			attr:json.attributes
		})
		console.log(this.state.attr)
		console.log(this.state.product)
	})

}

handleChangeRadioButtonsSurvey(event, index){
	if(event.target.id.includes("No")){
		this.state.negative[event.target.id.slice(2,)] = index
	}else{
		this.state.positive[event.target.id.slice(2,)] = index
	}
	console.log(this.state.negative)
	console.log(this.state.positive)
}

handleChangesShowSurvey(event){
	this.setState({
		showUserForm:false,
		showSurvey:true
	})
}

handleChangeName(event){
	this.setState({
		firstName:event.target.value
	})
}
handleChangeLastName(event){
	this.setState({
		lastName:event.target.value
	})
}
handleChangeStreet(event){
	this.setState({
		street:event.target.value
	})
}
handleChangeLocation(event){
	this.setState({
		location:event.target.value
	})
}

handleChangePostalCode(event){
	this.setState({
		postalCode:event.target.value
	})
}

handleChangeCity(event){
	this.setState({
		city:event.target.value
	})
}
handleChangeCountry(event){
	this.setState({
		country:event.target.value
	})
}

handleChangeEmail(event){
	this.setState({
		email:event.target.value
	})
}

handleChangeGender(event){
	this.setState({
		gender:event.target.value
	})
}

handleChangeAge(event){
	this.setState({
		age:event.target.value
	})
}

handleChangeOccupation(event){
	this.setState({
		occupation: event.target.value
	})
}

handleChangeWorkPlace(event){
	this.setState({
		workplace:event.target.value
	})
}




requestsInfo(event){
	const user_data = {

		first_name: this.state.firstName,
		last_name : this.state.lastName,
		address:[{
								street:this.state.street,
								location:this.state.location,
								postalCode:this.state.postalCode,
								city:this.state.postalCode,
								country:this.state.country,
					  }],
		email:this.state.email,
		gender:this.state.gender,
		age:this.state.age,
		occupation:this.state.occupation,
		work_place:this.state.workplace,
		//product: this.state.product.product,
		//results:[{			
		//					postives:[this.state.postive],
		//					negative:[this.state.negative],
		//				}]
	}
	return user_data
}


submitForm(event){
	

	const user_info = this.requestsInfo();
	const result = {
			positive:[this.state.positive],
			negative:[this.state.negative]
	}

	const user_data = {
		"user_info":user_info,
		"results":result,
		"product":this.state.product.product
			
	}
	if(Object.keys(this.state.positive).length === this.state.attr.length || Object.keys(this.state.negative) === this.state.attr.length){
		fillUserForm(user_data).then(console.log())
		swal("Gracias","La encuesta ha sido enviada","success");
		return <Redirect to='/'/>

		
	}else{
		swal("","favor de llenar todos los campos","warning");
	}
}

handleSubmit(event){

	const user_data = this.requestsInfo()
	let aux_arr =  []

	for(let data in user_data){
		if(user_data[data] === ''){
			break;
		}else{
			aux_arr.push(user_data)
		}
	}
	if(Object.keys(user_data).length == aux_arr.length){
		this.handleChangesShowSurvey()
	}else{
		swal("","campos vacios","warning");
	}

}

render(){
	const {attr, showSurvey, showUserForm, disableSubmit} = this.state
	return (
			<div className="container">
					 { showUserForm ? <Card>
							<CardHeader title="Para acceder a la Encuesta por favor complete la siguiente informacion"/>
							<CardContent className="card-guess-content">
								<div className="row guess-field">
									<div className="col-xs-12 col-md-8 guess-input-col">
										<Input required={true} type="text" onChange={this.handleChangeName} fullWidth={true} placeholder="Nombre"/>
									</div>
								</div>
								<div className="row guess-field" >
									<div className="col-xs-12 col-md-8 guess-input-col">
										<Input required={true} type="text" onChange={this.handleChangeLastName} fullWidth={true} placeholder ="Apellidos"/>
									</div> 
								</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input required={true} type="text" onChange= {this.handleChangeStreet} fullWidth={true}placeholder="Calle"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input required={true} type="text" onChange={this.handleChangeLocation} fullWidth={true} placeholder="Colonia" />
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input required={true} type="number" onChange={this.handleChangePostalCode}  fullWidth={true} placeholder="codigo postal"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input required={true} type="text" onChange={this.handleChangeCity} fullWidth={true} placeholder="Municipio"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input required={true} type="text" onChange={this.handleChangeCountry} fullWidth={true} placeholder="Pais"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input required={true} type="email" onChange={this.handleChangeEmail} fullWidth={true} placeholder="Correo"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
								<FormLabel component="fieldset">Sexo </FormLabel>
								<RadioGroup  style={{"display":"flex", "flexDirection":"row"}} onChange={this.handleChangeGender}>
									<FormControlLabel  control={<Radio color="primary" value="Hombre"/>} label="Hombre"/>
									<FormControlLabel  control= {<Radio color="primary" value="Mujer"/>} label="Mujer"/>
								</RadioGroup>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input onChange={this.handleChangeAge} fullWidth={true} placeholder ="Edad"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input onChange={this.handleChangeOccupation}  fullWidth={true} placeholder="Ocupacion"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input onChange={this.handleChangeWorkPlace} fullWidth={true} placeholder="Lugar de Trabajo"/>
								</div>
							</div>
							<div className="row guess-btn">
								<div className="col-xs-12 col-md-8 guess-input-col">
						<Button className="guess-btn"
									variant="contained" 
									color="primary"
									onClick ={this.handleSubmit} 
									>Siguiente</Button>
								</div>
							</div>
							</CardContent>
						</Card> : false } 
				<div className="container">			
					<div className="row">
						<div className="col-xs-12 col-md-12">
						{showSurvey ?  <Card className="Product-Card" raised={true} >
							<CardHeader title={"Nombre del producto " + this.state.product.product}/>
								<CardContent>
								<div className="row">
									<div className="col-xs-12 cold-md-8">
									<FormControl>
										<FormLabel component="legend"> </FormLabel>
											<ul>
												{attr.map((key, index)=>{
													return(
																
																<List key={index}>
																	<h2 style={{"fontWeight":"bold", "color":"black"}}>Como te sentirias si el producto tuviera el attributo {key} </h2>
																		<RadioGroup style={{"display":"flex", "flexDirection":"row"}} onChange={this.handleChangeRadioButtonsSurvey}>
																			<FormControlLabel  control={<Radio color="primary" value="1" id={"Si"+key} />}  label="No me gusta"/>
																			<FormControlLabel  control={<Radio color="primary" value="2" id={"Si"+key} />}  label="Puedo vivir sin eso"/>
																			<FormControlLabel  control={<Radio color="primary" value="3" id={"Si"+key} />}  label="Soy neutral"/>
																			<FormControlLabel  control={<Radio color="primary" value="4" id={"Si"+key} />}  label="Debe estar presente"/>
																			<FormControlLabel  control={<Radio color="primary" value="5" id={"Si"+key} />}  label="Me gustaria"/>
																		</RadioGroup>

																		<h2 style={{"fontWeight":"bold", "color":"black"}}>Como te sentirias si el producto NO tuviera el attributo {key}</h2>
																			<RadioGroup onChange={this.handleChangeRadioButtonsSurvey} style={{"display":"flex", "flexDirection":"row"}}>
																				<FormControlLabel value="1" control={<Radio color="primary" value="1" id={"No"+key}/> }  label="No me gusta"/>
																				<FormControlLabel value="2" control ={<Radio color="primary"value="2" id={"No"+key}/>}  label="Puedo vivir sin eso"/>
																				<FormControlLabel value="3" control={<Radio color="primary" value="3" id={"No"+key}/>}  label="Soy neutral"/>
																				<FormControlLabel value="4" control={<Radio color="primary" value="4" id={"No"+key}/>}  label="Debe estar presente"/>
																				<FormControlLabel value="5" control={<Radio color="primary" value="5" id={"No"+key}/>}  label="Me gustaria"/>
																			</RadioGroup>
																</List>
																	)
																})
															}
											</ul>
											<Button onClick={this.submitForm} variant="contained" color="primary"> Aceptar </Button> 
									</FormControl>

									</div>
								</div>
							</CardContent>
							</Card> : true }
								
						</div>
							
						</div>	
				</div>
			</div>
			
		)
	}
}

export default withRouter(Survey)
