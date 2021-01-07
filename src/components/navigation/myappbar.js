import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';

import LogInButton from './LoginButton';
import LogoutButton from './LogOutButton';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';


import { Link } from "react-router-dom";
import IconMenu from '../../images/iconMenu.jpg';




//Registrar producto debe quedar guardado como 
//jwt para almanecenar todo el flujo de la aplicacion
//para poder navegar.
// (:


class MyAppBar extends React.Component{
	constructor(props){
		super(props);
		console.log("user props", props.user.jwt)
		console.log("product props",props.product.product)


		console.log(props)

		this.state = {
			user: props.user.jwt,
			emphatize : false,
			define:false,
			ideate:false,
			prototype:false,
			test:false,
		}
	}
	render(){
		const {user, emphatize, define, ideate, prototype, test} = this.state
	return(
		<div>{this.props.user.jwt ? <AppBar style={{"backgroundColor":"black"}} position="static">
				<Toolbar >
					<Link to="/process"><img src={IconMenu} style={{"height":"100px"}}/> </Link>
				<div className="container menu-container">
					<div className="row justify-content-around row-menu">
						<div className="border-here">
							{this.props.product.product ? <Link to={"/emphatize/"+this.props.product.product} className="links-navbar">
								<div className="link-btn" color="inherit">
									<h3 style={{"textAlign":"center"}}>Emphatize</h3>
								</div>
							</Link>	:null }
						</div>
						 <div className="border-here">				
						{this.props.product.final_completed ?	<Link  to={"/define/"+this.props.product.product}className="links-navbar">
								<div className="link-btn" color="inherit">
									<h3 style={{"textAlign":"center"}}>Define</h3>
								</div>
							</Link>: null}
						</div>
						<div className="border-here">
							{ ideate ?<Link to={"/ideate/"+this.props.product.product}className="links-navbar">
								<div className="link-btn" color="inherit">
									<h3 style={{"textAlign":"center"}}>Ideate</h3>
								</div>
							</Link>: null }
						</div>
						<div className="border-here">
							{prototype ?<Link to={"/prototype/"+this.props.product.product} className="links-navbar">
								<div className="link-btn" variant="h6" color="inherit">
									<h3 style={{"textAlign":"center"}}>Prototype</h3>
								</div>
							</Link> : null }
						</div>
						<div className="border-here">
							{test ? <Link to={"/test/"+this.props.product.product} className="links-navbar">
								<div className="link-btn" variant="h6" color="inherit">
									<h3 style={{"textAlign":"center"}}>Test</h3>
								</div>
							</Link> : null}
						</div>
					</div>
				</div>
					{this.props.user.jwt ?<Button style={{"marginLeft":"auto","fontFamily":"Righteous"}} onClick={this.props.logout} color="inherit"><Link to="/" style={{"color":"white"}}> Log Out</Link> </Button> : <Link style={{"marginLeft":"auto", "color":"white", "fontFamily":"Righteous"}} ><Button fullWidth={true }variant="outlined" color="inherit" style={{"fontFamily":"Righteous", "fontSize":"16px"}}>Sign Up </Button> </Link>}
				</Toolbar>
			</AppBar>: <div></div>} </div> 
		);
	}
}

function mapStateToProps(state, ownProps){
	return {
		user: state.user,
		product:state.products
	}
}
export default connect(mapStateToProps)(MyAppBar);