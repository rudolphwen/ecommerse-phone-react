import React, { useContext } from 'react';
import { ProductContext } from '../context';
import { Link } from 'react-router-dom';
import { ButtonContainer } from './Button';

const Details = () => {
    const { detailProductInfo, addToCart, openModal } = useContext(ProductContext);
    const { id, company, img, info, price, title, inCart } = detailProductInfo;

    return (
        <div className="container py-5">
            {/* title */}
            <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                    <h1>{title}</h1>
                </div>
            </div>
            {/* endtitle */}
            {/* product info */}
            <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                    <img src={img} className="img-fluid" alt="product" />
                </div>
                {/* product text */}
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <h2>model : {title}</h2>
                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">made by : <span className="text-uppercase">{company}</span></h4>
                    <h4 className="text-blue"><strong>price : <span>$</span>{price}</strong></h4>
                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                        some info about product:
                    </p>
                    <p className="text-mute lead">{info}</p>
                    {/* buttons */}
                    <div>
                        <Link to="/">
                            <ButtonContainer>back to parducts</ButtonContainer>
                        </Link>
                        <ButtonContainer
                            cart
                            disable={inCart}
                            onClick={() => {
                                addToCart(id);
                                openModal(id);
                            }}>
                            {inCart ? "inCart" : "add to cart"}
                        </ButtonContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;