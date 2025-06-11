import {useState} from "react";
import {Form, Container, Button} from "react-bootstrap";
import ViewCuisinesPage from "./ViewCuisinesPage";
import {useSelector} from "react-redux";
import AlertMessage from "../components/AlertMessage";

const AddCuisinePage = (props) => {
    const [addCuisine, setAddCuisine] = useState (true);
    const [success, setSuccess] = useState ("");

    const cuisines = useSelector ((state) => state.cuisinesInfo.cuisines);
    let cuisine;
    if (props.cuisineId) {
        cuisine = cuisines.find ((cuisine) => cuisine.id === props.cuisineId);
    }

    const [cuisineName, setCuisineName] = useState ((cuisine) ? cuisine.name : "");
    const [cuisineDesc, setCuisineDesc] = useState ((cuisine) ? cuisine.description : "");
    const [cuisineImageURL,setCuisineImageURL] = useState ((cuisine) ? cuisine.image : "");

    console.log ("88 AddCuisine Page cuisines=", cuisines, cuisine);
    const handleAddCuisine = (e) => {
        e.preventDefault ();
        if (props.cuisineId) { //Edit Cuisine
            cuisine.name = cuisineName;
            cuisine.description = cuisineDesc;
            cuisine.image = cuisineImageURL;
            setSuccess ("Cuisine Edited Successfully");
        }
        else {  //Add Cuisine
            let newId = cuisines.reduce((max, cuisine) => {
                return Math.max(max, cuisine.id);
              }, cuisines[0].id) + 1;
            console.log (newId);
            cuisines.push ({"id": newId,
                            "name": cuisineName,
                            "description": cuisineDesc,
                            "image": cuisineImageURL});
            setSuccess ("Cuisine Added Successfully");
        }
        
        console.log ("88 AddCuisine Page handleAddCat cuisines=", cuisines);
    }

    const handleViewCuisines = (e) => {
        e.preventDefault ();
        setAddCuisine (false);
    }

    return (
        <>
            {addCuisine && (
            <Container>
                {success && (<AlertMessage variant="success" message={success} />)}
                <Button variant="outline-info" className="my-3" onClick={handleViewCuisines}>
                    View Cuisines
                </Button>
                <Form className="mb-0 rounded p-4 bg-light" border="primary">
                    <Form.Group className="mb-3">
                        <Form.Label> Cuisine Name </Form.Label>
                        <Form.Control type="text" palceholder="Cuisine Name" 
                            value={cuisineName} onChange={(e) => setCuisineName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Cuisine Description </Form.Label>
                        <Form.Control type="text" palceholder="Cuisine Description"
                            value={cuisineDesc} onChange={(e) => setCuisineDesc(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="cuisineImage"> Cuisine Image </Form.Label>
                        <Form.Control type="url" palceholder="Cuisine Image"
                            value={cuisineImageURL} onChange={(e) => setCuisineImageURL(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" variant="info" className="mb-3" onClick={handleAddCuisine}>
                        {props.catId ? "Edit Cuisine" : "Add Cuisine"}
                    </Button>
                </Form>
            </Container>
            )}
            {!addCuisine && (
                <ViewCuisinesPage />
            )}

        </>
    )
}

export default AddCuisinePage;