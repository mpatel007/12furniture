import Signin from "../../View/admin/layout/Signin";
import { useState, useContext } from "react";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import PageLoader from "../../Common/PageLoader";
import adminApi from "../../Api/admin/admin";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";

function LoginController() {
    const [loading, setLoading] = useState(false)
    const [state, setstate] = useState({
        email: "",
        password: "",
        error: []
    })
    const {
        email, password, error
    } = state;

    const user = useContext(UserContext)

    const navigate = useNavigate();
    const onSubForm = (e) => {
        const rules = {
            email: 'required|email',
            password: 'required',

        }
        const message = {
            'email.required': 'email is Requied.',
            'email.email': 'please enter valid email.',
            'password.required': 'password is Requied.',
        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            // Api Call for Login
            setLoading(true)
            let okk = false;
            const adminLogin = await adminApi.login(email, password);
            if (adminLogin) {
                if (adminLogin.data.roleName == "admin" && adminLogin.data.roleName != "") {
                    if (adminLogin.data.status == 0) {
                        setLoading(false)
                        ToastAlert({ msg: adminLogin.data.message, msgType: 'error' });
                    } else if (adminLogin.data.status == 1) {
                        localStorage.clear();
                        localStorage.setItem('adminAuthToken', adminLogin.data.accessToken)
                        localStorage.setItem('AdminData', JSON.stringify(adminLogin.data))
                        user.setLogin(true)
                        // user.setIsAdmin(true)
                        setLoading(false)
                        ToastAlert({ msg: "Welcome " + adminLogin.data.name.toUpperCase(), msgType: 'success' });
                        navigate('/admin/dashboard')
                        okk = true;

                    } else {
                        setLoading(false)
                        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
                    }
                  
                } else {
                    setLoading(false)
                    ToastAlert({ msg: 'Admin not Found', msgType: 'error' });
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
            <PageLoader loading={loading} />
            <Signin
                stateData={state}
                onSubForm={onSubForm}
                changevalue={changevalue} />
        </>
    )
}
export default LoginController