import React from 'react';

import { ScatterChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Papelito from '../images/icons/papelito.png'


export default class GenerateReport extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			data:[{name: 'Page A', uv: 400, pv: 2400, amt: 2400}]
		}
	}
	render(){
		const {data} = this.state
		return(

				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-6">
							<div className="row">
								<div className="col-12 col-md-8 define-title">
									<h1> DEFINE </h1>
								</div>
							</div>
							<div className="row product-title">
								<div className="col-12 col-md-6">
									<h1>Define Report</h1>
								</div>
							</div>
							<div className="row justify-content-center"style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-10">
									<h2>Table1. Product Quality Attributes</h2>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-8">
									<Paper elevation="3">
										<Table>
											<TableHead>
												<TableRow>
													<TableCell style={{"fontSize":"24px", "color":"black", "fontFamily":"Righteous"}}>
														Attribute
													</TableCell>
													<TableCell style={{"fontSize":"24px", "color":"black", "fontFamily":"Righteous"}}>
													Result
													</TableCell>
												</TableRow>
											</TableHead>
											<TableBody style={{"overflow":"auto", "height":"302px"}}>
												<TableRow>
													<TableCell>

													</TableCell>
												</TableRow>

											</TableBody>
										</Table>
									</Paper>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="co-12 col-md-3">
									<Button contained="outlined"
									fullWidth={true}
									style={{"border":"2px solid", "color":"black","fontSize":"14px", "fontFamily":"Righteous"}}>Generate Report</Button>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-6 dis-col-def">
							<div className="row justify-content-end" style={{"marginTop":"200px"}}>
								<div className="col-12 col-md-3">
									<img src={Papelito} />
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"25px"}}>
								<div className="col-12 col-md-10">
								<ScatterChart width={600} height={300} data={data}>
										<Line type="monotone" dataKey="uv" stroke="#8884d8" />
								    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
								    <XAxis dataKey="name" />
								    <YAxis />
								</ScatterChart>
								</div>
							</div>
							<div className="row justify-content-center" style={{"marginTop":"100px"}}>
								<div className="col-12 col-md-3">
									<Button variant="contained"
									fullWidth={true}
									style={{"backgroundColor":"black", "color":"white", "fontSize":"24px", "fontFamily":"Righteous"}}>Send</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
	}	
}