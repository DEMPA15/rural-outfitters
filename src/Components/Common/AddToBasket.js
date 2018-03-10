import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { addToBasket} from '../../Redux/Actions/action';

class AddToBasket extends Component{

  render(){
    const { addToBasket, productId, userId } = this.props
    return(
      <button className="addToBasket-Button" onClick={() => addToBasket(productId, userId)}>ADD TO CART</button>
    )
  }
}


function mapStateToProps({products}){
	return {products};
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({addToBasket}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddToBasket);