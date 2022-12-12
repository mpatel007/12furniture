import react, { useState, useEffect } from "react";
import Index from "../../View/admin/Variant/Index";
import VariantForm from "../../View/admin/Variant/VariantForm";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import PageLoader from "../../Common/PageLoader";
import variantApi from "../../Api/admin/variant";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

function VariantManagementController() {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [variant, setvariant] = useState([])
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate();
    const [expand, setExpand] = useState(false)
    const [inputList, setInputList] = useState([{ variantvalue: "" }])
    var adminAuthToken = localStorage.getItem("adminAuthToken");
    const [state, setstate] = useState({
        id: "",
        variantname: "",
        status: 1,
        error: [],
        errids: []
    })

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };
    const {
        variantname, error, errids, id, status
    } = state;

    const handleRemoveClick = (index) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };


    const handleAddClick = () => {
        setInputList([...inputList, { variantvalue: "" }]);
    };
    useEffect(() => {
        (async () => {
            setLoading(true)
            const variantList = await variantApi.variantList(adminAuthToken);
            if (variantList.data.status == 1) {
                setvariant(variantList.data.data)
            }
            setLoading(false)

        })()
    }, [update])


    const addVariant = () => {

        errids.length = 0
        inputList.map((val, ind) => {
            if (val.variantvalue == "") {
                errids.push(ind)
            }

        });
        const rules = {
            variantname: 'required',
        }
        const message = {
            'variantname.required': 'Variant name is Requied.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            let finalObj = {}
            finalObj.name = variantname
            finalObj.value = inputList
            finalObj.status = status


            if (!errids.length) {
                // Api Call for variant
                setLoading(true)
                const addVariant = await variantApi.addVariant(adminAuthToken, finalObj)
                if (addVariant) {
                    if (addVariant.data.status == 0) {
                        setLoading(false)
                        ToastAlert({ msg: addVariant.data.message, msgType: 'error' });
                    } else {
                        setLoading(false)
                        setUpdate(!update)
                        ToastAlert({ msg: addVariant.data.message, msgType: 'success' });
                        setModal(false)
                        setstate({
                            ...state,
                            variantname: '',
                            status: 1
                        })
                        setInputList([{ variantvalue: "" }])
                        errids.length = 0

                    }

                } else {
                    setLoading(false)
                    ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
                }
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
    const onOpenModal = () => {
        setstate({
            ...state,
            id: "",
            variantname: "",
            status: 1,
            error: []
        })
        errids.length = 0
        setInputList([{ variantvalue: "" }])
        setModal(true)


    }

    const deleteVariant = (id) => {
        confirmAlert({
            title: 'Delete Variant',
            message: 'Are you sure to do this ?',
            buttons: [
                {
                    label: 'Yes',

                    onClick: async () => {
                        setLoading(true)
                        const deleteVariant = await variantApi.deleteVariant(adminAuthToken, id)
                        if (deleteVariant) {
                            if (deleteVariant.data.status == 0) {
                                setLoading(false)
                                ToastAlert({ msg: deleteVariant.data.message, msgType: 'error' });
                            } else {
                                setLoading(false)
                                setUpdate(!update)
                                ToastAlert({ msg: deleteVariant.data.message, msgType: 'success' });
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
    const editVariant = (data) => {
        setModal(true)
        setstate({
            ...state,
            id: data.id,
            status: data.status,
            variantname: data.name
        })
    }
    const updateVariant = async () => {
        const rules = {
            variantname: 'required',
        }
        const message = {
            'variantname.required': 'Variant name is Requied.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            const updateVariant = await variantApi.updateVariant(adminAuthToken, id, variantname, status)
            if (updateVariant) {
                if (updateVariant.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: updateVariant.data.message, msgType: 'error' });
                } else {
                    setLoading(false)
                    setUpdate(!update)
                    setModal(false)
                    setstate({
                        ...state,
                        variantname: '',
                        status: 1
                    })
                    setInputList([{ variantvalue: "" }])
                    ToastAlert({ msg: updateVariant.data.message, msgType: 'success' });
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

    const variantdetails = (id) => {
        navigate('/admin/variant/' + id)
    }

    return (
        <>
            <PageLoader loading={loading} />
            <VariantForm
                modal={modal}
                setModal={setModal}
                addVariant={addVariant}
                inputList={inputList}
                handleAddClick={handleAddClick}
                handleRemoveClick={handleRemoveClick}
                handleInputChange={handleInputChange}
                stateData={state}
                changevalue={changevalue}
                updateVariant={updateVariant}
            />
            <Index
                setModal={setModal}
                variant={variant}
                deleteVariant={deleteVariant}
                editVariant={editVariant}
                onOpenModal={onOpenModal}
                variantdetails={variantdetails}
                expand={expand}
                setExpand={setExpand}

            />
        </>
    )
}
export default VariantManagementController