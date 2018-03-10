import React, { Component } from 'react';
import './Market.css'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, GetProduct} from '../../Redux/Actions/action';
import Header from '../Header/Header';
import{Link} from 'react-router-dom';
import Loading from '../Loading/Loading';

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
                <Link to="/details">
                    <div onClick={ ()=>{this.props.GetProduct(product)}}>
                        <p className='name'>{product.name}</p>
                        <div className="item-image" 
                        />
                        <p className='price'>${product.price}</p>
                        <p className='description'>{product.description}</p>
                    </div>
                </Link>
                <button>ADD TO CART</button>
            </div> 
            )
        })
        if(this.state.isLoaded){
            return (
                <div>
                    <Header showCart={true}/>
                    <div className="market-container">
                        <h1 className='market-title'>The Market</h1>
                        
                        {items} 
                        
                    </div>
                </div>
            )
        }else{
            return(<div>
                <Header showCart={true}/>
                   <Loading/>
                </div>);
        }
    }
}
function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({GetProducts, GetProduct}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Market);