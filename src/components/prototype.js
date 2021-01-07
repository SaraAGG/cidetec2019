import React from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';



import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';

import Scrum from '../images/scrumImg.png'



export default class Prototype extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			list:['Plastic', 'S-shape'],
			final_list:['White'],
			lista:[],
			attr:[]
		}



	}
	deleteItem(newItem){
		const newItems = this.state.final_list.filter(item=>{
			return (item !== newItem)
		})
		this.setState({
			final_list:[...newItems]
		})
	}

	render(){
		const {list, final_list} = this.state

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
									<Card raised={true}>
										<CardHeader title="Attributes List" disableTypography={true} style={{"textAlign":"center", "fontSize":"36px"}}/>
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
																				<Checkbox value={item} onChange={this.handleCheckBoxChange}color="default"/>
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
										<p style={{"textAlign":"center","zIndex":"10", "position":"absolute", "marginLeft":"160px", "marginTop":"60px", "width":"350px", "fontSize":"14px"}}>Click into the arrow to <br/> add attributes</p>
										<Button 
										onClick={this.handleItemPushFinalList}
										variant="outlined"
										style={{"border":"3px solid", "color":"black", "zIndex":"10","position":"absolute", "marginLeft":"160px","marginTop":"120px", "width":"100px"}}> <Icon> arrow_right_alt</Icon> </Button>
									</div>
									<div className="row justify-content-center" style={{"marginTop":"400px"}}>
										<div className="col-12 col-md-2">
											<h1>Time:</h1>
										</div>
									</div>
									<div className="row">
										<div className="col-12 col-md-6">
											<TextField type="date"  label="Start"defaultValue="2017-05-24" />
										</div>
									</div>
									<div className="row" style={{"zIndex":"1000", "marginTop":"25px"}}>
									 <img src={Scrum} style={{"marginLeft":"-100px"}}/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 dis-col-prototype">
							<div className="row justify-content-center" style={{"marginTop":"234px"}}>
								<div className="col-12 col-md-8">
									<Card raised={true}>
										<CardHeader disableTypography={true} title="Iteration" style={{"textAlign":"center", "fontSize":"36px"}}/>
											<CardContent style={{"overflow":"auto","height":"302px"}}>
												<List>
													<ul>
													{
														final_list.map((item,index)=>{
															return(
																	<List kye={index}>
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
							<div className="row" style={{"marginTop":"65px"}}>
								<div className="col-12 col-md-6">
									<TextField type="date" label="end" defaultValue="2017-06-13" />
								</div>
							</div>
							<div className="row justify-content-center">
								<div className="col-12 col-md-4">
									<Button variant="contained"
								style={{"backgroundColor":"black", "color":"white","fontFamily":"Righteous","fontSize":"24px"}}	>Sprint backlog</Button>
								</div>
							</div>
						</div>
					</div>
				</div>

			)
	}
}