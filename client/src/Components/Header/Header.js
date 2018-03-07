import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.css'

class Header extends Component {
    render(){
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