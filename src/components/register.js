import React from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import { green } from '@material-ui/core/colors';

import { Link } from "react-router-dom";

import Net from '../images/net.mp4';

import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

import swal from 'sweetalert';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';




//import TextField from '@material-ui/core/TextField';

import { register } from '../requests/auth'; 

class Register extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:'',
			first_name:'',
			last_name:'',
			email:'',
			occupation:'',
			gender:'',
			age:'',
			birthday:''
		}

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePwd = this.handleChangePwd.bind(this);
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeOccupation = this.handleChangeOccupation.bind(this);
		this.handleChangeGender = this.handleChangeGender.bind(this);
		this.handleChangeAge = this.handleChangeAge.bind(this);
		

		this.requestSignUp = this.requestSignUp.bind(this);
	}

	handleChangeUsername(event){
		this.setState({
			username: event.target.value,
		})
	}
	
	handleChangePwd(event){
		this.setState({
			password: event.target.value
		})
	}
	handleChangeName(event){
		this.setState({
			first_name:event.target.value
		})
	}
	handleChangeLastName(event){
		this.setState({
			last_name:event.target.value
		})
	}
	handleChangeEmail(event){
		this.setState({
			email:event.target.value
		})
	}
	handleChangeOccupation(event){
		this.setState({
			occupation: event.target.value
		})
	}
	handleChangeGender(event){
		this.setState({
			gender:event.target.value
		})
	}
	handleChangeBirthday = birthday =>{
		this.setState({birthday: birthday});
		
	}

	handleChangeAge(event){
		this.setState({
			age:event.target.value
		})
	}

	requestSignUp(){
		const  data = {
			username:this.state.username,
			password:this.state.password,
			email:this.state.email,
			first_name:this.state.first_name,
			last_name:this.state.last_name,
			occupation:this.state.occupation,
			gender:this.state.gender,
			age:this.state.age,
			birthday:this.state.birthday
		}
		register(data).then(response=>{
			console.log(response)
			if(response){
				swal("User registered successfully","","success");
				this.props.history.push("/")
			}
		}).catch(error=>{
			console.log(error)
		})

	}
    
	render(){
		return(
			<div className="container">
				<video  id="myVideo" loop autoPlay>
					<source src={Net} type="video/mp4"/>
				</video>
				<div className="row justify-content-center" style={{"margin":"auto","marginTop":"10px"}}>
					<div className="col-12 col-md-6">
						<Card raised={true} >
							<CardHeader title="Registration" disableTypography={true} style={{"textAlign":"center", "fontSize":"35px", "fontFamily":"Righteous"}}/>
								<CardContent >
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<TextField
										onChange={this.handleChangeUsername}
										fullWidth={true}
										variant="outlined"
										placeholder="username" 
										label="username"/>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<TextField fullWidth={true}
										onChange={this.handleChangePwd}
										variant="outlined"
										type="password"
										placeholder="password"
										label="password"/>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<TextField
										onChange={this.handleChangeEmail}
										fullWidth={true}
										type="email"
										variant="outlined"
										placeholder="email"
										label="email"/>
									</div>
								</div>
								<div  className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<TextField 
										onChange={this.handleChangeName}
										fullWidth={true}
										variant="outlined"
										placeholder="First Name"
										label="First Name"/>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<TextField
										onChange={this.handleChangeLastName} 
										fullWidth={true}
										variant="outlined"
										placeholder="Last Name"
										label="Last Name"/>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<TextField
										onChange={this.handleChangeOccupation} 
										fullWidth={true}
										variant="outlined"
										placeholder="Profession"
										label="Profession"/>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<RadioGroup onChange={this.handleChangeGender}>
											<FormControlLabel control={<Radio value="M" color="primary" /> }label="Male" />
											<FormControlLabel control ={<Radio value="F"color="primary" />} label="Female"/>
										</RadioGroup>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-6">
										<DatePicker 
										selected={this.state.birthday}
										onChange={this.handleChangeBirthday}
										variant="outlined"
										dateFormat='dd/MM/yyyy'
										disabledKeyboardNavigation
										placeholderText="Date of birth"
										isClearable
										/>
									</div>	
									<div className="col-12 col-md-6">
										<TextField variant="outlined"
										onChange={this.handleChangeAge} 
										placeholder="Age"
										fullWidth={true}
										label="Age"
										type="number"
										/>
									</div>
								</div>
								<div className="row" style={{"margin":"1em"}}>
									<div className="col-12 col-md-12">
										<Button
										onClick={this.requestSignUp}
										size="large"
										variant="contained" 
										fullWidth={true} style={{"fontSize":"20px", "fontFamily":"Righteous", "color":"white","backgroundColor":"black"}}>Register</Button>
									</div>
								</div>
								<div className="row justify-content-center" style={{"margin":"1em", "fontSize":"12px"}}>
									<div className="col-1 col-md-6">
										<p> Already have an account? <Link to="/">Sign</Link> </p>
									</div>
								</div>
								</CardContent>
						</Card>
					</div>
				</div>
			</div>

			);
	}
}

export default withRouter(Register)
