import react, { useState, useEffect } from "react";
import Hero from "../../View/front_end/layout/Hero";
import { useLocation } from 'react-router-dom'
import ForntLoder from "../../Common/ForntLoder";
import productApi from "../../Api/frontend/products";



function HeroController() {

    const [allCategory, setAllCategory] = useState([]);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [toggle, setToggle] = useState(location.pathname == "/" || location.pathname == "/home" ? false : true)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const categoryList = await productApi.viewCategoryList();
            if (categoryList.data.status == 1) {
                setAllCategory(categoryList.data.data);
            }
            setLoading(false);

        })();

    }, []);

    return (
        <>
            {/* <PageLoader loading={loading} /> */}
            <ForntLoder  loading={loading} />
            <Hero allCategory={allCategory} setToggle={setToggle} toggle={toggle} />
        </>
    );
}
export default HeroController;