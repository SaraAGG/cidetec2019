import React from 'react';
import { BrowserRouter as ReactRouter, Route, Link, Switch } from "react-router-dom";


import Login from './components/login';
import Register from './components/register';
import Survey from './components/survey';
import Dashboard from './components/dashboard';
import GuestForm from './components/guestForm';
import RegisterProduct from './components/registerProduct';
import Splash from './components/splash';
import Process from './components/landingSystematized';
import Emphatize from './components/emphatize';
import Interview from './components/interview';
import Derivation from './components/derivation';
import Classification from './components/classification';
import FinalAttributes from './components/finalAttributes';
import Define from './components/define';
import DefineSurvey from './components/defineSurvey';
import DefineProfile from './components/defineProfile';
import DefineTotalSurvey from './components/defineTotalSurvey';
import Methodology from './components/methodology';
import GenerateReport from './components/generateReport';
import Ideate from './components/ideate';
import Prototype from './components/prototype';
import BuildSprint from './components/buildSprint';
import Todo from './components/prototypeTodo';
import Test from './components/test';
import UserBreakdown from './components/userBreakdown';
import GuessForm from './components/guess';
import RadioForm from './components/surveyRadio';

import { connect } from 'react-redux';

import { ConnectedRouter } from 'react-router-redux';


import history from './index.js'

import App from './App';

const userSignedIn = false;

class Router extends React.Component{
	constructor(props){
		super(props);
		console.log("Router props ->", props.history)
	}
	signInRoutes(){
		if(this.props.user.jwt){
			return(
					<Route path="/dashboard"> </Route>
				);
		}
	}
	home(){
		if(this.props.user.jwt) return Login;
		return Login;
	}

	render(){
		return(	
			<ReactRouter history={this.props.history}>
					<Switch>
						<App>
						<Route exact path="/splash" component={Splash}/>
						<Route exact path="/" component={ Login }/>
			  			<Route exact path="/register" component = {Register}/>
			  			<Route exact path="/encuesta/:slug" component ={Survey} />
			  			<Route exact path="/dashboard" component ={Dashboard}/>
			  			<Route exact path="/registrar-producto/" component={RegisterProduct}/>
			  			<Route exact path="/process/" component={Process}/>
			  			<Route exact path="/emphatize/:slug" component={Emphatize}/>
			  			<Route exact path="/emphatize/interview/:slug" component={Interview}/>
			  			<Route exact path="/emphatize/derivation/:slug" component={Derivation}/>
			  			<Route exact path="/emphatize/classification/:slug" component={Classification}/>
			  			<Route exact path="/emphatize/final-attributes/:slug" component={FinalAttributes}/>
			  			<Route exact path="/define/:slug" component={Define}/>
			  			<Route exact path="/define/generate-survey/:slug" component={DefineSurvey}/>
			  			<Route exact path="/define/define-profile/:slug" component={DefineProfile}/>
			  			<Route exact path="/define/define-total-survey/:slug" component={DefineTotalSurvey}/>
			  			<Route exact path ="/define/methodology/:slug" component= {Methodology}/>
			  			<Route exact path="/define/generate-report/:slug" component={GenerateReport}/>
			  			<Route exact path="/ideate/:slug" component={Ideate}/>
			  			<Route exact path="/prototype/:slug" component={Prototype}/>
			  			<Route exact path ="/prototype/build-sprint/:slug" component={BuildSprint}/>
			  			<Route exact path ="/prototype/todo/:slug" component= {Todo}/>
			  			<Route exact path ="/test/:slug" component={Test}/>
			  			<Route exact path ="/user-breakdown/:slug" component={UserBreakdown}/>
			  			<Route exact path ="/survey/:user/:slug" component={GuessForm}/>
			  			</App>
				</Switch>

			</ReactRouter>

			);
	}
}

function mapStateToProps(state, ownProps){
	return{
		user : state.user
	}
}

export default connect(mapStateToProps)(Router);