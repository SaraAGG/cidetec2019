import React from 'react';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';


import Scrum from '../images/scrumImg.png'



export default class BuildSprint extends React.Component{
	constructor(props){
		super(props);
	}render(){
		return(
			<div className="container-fluid">
				<div className="row">	
					<div className="col-12 col-md-6">
						<div className="row">
							<div className="col-12 col-md-8 prototype-title">
								<h1> PROTOTYPE </h1>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-8">
								<h2>Build your Sprint</h2>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-6">
								<TextField variant="outlined" 
								placeholder="Requirement" 
								label="Requirement" 
								fullWidth={true}/>
							</div>
							<div className="col-12 col-md-2">
								<Button variant="contained" 
								fullWidth={true}
								style={{"backgroundColor":"black","color":"white","fontSize":"24px","fontFamily":"Righteous"}}>ADD</Button>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-8">
								<Card raised={true}>
									<CardHeader	title="Requirements" disableTypography={true} style={{"textAlign":"center", "fontSize":"24px"}} />
										<CardContent style={{"overflow":"auto", "height":"302px"}}>
											<List>
												<ul>
														
												</ul>
											</List>
										</CardContent>
								</Card>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 dis-col-prototype" >
						<div className="row justify-content-center" style={{"marginTop":"50px"}}>
							<div className="col-12 col-md-6">
								<img src={Scrum} />
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"74px"}}>
							<div className="col-12 col-md-6">
								<TextField variant="outlined"
								fullWidth={true}
								placeholder="Task"
								label="Task"
								/>
							</div>
							<div className="col-12 col-md-2">
								<Button 
								fullWidth={true}
								variant="contained" 
								style={{"backgroundColor":"black","color":"white","fontSize":"24px","fontFamily":"Righteous"}}>ADD</Button>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-8">
								<Card raised={true}>
									<CardHeader title="Task" disableTypography={true} style={{"fontSize":"24px", "textAlign":"center"}} />
										<CardContent style={{"overflow":"auto", "height":"302px"}}>
											<List>
												<ul>
												</ul>
											</List>
										</CardContent>
								</Card>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-4">
								<Button fullWidth={true}
								variant="contained"
								style={{"backgroundColor":"black","fontSize":"24px", "fontFamily":"Righteous", "color":"white"}}>Start Iteration </Button>
							</div>
						</div>
					</div>	
				</div>
			</div>
			)
	}
}