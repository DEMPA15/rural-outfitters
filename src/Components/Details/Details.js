import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {getProducts, addToBasket} from '../../Redux/Actions/action';
import './Details.css'

class Details extends Component {
    render(){
        return (
            <div>
               <Header showCart={true}/>
               <h1 className="detail-header">{this.props.product.name}</h1>
                <div className="detailContainer">
                    <div className="detail-image" style={{backgroundImage: `url("${this.props.product.img}")`}}/>
                    <div className="description-box">
                        <p className="addToBasket">Add To Basket</p>
                        <p className="detail-description">Price: &#36;{this.props.product.price}</p>
                        <p className="detail-description">Details: {this.props.product.description}</p>
                        <p className="detail-description">Specs: {this.props.product.specs}</p>
                    </div>
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
	return bindActionCreators({addToBasket}, dispatch);
}
export default connect(mapStateToProps)(Details);