import React, { Fragment, useState, useContext } from 'react';
import Product from './Product';
import Title from './Title';
import { ProductContext } from '../context';

const ProductList = () => {    
    const { products } = useContext(ProductContext);

    return (
        <Fragment>
            <div className="py-5">
                <div className="container">
                    <Title name="our" title="products" />
                    <div className="row">
                        {products.map(product => {
                            return <Product key={product.id} product={product} />
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
        // <Product />
    );
};

export default ProductList;