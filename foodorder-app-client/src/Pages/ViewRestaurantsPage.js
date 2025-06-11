import {Table, Container, Button, Image, Col} from "react-bootstrap";
import {useSelector} from "react-redux"
import {useState} from "react";
import AlertMessage from "../components/AlertMessage";
import AddRestaurantPage from "./AddRestaurantPage";

const ViewRestaurantsPage = () => {
    
    const [addRestaurant, setAddRestaurant] = useState (false);
    const [editRestaurant, setEditRestaurant] = useState (false);
    const [editRestaurantId, setEditRestaurantId] = useState ("");

    const restaurantsInfo = useSelector ((state) => state.restaurantsInfo);
    let {restaurants} = restaurantsInfo;
    const [restaurantsList, setRestaurantsList] = useState(restaurants);
    console.log ("666 ViewRestaurants Page restaurants=", restaurants);

    const handleEditRestaurant = (restaurantId) => {
        setEditRestaurant (true);
        setAddRestaurant (false);
        setShowRestaurants (false);
        setEditRestaurantId (restaurantId);
    }

    const handleDeleteRestaurant = (restaurantId) => {
        let result = restaurants.filter ((restaurant) => restaurant.id !== restaurantId)
        restaurantsInfo.restaurants = result;
        
        setRestaurantsList(result);
        console.log ("55 after delete result", result, restaurantsInfo);
    }
    const [showRestaurants, setShowRestaurants] = useState (true);

    const handleAddRestaurant = (e) => {
        e.preventDefault ();
        setShowRestaurants (false);
        setAddRestaurant (true);
    }

    return (
        <>
            
            {(showRestaurants && restaurantsList.length === 0) && (
                    <AlertMessage variant="info" message="No Restaurants to Display" />)}
            {showRestaurants && restaurantsList.length > 0 && (
                <Container>
            <Button variant="outline-info" className="my-3" onClick={handleAddRestaurant}>
                Add Restaurant
            </Button>
            <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>image </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
                </thead>
      <tbody>
                {restaurants.map ((restaurant) => (
                    <tr key={restaurant.id} className="text-center">
                    <td>{restaurant.id}</td>
                                  <td><Image src={restaurant.image} width={80} height={80}/></td>
                                  <td>{restaurant.name}</td>
                                  <td>{restaurant.description}</td>
                                  <td>
                                    <Col>
                                    <Button variant="info" className="mb-3" onClick={() => handleEditRestaurant (restaurant.id)}>
                                        Edit
                                    </Button>
                                    </Col>
                                    <Col>
                                  <Button variant="danger" className="mb-3" onClick={() => handleDeleteRestaurant (restaurant.id)}>
                                    Delete
                                  </Button>
                                  </Col>
                                  </td>
                      </tr>
                ))}
      
                </tbody>
            </Table>
            </Container>
            )}
            {!showRestaurants && addRestaurant && (
                <AddRestaurantPage />
            )}
            {!showRestaurants && editRestaurant && (
                <AddRestaurantPage restaurantId = {editRestaurantId} />
            )}
        </>  
    );
}

export default ViewRestaurantsPage;