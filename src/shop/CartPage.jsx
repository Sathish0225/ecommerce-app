import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom';
import delImgUrl from "../assets/images/shop/del.png"
import CheckOutPage from './CheckOutPage'

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // fetch cart items
        const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(storedCartItems);
    }, []);

    const calculateTotalPrice = (item) => {
        return item.price * item.quantity;
    }

    // handle quantity increase
    const handleIncrease = (item) => {
        item.quantity += 1;
        setCartItems([...cartItems]);

        // update local storage with new cart items
        updateLocalStorage(cartItems);
    }

    // handle quantity decrease
    const handleDecrease = (item) => {
        if (item.quantity > 1) {
            item.quantity -= 1;
            setCartItems([...cartItems]);

            // update local storage with new cart items
            updateLocalStorage(cartItems);
        }
    }

    // handle remove item
    const handleRemove = (item) => {
        const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);

        // update local storage with new cart items
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    }

    // update local storage
    const updateLocalStorage = (cart) => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // cart subtotal
    const cartSubtotal = cartItems.reduce((total, item) => {
        return total + calculateTotalPrice(item);
    }, 0);

    // cart total
    const orderTotal = cartSubtotal;

    return (
        <div>
            <PageHeader title="Shop Cart" curPage="Cart Page" />

            <div className="shop-cart padding-tb">
                <div className="container">
                    <div className="section-wrapper">
                        {/* cart top */}
                        <div className="cart-top">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="cat-product">Product</th>
                                        <th className="cat-price">Price</th>
                                        <th className="cat-quantity">Quantity</th>
                                        <th className="cat-total">Total</th>
                                        <th className="cat-edit">Edit</th>
                                    </tr>
                                </thead>

                                {/* table body */}
                                <tbody>
                                    {
                                        cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="product-item cat-product">
                                                    <div className="p-thumb">
                                                        <Link to="/shop"><img src={item.img} alt="" /></Link>
                                                    </div>
                                                    <div className="p-content">
                                                        <Link to="/shop">{item.name}</Link>
                                                    </div>
                                                </td>

                                                <td className='cat-price'>
                                                    ${item.price}
                                                </td>
                                                <td className="cat-quantity">
                                                    <div className="cart-plus-minus">
                                                        <div className="dec qtybutton" onClick={() => handleDecrease(item)}>-</div>
                                                        <input type="text" className="cart-plus-minus-box"
                                                            name="qtybutton" value={item.quantity} readOnly />
                                                        <div className="inc qtybutton" onClick={() => handleIncrease(item)}>+</div>
                                                    </div>
                                                </td>
                                                <td className="cat-total">${calculateTotalPrice(item)}</td>
                                                <td className="cat-edit">
                                                    <a href="#" onClick={() => handleRemove(item)}>
                                                        <img src={delImgUrl} alt="" />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* cart bottom */}
                        <div className="cart-bottom">
                            {/* checkout box */}
                            <div className="cart-checkout-box">
                                <form className="coupon">
                                    <input type="text" className="cart-page-input-text" name="coupon" id="coupon" placeholder="Coupon code ..." />
                                    <input type="submit" value="Apply Coupon" />
                                </form>

                                <form className="cart-checkout">
                                    <input type="submit" value="Update Cart" />
                                    <div>
                                        <CheckOutPage />
                                    </div>
                                </form>
                            </div>

                            {/* checkout box end */}

                            {/* shipping box */}
                            <div className="shiping-box">
                                <div className="row">
                                    {/* left side */}
                                    <div className="col-md-6 col-12">
                                        <div className="calculate-shiping">
                                            <h4>Calculate Shipping</h4>
                                            <div className="outline-select">
                                                <select >
                                                    <option value="uk">United Kindom (UK)</option>
                                                    <option value="us">United States (US)</option>
                                                    <option value="ind">India (IND)</option>
                                                    <option value="sg">Singapore (SG)</option>
                                                </select>
                                                <span className='select-icon'>
                                                    <i className="icofont-rounded-down"></i>
                                                </span>
                                            </div>
                                            <div className="outline-select shipping-select">
                                                <select >
                                                    <option value="uk">New York</option>
                                                    <option value="us">London</option>
                                                    <option value="ind">New Delhi</option>
                                                    <option value="sg">Singapore</option>
                                                </select>
                                                <span className='select-icon'>
                                                    <i className="icofont-rounded-down"></i>
                                                </span>
                                            </div>
                                            <input type="text" name="postalCode" id="postalCode" placeholder="Postal Code / ZIP *" className='cart-page-input-text' />
                                            <button type="submit">Update Address</button>
                                        </div>
                                    </div>
                                    {/* right side */}
                                    <div className="col-md-6 col-12">
                                        <div className="cart-overview">
                                            <h4>Cart Total</h4>
                                            <ul className="lab-ul">
                                                <li>
                                                    <span className='pull-left'>Cart Subtotal</span>
                                                    <p className='pull-right'>${cartSubtotal}</p>
                                                </li>
                                                <li>
                                                    <span className='pull-left'>Shipping and Handling</span>
                                                    <p className='pull-right'>Free Shipping</p>
                                                </li>
                                                <li>
                                                    <span className='pull-left'>Order Total</span>
                                                    <p className='pull-right'>${orderTotal.toFixed(2)}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
