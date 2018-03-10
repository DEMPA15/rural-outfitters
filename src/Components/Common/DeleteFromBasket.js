import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import {deleteFromBasket} from '../../Redux/Actions/action';

class DeleteFromBasket extends Component{

  render(){
    const { deleteFromBasket, productId } = this.props
    return(
      <button className="addToBasket-Button" onClick={() => deleteFromBasket(productId)}>Delete Item</button>
    )
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({ deleteFromBasket}, dispatch);
}

export default connect(state => state,mapDispatchToProps)(DeleteFromBasket);