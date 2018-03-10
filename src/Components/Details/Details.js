import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, AddToBasket} from '../../Redux/Actions/action';
import './Details.css';
import ratingLarge from '../Images/ratingLarge.gif';


class Details extends Component {
    render(){
        return (
            <div>
               <Header showCart={true}/> 
                <div className="productItem">
                    <h1 className="item-name">{this.props.product.name}</h1>
                    <img className="ratingLarge" src={ratingLarge} alt="stars"/>
                    <div className="imageBlock" style={{backgroundImage: `url("${this.props.product.img}")`}}/>  
                    <p className="pricingBlock">{'$'}{this.props.product.price}</p>                  
                    <p className="productContent">{this.props.product.description}</p>
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