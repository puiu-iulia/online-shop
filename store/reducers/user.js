import { GET_USER } from '../actions/user';

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
        
    }   
    return state;
};