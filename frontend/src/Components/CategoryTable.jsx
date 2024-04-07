import React, { useEffect, useState } from 'react';
import { Flex, Input, Button, Table, Tr, Th, Thead, Tbody, Td, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";

const initialCategory = {
    name: '',
    slug: "",
    image: ''
}

const CategoryTable = ({ categoryData, handleRefreshCategory, handleDelete }) => {
    const token = JSON.parse(localStorage.getItem("token"))
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [editCategory, setEditCategory] = useState(initialCategory);
    const [editedCategoryId, setEditedCategoryId] = useState(null);
    const [filteredCategoryData, setFilteredCategoryData] = useState(categoryData);
    const [addcategoryData, setAddCategoryData] = useState(initialCategory)
    const [flag, setFlag] = useState(false)

    const handleFilter = (value) => {
        if (value) {
            setFlag(true)
        } else {
            setFlag(false)
        }

        const filteredData = categoryData.filter(category => category.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredCategoryData(filteredData);
    };

    const handleEdit = (categoryId) => {
        setEditedCategoryId(categoryId);
        setIsOpenEditModal(true);
        const categoryToEdit = categoryData.find(category => category._id === categoryId);
        setEditCategory(categoryToEdit);
    };

    const handleEditCategoryChange = (e) => {
        const { name, value } = e.target
        setEditCategory((prev) => ({ ...prev, [name]: value }))
    }

    const handleEditCategorySubmit = async() => {
        let obj={
            name:editCategory.name,
            slug:editCategory.slug,
            image:editCategory.image
        }
        try {
            let res = await fetch(`https://arba-api-v28s.onrender.com/category/update/${editCategory._id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(obj)
            })
            if(res){
                alert("Category updated successfully")
                handleCloseEditModal()
                handleRefreshCategory()
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddCategoryModal = async () => {
        setIsOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setIsOpenAddModal(false);
    };

    const handleCloseEditModal = () => {
        setIsOpenEditModal(false);
        setEditedCategoryId(null);
    };

    const handleAddCategoryChange = (e) => {
        const { name, value } = e.target
        setAddCategoryData((prev) => ({ ...prev, [name]: value }))
    }

    const handleAddCategorySubmit = async () => {
        console.log(token);
        console.log(addcategoryData);
        if (addcategoryData.name === "" || addcategoryData.slug === '' || addcategoryData.image === "") {
            alert('Fill in all category details.');
            return;
        }
        try {
            let res = await fetch(`https://arba-api-v28s.onrender.com/category/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(addcategoryData)
            });
            console.log(res);
            if (res.ok) {
                alert('Category added successfully.');
                handleRefreshCategory()
            } else {
                alert('Failed to add category.');
            }
            handleCloseAddModal();
        } catch (error) {
            console.log(error);
            alert('An error occurred while adding the category.');
        }
    };


    const handleSubmitEditModal = () => {
        // Perform logic to update edited category in the database
        console.log("Edited category saved with ID: ", editedCategoryId);
        handleCloseEditModal();
    };

    return (
        <Flex alignItems="center" justifyContent="center" boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}>
            <Box margin={'20px'} padding={'20px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Flex mb={4} justifyContent={'space-around'}>
                    <Input width="50%" placeholder="Search by name" onChange={(e) => handleFilter(e.target.value)} border="1px solid black" />
                    <Button ml={4} colorScheme="blue" variant="outline" onClick={() => handleRefreshCategory()}>Refresh</Button>
                    <Button colorScheme="blue" variant="outline" onClick={handleAddCategoryModal} ml={"10px"}>
                        Add Category
                    </Button>
                </Flex>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Slug</Th>
                            <Th>Image</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {flag ? (
                            filteredCategoryData && filteredCategoryData.map((category) => (
                                <Tr key={category._id}>
                                    <Td>{category.name}</Td>
                                    <Td>{category.slug}</Td>
                                    <Td>{category.image}</Td>
                                    <Td>
                                        <Button colorScheme="teal" variant="outline" mr={2} onClick={() => handleEdit(category._id)}>Edit</Button>
                                        <Button colorScheme="red" variant="outline" onClick={() => handleDelete(category._id)} ml={'5px'}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            categoryData && categoryData.map((category) => (
                                <Tr key={category._id}>
                                    <Td>{category.name}</Td>
                                    <Td>{category.slug}</Td>
                                    <Td>{category.image}</Td>
                                    <Td>
                                        <Button colorScheme="teal" variant="outline" mr={2} onClick={() => handleEdit(category._id)}>Edit</Button>
                                        <Button colorScheme="red" variant="outline" onClick={() => handleDelete(category._id)} ml={'5px'}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>

                </Table>
            </Box>

            {/* Add Category Modal */}
            <Modal isOpen={isOpenAddModal} onClose={handleCloseAddModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Name</Text>
                        <Input placeholder="Category Name" name={'name'} value={addcategoryData.name} onChange={handleAddCategoryChange} />
                        <Text>Slug</Text>
                        <Input placeholder="Category Slug" name={'slug'} value={addcategoryData.slug} onChange={handleAddCategoryChange} />
                        <Text>Image</Text>
                        <Input placeholder="Category Image" name={'image'} value={addcategoryData.image} onChange={handleAddCategoryChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddCategorySubmit}>
                            Submit
                        </Button>
                        <Button onClick={handleCloseAddModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit Category Modal */}
            <Modal isOpen={isOpenEditModal} onClose={handleCloseEditModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Category</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Name</Text>
                        <Input placeholder="Category Name" name={'name'} value={editCategory.name} onChange={handleEditCategoryChange} />
                        <Text>Slug</Text>
                        <Input placeholder="Category Slug" name={'slug'} value={editCategory.slug} onChange={handleEditCategoryChange} />
                        <Text>Image</Text>
                        <Input placeholder="Category Image" name={'image'} value={editCategory.image} onChange={handleEditCategoryChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => handleEditCategorySubmit()}>
                            update
                        </Button>
                        <Button onClick={handleCloseEditModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default CategoryTable;
