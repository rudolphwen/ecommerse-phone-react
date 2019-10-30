import React, { createContext, useState, useEffect } from 'react';
import { storeProducts, detailProduct } from './data';

const ProductContext = createContext();

const ProductProvider = (props) => {
    // const [products] = useState(storeProducts);
    const [products, setProducts] = useState([]);
    const [detailProductInfo, setDetailProductInfo] = useState(detailProduct);
    const [cart, setCart] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalProduct, setModalProduct] = useState(detailProduct);
    const [cartSubTotal, setCartSubTotal] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [cartTax, setCartTax] = useState(0);

    useEffect(() => {
        copyProducts();
    }, []);

    useEffect(() => {
        addTotals();
    }, [products, cart]);   // after products and cart have been changed, addTotals()

    const copyProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        });
        setProducts(tempProducts);
    };

    const getItem = (id) => {
        const product = products.find(item => item.id === id);
        return product;
    };

    const handleDetail = (id) => {
        const product = getItem(id);
        setDetailProductInfo(product);
    };

    const addToCart = (id) => {
        const tempProducts = [...products];
        const index = tempProducts.indexOf(getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        setProducts(tempProducts);
        setCart([...cart, product]);    // after products and cart have been changed, addTotals()
    };

    const openModal = (id) => {
        const product = getItem(id);
        setModalOpen(true);
        setModalProduct(product);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const increment = (id) => {
        const tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.price * product.count;
        setCart([...tempCart]); // after changing cart, addTotals()
    };

    const decrement = (id) => {
        const tempCart = [...cart];
        const selectedProduct = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if(product.count === 0) {
            removeItem(id);
        } else {
            product.total = product.price * product.count;
            setCart([...tempCart]); // after changing cart, addTotals()
        }
    };

    const removeItem = (id) => {
        let tempProducts = [...products];
        let tempCart = [...cart];
        tempCart = tempCart.filter(item => item.id !== id);

        const index = tempProducts.indexOf(getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;
        setCart([...tempCart]);
        setProducts([...tempProducts]);
    };

    const clearCart = () => {
        setCart([]);
        copyProducts();
    };

    const addTotals = () => {
        let subTotal = 0;
        cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        setCartSubTotal(subTotal);
        setCartTax(tax);
        setCartTotal(total);
    };

    return (
        <ProductContext.Provider value={
            {
                products,
                detailProductInfo,
                modalOpen,
                modalProduct,
                cart,
                cartSubTotal,
                cartTotal,
                cartTax,
                handleDetail,
                addToCart,
                openModal,
                closeModal,
                increment,
                decrement,
                removeItem,
                clearCart
            }}>
            {props.children}
        </ProductContext.Provider>
    );
};

export { ProductContext, ProductProvider};
