import {Container, Row, Col, Card, Button} from "react-bootstrap";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { fetchCategories } from "../categoriesSlice";
import {useEffect, useState} from "react";
import { fetchCuisines } from "../cuisinesSlice";
import ViewCuisinesPage from "./ViewCuisinesPage";
import ViewCategoriesPage from "./ViewCategoriesPage";
import {useLocation} from "react-router-dom";
import AddCategoryPage from "./AddCategoryPage";
import AddCuisinePage from "./AddCuisinePage";
import { fetchRestaurants } from "../restaurantsSlice";
import AddRestaurantPage from "./AddRestaurantPage";
import ViewRestaurantsPage from "./ViewRestaurantsPage";


const AdminPage = () => {
    const dispatch = useDispatch ();
    const navigate = useNavigate ();

    const userLogin = useSelector (state => state.login);
    const userInfo = userLogin.userInfo;

    const categoriesInfo = useSelector ((state) => state.categoriesInfo);
    const {categories} = categoriesInfo;

    const cuisinesInfo = useSelector ((state) => state.cuisinesInfo);
    const {cuisines} = cuisinesInfo;

    const restaurantsInfo = useSelector ((state) => state.restaurantsInfo);
    const {restaurants} = restaurantsInfo;
    // console.log ("99 AdminPage userInfo, cusines, categories", userInfo, cuisinesInfo, categoriesInfo);

    const [hideAdminPage, setHideAdminPage] = useState (false);

    const [showCuisines, setShowCuisines] = useState (false);
    const [addCuisine, setAddCuisine] = useState (false);
    const [showCategories, setShowCategories] = useState (false);
    const [addCategory, setAddCategory] = useState (false);
    const [showRestaurants, setShowRestaurants] = useState (false);
    const [addRestaurant, setAddRestaurant] = useState (false);
    // console.log ("99 AdminPage after init hideAdminPage", hideAdminPage, showCuisines, showCategories, addCategory);
    
    const location = useLocation ();
    // console.log ("99 location=", location, location.pathname);

    useEffect (() => {
        if (!userInfo) {
            navigate ("/login");
        }
        else if (!userInfo.isAdmin) {
            navigate("/");
        }
        else {
            // console.log ("777 In useEffect cuisines=", cuisines);
            if (!cuisines || cuisines.length === 0)
                dispatch (fetchCuisines());
            // console.log ("777 In useEffect after dipatch cuisines=", cuisines);

            if (!categories || categories.length === 0)
                dispatch (fetchCategories());
            // console.log ("777 In useEffect after dipatch categories=", categories);

            if (!restaurants || restaurants.length === 0) 
                dispatch (fetchRestaurants ());
            // console.log ("777 In useEffect after dipatch restaurants=", restaurants);
        }
    }, []);

    useEffect (() => {
        setHideAdminPage (false);
        setShowCuisines (false);
        setShowCategories (false);
        setShowRestaurants (false);
        setAddCategory (false);
        setAddCuisine (false);
        setAddRestaurant (false);
        console.log ("77 useEffect location dependency location.key=", location.key, hideAdminPage, showCuisines, showCategories, addCategory);
    }, [location.key]);

    const handleViewCuisines = (e) => {
        e.preventDefault ();
        // console.log ("777 handleViewCuisines cuisines=", cuisines, cuisinesInfo);
        setHideAdminPage (true);
        setShowCuisines (true);
    }
    const handleAddCuisine = (e) => {
        e.preventDefault ();
        setHideAdminPage (true);
        setAddCuisine (true);
    }

    const handleViewCategories = (e) => {
        e.preventDefault ();
        setHideAdminPage (true);
        setShowCategories (true);
    }

    const handleAddCategory = (e) => {
        e.preventDefault ();
        setHideAdminPage (true);
        setAddCategory (true);
    }

    const handleViewRestaurants = (e) => {
        e.preventDefault ();
        setHideAdminPage (true);
        setShowRestaurants (true);
    }
    const handleAddRestaurant = (e) => {
        e.preventDefault ();
        setHideAdminPage (true);
        setAddRestaurant (true);
    }


    return (
        <>
            {!hideAdminPage && (
            <Container>
                <h2 className="md-auto text-center p-4"> Admin Dashboard </h2>
                <Row className="mb-3">
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Cuisines</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3" onClick={handleViewCuisines}>View Cuisines</Button>
                                <Button variant="outline-info" size="sm" className="me-3" onClick={handleAddCuisine}>Add Cuisine</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Categories</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3" onClick={handleViewCategories}>View Categories</Button>
                                <Button variant="outline-info" size="sm" className="me-3" onClick={handleAddCategory}>Add Category</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Restaurants</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3" onClick={handleViewRestaurants}>View Restaurants</Button>
                                <Button variant="outline-info" size="sm" className="me-3" onClick={handleAddRestaurant}>Add Restaurant</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Food Items</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3">View Food Items</Button>
                                <Button variant="outline-info" size="sm" className="me-3">Add Food Item</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Orders</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3">View Orders</Button>
                                <Button variant="outline-info" size="sm" className="me-3">Add Order</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Users</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3">View Users</Button>
                                <Button variant="outline-info" size="sm" className="me-3">Add User</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col className="mb-3">
                        <Card border="secondary">
                            <Card.Body>
                                <Card.Title as="h4">Restaurant Menu</Card.Title>
                                <Button variant="outline-info" size="sm" className="me-3">View Menu</Button>
                                <Button variant="outline-info" size="sm" className="me-3">Add Menu</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            )}
            {showCuisines && (
                <ViewCuisinesPage />
            )}

            {addCuisine && (
                <AddCuisinePage />
            )}

            {showCategories && (
                <ViewCategoriesPage />
            )}

            {addCategory && (
                <AddCategoryPage />
            )}

            {addRestaurant && (
                <AddRestaurantPage />
            )}

            {showRestaurants && (
                <ViewRestaurantsPage />
            )}
        </>
    )
}

export default AdminPage;