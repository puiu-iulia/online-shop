import { GET_USER, UPDATE_USER } from '../actions/user';
import User from '../../models/user';

const  initialState = {
    userId: null,
    user: null,
    isLoading: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: 
            return {
                userId: action.id,
                user: action.user,
                isLoading: action.isLoading
            };
        case UPDATE_USER:
            const updatedUser = new User(
                action.pid,
                action.billingName,
                action.billingEmail,
                action.billingPhone,
                action.billingCounty,
                action.billingCity,
                action.billingAddress,
                "",
                "",
                "",
                "",
                ""
            );
            return {
                ...state,
                user: updatedUser
            };
    }   
    return state;
};