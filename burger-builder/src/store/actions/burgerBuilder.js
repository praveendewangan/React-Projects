import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients   
    }
}
export const initIngredients = () => {
    return dispatch => { 
        axios.get('https://react-burger-691b8.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
            // this.setState({ingredients:response.data});
        }).catch(error => {
            dispatch(fetchIngredientsFailed());
            // this.setState({error:true});
        })
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}