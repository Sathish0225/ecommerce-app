import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'

import Data from "../products.json"
import ProductCards from './ProductCards'
import ShopPagination from './ShopPagination'
import ShopSearch from './ShopSearch'
import ShopCategory from './ShopCategory'
import PopularPost from './PopularPost'
import Tags from './Tags'

const Shop = () => {
    const [GridList, setGridList] = useState(true);
    const [Products, setProducts] = useState(Data);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

    // function to change the current page
    const paginate = (pageNumber) => { setCurrentPage(pageNumber) };

    // filter products based on category
    const [SelectedCategory, setSelectedCategory] = useState("All");
    const menuItem = [...new Set(Data.map((item) => item.category))];

    const filterItem = (currentCategory) => {
        const newItem = Data.filter((item) => item.category === currentCategory);

        setSelectedCategory(currentCategory);
        setProducts(newItem);
    }

    return (
        <div>
            <PageHeader title="Our Shop Page" curPage="Shop" />
            {/* shop page */}
            <div className="shop-page padding-tb">
                <div className="container">
                    <div className="row justify-content-center">
                        {/* left side */}
                        <div className="col-lg-8 col-12">
                            <article>
                                {/* layout and title here */}
                                <div className="shop-title d-flex flex-wrap justify-content-between">
                                    <p>Showing 1 – {currentProducts.length} of {Products.length} Results</p>
                                    <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                                        <a className="grid" onClick={() => setGridList(!GridList)}>
                                            <i className="icofont-ghost"></i>
                                        </a>
                                        <a className="list" onClick={() => setGridList(!GridList)}>
                                            <i className="icofont-listine-dots"></i>
                                        </a>
                                    </div>
                                </div>

                                {/* product cards */}
                                <div>
                                    <ProductCards GridList={GridList} Products={currentProducts} />
                                </div>

                                {/* pagination */}
                                <ShopPagination productsPerPage={productsPerPage} totalProducts={Products.length} paginate={paginate} activePage={currentPage} />
                            </article>
                        </div>
                        {/* right side */}
                        <div className="col-lg-4 col-12">
                            <aside>
                                <ShopSearch Products={Products} GridList={GridList} />
                                <ShopCategory filterItem={filterItem} setItem={setProducts} menuItem={menuItem} setProducts={setProducts} selectedCategory={SelectedCategory} />
                                <PopularPost />
                                <Tags />
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
