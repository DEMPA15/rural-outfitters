import React, { Component } from 'react';
import Header from '../Header/Header';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, AddToBasket} from '../../Redux/Actions/action';
import './Details.css'

class Details extends Component {
    render(){
        return (
            <div>
               <Header/> 
                <div>
                    
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