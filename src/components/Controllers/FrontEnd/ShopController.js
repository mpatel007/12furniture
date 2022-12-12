import Shop from "../../View/front_end/Shop";
import React, { useState, useEffect, useContext } from "react";
import ForntLoder from "../../Common/ForntLoder";
import productApi from "../../Api/frontend/products";
import ToastAlert from "../../Common/ToastAlert";
import { uniqueDeviceId } from "../../Common/Helper";
import { UserContext } from "../../../App";
import cartApi from "../../Api/frontend/cart";
import { useParams } from "react-router-dom";


function ShopController() {
    const params = useParams();
    let categoryID = params.id;
    const [maxAndMinPrice, setMaxAndMinPrice] = useState({
        minPrice: 10,
        maxPrice: 1000
    });
    const { minPrice, maxPrice } = maxAndMinPrice;
    const [value1, setValue1] = useState([minPrice, maxPrice]);
    const [min, setmin] = useState(minPrice);
    const [max, setmax] = useState(maxPrice);
    const [loading, setLoading] = useState(false);
    const [productsList, setProductsList] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [slectedCat, setSelectedCat] = useState();
    const [update, setUpdate] = useState(false);
    const [uniqueID, setuniqueID] = useState(uniqueDeviceId());
    const user = useContext(UserContext)
    const [state, setstate] = useState({
        currentPage: 1,
        productsPerPage: 3
    })   
    const [pageNumbers, setpageNumbers] = useState([]);  

    const { currentPage, productsPerPage } = state;

    const minDistance = 10;


    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (activeThumb === 0) {
            setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
            setmin(Math.min(newValue[0], value1[1] - minDistance))
            setmax(value1[1])
            filterProducts(slectedCat, Math.min(newValue[0], value1[1] - minDistance), value1[1], currentPage)
        } else {
            setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
            setmin(value1[0])
            setmax(Math.max(newValue[1], value1[0] + minDistance))
            filterProducts(slectedCat, value1[0], Math.max(newValue[1], value1[0] + minDistance), currentPage)
        }
        // console.log('min is ' + min + ' max is ' + max)
    };
    const setMaxAndMinPriceFun = async (minSave, maxSave) => {
        let m = minSave;
        let mx = maxSave
        // if (m > 10) {
            setMaxAndMinPrice({
                ...maxAndMinPrice,
                minPrice: m,
                maxPrice: mx,
            })
            setValue1([m,mx])
        // }


        // console.log(maxAndMinPrice);
    }
    useEffect(() => {

        (async () => {
            // setLoading(true);
            if (categoryID != '' && categoryID != null) {
                // filterProducts(slectedCat, Math.min(newValue[0], value1[1] - minDistance), value1[1],currentPage)
                filterProducts(categoryID, min, max, 1)
            } else {
                const productList = await productApi.getProductList();
                if (productList.data.productMaxAndMinPrice[0]) {
        
                    
                }
                if (productList.data.status == 1) {
                    let d_min = parseInt(productList.data.productMaxAndMinPrice[0].productMinPrice)
                    let d_max = parseInt(productList.data.productMaxAndMinPrice[0].productMaxPrice)
                    const indexOfLastTodo = currentPage * productsPerPage;
                    const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
                    const currentTodos = productList.data.data.slice(indexOfFirstTodo, indexOfLastTodo);
                    pageNumbers.length = 0
                    for (let i = 1; i <= Math.ceil(productList.data.data.length / productsPerPage); i++) {
                        pageNumbers.push(i);
                    }
                    await setMaxAndMinPriceFun(d_min, d_max);
                    setProductsList(currentTodos);
                }
                setLoading(false);
            }
            const categoryList = await productApi.viewCategoryList();
            if (categoryList.data.status == 1) {
                setAllCategory(categoryList.data.data);
            }
        })();

    }, [update, categoryID]);

    const filterProducts = async (catid = null, minVal, maxVal, pg) => {
        // await resetPage()
        setstate({
            ...state,
            currentPage: pg,
        })
        setSelectedCat(catid)
        let filterobj = {}
        if (catid && catid !== null && catid !== '') {
            filterobj.category = catid;
        }
        filterobj.price = {
            min: minVal,
            max: maxVal
        };
        // setLoading(true);
        const filteredProducts = await productApi.filterProducts(filterobj);
        if (filteredProducts) {
            if (filteredProducts.data.status == 1) {
                pageNumbers.length = 0
                const indexOfLastTodo = pg * productsPerPage;
                const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
                const currentTodos = filteredProducts.data.data.slice(indexOfFirstTodo, indexOfLastTodo);

                for (let i = 1; i <= Math.ceil(filteredProducts.data.data.length / productsPerPage); i++) {
                    pageNumbers.push(i);
                }
                // console.log(filteredProducts.data.data)
                setProductsList(currentTodos);
            }
        } else {
            // setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
        // setLoading(false);

    }

    const CartItemCount = async () => {
        const cartItemList = await cartApi.listCartItems(uniqueID);
        if (cartItemList.data.status == 1) {
            user.setCartCount(cartItemList.data.data.length)
        }

    }

    const addToCart = async (data) => {
        let productObj = {};
        productObj.session_id = uniqueID;
        productObj.product_id = data.id;
        productObj.qty = 1;
        productObj.product = JSON.stringify(data);
        setLoading(true);
        const addProductToCart = await cartApi.addToCart(productObj);
        if (addProductToCart) {
            if (addProductToCart.data.status == 0) {
                setLoading(false);
                ToastAlert({ msg: "Product Not added to cart", msgType: 'error' });
            } else {
                setLoading(false);
                ToastAlert({ msg: "Product added to cart Successfully", msgType: 'success' });
                CartItemCount()
            }
        } else {
            setLoading(false);
            ToastAlert({ msg: "Something Went Wrong", msgType: 'error' });
        }

    }
    const clearFilter = () => {
        setstate({
            ...state,
            currentPage: 1,
            productsPerPage: 3
        })

        setLoading(true);
        setSelectedCat(null)
        setUpdate(!update)
        setValue1([minPrice, maxPrice])
        setmin(minPrice)
        setmax(maxPrice)
        setLoading(false)


    }
    const handleClick = (e, v) => {
        // console.log(v)
        // return false
        setstate({
            ...state,
            currentPage: Number(v)
        })
        if (!slectedCat) {
            setUpdate(!update)
        } else {
            filterProducts(slectedCat, min, max, v)
        }
        // 
    }

    return (
        <>
            <ForntLoder loading={loading} />
            <Shop
                maxAndMinPrice={maxAndMinPrice}
                handleChange1={handleChange1}
                value1={value1}
                productsList={productsList}
                allCategory={allCategory}
                filterProducts={filterProducts}
                slectedCat={slectedCat}
                clearFilter={clearFilter}
                handleClick={handleClick}
                pageNumbers={pageNumbers}
                addToCart={addToCart}
                currentPage={currentPage}
                min={min}
                max={max}
                setstate={setstate}
                state={state}


            />
        </>
    )
}
export default ShopController;