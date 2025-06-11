import {useState} from "react";
import {Form, Container, Button} from "react-bootstrap";
import ViewCategoriesPage from "./ViewCategoriesPage";
import {useSelector} from "react-redux";
import AlertMessage from "../components/AlertMessage";

const AddCategoryPage = (props) => {
    const [addCategory, setAddCategory] = useState (true);
    const [success, setSuccess] = useState ("");

    const categories = useSelector ((state) => state.categoriesInfo.categories);
    let cat;
    if (props.catId) {
        cat = categories.find ((category) => category.id === props.catId);
    }

    const [catName, setCatName] = useState ((cat) ? cat.name : "");
    const [catDesc, setCatDesc] = useState ((cat) ? cat.description : "");
    const [catImageURL,setCatImageURL] = useState ((cat) ? cat.image : "");

    console.log ("88 AddCategory Page categories=", categories, cat);
    const handleAddCategory = (e) => {
        e.preventDefault ();
        if (props.catId) { //Edit Category
            cat.name = catName;
            cat.description = catDesc;
            cat.image = catImageURL;
            setSuccess ("Category Edited Successfully");
        }
        else {  //Add Category
            let newId = categories.reduce((max, category) => {
                // return category.id > max ? category.id : max;
                return Math.max(max, category.id);
              }, categories[0].id) + 1;
            categories.push ({"id": newId,
                            "name": catName,
                            "description": catDesc,
                            "image": catImageURL});
            setSuccess ("Category Added Successfully");
        }
        
        console.log ("88 AddCategory Page handleAddCat categories=", categories);
    }

    const handleViewCategories = (e) => {
        e.preventDefault ();
        setAddCategory (false);
    }

    return (
        <>
            {addCategory && (
            <Container>
                {success && (<AlertMessage variant="success" message={success} />)}
                <Button variant="outline-info" className="my-3" onClick={handleViewCategories}>
                    View Categories
                </Button>
                <Form className="mb-0 rounded p-4 bg-light" border="primary">
                    <Form.Group className="mb-3">
                        <Form.Label> Category Name </Form.Label>
                        <Form.Control type="text" palceholder="Category Name" 
                            value={catName} onChange={(e) => setCatName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label> Category Description </Form.Label>
                        <Form.Control type="text" palceholder="Category Description"
                            value={catDesc} onChange={(e) => setCatDesc(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="categoryImage"> Category Image </Form.Label>
                        <Form.Control type="url" palceholder="Category Image"
                            value={catImageURL} onChange={(e) => setCatImageURL(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" variant="info" className="mb-3" onClick={handleAddCategory}>
                        {props.catId ? "Edit Category" : "Add Category"}
                    </Button>
                </Form>
            </Container>
            )}
            {!addCategory && (
                <ViewCategoriesPage />
            )}

        </>
    )
}

export default AddCategoryPage;