import React, { Component } from 'react';
import Header from '../Header/Header'
import './Basket.css';
import {getBasket, deleteFromBasket} from '../../Redux/Actions/action';
import Loading from '../Loading/Loading';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
class Basket extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
        }
        this.removeItem =this.removeItem.bind(this);
    }
    componentDidMount(){
        getBasket()
            .then(items => {
               items.data.isLoaded = true;
               this.setState({
                   isLoaded: true,
                   items: items.data
               }) 
            })
    }
    removeItem(productId){
        this.props.deleteFromBasket(productId)
            .then(()=>{
                getBasket()
                .then(items => {
                   items.data.isLoaded = true;
                   this.setState({
                       isLoaded: true,
                       items: items.data
                   }) 
                })
            })
    }
    render(){
        let total = this.state.items.reduce((sum,item) =>{
           return sum += (item.product.price * item.quantity);
        }, 0).toFixed(2);
        let basketItems = this.state.items.map(item => {
            return(
            <div className = 'productInfo' key={item.product.product_id}>
            <div className = 'img-div'>
                <div className="basket-image" style={{backgroundImage: `url("${item.product.img}")`}}/>
            </div>
            <div className = 'productInfo-div'>
                <h3 className = 'productName'>{item.product.name}</h3>
                <p className ='details'>{item.product.description}</p>
                <button className = 'remove-btn' onClick= {()=>{this.removeItem(item.product.product_id)}}>Remove Item</button>
            </div>
            <div className = 'price-div'>
                <h3 className = 'price'>Price</h3>
                <p>{item.product.price}</p>
            </div>
            <div className = 'quantity-div'>
                <h3 className = 'quantity'>Quantity</h3>
                <p>{item.quantity}</p>
            </div>
        </div>
        )
        });
        if(this.state.isLoaded == true){
            return (
                <div>
                    <Header showCart={true}/>
                    <div className = 'basketPage'>
                       { basketItems}
                        <div className = 'total-checkout'>
                            <h2 className = 'total'>Total:</h2>
                            <h2 className="actualTotal">${total}</h2>
                        </div>
                        <div className="button-div">
                            <button className = 'checkout-btn'>Checkout</button>
                        </div>
                     </div>
                </div>
            )
        }else{
            return(
            <div>
            <Header showCart={true}/>
            <Loading/>
            </div>
            )}
    }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({deleteFromBasket}, dispatch);
}

export default connect(state => state, mapDispatchToProps)(Basket);