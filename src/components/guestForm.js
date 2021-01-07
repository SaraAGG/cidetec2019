import React from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';

import Survey from './survey'

import * as actions from '../actions/productActions';

import { connect } from 'react-redux';


export default class GuestForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			showSurvey:false,
			hideForm:true,
			firstName:'',
			lastName:'',
			street:'',
			colony:'',
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

	


	render(){
		const {showSurvey, hideForm} = this.state
		return(
					<div className="container">
					 <Card>
							<CardHeader title="Para acceder a la Encuesta por favor complete la siguiente informacion"/>
							<CardContent className="card-guess-content">
								<div className="row guess-field">
									<div className="col-xs-12 col-md-8 guess-input-col">
										<Input fullWidth={true} placeholder="Nombre"/>
									</div>
								</div>
								<div className="row guess-field" >
									<div className="col-xs-12 col-md-8 guess-input-col">
										<Input fullWidth={true} placeholder ="Apellidos"/>
									</div>
								</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input  fullWidth={true}placeholder="Calle"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input fullWidth={true} placeholder="Colonia" />
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input  fullWidth={true} placeholder="codigo postal"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input  fullWidth={true} placeholder="Municipio"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input  fullWidth={true} placeholder="Pais"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input fullWidth={true} placeholder="Correo"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input fullWidth={true} placeholder="Sexo"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input fullWidth={true} placeholder ="Edad"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input  fullWidth={true} placeholder="Ocupacion"/>
								</div>
							</div>
							<div className="row guess-field">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Input fullWidth={true} placeholder="Lugar de Trabajo"/>
								</div>
							</div>
							<div className="row guess-btn">
								<div className="col-xs-12 col-md-8 guess-input-col">
									<Button className="guess-btn"
									variant="contained" 
									color="primary"
									>Siguiente</Button>
								</div>
							</div>
							</CardContent>
						</Card> 
					</div>
			)	
	}
}
