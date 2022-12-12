import Swal from 'sweetalert2'

function AlertMessage(props) {
    switch (props.msgType) {
        case 'success':

            Swal.fire({
                icon: 'success',
                title: props.msg,
                showConfirmButton: true,
                timer: 1500
                
            })
            break;
        case 'info':
            Swal.fire({
                icon: 'info',
                title: props.msg,
                showConfirmButton: false,
                timer: 1500
            })
            break;
        case 'warn':

            Swal.fire({
                icon: 'warn',
                title: props.msg,
                showConfirmButton: false,
                timer: 1500,
        
            })
            break;
        case 'error':

            Swal.fire({
                icon: 'error',
                title: props.msg,
                showConfirmButton: false,
                timer: 1500,
            })
            break;
        default:

            Swal.fire(props.msg)
            break;
    }
}
export default AlertMessage