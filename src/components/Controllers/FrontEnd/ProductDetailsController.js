import react, { useState, useEffect, useContext } from "react";
import ProductDetails from "../../View/front_end/products/ProductDetails";
import { useParams } from "react-router-dom";
import ForntLoder from "../../Common/ForntLoder";
import productApi from "../../Api/frontend/products";
import { uniqueDeviceId } from "../../Common/Helper";
import cartApi from "../../Api/frontend/cart";
import ToastAlert from "../../Common/ToastAlert";
import { UserContext } from "../../../App";

function ProductDetailsController() {
    const [productDetails, setProductDetails] = useState([]);
    const [uniqueID, setuniqueID] = useState(uniqueDeviceId());
    const [loading, setLoading] = useState(false);
    const user = useContext(UserContext)
    const params = useParams();
    const [checkedV, setCheckedValue] = useState([]);



    let product_slug = params.product_slug;

    useEffect(() => {

        (async () => {

            setLoading(true);
            const productData = await productApi.getProductDetails(product_slug);
            if (productData.data.status == 1) {
                setProductDetails(productData.data.data);
                if (productData.data.data[0]) {
                    checkedV.length = 0
                    Object.keys(productData.data.data[0].variantValList).map((v_name, i) => {
                      
                        const temp = {}
                        temp['varientName'] = v_name
                        temp['vVid'] = productData.data.data[0].variantValList[v_name][0].vvId
                        temp['varientValue'] = productData.data.data[0].variantValList[v_name][0].vvValue
                        checkedV.push(temp)
                    })





                }
            }
            window.scrollTo(0, 0)
            await CartItemCount()
            setLoading(false);

        })();

    }, [product_slug]);

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
        productObj.variantData = JSON.stringify(checkedV);

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
    const onVariantChange = (v_name, v_id,v_val) => {
        const list = [...checkedV];
        list.find(x =>x.varientName == v_name).vVid = v_id
        list.find(x =>x.varientName == v_name).varientValue = v_val
        setCheckedValue(list)
        // console.log( list.find(x =>x.varientName == v_name).id);
        // list[index].qty = e.target.value;

    }

    return (
        <>
            {/* {console.log(checkedV)} */}
            <ForntLoder loading={loading} />
            <ProductDetails
                productDetails={productDetails}
                addToCart={addToCart}
                checkedV={checkedV}
                onVariantChange={onVariantChange}
            />
        </>
    );
}

export default ProductDetailsController;
