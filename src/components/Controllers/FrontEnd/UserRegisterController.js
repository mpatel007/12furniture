import Register from "../../View/front_end/Register";
import React, { useState, useEffect } from "react";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert";
import registerApi from "../../Api/frontend/user";
import { useNavigate } from "react-router-dom";
import ForntLoder from "../../Common/ForntLoder";






function UserRegisterController(){
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [state, setstate] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        status: 1,
        error: [],
    })
   
    const {
        name, error, email, status, password, phone,password_confirmation,
    } = state;

    const resetForm = () => {
        setstate({
            ...state,
            name: "",
            email: "",
            phone: "",
            password: "",
            password_confirmation: "",
            status: 1,
            error: []
        })
        setLoading(false)
    }
    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }

   const addUser = () => {

        const rules = {
            name: "required",
            email: 'required|email',
            password: 'required|min:6',
            password_confirmation: 'required|same:password',
            phone: "required|number"

        }
        
        const message = {
            'email.required': 'Email is Requied.',
            'email.email': 'please enter valid email.',
            'password.min': 'Password must be at least 6 characters',
            'password.required': 'Password is Requied.',
            'password_confirmation.required': 'Confirmation Password is Requied.',
            'password_confirmation.same': 'Password and Confirm Password Must be Same',
            'phone.required': 'Phone is Requied.',
            'phone.number': 'Phone number must be number not string.',
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
            userObj.contact = phone
            userObj.status = status
            
            
            
            // Api Call for Register User
            setLoading(true)
            const addUser = await registerApi.addUser(userObj);
            
          if (addUser) {
                if (addUser.data.status == 0) {
                    setLoading(false)
                    ToastAlert({ msg: addUser.data.message, msgType: 'error' });
                } else if (addUser.data.status == 1) {
                    resetForm()
                    setUpdate(!update)
                    ToastAlert({ msg: addUser.data.message, msgType: 'success' });
                    navigate('/login')

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
    return(
        <>      
        <ForntLoder loading={loading} />
        <Register 
        addUser={addUser}
        changevalue={changevalue}
        stateData={state}

        />
        </>
  
    )

}
export default UserRegisterController