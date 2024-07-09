import React from 'react'
import Data from "../products.json"

const ShopCategory = ({ filterItem, setItem, menuItem, setProducts, selectedCategory }) => {
    return (
        <>
            <div className="widget-header">
                <h5 className="ms-2">All Categories</h5>
            </div>
            <div>
                <button className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`} onClick={() => setProducts(Data)}>All</button>
                {
                    menuItem.map((item, id) => {
                        return (
                            <button className={`m-2 ${selectedCategory === item ? "bg-warning" : ""}`} key={id} onClick={() => filterItem(item)}>{item}</button>
                        )
                    })
                }
            </div>
        </>
    )
}

export default ShopCategory
