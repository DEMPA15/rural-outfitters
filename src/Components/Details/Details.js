import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, AddToBasket} from '../../Redux/Actions/action';
import './Details.css'

class Details extends Component {
    render(){
        return (
            <div>
               <Header showCart={true}/> 
                <div>
                    <h1>{this.props.product.name}</h1>
                    <div className="item-image" style={{backgroundImage: `url("${this.props.product.img}")`}}/>  
                    <p>{this.props.product.price}</p>                  
                    <p>{this.props.product.description}</p>
                    <p>{this.props.product.specs}</p>
                </div>
            </div>
        )
    }
}
// export default Market;
function mapStateToProps({product}){
	return {product};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({AddToBasket}, dispatch);
}
export default connect(mapStateToProps)(Details);