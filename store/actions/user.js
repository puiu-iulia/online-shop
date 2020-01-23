import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';
import User from '../../models/user';

export const GET_USER = 'GET_USER';

export const getUser = () => {
    let isLoading;
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        console.log(getState().auth);
        ShopWooCommerceAPI.get('customers', {
            per_page: 100,
            email: userId
        }).then(data => {
            const user = new User(
                data[0].id,
                data[0].billing.first_name + " " + data[0].billing.last_name,
                data[0].billing.email,
                data[0].billing.phone,
                data[0].billing.state,
                data[0].billing.city,
                data[0].billing.address_1,
                data[0].shipping.first_name + " " + data[0].shipping.last_name,
                data[0].shipping.phone,
                data[0].shipping.county,
                data[0].shipping.city,
                data[0].shipping.address_1
            );
            id = data[0].id;
            isLoading = false;
            dispatch({ type: GET_USER, id: id, user: user, isLoading: isLoading})
        }).catch(error => {
            console.log(error);
            isLoading = false;
        });
    };
};