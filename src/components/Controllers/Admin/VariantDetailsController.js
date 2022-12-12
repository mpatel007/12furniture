import React, { useState, useEffect } from "react";
import VariantDetails from "../../View/admin/Variant/VariantDetails";
import VariantDetailsForm from "../../View/admin/Variant/VariantDetailsForm";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import PageLoader from "../../Common/PageLoader";
import variantApi from "../../Api/admin/variant";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

function VariantDetailsController() {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [variantValue, setvariantValue] = useState([])
    const [variantName, setVariantName] = useState("")
    const [expand, setExpand] = useState(false)
    var adminAuthToken = localStorage.getItem("adminAuthToken");
    const params = useParams();
    let variantId = params.variantid;
    const [state, setstate] = useState({
        id: "",
        variantvalue: "",
        // status: 1,
        error: [],
    })
    const {
        variantvalue, error, id, //status
    } = state;

    useEffect(() => {
        (async () => {
            setLoading(true)
            const variantValueList = await variantApi.variantValueList(adminAuthToken, variantId);
            if (variantValueList.data.status == 1) {
                setVariantName(variantValueList.data.variantData.length ? variantValueList.data.variantData[0].name : "")
                setvariantValue(variantValueList.data.data)
            }
            setLoading(false)

        })()
    }, [update])

    const onOpenModal = () => {
        setstate({
            ...state,
            id: "",
            variantvalue: "",
            // status: 1,
            error: []
        })
        setModal(true)
    }
    const addVariantValue = (e) => {
        const rules = {
            variantvalue: 'required',

        }
        const message = {
            'variantvalue.required': 'Variant Value is Requied.',
        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            // Api Call 
            setLoading(true)
            const addVariantValue = await variantApi.addVariantValue(adminAuthToken, variantId, variantvalue);
            if (addVariantValue) {
                if (addVariantValue.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: addVariantValue.data.message, msgType: 'error' });
                } else {
                    setLoading(false)
                    setUpdate(!update)
                    ToastAlert({ msg: addVariantValue.data.message, msgType: 'success' });
                    setModal(false)
                    setstate({
                        ...state,
                        variantvalue: '',
                        // status: 1
                    })
                }

            } else {
                setLoading(false)
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }


        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            setstate({
                ...state,
                error: formaerrror
            })

        });
    }
    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }

    const deleteVariantValue = (id) => {
        confirmAlert({
            title: 'Delete Variant value',
            message: 'Are you sure to do this ?',
            buttons: [
                {
                    label: 'Yes',

                    onClick: async () => {
                        setLoading(true)
                        const deleteVariantValue = await variantApi.deleteVariantValue(adminAuthToken, id)
                        if (deleteVariantValue) {
                            if (deleteVariantValue.data.status == 0) {
                                setLoading(false)
                                ToastAlert({ msg: deleteVariantValue.data.message, msgType: 'error' });
                            } else {
                                setLoading(false)
                                setUpdate(!update)
                                ToastAlert({ msg: deleteVariantValue.data.message, msgType: 'success' });
                            }

                        } else {
                            setLoading(false)
                            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
                        }

                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    }
    const editVariantValue = (data) => {
        setstate({
            ...state,
            id: data.id,
            variantvalue: data.value
        })
        setModal(true)
    }

    const updateVariantValue = async () => {

        const rules = {
            variantvalue: 'required',

        }
        const message = {
            'variantvalue.required': 'Variant Value is Requied.',
        }

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            const updateVariantValue = await variantApi.updateVariantValue(adminAuthToken, id, variantvalue)
            if (updateVariantValue) {
                if (updateVariantValue.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: updateVariantValue.data.message, msgType: 'error' });
                } else {
                    setLoading(false)
                    setUpdate(!update)
                    setModal(false)
                    setstate({
                        ...state,
                        variantvalue: '',
                    })
                    ToastAlert({ msg: updateVariantValue.data.message, msgType: 'success' });
                }

            } else {
                setLoading(false)
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            setstate({
                ...state,
                error: formaerrror
            })

        });

    }

    return (
        <>
            <PageLoader loading={loading} />
            <VariantDetails
                onOpenModal={onOpenModal}
                variantValue={variantValue}
                variantName={variantName}
                editVariantValue={editVariantValue}
                deleteVariantValue={deleteVariantValue}
                expand={expand}
                setExpand={setExpand}

            />
            <VariantDetailsForm
                setModal={setModal}
                modal={modal}
                stateData={state}
                addVariantValue={addVariantValue}
                changevalue={changevalue}
                updateVariantValue={updateVariantValue}
            />
        </>
    )
}
export default VariantDetailsController