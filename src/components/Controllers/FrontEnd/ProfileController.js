import Profile from "../../View/front_end/Profile";
import React, { useEffect, useState } from "react";
import registerApi from "../../Api/frontend/user";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import ForntLoder from "../../Common/ForntLoder";


function ProfileController() {
    var UserAuthToken = localStorage.getItem("UserAuthToken");
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [cancleUpdate, setCancleUpdate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [state, setstate] = useState({
        id: "",
        name: "",
        email: "",
        phone: "",
        error: [],
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        cpass: ""
    })
    const [pagnation, setPagnation] = useState({
        currentPage: 1,
        productsPerPage: 1
    })
    const [pageNumbers, setpageNumbers] = useState([]);

    const { currentPage, productsPerPage } = pagnation;
    const {
        email, error, name, oldPassword,confirmPassword, newPassword, phone, id
    } = state;
    const [orderDetails, setOrderDetails] = useState([])




    useEffect(() => {
        (async () => {
            setLoading(true)
            const userData = JSON.parse(localStorage.getItem("UserData"));
            setstate({
                ...state,
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,

            })
            const getUserOrderList = await registerApi.userOrderList(UserAuthToken, userData.id)

            if (getUserOrderList.data.status == 1) {
                const indexOfLastTodo = currentPage * productsPerPage;
                const indexOfFirstTodo = indexOfLastTodo - productsPerPage;
                const currentTodos = getUserOrderList.data.data.slice(indexOfFirstTodo, indexOfLastTodo);
                pageNumbers.length = 0
                for (let i = 1; i <= Math.ceil(getUserOrderList.data.data.length / productsPerPage); i++) {
                    pageNumbers.push(i);
                }
                setOrderDetails(currentTodos);
                // setOrderDetails(getUserOrderList.data.data);
            }
            setLoading(false)


        })();
    }, [cancleUpdate])

    const handleClick = (e, v) => {
        setPagnation({
            ...pagnation,
            currentPage: Number(v)
        })
        setCancleUpdate(!cancleUpdate)

        // 
    }

    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }
    const updateUser = () => {
        const rules = {
            name: "required",
            phone: "required",
        }
        const message = {
            'phone.required': 'Phone is Requied.',
            'name.required': 'name is Requied.',
        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            let userData = {}
            userData.name = name
            userData.email = email
            userData.phone = phone
            userData.status = 1
            setLoading(true)
            const updateUser = await registerApi.updateUser(UserAuthToken, userData, id)
            if (updateUser) {
                if (updateUser.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: updateUser.data.message, msgType: 'error' });
                } else {
                    localStorage.setItem('UserData', JSON.stringify(updateUser.data))
                    setUpdate(!update)
                    ToastAlert({ msg: updateUser.data.message, msgType: 'success' });
                    setEdit(false)
                    setLoading(false)
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

    const updateUserPassword = () => {
        const rules = {
            oldPassword: "required",
            oldPassword: "min:6",
            newPassword: "required",
            newPassword: "min:6",
            confirmPassword: "required",
            confirmPassword: "min:6",
        }
        const message = {
            'oldPassword.required': 'Old password is Requied.',
            'oldPassword.min': 'Old password must be at least 6 characters.',
            'newPassword.required': 'New password is Requied.',
            'newPassword.min': 'New password must be at least 6 characters.',
            'confirmPassword.required': 'Confirm password is Requied.',
            'confirmPassword.min': 'Confirm password must be at least 6 characters',   
        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            setLoading(true)
            const updateUserPass = await registerApi.updateUserPassword(UserAuthToken,oldPassword,newPassword,confirmPassword,id)
            if (updateUserPass) {
                if (updateUserPass.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: updateUserPass.data.message, msgType: 'error' });
                } else {
                    setUpdate(!update)
                    ToastAlert({ msg: updateUserPass.data.message, msgType: 'success' });
                    setEdit(false)
                    setLoading(false)
                    setstate({
                        ...state,
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",

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
    
    const cancle = () => {
        setCancleUpdate(!cancleUpdate)
        setEdit(false)

    }
    return (
        <>
            <ForntLoder loading={loading} />
            <Profile
                stateData={state}
                changevalue={changevalue}
                edit={edit}
                setEdit={setEdit}
                updateUser={updateUser}
                updateUserPassword={updateUserPassword}
                cancleUpdate={cancle}
                orderDetails={orderDetails}
                handleClick={handleClick}
                currentPage={currentPage}
                pageNumbers={pageNumbers}

            />
        </>
    )
}
export default ProfileController