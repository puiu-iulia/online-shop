import React from 'react';
import {View, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';

import Product from '../components/Product'; 
import Colors from '../constants/Colors';

const ProductsList = props => {

    
    const selectItemHandler = (id, name) => {
        props.navigation.navigate('ProductDetail', {
        productId: id,
        productTitle: name
        });
    };

    return (
        <FlatList
            data={props.listData}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={itemData => (
            <Product
                image={itemData.item.imageUrl}
                title={itemData.item.name}
                price={itemData.item.price}
                onSelect={() => {
                    selectItemHandler(itemData.item.id, itemData.item.name);
                }}
            >
            </Product>
            )}
        />
    );
};

export default ProductsList;