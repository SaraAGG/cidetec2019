import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import TextField from '@material-ui/core/TextField';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import RadioForm from './surveyRadio';

import swal from 'sweetalert';


/*
extraer informacion de ubbicacion mediante 
alguna libreria
*/

export default class GuessForm extends React.Component{
	constructor(props){
	super(props);
	console.log("guess props", props)
		this.state={
			location_info:false,
			personal_info:true,
			show_form:false,
			first_name:'',
			last_name:'',
			street:'',
			location:'',
			postal_code:'',
			city:'',
			country:'',
			email:'',
			gender:'',
			age:'',
			occupation:'',
			workplace:'',
			user_info:{},
			final_user_info:{}
		}
		this.whenUserInfoFilled = this.whenUserInfoFilled.bind(this);
		this.whenLocationInfoFilled = this.whenLocationInfoFilled.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleChangeStreet = this.handleChangeStreet.bind(this);
		this.handleChangeLocation = this.handleChangeLocation.bind(this);
		this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
		this.handleChangeCity = this.handleChangeCity.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
		this.handleChangeAge = this.handleChangeAge.bind(this);
		this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
		this.handleChangeWorkPlace = this.handleChangeWorkPlace.bind(this);
		this.handleChangeCountry = this.handleChangeCountry.bind(this);
	}

	whenUserInfoFilled(event){
		const user_info = {
			"first_name":this.state.first_name,
			"last_name":this.state.last_name,
			"email":this.state.email,
			"gender":this.state.gender,
			"age":this.state.age
		}
		if(user_info.first_name ==='' && user_info.last_name ==='' && user_info.email ==='' && user_info.gender ==='' && user_info.age ===''){
			swal("","Por favor Complete los campos para continuar","warning");
		}else{
			this.setState({
			location_info:true,
			personal_info:false,
			user_info:user_info
		})
			console.log(user_info)

			return user_info
		}
	}


	whenLocationInfoFilled(event){
		const location_info ={
			"street":this.state.street,
			"location":this.state.location,
			"postal_code":this.state.postal_code,
			"city":this.state.city,
			"occupation":this.state.occupation,
			"workplace":this.state.workplace
		}
		if(location_info.street ==='' && location_info.location ==='' && location_info.postal_code ==='' && location_info.city==='' && location_info.occupation==='' && location_info.workplace===''){
			swal("","Por favor complete la informacion para continuar","warning");
		}else{
			const info_to_props = {
				"user_data":this.state.user_info,
				"address":location_info
			}
			this.setState({
				location_info:false,
				show_form:true,
				final_user_info:info_to_props

			})
			console.log(location_info);
			return location_info;
		}
	}



	handleChangeName(event){
		this.setState({
			first_name:event.target.value
		})
		console.log(this.state.first_name)
	}
	handleChangeLastName(event){
		this.setState({
			last_name:event.target.value
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
			postal_code:event.target.value
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


/*
Reciclar logica del prototipo
*/

	render(){
		const {location_info, personal_info, show_form} = this.state
		return(

			<div className="container" style={{"marginTop":"100px"}}>
				<div className="row justifiy-content-center">
					<div className="col-12 col-md-6" style={{"margin":"auto"}}>
					{personal_info ?	<Card raised={true}>
							<CardHeader	title="Informarcion de Registro Personal" 
							disableTypography={true}
							style={{"fontSize":"24px", "textAlign":"center"}}/>
								<CardContent>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField 
											onChange = {this.handleChangeName}
											variant="outlined"
											placeholder="First Name"
											fullWidth={true}
											label="First Name"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange= {this.handleChangeLastName}
											placeholder="Last Name"
											fullWidth={true}
											label="Last Name"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange = {this.handleChangeEmail}
											placeholder="Email"
											fullWidth={true}
											label="Email"
											type="email"
											/>
										</div>
									</div>
									<div className="row justify-content-end guess-rows">
										<div className="col-12 col-md-4">	
											<RadioGroup onChange={this.handleChangeGender}>
												<FormControlLabel	control={<Radio value="M" color="primary" /> }label="Male" />
												<FormControlLabel control ={<Radio value="F"color="primary" />} label="Female"/>
											</RadioGroup>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeAge}
											placeholder="Age"
											fullWidth={true}
											label="Age"
											type="number"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<Button variant="contained"
											onClick={this.whenUserInfoFilled} 
											style={{"backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}
											fullWidth={true}
											>Next </Button>		
										</div>
									</div>
								</CardContent>
							</Card> : null }
							{ location_info ? <Card raised={true}>
								<CardHeader title="Address" disableTypography={true} style={{"fontSize":"24px", "textAlign":"center"}}/>
								<CardContent>	
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeStreet}
											placeholder="Street"
											fullWidth={true}
											label="Street"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeLocation}
											placeholder="Colony"
											fullWidth={true}
											label="Colony"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangePostalCode}
											placeholder="Postal Code"
											fullWidth={true}
											label="Postal Code"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeCity}
											placeholder="City"
											fullWidth={true}
											label="City"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeCountry}
											placeholder="Country"
											fullWidth={true}
											label="Country"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeOccupation}
											placeholder="Occupation"
											fullWidth={true}
											label="Occupation"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<TextField variant="outlined"
											onChange={this.handleChangeWorkPlace}
											placeholder="Workplace"
											fullWidth={true}
											label="Workplace"
											/>
										</div>
									</div>
									<div className="row guess-rows">
										<div className="col-12 col-md-12">
											<Button variant="contained"
											onClick={this.whenLocationInfoFilled}
											fullWidth={true}
											style={{"backgroundColor":"black","color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}>Next</Button>
										</div>
									</div>
								</CardContent>
						</Card> : null } 
					</div>
				</div>
				<div className="row guess-rows">
					<div className="col-12 cold-md-12">
						{show_form ? <RadioForm user_info = {this.state.final_user_info} /> : null } 
					</div>
				</div>
			</div>
			)
		}
}
