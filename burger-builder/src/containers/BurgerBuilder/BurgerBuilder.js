import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrices: 4,
        purchasable: false,
        purchasing:false,
        loading: false,
        error:false
    }
    componentDidMount () {
        axios.get('https://react-burger-691b8.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients:response.data});
            }).catch(error => {
                this.setState({error:true});
            })
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
            this.setState({purchasable: sum > 0});
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrices;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrices: newPrice,ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCounted = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrices;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrices: newPrice,ingredients: updatedIngredients});
        this.updatePurchasable(updatedIngredients);
    }

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
        const queryParams= [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname : '/checkout',
            search: '?' + queryString
        });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if(this.state.ingredients) {
            orderSummary = <OrderSummary 
                            price={this.state.totalPrices.toFixed(2)}
                            ingredients={this.state.ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinuelHandler}/>;
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrices}
                        purchasable={this.state.purchasable}
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

export default withErrorHandler(BurgerBuilder,axios);