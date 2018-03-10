import React, { Component } from 'react';
import Header from '../Header/Header'
import './Basket.css';
import {GetBasket} from '../../Redux/Actions/action';

class Basket extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
        }
    }
    componentDidMount(){
        GetBasket()
            .then(items => {
               items.data.isLoaded = true;
               this.setState({
                   isLoaded: true,
                   items: items.data
               }) 
            })
    }
    render(){
        let total = this.state.items.reduce((sum,item) =>{
            sum += item.price
        }, 0)
        let basketItems = this.state.items.map(item => {
            return(
            <div className = 'productInfo'>
            <div className = 'img-div'>
                <div className="basket-image" style={{backgroundImage: `url("${item.img}")`}}/>
            </div>
            <div className = 'productInfo-div'>
                <h3 className = 'productName'>{item.name}</h3>
                <p className ='details'>{item.description}</p>
                <button className = 'remove-btn'>Remove</button>
            </div>
            <div className = 'price-div'>
                <h3 className = 'price'>Price</h3>
                <p>{item.price}</p>
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
            <div>Loading...</div>
            </div>
            )}
    }
}
export default Basket;