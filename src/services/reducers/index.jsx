import { combineReducers } from 'redux';
import { dataIngredientsReducer } from "../reducers/data-ingredients";
import { sendNewOrderReducer } from './burger-cost';
import { ingredientDetailsReducer } from './burger-ingredients';
import { userDataReducer } from './user-data';

export const rootReducer = combineReducers({
    listIngredients: dataIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    order: sendNewOrderReducer,
    userData: userDataReducer,
})