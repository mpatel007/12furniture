import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProfileController from '../components/Controllers/FrontEnd/ProfileController';
import NotFound from '../components/View/front_end/NotFound';
import CartController from "../components/Controllers/FrontEnd/CartControllrer";
import CheckoutController from '../components/Controllers/FrontEnd/CheckoutController';
import ThankYou from '../components/View/front_end/ThankYou';
import PaymentController from '../components/Controllers/FrontEnd/PaymentController';


function UserPrivateRoutes() {
    return (
        <>
            <Routes>
                <Route exact path="/profile" element={<ProfileController />} />
                <Route exact path="/checkout" element={<CheckoutController />} />
                <Route exact path="/thankyou" element={<ThankYou />} />
                <Route exact path="/payment" element={<PaymentController />} />
                {/* <Route  path="*" element={<NotFound />}></Route> */}
            </Routes>

        </>
    )
}
export default UserPrivateRoutes;