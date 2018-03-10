import React, { Component } from 'react';
import './Market.css'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, GetProduct} from '../../Redux/Actions/action';
import Header from '../Header/Header'
import{Link} from 'react-router-dom';

class Market extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoaded: false,
        }
    }
    componentDidMount(){
        this.props.GetProducts()
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
                        <div className="item-image" style={{backgroundImage: "url(" + product.img+ ")"}}/>
                <Link to="/details">
                    <div onClick={ ()=>{this.props.GetProduct(product)}}>
                        <p>${product.price}</p>
                        <p>{product.description}</p>
                    </div>
                </Link>
                <br></br>
                <button className='market-button'>ADD TO CART</button>
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
	return bindActionCreators({GetProducts, GetProduct}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Market);