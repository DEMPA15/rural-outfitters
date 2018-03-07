import React, { Component } from 'react';
import './Market.css'
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {GetProducts, GetProduct} from '../../Redux/Actions/action';
import Header from '../Header/Header'

class Market extends Component {
    render(){
        return (
            
            <div>
                <Header/>
                Market
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