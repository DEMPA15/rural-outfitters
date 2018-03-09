import React, { Component } from 'react';
import './Market.css'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, GetProduct} from '../../Redux/Actions/action';
import Header from '../Header/Header'
import{Link} from 'react-router-dom';

class Market extends Component {
    render(){
        const items = this.props.products.map((product)=>{
            return ( 
            <div className="item-container">
                <Link to="/details">
                    <div style={{backgroundImage: "url(" + product.imageUrl+ ")"}}/>
                    <p>{product.price}</p>
                    <p>{product.description}</p>
                </Link>
                <button>ADD TO CART</button>
            </div> 
            )
        })
        return (
            <div>
                <Header showCart={true}/>
                <div className="market-container">
                    <h1>Market</h1>
                    <div className="itemContainer">
                    {items} 
                    </div>
                </div>
            </div>
        )
    }
}
// export default Market;
function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts, GetProduct}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Market);