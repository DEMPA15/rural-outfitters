import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css'
import shoppingCart from '../Images/ShoppingBag.svg'
import {Link} from 'react-router-dom';

class Header extends Component {
    render(){
        if(this.props.showCart){
            return (
                <div className="Header">
                    RURAL OUTFITTERS
                    <Link to={'/basket'}>
                        <div className="shoppingBag" style={{backgroundImage: "url(" + shoppingCart+ ")"}}>
                            <div className="shoppingDate">
                                {this.props.basket}
                            </div>
                        </div>
                    </Link>
                </div>
            ) 
        }
        return (
            <div className="Header">
                RURAL OUTFITTERS
            </div>
        )
    }
}
function mapStateToProps({basket}){
	return {basket};
}
  
export default connect(mapStateToProps)(Header);