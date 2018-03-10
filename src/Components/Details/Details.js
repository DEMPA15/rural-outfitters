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
<<<<<<< HEAD
               <Header showCart={true}/> 
                <div className="productItem">
                    <h1 className="item-name">{this.props.product.name}</h1>
                    <img className="ratingLarge" src={ratingLarge} alt="stars"/>
                    <div className="imageBlock" style={{backgroundImage: `url("${this.props.product.img}")`}}/>  
                    <p className="pricingBlock">{'$'}{this.props.product.price}</p>                  
                    <p className="productContent">{this.props.product.description}</p>
                    <p>{this.props.product.specs}</p>
=======
               <Header showCart={true}/>
               <h1 className="detail-header">{this.props.product.name}</h1>
                <div className="detailContainer">
                    {/* <h1 className="detail-header">{this.props.product.name}</h1> */}
                    <div className="detail-image" style={{backgroundImage: `url("${this.props.product.img}")`}}/>
                    <div className="description-box">
                    <p className="addToBasket">Add To Basket</p>
                    <p className="detail-description">Price: &#36;{this.props.product.price}</p>
                    <p className="detail-description">Details: {this.props.product.description}</p>
                    <p className="detail-description">Specs: {this.props.product.specs}</p>
                    </div>
>>>>>>> 4f6db8e28f5bf3f72cc079bd13e8b110ce3001a1
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