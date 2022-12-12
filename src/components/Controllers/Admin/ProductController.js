import react, { useState, useEffect } from "react";
import ToastAlert from "../../Common/ToastAlert";
import PageLoader from "../../Common/PageLoader";
import Index from "../../View/admin/Product/Index";
import AddProductForm from "../../View/admin/Product/AddProductForm";
// import ViewVariant from "../../View/admin/Product/viewVariant";
import { validateAll } from "indicative/validator";

import productApi from "../../Api/admin/product";
import categoryApi from "../../Api/admin/category";
import { confirmAlert } from 'react-confirm-alert';


function ProductController() {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [variantModel, setVariantModel] = useState(false)
    const [product, setProduct] = useState([])
    const [variantsList, setVariantsList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [productAllVariant, setProductAllVariant] = useState([])
    const [update, setUpdate] = useState(false)
    const [updateModalTitle, setUpdateModalTitle] = useState(false)
    const [expand, setExpand] = useState(false)
    const [slugState, setSlugState] = useState({
        slug: ""
    })
    const [state, setstate] = useState({
        id: "",
        productName: "",
        productHdnID: "",
        description: "",
        productSlug: "",
        price: "",
        stock: "",
        productImage: "",
        category_id: "",
        status: 1,
        variants: [],
        error: [],
        errids: []
    })
    // const [variantValState, setVariantValState] = useState({
    //     checkedVariantVal: {},
    //     error: [],
    //     errids: []
    // })
    // const [checkedVarients, setCheckedVarients] = useState({
    //     variantValueIds: [],
    //     checkedVarientvalues: {},
    //     variantIds: []
    // })
    // const {
    //     variantValueIds, checkedVarientvalues, variantIds
    // } = checkedVarients;


    const {
        productName, productHdnID, price, stock, status, description, productImage, variants, productSlug, category_id
    } = state;
    // const {
    //     checkedVariantVal
    // } = variantValState;

    const changevalue = (e) => {
        let value = e.target.value;
        if (e.target.name == 'productName') {
            if (productHdnID == "") {
                var productNameVar = value.toLowerCase();
                productNameVar = productNameVar.replace(/\s+/g, '_');
                setstate({
                    ...state,
                    productSlug: productNameVar,
                    [e.target.name]: value
                })
            } else {
                setstate({
                    ...state,
                    [e.target.name]: value
                })
            }
            // var productNameVar = value.toLowerCase();
            // productNameVar = productNameVar.replace(/\s+/g, '_');
            // setstate({
            //     ...state,
            //     productSlug: productNameVar,
            //     [e.target.name]: value
            // })
        } else if (e.target.name == 'productSlug') {
            if (productHdnID == "") {
                var productNameVar = value.toLowerCase();
                productNameVar = productNameVar.replace(/\s+/g, '_');
                setstate({
                    ...state,
                    productSlug: productNameVar,
                    // [e.target.name]: value
                })
            } 
            // else {
            //     var productNameVar = value.toLowerCase();
            //     productNameVar = productNameVar.replace(/\s+/g, '_');
            //     setstate({
            //         ...state,
            //         productSlug: productNameVar,
            //         // [e.target.name]: value
            //     })
            // }

        } else {
            setstate({
                ...state,
                [e.target.name]: value
            })
        }
    }


    // const changeVariantVal = (e) => {
    //     let value = e.target.value;
    //     let checked = e.target.checked;
    //     var checkedVariantObj = {};
    //     const chekedValues = [];
    //     const variantValIds = value.substring(value.indexOf('_') + 1);
    //     const variantId = value.split('_')[0];
    //     if (checked == true) {
    //         let varObj = {
    //             varientId: "",
    //             varientValues: []
    //         }
    //         let varObjDone = {
    //             varVarientId: "",
    //             varientValues: []
    //         }
    //         if (!variantIds.includes(variantId)) {
    //             console.log('new')
    //             variantIds.length = 0
    //             variantValueIds.length = 0
    //             variantIds.push(variantId)
    //             variantValueIds.push(variantValIds)
    //             varObj.varientId = variantId
    //             varObj.varientValues = variantValueIds
    //             setCheckedVarients({
    //                 ...checkedVarients,
    //                 checkedVarientvalues: varObj
    //             })
    //         } else {
    //             console.log('old')
    //             variantIds.push(variantId)
    //             variantValueIds.push(variantValIds)
    //             varObj.varientId = variantId
    //             varObj.varientValues = variantValueIds
    //             setCheckedVarients({
    //                 ...checkedVarients,
    //                 checkedVarientvalues: varObj
    //             })
    //         }
    //     } else {

    //     }

    // }

    const changefile = (e) => {
        let file = e.target.files[0] ? e.target.files[0] : '';
        setstate({
            ...state,
            productImage: file
        })
    }

    var adminAuthToken = localStorage.getItem("adminAuthToken");
    useEffect(() => {
        (async () => {
            setLoading(true)
            const productList = await productApi.getProductList();
            if (productList.data.status == 1) {
                setProduct(productList.data.data)
            }
            const variantList = await productApi.getVariantListForProdctForm(adminAuthToken);
            if (variantList.data.status == 1) {
                setVariantsList(variantList.data.data)
            }
            const categoryList = await categoryApi.categoryList();
            if (categoryList.data.status == 1) {
                setCategoryList(categoryList.data.data)
            }
            setLoading(false)

        })()
    }, [update])

    const openModel = () => {
        setModal(true);
        setUpdateModalTitle(false);
        setstate({
            id: "",
            productHdnID: "",
            productName: "",
            productSlug: "",
            description: "",
            image: "",
            price: "",
            stock: "",
            productImage: "",
            category_id: "",
            status: 1,
            error: [],
            passdefaulterror: [],
        });
    }

    const openVariantModel = () => {
        setVariantModel(true);
        (async () => {
            setLoading(true)
            const productAllVariant = await productApi.getProductVariant(adminAuthToken);

            if (productAllVariant.data.status == 1) {
                setProductAllVariant(productAllVariant.data.data)
            }
            setLoading(false)

        })()
    }

    const handleChange = (e) => {
        // let target = e.target
        // let name = target.name
        // let value = Array.from(target.selectedOptions, option => option.value);
        let value = Array.isArray(e) ? e.map(x => x.value) : [];
        setstate({
            ...state,
            variants: value
        });

    }

    const deleteProductFun = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete this product.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: (async () => {
                        setLoading(true)
                        if (id != '') {
                            const deleteProductApi = await productApi.deleteProduct(adminAuthToken, id)
                            if (deleteProductApi) {
                                if (deleteProductApi.data.status == 0) {
                                    setLoading(false)
                                    ToastAlert({ msg: deleteProductApi.data.message, msgType: 'error' });
                                } else {
                                    if (deleteProductApi.data.status == 1) {
                                        setLoading(false)
                                        setUpdate(!update)
                                        ToastAlert({ msg: deleteProductApi.data.message, msgType: 'success' });
                                    }
                                }
                            } else {
                                setLoading(false)
                                ToastAlert({ msg: 'Category not delete', msgType: 'error' });
                            }
                        } else {
                            setLoading(false)
                            ToastAlert({ msg: 'Category not delete id Not found', msgType: 'error' });
                        }
                    })
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    const resetForm = (e) => {
        setModal(false);
        setstate({
            id: "",
            productSlug: "",
            productHdnID: "",
            productName: "",
            description: "",
            image: "",
            price: "",
            stock: 1,
            // variant_id: "",
            productImage: "",
            category_id: "",
            status: "",
            error: [],
            passdefaulterror: [],
        });
    }

    const submitProductForm = (e) => {
        var rules = '';
        var message = '';
        if (productHdnID) {
            rules = {
                productName: "required",
                description: "required",
                // productImage: "required",
                // variants: "required",
                price: "required|number",
                stock: "required|number",
                // productSlug: "required",
                status: 'required',
                category_id: 'required',
            }
            message = {
                'productName.required': 'Product name is Required.',
                'description.required': 'Description is Required.',
                'price.required': 'Product price is Required.',
                'price.number': 'Product price must be number not string.',
                'stock.number': 'Product stock must be number not string.',
                // 'productImage.required': 'Product Image is Required.',
                'stock.required': 'Product stock is Required.',
                // 'variants.required': 'variant is Required.',
                // 'productSlug.required': 'Product Slug is Required.',
                'status.required': 'Product status is Required.',
                'category_id.required': 'Category is Required.',
            }
        } else {
            rules = {
                productName: "required",
                description: "required",
                productImage: "required",
                // variants: "required",
                price: "required|number",
                stock: "required|number",
                productSlug: "required",
                status: 'required',
                category_id: 'required',
            }
            message = {
                'productName.required': 'Product name is Requied.',
                'description.required': 'Description is Requied.',
                'price.required': 'Product price is Requied.',
                'price.number': 'Product price must be number not string.',
                'stock.number': 'Product stock must be number not string.',
                'productImage.required': 'Product Image is Requied.',
                'stock.required': 'Product stock is Requied.',
                // 'variants.required': 'variant is Requied.',
                'productSlug.required': 'Product Slug is Requied.',
                'status.required': 'Product status is Requied.',
                'category_id.required': 'Category is Requied.',

            }
        }

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            // Api Call for update Profile
            setLoading(true)
            if (productHdnID != '') {
                var saveProduct = await productApi.updateProduct(adminAuthToken, productHdnID, productName, description, price, stock, productImage, status, variants, productSlug, category_id)
            } else {
                var saveProduct = await productApi.addProduct(adminAuthToken, productName, description, price, stock, productImage, status, variants, productSlug, category_id)
            }
            if (saveProduct) {
                if (saveProduct.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: saveProduct.data.message, msgType: 'error' });
                } else {
                    if (saveProduct.data.status == 1) {
                        resetForm()
                        setLoading(false)
                        setUpdate(!update)
                        ToastAlert({ msg: saveProduct.data.message, msgType: 'success' });
                    }
                }
            } else {
                setLoading(false)
                ToastAlert({ msg: 'Product not save', msgType: 'error' });
            }
        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            }
            setstate({
                ...state,
                error: formaerrror
            })
        });
    }

    const editProduct = async (productData) => {
        setLoading(true)
        if ((productData) && productData != null && productData != '') {
            setUpdateModalTitle(true);
            setModal(true);
            var productDataVariants = productData.variant_id;
            var variantArray = [];
            if (productDataVariants != '' && productDataVariants != null) {
                variantArray = productDataVariants.split(",").map(Number);;
            }

            setstate({
                ...state,
                productHdnID: productData.id,
                productSlug: productData.slug,
                productName: productData.product_name,
                description: productData.description,
                productImage: productData.image,
                price: productData.price,
                stock: productData.stock,
                status: productData.status,
                category_id: productData.category_id,
                variants: variantArray,
            });
            setLoading(false)
        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong category data not found please try again', msgType: 'error' });
        }
    }


    return (
        <>
            {/* {console.log(state)} */}
            <PageLoader loading={loading} />
            <Index product={product}
                deleteProductFun={deleteProductFun}
                setUpdate={setUpdate}
                update={update}
                openModel={openModel}
                editProduct={editProduct}
                expand={expand}
                setExpand={setExpand}
                openVariantModel={openVariantModel}
            />
            <AddProductForm
                modal={modal}
                updateModalTitle={updateModalTitle}
                stateData={state}
                changevalue={changevalue}
                setModal={setModal}
                submitProductForm={submitProductForm}
                changefile={changefile}
                productHdnID={productHdnID}
                variantsList={variantsList}
                categoryList={categoryList}
                handleChange={handleChange}
            />
            {/* <ViewVariant
                setVariantModel={setVariantModel}
                variantModel={variantModel}
                productAllVariant={productAllVariant}
                changeVariantVal={changeVariantVal}
            /> */}

        </>
    )
}
export default ProductController