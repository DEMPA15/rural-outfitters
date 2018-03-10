import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { addToBasket } from '../../Redux/Actions/action';

class AddToBasket extends Component{

  render(){
    const { addToBasket, productId } = this.props
    return(
      <button className="addToBasket-Button" onClick={() => addToBasket(productId)}>add to basket</button>
    )
  }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({addToBasket}, dispatch);
}

export default connect(state => state,mapDispatchToProps)(AddToBasket);