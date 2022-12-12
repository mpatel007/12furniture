import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function ToastAlert(props) {
    switch (props.msgType) {

        case 'success':

            toast.success(props.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored"
            });
            break;
        case 'info':

            toast.info(props.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            break;
        case 'warn':

            toast.warn(props.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            break;
        case 'error':

            toast.error(props.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored"
            });
            break;
        default:

            toast(props.msg, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            break;
    }
}
export default ToastAlert;