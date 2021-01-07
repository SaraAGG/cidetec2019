import React from 'react';

import Brain from '../images/icons/brain.png'
import Button from '@material-ui/core/Button';


export default class Test extends React.Component{
	constructor(props){
		super(props);
	}render(){
		return(
			<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="row">
								<div className="col-12 col-md-8 test-title">	
									<h1> TEST </h1>
								</div>
							</div>
							<div className="row justify-content-start interview-head">
								<div className="col-12 col-md-6">
									<h1></h1>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 dis-col-test">
							<div className="row justify-content-center" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-2">
									<img src={Brain} />
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-2">
									<h1 style={{"textAlign":"center", "fontSize":"64px"}}>MVP</h1>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-6">
									<h3 style={{"color":"rgba(0,0,0,.50)","textAlign":"center"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h3>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-6">
									<h1 style={{"textAlign":"center"}}>% Acceptance :</h1>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-3">
									<Button  fullWidth={true} 
									style={{"backgroundColor":"black","color":"white","fontSize":"18px","fontFamily":"Righteous"}}>Feedback</Button>
								</div>
							</div>
						</div>
					</div>
			</div>
			)		
	}
}