import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {
    state = {
        ingredients:null,
        comp : null,
        totalPrice: 0
    }
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         if(param[0] === 'price'){
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }
    //     this.setState({ingredients : ingredients,totalPrice: price});
    // }
    checkoutCancelledHandler = () => {
        console.log("calling checkoutCancelledHandler");
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        console.log("calling checkoutContinuedHandler",this.props.match.path);
        // this.props.history.replace('/checkout/contact-data');
        this.setState({comp : <ContactData {...this.props}/>});
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    { this.state.comp || null}
                    {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>  */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return  {
        ings: state.ingredients,
        price: state.totalPrices
    }
}
export default connect(mapStateToProps)(Checkout);