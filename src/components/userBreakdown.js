import React from 'react';


import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';



export default class UserBreakdown extends React.Component{
	constructor(props){
		super(props);
	}render(){
		return(
				<div className="container-fluid">
					<div className="row justify-content-center">
						<div className="col-12 col-md-6">
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div>
									<h1>Users breakdown</h1>
								</div>
							</div>
							<div className="row" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-6">
									<Card raised={true}  style={{"overflow":"auto"}}>
										<CardHeader title="Must be" disableTypography={true} style={{"textAlign":"center", "fontSize":"24px"}} />
											<CardContent style={{"height":"280px"}}>
											</CardContent>
									</Card>
								</div>
								<div className="col-12 col-md-6">
									<Card raised={true} style={{"overflow":"auto"}}>
										<CardHeader title="Attractive" disableTypography={true} style={{"textAlign":"center", "fontSize":"24px"}}  />
											<CardContent style={{"height":"280px"}}>
											</CardContent>
									</Card>
								</div>
							</div>
							<div className="row" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-6">
									<Card raised={true} style={{"overflow":"auto"}}>
										<CardHeader title="One-dimensional" disableTypography={true} style={{"textAlign":"center", "fontSize":"24px"}}/>
											<CardContent style={{"height":"280px"}}>
											</CardContent>
									</Card>
								</div>
								<div className="col-12 col-md-6">
									<Card raised={true} style={{"overflow":"auto"}}>
										<CardHeader title="Indifferent" disableTypography={true} style={{"textAlign":"center", "fontSize":"24px"}} />
											<CardContent style={{"height":"280px"}}>
											</CardContent>
									</Card>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6" style={{"margin":"auto"}}>
							<div className="row justify-content-center" style={{"margin":"1em"}}>
								<div className="col-12 col-md-6">
									<h1 style={{"textAlign":"center", "fontSize":"48px"}}>% Acceptance: % </h1>
								</div>
							</div>
							<div className="row justify-content-center" style={{"margin":"1em"}}>
								<div className="col-12 col-md-6">
									<h2> System analytics suggest you should realease the service by scoring at least 80% confidence </h2>
								</div>
							</div>
							<div className="row justify-content-center" style={{"margin":"1em"}}>
								<div className="col-12 col-md-2">
									<Button  fullWidth={true} style={{"backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}>GO</Button>
								</div>
								<div className="col-12 col-md-2">
									<Button  fullWidth={true} variant="outlined" color="secondary" style={{"border":"2px solid", "fontSize":"24px", "fontFamily":"Righteous"}} >Close</Button>
								</div>
							</div>						
						</div>
					</div>

				</div>
			)
	}
}