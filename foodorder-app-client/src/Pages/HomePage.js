import { useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { AdminPage } from "./AdminPage";
import { fetchCuisines } from "../cuisinesSlice";
import { fetchCategories } from "../categoriesSlice";
import { fetchRestaurants } from "../restaurantsSlice";
import AlertMessage from "../components/AlertMessage";
import {Row, Col} from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import ItemCard from "../components/ItemCard";


// console.log ("999 before Entering HomePage");
function HomePage () {
    // console.log ("999 Entering HomePage");
    const userLogin = useSelector (state => state.login);
    const userInfo = userLogin.userInfo;
    // console.log ("In HomePage userinfo=", userInfo);

    const navigate = useNavigate ();
    const dispatch = useDispatch ();

    const cuisinesInfo = useSelector (state => state.cuisinesInfo);
    const {loadingCuisines, cuisines} = cuisinesInfo;
    // console.log ("In HomePage cuisines=", cuisinesInfo);

    const categoriesInfo = useSelector (state => state.categoriesInfo);
    const {loadingCategories, categories} = categoriesInfo;

    const restaurantsInfo = useSelector (state => state.restaurantsInfo);
    const {loadingRestaurants, restaurants} = restaurantsInfo;
    // console.log ("999 loadingCuisines=", loadingCuisines, loadingCategories,loadingRestaurants);
    

    useEffect ( () => {
        // console.log ("999 HomePage useEffect userInfo=", userInfo)
        if (!userInfo) {
            // console.log ("HomePage useEffect navigate to LoginPage")
            navigate ("/login");
        }
        // else
        //     dispatch (fetchCuisines());
        else if (userInfo.isAdmin) {
            navigate("/AdminPage");
        }
        else {
            // console.log ("777 HomePage useEffect before dispatch cuisines", cuisines);
            if (!cuisines || cuisines.length === 0) {
                dispatch(fetchCuisines());
            }
            // console.log ("777 HomePage useEffect after dispatch cuisines", cuisines);
            if ( !categories || categories.length === 0) {
                dispatch (fetchCategories ());
            }
            if (!restaurants || restaurants.length === 0) {
                dispatch (fetchRestaurants ());
            }
        }

    }, []);

    return (
        <>
            { loadingCuisines && <Spinner animation="grow"/> }
            {cuisines && cuisines.length === 0 && (
                <AlertMessage variant="info" message="No Cuisines to display" />
            )}
            {cuisines && (
                <div className="container-fluid">
                    <h4>Try a New cuisine</h4>
                    <Row className="g-4">
                        {cuisines.map((cuisine) => (
                        <Col key={cuisine.id} md={6} sm={12} lg={4}>
                            <ItemCard item={cuisine} itemName="cuisine" />
                        </Col>
                        ))}
                    </Row>
                </div>
            )}
            {loadingCategories && <Spinner animation = "grow" />}
            {categories && categories.length === 0 && (
                <AlertMessage variant="info" message="No Categories to display" />
            )}
            {categories && (
                <div className="container-fluid">
                    <h4> Get inspiration for your order</h4>
                    <Row className=" g-4">
                        {categories.map (category => (
                            <Col key={category.id} md={6} sm={12} lg={4}>
                                <ItemCard item={category} itemName="category" />
                                </Col>
                        ))}
                    </Row>
                </div>
            )}
                {loadingRestaurants && <Spinner animation="grow" />}
                {restaurants && restaurants.length === 0 && (
                    <AlertMessage variant="info" message="No Restaurants to display" />
                )}
                {restaurants && (
                    <div className="container-fluid">
                        <h4> Available restaurants</h4>
                        <Row className="g-4"> 
                            {restaurants.map ( (restaurant) => 
                                <Col key={restaurant.id} md={6} sm={12} lg={4}>
                                    <ItemCard item={restaurant} itemName="restaurant" />
                                </Col>)}
                        </Row>
                        </div>
                )}
                

        </>
    )
}

export default HomePage;