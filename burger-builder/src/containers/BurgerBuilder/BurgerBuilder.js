import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // totalPrices: 4,
        // purchasable: false,
        purchasing:false,
        loading: false,
        error:false
    }
    componentDidMount () {
        // axios.get('https://react-burger-691b8.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients:response.data});
        //     }).catch(error => {
        //         this.setState({error:true});
        //     })
    }
    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    updatePurchasable = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // };
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el) => {
                return sum + el;
            },0);
            return sum > 0 ;
    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCounted;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrices;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrices: newPrice,ingredients: updatedIngredients});
    //     this.updatePurchasable(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCounted;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrices;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrices: newPrice,ingredients: updatedIngredients});
    //     this.updatePurchasable(updatedIngredients);
    // }

    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    }
    
    purchaseContinuelHandler = () => {
        // alert("ok");
        // this.setState({loading:true});
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price : this.state.totalPrices,
        //     customer : {
        //         name : "Praveen",
        //         address : {
        //             street: "pnd CG",
        //             zipCode : "122222",
        //             country : "India"
        //         },
        //         email : "test@test.gmail.com"
        //     },
        //     deliveryMethod : "fastest"
        // }
        // axios.post('/orders.json',order)
        // .then(response => {
        //     this.setState({loading:false,purchasing:false});
        //     console.log(response)
        // })
        // .catch(error => {
        //     this.setState({loading:false,purchasing:false});
        //     console.log(error)
        // });
        // const queryParams= [];
        // for(let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrices);
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        // console.log(this.props)
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.props.ings) {
            orderSummary = <OrderSummary 
                            price={this.props.price.toFixed(2)}
                            ingredients={this.props.ings}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinuelHandler}/>;
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler}/>
                </Aux>
                );
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        // console.log(disabledInfo);
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return  {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));