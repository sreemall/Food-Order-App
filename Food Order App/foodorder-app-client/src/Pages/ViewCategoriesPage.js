import {Table, Container, Button, Image, Col} from "react-bootstrap";
import {useSelector} from "react-redux"
import {useState} from "react";
import AlertMessage from "../components/AlertMessage";
import AddCategoryPage from "./AddCategoryPage";

const ViewCategoriesPage = () => {
    
    const [addCategory, setAddCategory] = useState (false);
    const [editCategory, setEditCategory] = useState (false);
    const [editCatId, setEditCatId] = useState ("");

    const categoriesInfo = useSelector ((state) => state.categoriesInfo);
    let {categories} = categoriesInfo;
    const [categoriesList, setCategoriesList] = useState(categories);
    console.log ("666 ViewCategories Page categories=", categories);

    const handleEditCategory = (catId) => {
        setEditCategory (true);
        setAddCategory (false);
        setShowCategories (false);
        setEditCatId (catId);
    }

    const handleDeleteCategory = (catId) => {
        let result = categories.filter ((catgory) => catgory.id !== catId)
        categoriesInfo.categories = result;
        
        setCategoriesList(result);
        console.log ("55 after delete result", result, categoriesInfo);
    }
    const [showCategories, setShowCategories] = useState (true);

    const handleAddCategory = (e) => {
        e.preventDefault ();
        setShowCategories (false);
        setAddCategory (true);
    }

    return (
        <>
            
            {(showCategories && categoriesList.length === 0) && (
                    <AlertMessage variant="info" message="No Categories to Display" />)}
            {showCategories && categoriesList.length > 0 && (
                <Container>
            <Button variant="outline-info" className="my-3" onClick={handleAddCategory}>
                Add Category
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
                {categories.map ((category) => (
                    <tr key={category.id} className="text-center">
                    <td>{category.id}</td>
                                  <td><Image src={category.image} width={80} height={80}/></td>
                                  <td>{category.name}</td>
                                  <td>{category.description}</td>
                                  <td>
                                    <Col>
                                    <Button variant="info" className="mb-3" onClick={() => handleEditCategory (category.id)}>
                                        Edit
                                    </Button>
                                    </Col>
                                    <Col>
                                  <Button variant="danger" className="mb-3" onClick={() => handleDeleteCategory (category.id)}>
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
            {!showCategories && addCategory && (
                <AddCategoryPage />
            )}
            {!showCategories && editCategory && (
                <AddCategoryPage catId = {editCatId} />
            )}
        </>  
    );
}

export default ViewCategoriesPage;