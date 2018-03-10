import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {deleteFromBasket} from '../../Redux/Actions/action';

class DeleteFromBasket extends Component{

  render(){
    const { deleteFromBasket, productId, userId } = this.props
    return(
      <button className="addToCart-Button" onClick={() => deleteFromBasket(productId, userId)}>Delete Item</button>
    )
  }
}


function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({ deleteFromBasket}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFromBasket);