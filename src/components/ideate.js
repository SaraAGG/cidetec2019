import React from 'react';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import MonitoTalking from '../images/icons/monitoTalking.png';
import MonitoFoco from '../images/icons/monitoFoco.png';


import {Link} from 'react-router-dom';



import { Modal } from '@material-ui/core';


export default class Ideate extends React.Component{
	constructor(props){
		super(props);

		this.state ={
			ideas:[
							{
								"Brainstorm":`These are the steps for making a brainstorm. It is an easy task which will lead us to:
														Establish a topic or a problem to approach.
														There must be  a person who leads the exercise.
														It must be a prior explanation about the 
														process before the brainstorm start.
														Start openly sharing ideas without ranking them.
														Numericly enlist all the arising proposals.
														Avoid as much possible repeated ideas.
														Do not critize them.
														When theare are no more new ideas finish the task.
														Lastly, order and analys all the different proposals, rank their use and reality check.`
							}, 
							{
								"Attributes list":`This technique was created by R.P. Crawford in 1954, and is ideal for the generation of new products, as well as for the improvement of existing services.

																		For this technique to give results, you must first make a list of the characteristics or attributes of the product or service that you want to improve, and then explore new ways to change the function or improve each of those attributes.

																		In general, the procedure consists of:
																		First, a list of product attributes should be made.
																		Second, each of the attributes is analyzed on how they could be improved.
																		Third, the best ideas about attributes are selected for further evaluation.
                                    (Majaro, 1994) `
							},
							{
								"S.C.A.M.P.E.R.":`This tool was developed by Bob Eberle. This is a creative technique very easy to use that brings new proposals for products, services or processes in wide fields of application, stimulating the generation of ideas from a list of questions. 
																	Its name is an acronym resulting from the following actions: 
																	Substitute, Combine, Adapt, Modify/Magnify, Put to other uses, Eliminate/Minify and Rearrange/Reverse
																	The process consists on:
																	    1. Problem setting
																	    2. SCAMPER questions posed
																	    3. Evaluation of the ideas.
                      						Ministerio de Ciencia, Tecnología y Telecomunicaciones (2019)`},
               {
               	"Six thinking hats":`This is a technique created by Edward de Bono in 1985. It is involving the use of metaphorical hats in discussions.
																		Participants put on hats in turn, possibly more than once but not necessarily all of them, to indicate directions of thinking. The color of each is related to a function.
																		Hats colors:
																		    • White hat thinking—neutral, objective—focuses on the data and information that are available or needed. 
																		    • Red hat thinking—emotional—looks at a topic from the point of view of emotions, feelings, and hunches, without having to qualify or justify them. 
																		    • Black hat thinking—somber, serious—uses experience, logic, judgment, and caution to examine the difficulties and problems associated with a topic and the feasibility of ideas. 
																		    • Yellow hat thinking—sunny, positive—is concerned with benefits and values. 
																		    • Green hat thinking—growth, fertility—intimates creative thinking and movement, not judgment, to generate new ideas and solutions.
																		    •  Blue hat thinking—cool, the sky above—concentrates on reflection, metacognition (thinking about the thinking required), and the need to manage the thinking process.
																		    This technique includes team productivity and communication; product and process improvement, as well as project management; critical and analytical thinking, problem solving, and decision-making; and creativity training, meeting facilitation, and meeting management.

                                        De Bono (1999)`
               }],


			onOpen:false,
			info:'',
		}
		//this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal(item){
		const infos = this.state.ideas.filter(items=>{
			return items === item
		})
		const info_to_dic = infos[0];
		const info_values= Object.values(info_to_dic)
		this.setState({
			onOpen:true,
			info:info_values
		})
	}
	closeModal(event){
		this.setState({
			onOpen:false
		})
	}
	render(){
		const {ideas, onOpen,info} = this.state
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-md-6">
						<div className="row">
							<div className="col-12 col-md-8 ideate-title">
									<h1> IDEATE </h1>
								</div>
							</div>
						<div className="row justify-content-start interview-head">
							<div className="col-12 col-md-6">
								<h1>Suggested Strategies </h1>
							</div>
						</div>
						<div className="row justify-content-start">
							<div className="col-12 col-md-6">
								{
								ideas.map((item,index)=>{
									return(
								<div>
									<List key={index}>
										<Button 
										onClick={(e)=>this.openModal(item)}
										style={{"color":"black", "fontFamily":"Righteous", "marginLeft":"100px"}}>
												<h4>{index+1}.-{Object.keys(item)}</h4>
												<p></p>
										</Button>
									</List>
									<div className="container-fluid">
										<div className="row">
											<div className="col-12 col-md-6">
												<Modal open={onOpen} style={{"width":"50%", "margin":"auto","marginTop":"250px","overflow":"auto"}}>
													<Card>
														<CardHeader/>
															<CardContent>
																<div className="container-fluid">
																	<div className="row justify-content-end">
																		<div className="col-12 col-md-1">
																			<Button onClick={this.closeModal} variant="contained" color="secondary">X</Button>
																		</div>
																	</div>
																	<div className="row justify-content-around" style={{"marginTop":"25px"}}>
																		<div className="col-12 col-md-12">
																			<h5>{info}</h5>
																		</div>
																	</div>
																</div>
																</CardContent>
															</Card>
												</Modal>
											</div>
										</div>
									</div>
								</div>
										)
								})
							}
							</div>
						</div>
					</div>
					<div className="col-12 col-md-6 dis-col-ideate">
						<div className="row justify-content-end" style={{"marginTop":"100px"}}>
							<div className="col-12 col-md-4">
								<img src={MonitoFoco} />
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-6">
								<h1 style={{"textAlign":"left", "fontSize":"52px"}}>Your Best Value Proposition</h1>
							</div>
						</div>
						<div className="row justify-content-center" style={{"marginTop":"25px"}}>
							<div className="col-12 col-md-3">
								<Button variant="contained" 
								fullWidth={true}
								style={{"backgroundColor":"black","fontFamily":"Righteous", "fontSize":"24px", "color":"white"}}><Link style={{"color":"white"}} to={"/prototype/"+this.props.match.params.slug}>Next</Link></Button>
							</div>
						</div>
					</div>
				</div>			
			</div>


			)
	}
}