import React, { Component } from 'react';
import './Market.css'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, GetProduct} from '../../Redux/Actions/action';
import Header from '../Header/Header'
import{Link} from 'react-router-dom';
import Loading from '../Images/Loading.gif';
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
                    <div onClick={ ()=>{this.props.GetProduct(product)}} className='item-contents' >
                        <img className="item-image" src= { product.img } alt={product.name} />
                        <div className='item-contents-text' >
                            <h2>{product.name}</h2>
                            <p>${product.price}</p>
                            <p className='product-description' >{product.description}</p>
                        </div>
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
                    <div className="loading">
                        <img src={ Loading } alt='Loading'/>
                    </div> 
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