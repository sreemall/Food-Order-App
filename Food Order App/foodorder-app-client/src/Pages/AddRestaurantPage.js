import {useState} from "react";
import {Form, Container, Button} from "react-bootstrap";
import ViewRestaurantsPage from "./ViewRestaurantsPage";
import {useSelector} from "react-redux";
import AlertMessage from "../components/AlertMessage";

const AddRestaurantPage = (props) => {
    const [addRestaurant, setAddRestaurant] = useState (true);
    const [success, setSuccess] = useState ("");

    const restaurants = useSelector ((state) => state.restaurantsInfo.restaurants);
    let restaurant;
    if (props.restaurantId) {
        restaurant = restaurants.find ((restaurant) => restaurant.id === props.restaurantId);
    }

    const [restaurantName, setRestaurantName] = useState ((restaurant) ? restaurant.name : "");
    const [restaurantDesc, setRestaurantDesc] = useState ((restaurant) ? restaurant.description : "");
    const [restaurantImageURL,setRestaurantImageURL] = useState ((restaurant) ? restaurant.image : "");

    console.log ("88 AddRestaurant Page restaurants=", restaurants, restaurant);
    const handleAddRestaurant = (e) => {
        e.preventDefault ();
        if (props.restaurantId) { //Edit Restaurant
            restaurant.name = restaurantName;
            restaurant.description = restaurantDesc;
            restaurant.image = restaurantImageURL;
            setSuccess ("Restaurant Edited Successfully");
        }
        else {  //Add Restaurant
            let newId = restaurants.reduce((max, restaurant) => {
                return Math.max(max, restaurant.id);
              }, restaurants[0].id) + 1;
            console.log (newId);
            restaurants.push ({"id": newId,
                            "name": restaurantName,
                            "description": restaurantDesc,
                            "image": restaurantImageURL});
            setSuccess ("Restaurant Added Successfully");
        }
        
        console.log ("88 AddRestaurant Page handleAddCat restaurants=", restaurants);
    }

    const handleViewRestaurants = (e) => {
        e.preventDefault ();
        setAddRestaurant (false);
    }

    return (
        <>
            {addRestaurant && (
            <Container>
                {success && (<AlertMessage variant="success" message={success} />)}
                <Button variant="outline-info" className="my-3" onClick={handleViewRestaurants}>
                    View Restaurants
                </Button>
                <Form className="mb-0 rounded p-4 bg-light" border="primary">
                    <Form.Group className="mb-3">
                        <Form.Label> Restaurant Name </Form.Label>
                        <Form.Control type="text" palceholder="Restaurant Name" 
                            value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Restaurant Description </Form.Label>
                        <Form.Control type="text" palceholder="Restaurant Description"
                            value={restaurantDesc} onChange={(e) => setRestaurantDesc(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="restaurantImage"> Restaurant Image </Form.Label>
                        <Form.Control type="url" palceholder="Restaurant Image"
                            value={restaurantImageURL} onChange={(e) => setRestaurantImageURL(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" variant="info" className="mb-3" onClick={handleAddRestaurant}>
                        {props.catId ? "Edit Restaurant" : "Add Restaurant"}
                    </Button>
                </Form>
            </Container>
            )}
            {!addRestaurant && (
                <ViewRestaurantsPage />
            )}

        </>
    )
}

export default AddRestaurantPage;