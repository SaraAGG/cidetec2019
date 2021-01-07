import React from 'react';


import Button from '@material-ui/core/Button';


export 	default class  LogoutButton extends React.Component{
	render(){
		return(
				<Button onClick = {this.props.logout}>Salir </Button>
			)
	}
}