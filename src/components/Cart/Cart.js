import React, { useContext, Fragment } from 'react';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';
import { ProductContext } from '../../context';

const Cart = () => {
    const cartValue = useContext(ProductContext);
    const { cart } = cartValue;

    if(cart.length <= 0) {
        return <EmptyCart />;
    }

    return (
        <Fragment>
            <Title name="your" title="cart" />
            <CartColumns />
            <CartList value={cartValue} />
            <CartTotals value={cartValue} /> 
        </Fragment>
    );
};

export default Cart;