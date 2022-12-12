import React, { useState, useEffect } from 'react';
import Category from '../../View/admin/Category/Category';
import PageLoader from "../../Common/PageLoader";
import CategoryForm from '../../View/admin/Category/CategoryForm';
import categoryApi from '../../Api/admin/category';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from "react-router-dom";

function CategoryController() {

    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [category, setcategory] = useState([]);
    const [update, setUpdate] = useState(false);
    const [expand, setExpand] = useState(false)
    var adminAuthToken = localStorage.getItem("adminAuthToken");
    const navigate = useNavigate();
    const [state, setstate] = useState({
        id: "",
        categoryname: "",
        status: "",
        error: [],
    })
    
    const {
        categoryname, error, status, id,
    } = state;

    useEffect(() => {
        (async () => {
            setLoading(true);
            // Api Call for category list
            const categoryList = await categoryApi.categoryList(adminAuthToken);
            if (categoryList.data.status == 1) {
                setcategory(categoryList.data.data);
            }
            setLoading(false);
        })()
    }, [update]);

    const addCategory = () => {

        const rules = {
            categoryname: "required",
        };

        const message = {
            "categoryname.required": "Category Name is Requied.",
        };

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            
            setstate({
                ...state,
                error: formaerrror,
            });

            let finalcategory = categoryname;
            let finalstatus = status;

            setLoading(true);
            // Api Call for add category
            const addCategory = await categoryApi.addCategory(adminAuthToken, finalcategory, finalstatus);

            if (addCategory) {
                if (addCategory.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: addCategory.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: addCategory.data.message, msgType: 'success' });
                    setModal(false);
                    setstate({
                        ...state,
                        categoryname: "",
                        status: "",
                    });
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };

        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setstate({
                ...state,
                error: formaerrror,
            });
        });
    };

    const deleteCategory = (id) => {
        
        confirmAlert({
            title: 'Delete Category',
            message: 'Are you sure to do this ?',
            buttons: [
                {
                    label: "Yes",

                    onClick: async () => {
                        setLoading(true);
                        // Api Call for category delete
                        const deleteCategory = await categoryApi.deleteCategory(adminAuthToken, id);

                        if (deleteCategory) {
                            if (deleteCategory.data.status == 0) {
                                setLoading(false);
                                ToastAlert({ msg: deleteCategory.data.message, msgType: 'error' });
                            } else {
                                setLoading(false);
                                setUpdate(!update);
                                ToastAlert({ msg: deleteCategory.data.message, msgType: 'success' });
                            };
                        } else {
                            setLoading(false);
                            ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
                        };
                    },
                },
                {
                    label: "No",
                },
            ],
        });
    }

    const changevalue = (e) => {
        let value = e.target.value;

        setstate({
            ...state,
            [e.target.name]: value,
        });
    };

    const onOpenModal = () => {
        setstate({
            ...state,
            id: "",
            categoryname: "",
            status: 1,
            error: [],
        });
        setModal(true);
    };

    const editCategory = (data) => {
        setModal(true);
        setstate({
            ...state,
            id: data.id,
            categoryname: data.name,
            status: data.status,
        });
    };

    const updateCategory = async () => {

        const rules = {
            categoryname: "required",
        };

        const message = {
            "categoryname.required": "Category Name is Requied.",
        };

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            
            setstate({
                ...state,
                error: formaerrror,
            });
        
            // Api Call for category update
            const updateCategory = await categoryApi.updateCategory(adminAuthToken, id, categoryname, status);

            if (updateCategory) {
                if (updateCategory.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: updateCategory.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    setUpdate(!update);
                    setModal(false);
                    setstate({
                        ...state,
                        categoryname: "",
                        status: "",
                    });
                    ToastAlert({ msg: updateCategory.data.message, msgType: 'success' });
                };
            } else {
                setLoading(false);
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            };
        }).catch(errors => {

            setLoading(false);
            const formaerrror = {};

            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message;
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            };

            setstate({
                ...state,
                error: formaerrror,
            });
        });
    };

    const viewSubCategory = (id) => {
        navigate('/admin/catagory/subcategory/' + id)
    }

    return (
        <>
            <PageLoader loading={loading} />
            <CategoryForm 
            modal={modal}
            setModal={setModal}
            addCategory={addCategory}
            stateData={state}
            changevalue={changevalue}
            updateCategory={updateCategory}
            />
            <Category 
            setModal={setModal}
            category={category}
            deleteCategory={deleteCategory}
            editCategory={editCategory}
            onOpenModal={onOpenModal}
            viewSubCategory={viewSubCategory}
            expand={expand}
            setExpand={setExpand}
            />
        </>
    );
}

export default CategoryController;