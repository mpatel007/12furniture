import { Link } from 'react-router-dom';
import '../../../../asset/admin/css/custom.css'
import moment from 'moment';
const Footer = () => {

    return (
        <footer className="footer cus_footer">
            <div className="container-fluid">
                <div className="row text-muted">
                    <div className="col-8 text-left">
                        <ul className="list-inline ">
                            <li className="list-inline-item">
                                <a className="text-muted" href="#">Support</a>
                            </li>
                            <li className="list-inline-item">
                                <a className="text-muted" href="#">Privacy</a>
                            </li>
                            <li className="list-inline-item">
                                <a className="text-muted" href="#">Terms of Service</a>
                            </li>
                            <li className="list-inline-item">
                                <a className="text-muted" href="#">Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-4 text-right">
                        <p className="mb-0 ftr">
                            &copy; {moment().year()} - <Link to="/home" className="text-muted">Fashion</Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer;