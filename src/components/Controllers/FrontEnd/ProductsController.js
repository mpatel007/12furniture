import react, { useState, useEffect, useContext } from "react";
import productApi from "../../Api/frontend/products";
import Products from "../../View/front_end/products/Products";
import ForntLoder from "../../Common/ForntLoder";
import cartApi from "../../Api/frontend/cart";
import { uniqueDeviceId } from "../../Common/Helper";
import ToastAlert from "../../Common/ToastAlert";
import { UserContext } from "../../../App";

function ProductController() {
    const [product, setProduct] = useState([]);
    const [uniqueID, setuniqueID] = useState(uniqueDeviceId());
    const [loading, setLoading] = useState(false);
    const user = useContext(UserContext)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const productList = await productApi.getProductList();
            if (productList.data.status == 1) {
                setProduct(productList.data.data);
            }
            await CartItemCount()
            setLoading(false);
        })();
    }, []);
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

    return (
        <>
            <ForntLoder loading={loading} />
            <Products
                product={product}
                addToCart={addToCart}
            />
        </>
    );
}

export default ProductController;
