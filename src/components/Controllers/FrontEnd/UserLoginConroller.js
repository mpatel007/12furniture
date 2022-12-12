import Login from "../../View/front_end/Login"
import React, { useState, useContext } from "react"
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import adminApi from "../../Api/admin/admin";
import { UserContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import ForntLoder from "../../Common/ForntLoder";

function UserLoginConroller() {
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [msgtype, setMsgType] = useState('');


    const [loading, setLoading] = useState(false)
    const user = useContext(UserContext)
    const navigate = useNavigate();
    const [state, setstate] = useState({
        email: "",
        password: "",
        error: []
    })
    const {
        email, password, error
    } = state;


    const login = (e) => {
        const rules = {
            email: 'required|email',
            password: 'required',

        }
        const message = {
            'email.required': 'Email is Required.',
            'email.email': 'Please enter valid email.',
            'password.required': 'Password is Required.',
        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            // Api Call for Login
            const userLogin = await adminApi.login(email, password);
            if (userLogin) {
                if (userLogin.data.roleName == "user" && userLogin.data.roleName != "") {
                    if (userLogin.data.status == 0) {
                        setLoading(false)
                        ToastAlert({ msg: userLogin.data.message, msgType: 'error' });
                    } else if (userLogin.data.status == 1) {
                        localStorage.clear();
                        localStorage.setItem('UserAuthToken', userLogin.data.accessToken)
                        localStorage.setItem('UserData', JSON.stringify(userLogin.data))
                        user.setLogin(true)
                        setLoading(false)
                        ToastAlert({ msg: "Loggedin successfully", msgType: 'success' });
                        navigate('/home')

                    } else {
                        setLoading(false)
                        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
                    }

                } else {
                    setLoading(false)
                    // console.log(userLogin)
                    ToastAlert({ msg: 'User not Found', msgType: 'error' });
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


    return (
        <>
            <ForntLoder loading={loading} />
            <Login
                stateData={state}
                changevalue={changevalue}
                login={login}
            />
        </>
    )

}
export default UserLoginConroller