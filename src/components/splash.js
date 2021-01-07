import React from 'react';
import { Route, Redirect } from 'react-router'

export default class Splash extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			redirect: false
		}

	}

	render(){
		return(
			<div className="">

			</div>
			)
	}
}
