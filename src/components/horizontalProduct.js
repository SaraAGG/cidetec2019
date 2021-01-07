import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';


export default class ProductHorizontal extends React.Component{

	render(){
		return (
				<div className="container">
          <div className="row">
  					<Card className="col-xs-12 col-md-8" style={{'marginTop':'1em', 'overflow':'hidden','width':'50%'}}>
  						<CardHeader title={"Nombre del producot"+this.props.products.product}/>
  							<CardContent>
                  <div className="row Card-Username">
                    <h6>Propietario: {this.props.products.usernames}</h6>
                  </div>
                  <div className="row  Card-Attributes">
                  </div>
                  <Link to={"/encuesta/"+this.props.products.usernames+"-"+this.props.products.product}>
                  <Button variant="contained" color="primary">Responder encuesta </Button>
                  </Link>
  							</CardContent>
  					</Card>
            <div className="w-100 d-none d-md-block"></div>
          </div>

				</div>
      
			)
	}
}

/*
function mapStateToProps(state, ownProps){
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(ProductHorizontal);
*/