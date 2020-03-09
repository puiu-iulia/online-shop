import ShopWooCommerceAPI from '../../constants/ShopWooCommerceAPI';
import User from '../../models/user';

export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export const getUser = () => {
    let isLoading;
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        // console.log(getState().auth);
        await ShopWooCommerceAPI.get('customers', {
            per_page: 100,
            email: userId
        }).then(data => {
            const user = new User(
                data[0].id,
                data[0].billing.first_name + " " + data[0].billing.last_name,
                data[0].billing.email,
                data[0].billing.address_2,
                data[0].billing.state,
                data[0].billing.city,
                data[0].billing.address_1,
                data[0].shipping.first_name + " " + data[0].shipping.last_name,
                data[0].shipping.address_2,
                data[0].shipping.state,
                data[0].shipping.city,
                data[0].shipping.address_1
            );
            id = data[0].id;
            console.log(user);
            isLoading = false;
            dispatch({ type: GET_USER, id: id, user: user, isLoading: isLoading})
        }).catch(error => {
            console.log(error);
            isLoading = false;
        });
    };
};

export const updateUser = (billingName, billingEmail, billingPhone, billingCounty, billingCity, billingAddress) => {
    return async (dispatch, getState) => {
        const userId = getState().user.userId;

        const data = {
            first_name: billingName,
            billing: {
                first_name: billingName,
                address_1: billingAddress,
                address_2: billingPhone,
                state: billingCounty,
                phone: "",
                city: billingCity
            }
        };
        if (userId !== null) {
            // webhook = `"customers/${userId}"`;
            // console.log(webhook);
            ShopWooCommerceAPI.put("customers/" + userId, data)
            .then((response) => {
                console.log(response);
                dispatch({
                    type: UPDATE_USER,
                    pid: userId,
                    userData: {
                        billingName,
                        billingEmail,
                        billingAddress,
                        billingPhone,
                        billingCounty,
                        billingCity,
                        billingAddress
                    }
                })
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}