import React, { useState } from 'react';
import ForntLoder from "../../Common/ForntLoder";
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { validateAll } from 'indicative/validator';
import Contact from '../../View/front_end/Contact';
import contactApi from '../../Api/frontend/contact';

function ContactController() {

    const [loading, setLoading] = useState(false);

    const [state, setstate] = useState({
        name: "",
        email: "",
        contactMessage: "",
        error: [],
    });

    const {
        name, email, contactMessage, error,
    } = state;

    const resetForm = () => {
        setstate({
            ...state,
            name: "",
            email: "",
            contactMessage: "",
            error: [],
        });
    };

    const sendMessage = () => {
        
        const rules = {
            name: "required",
            email: "required",
            contactMessage: "required",
        };

        const message = {
            "name.required": "Name is Requied.",
            "email.required": "Email is Requied.",
            "contactMessage.required": "Message is Requied.",
        };

        validateAll(state, rules, message).then(async () => {

            const formaerrror = {};

            setstate({
                ...state,
                error: formaerrror,
            });

            setLoading(true);
            // Api Call for Send Message or Mail
            const sendMessage = await contactApi.sendMessage(name, email, contactMessage);
            
            if (sendMessage) {
                if (sendMessage.data.status == 0) {
                    setLoading(false);
                    ToastAlert({ msg: sendMessage.data.message, msgType: 'error' });
                } else {
                    setLoading(false);
                    resetForm();
                    ToastAlert({ msg: sendMessage.data.message, msgType: 'success' });
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

    const changevalue = (e) => {
        let value = e.target.value;

        setstate({
            ...state,
            [e.target.name]: value,
        });
    };

    
    return (
        <>

        <ForntLoder loading={loading} />
        <Contact 
        sendMessage={sendMessage}
        stateData={state}
        changevalue={changevalue}
        />

        </>
    );

};

export default ContactController;