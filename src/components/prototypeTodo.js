import React from 'react';


import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField'


export default class  Todo extends React.Component{
	constructor(props){
		super(props);
	}render(){
		return(

				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-3">
							<div className="row">
								<div className="col-12 col-md-12 prototype-title">
									<h1> PROTOTYPE </h1>
								</div>
							</div>
							<div className="row" style={{"marginTop":"50px"}}>
								<div className="col-12 col-md-6">
									<h2>Finish</h2>
								</div>
							</div>
								<div className="row" style={{"marginTop":"20px"}}>
									<div className="col-md-12">
										<Card raised={true}>
											<CardHeader title="To Do" disableTypography={true} style={{"fontSize":"24px", "textAlign":"center"}}/>
												<CardContent style={{"height":"302px"}}>
												</CardContent>
										</Card>
								</div>
							</div>
						</div>
					<div className="col-md-3" style={{"zIndex":"1000"}}>
						<div className="row" style={{"marginTop":"250px"}}>
							<div class="row">
								<div className="col-12 col-md-12">
									<h1 style={{"textAlign":"center", "width":"500px","marginLeft":"235px"}}>Woking Iteration: #</h1>
								</div>
							</div>
							<div className="col-12 col-md-12">
									<Card className="Card-middle" raised={true} style={{"position":"relative", "marginTop":"20px", "marginLeft":"235px", "width":"500px"}}>
											<CardHeader title="Doing" disableTypography={true} style={{"fontSize":"24px", "textAlign":"center"}}/>
												<CardContent style={{"height":"302px", "backgroundColor":"white"}}>
												</CardContent>
									</Card>
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 dis-col-prototype">
						<div className="row justify-content-end" style={{"marginTop":"320px"}}>
							<div className="col-12 col-md-6">
								<Card raised={true}>
									<CardHeader title="Done" disableTypography={true} style={{"fontSize":"24px", "textAlign":"center"}}/>
										<CardContent style={{"height":"302px"}}>
										</CardContent>
								</Card>
							</div>
						</div>
						<div className="row justify-content-end" style={{"marginTop":"50px"}}>
							<div className="col-12 col-md-3">
								<Button variant="contained"
								fullWidth={true}
								style={{"backgroundColor":"black","color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}>Finish</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
	}
}