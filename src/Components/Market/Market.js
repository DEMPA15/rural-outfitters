import React, { Component } from 'react';
import './Market.css'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {getProducts, getProduct, addToBasket} from '../../Redux/Actions/action';
import Header from '../Header/Header'
import{Link} from 'react-router-dom';
import AddToBasket from '../Common/AddToBasket';
import DeleteFromBasket from '../Common/DeleteFromBasket';

class Market extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
        }
    }
    componentDidMount(){
        this.props.getProducts()
        .then(()=>{
            this.setState({
                isLoaded:true,
            });
        })
    }
    render(){
        const items = this.props.products.map((product)=>{
            return (
            <div className="item-container" key={product.product_id}>
                <Link to="/details">
                    <div onClick={ ()=>{this.props.getProduct(product)}}>
                        <div className="item-image" style={{backgroundImage: "url(" + product.img+ ")"}}/>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                    </div>
                </Link>
                <AddToBasket productId = {product.product_id} userId = '1' />
                <DeleteFromBasket productId = {product.product_id} userId = '1'  />
            </div>
            )
        })
        if(this.state.isLoaded){
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
        }else{
            return(<div>
                <Header showCart={true}/>
               <div className="loading">Loading...</div>

                </div>);
        }
    }
}
// export default Market;
function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({getProducts, getProduct, addToBasket}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Market);