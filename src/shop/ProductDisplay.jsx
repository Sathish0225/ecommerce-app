import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const desc = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.";

const ProductDisplay = ({ item }) => {
    const { name, img, id, price, seller, ratingsCount, quantity } = item;
    const [preQuantity, setQuantity] = useState(quantity);
    const [coupon, setCoupon] = useState("");
    const [size, setSize] = useState("Select Size");
    const [color, setColor] = useState("Select Color");

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    }
    const handleColorChange = (e) => {
        setColor(e.target.value);
    }
    const handleDecrease = (e) => {
        if (preQuantity > 1) {
            setQuantity(preQuantity - 1);
        }
    }
    const handleIncrease = (e) => {
        setQuantity(preQuantity + 1);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            id: id,
            img: img,
            name: name,
            price: price,
            size: size,
            color: color,
            coupon: coupon,
            quantity: preQuantity
        }

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProductIndex = existingCart.findIndex((product) => product.id === id);

        if (existingProductIndex !== -1) {
            existingCart[existingProductIndex].quantity += preQuantity;
        } else {
            existingCart.push(product);
        }

        // update local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));

        // reset form fields
        setQuantity(1);
        setSize("Select Size");
        setColor("Select Color");
        setCoupon("");
    }

    return (
        <div>
            <div>
                <h4>{name}</h4>
                <p className="rating">
                    <i className="icofont-star"></i>
                    <i className="icofont-star"></i>
                    <i className="icofont-star"></i>
                    <i className="icofont-star"></i>
                    <i className="icofont-star"></i>
                    <span> ({ratingsCount} review)</span>
                </p>
                <h4>${price}</h4>
                <h4>{seller}</h4>
                <p>{desc}</p>
            </div>

            {/* cart component */}
            <div>
                <form onSubmit={handleSubmit}>
                    {/* size */}
                    <div className="select-product size">
                        <select value={size} onChange={handleSizeChange}>
                            <option>Select Size</option>
                            <option value="SM">SM</option>
                            <option value="MD">MD</option>
                            <option value="LG">LG</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                        <i className="icofont-rounded-down"></i>
                    </div>

                    {/* color */}
                    <div className="select-product color">
                        <select value={color} onChange={handleColorChange}>
                            <option>Select Color</option>
                            <option value="Pink">Pink</option>
                            <option value="Ash">Ash</option>
                            <option value="Red">Red</option>
                            <option value="White">White</option>
                            <option value="Blue">Blue</option>
                            <option value="Black">Black</option>
                        </select>
                        <i className="icofont-rounded-down"></i>
                    </div>

                    {/* cart plus minu */}
                    <div className="cart-plus-minus">
                        <div className='dec qtybutton' onClick={handleDecrease}>-</div>
                        <input type="text" name='qtybutton' id='qtybutton' value={preQuantity}
                            className='cart-plus-minus-box'
                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))} readOnly />
                        <div className='inc qtybutton' onClick={handleIncrease}>+</div>
                    </div>

                    {/* coupon field */}
                    <div className="discount-code mb-2">
                        <input type="text" placeholder='Enter Discount Code' onChange={(e) => setCoupon(e.target.value)} />
                    </div>

                    {/* btn section */}
                    <button type='submit' className='lab-btn'>
                        <span>Add to Cart</span>
                    </button>
                    <Link to='/cart-page' className='lab-btn bg-primary'>
                        <span>Check Out</span>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default ProductDisplay
