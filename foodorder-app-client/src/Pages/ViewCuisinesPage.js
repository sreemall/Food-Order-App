import {Table, Container, Button, Image, Col} from "react-bootstrap";
import {useSelector} from "react-redux"
import {useState} from "react";
import AlertMessage from "../components/AlertMessage";
import AddCuisinePage from "./AddCuisinePage";

const ViewCuisinesPage = () => {
    
    const [addCuisine, setAddCuisine] = useState (false);
    const [editCuisine, setEditCuisine] = useState (false);
    const [editCuisineId, setEditCuisineId] = useState ("");

    const cuisinesInfo = useSelector ((state) => state.cuisinesInfo);
    let {cuisines} = cuisinesInfo;
    const [cuisinesList, setCuisinesList] = useState(cuisines);
    console.log ("666 ViewCuisines Page cuisines=", cuisines);

    const handleEditCuisine = (cuisineId) => {
        setEditCuisine (true);
        setAddCuisine (false);
        setShowCuisines (false);
        setEditCuisineId (cuisineId);
    }

    const handleDeleteCuisine = (cuisineId) => {
        let result = cuisines.filter ((cuisine) => cuisine.id !== cuisineId)
        cuisinesInfo.cuisines = result;
        
        setCuisinesList(result);
        console.log ("55 after delete result", result, cuisinesInfo);
    }
    const [showCuisines, setShowCuisines] = useState (true);

    const handleAddCuisine = (e) => {
        e.preventDefault ();
        setShowCuisines (false);
        setAddCuisine (true);
    }

    return (
        <>
            
            {(showCuisines && cuisinesList.length === 0) && (
                    <AlertMessage variant="info" message="No Cuisines to Display" />)}
            {showCuisines && cuisinesList.length > 0 && (
                <Container>
            <Button variant="outline-info" className="my-3" onClick={handleAddCuisine}>
                Add Cuisine
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
                {cuisines.map ((cuisine) => (
                    <tr key={cuisine.id} className="text-center">
                    <td>{cuisine.id}</td>
                                  <td><Image src={cuisine.image} width={80} height={80}/></td>
                                  <td>{cuisine.name}</td>
                                  <td>{cuisine.description}</td>
                                  <td>
                                    <Col>
                                    <Button variant="info" className="mb-3" onClick={() => handleEditCuisine (cuisine.id)}>
                                        Edit
                                    </Button>
                                    </Col>
                                    <Col>
                                  <Button variant="danger" className="mb-3" onClick={() => handleDeleteCuisine (cuisine.id)}>
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
            {!showCuisines && addCuisine && (
                <AddCuisinePage />
            )}
            {!showCuisines && editCuisine && (
                <AddCuisinePage cuisineId = {editCuisineId} />
            )}
        </>  
    );
}

export default ViewCuisinesPage;