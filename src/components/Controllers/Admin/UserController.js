import React, { useState, useEffect } from "react"
import PageLoader from "../../Common/PageLoader"
import Index from "../../View/admin/User/Index"
import userApi from "../../Api/admin/user"
import UserForm from "../../View/admin/User/UserForm"
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import { confirmAlert } from "react-confirm-alert"

function UserController() {
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [update, setUpdate] = useState(false)
    const [userlist, setUserList] = useState([])
    const [expand, setExpand] = useState(false)
    var adminAuthToken = localStorage.getItem("adminAuthToken");
    const [state, setstate] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        status: 1,
        error: [],
    })
    const {
        name, error, email, id, status, password, phone
    } = state;

    useEffect(() => {
        (async () => {
            setLoading(true)
            const userList = await userApi.getUserList(adminAuthToken);
            if (userList.data.status == 1) {
                setUserList(userList.data.data)
            } else {
                setLoading(false)
            }
            setLoading(false)

        })()
    }, [update])

    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }
    const resetForm = () => {
        setstate({
            ...state,
            id: "",
            name: "",
            email: "",
            phone: "",
            password: "",
            status: 1,
            error: []
        })
        setLoading(false)
    }
    const onOpenModal = () => {
        resetForm()
        setModal(true)
    }

    const addUser = () => {

        const rules = {
            name: "required",
            email: 'required|email',
            password: 'required',
            phone: "required"

        }
        const message = {
            'email.required': 'Email is Requied.',
            'email.email': 'please enter valid email.',
            'password.required': 'Password is Requied.',
            'phone.required': 'Phone is Requied.',
            'name.required': 'name is Requied.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            let userObj = {}
            userObj.name = name
            userObj.email = email
            userObj.password = password
            userObj.phone = phone
            userObj.status = status

            // Api Call for add User
            setLoading(true)
            const addUser = await userApi.addUser(adminAuthToken, userObj);
            if (addUser) {
                if (addUser.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: addUser.data.message, msgType: 'error' });
                } else if (addUser.data.status == 1) {
                    resetForm()
                    setModal(false)
                    setUpdate(!update)
                    ToastAlert({ msg: addUser.data.message, msgType: 'success' });

                } else {
                    setLoading(false)
                    ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
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
    const deleteUser = (id) => {

        confirmAlert({
            title: 'Delete User',
            message: 'Are you sure to do this ?',
            buttons: [
                {
                    label: 'Yes',

                    onClick: async () => {
                        setLoading(true)
                        const deleteUser = await userApi.deleteUser(adminAuthToken, id)
                        if (deleteUser) {
                            if (deleteUser.data.status == 0) {
                                setLoading(false)
                                ToastAlert({ msg: deleteUser.data.message, msgType: 'error' });
                            } else {
                                setLoading(false)
                                setUpdate(!update)
                                ToastAlert({ msg: deleteUser.data.message, msgType: 'success' });
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
    const editUser = (data) => {
        setstate({
            ...state,
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: data.status,
            password: ""
        })
        setModal(true)
    }
    const updateUser = async () => {

        const rules = {
            name: "required",
            phone: "required"

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
            let userObj = {}
            userObj.name = name

            if (password && password !== "") {
                userObj.password = password
            }
            userObj.phone = phone
            userObj.status = status

            const updateUser = await userApi.updateUser(adminAuthToken, userObj, id)
            if (updateUser) {
                if (updateUser.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: updateUser.data.message, msgType: 'error' });
                } else {
                    setModal(false)
                    setUpdate(!update)
                    resetForm()
                    ToastAlert({ msg: updateUser.data.message, msgType: 'success' });
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
            <Index
                stateData={state}
                userlist={userlist}
                onOpenModal={onOpenModal}
                deleteUser={deleteUser}
                editUser={editUser}
                update={update}
                setUpdate={setUpdate}
                expand={expand}
                setExpand={setExpand}
            />
            <UserForm
                changevalue={changevalue}
                modal={modal}
                setModal={setModal}
                stateData={state}
                addUser={addUser}
                updateUser={updateUser}
            />
        </>
    )
}
export default UserController