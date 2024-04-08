import React, { useState } from 'react';
import { Flex, Input, Button, Table, Tr, Th, Thead, Tbody, Td, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux"
import { handleAddProduct, handleEditProduct } from '../Redux/Product/action';

const initialProduct = {
    title: '',
    description: '',
    price: 0,
    category: '',
    image: ''
};

const ProductsTable = ({ productsData, handleRefreshProducts, handleDeleteProduct }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [isOpenAddModal, setIsOpenAddModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState(initialProduct);
    const [editedProductId, setEditedProductId] = useState(null);
    const [filteredProductsData, setFilteredProductsData] = useState(productsData);
    const [addProductData, setAddProductData] = useState(initialProduct);
    const [flagP, setFlagP] = useState(false);

    const dispatch = useDispatch()

    const handleProductFilter = (value) => {
        if (value) {
            setFlagP(true)
        } else {
            setFlagP(false)
        }

        const filteredData = productsData.filter(product => product.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredProductsData(filteredData);
    };

    const handleEdit = (productId) => {
        setEditedProductId(productId);
        setIsOpenEditModal(true);
        const productToEdit = productsData.find(product => product._id === productId);
        setEditProduct(productToEdit);
    };

    const handleEditProductChange = (e) => {
        const { name, value } = e.target;
        setEditProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditProductSubmit = async () => {
        dispatch(handleEditProduct(editedProductId, editProduct, token)).then((res) => {
            alert('Product updated successfully.');
            handleCloseEditModal();
            handleRefreshProducts();
        })
    };

    const handleAddProductModal = () => {
        setIsOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setIsOpenAddModal(false);
    };

    const handleCloseEditModal = () => {
        setIsOpenEditModal(false);
        setEditedProductId(null);
    };

    const handleAddProductChange = (e) => {
        const { name, value } = e.target;
        setAddProductData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddProductSubmit = async () => {

        dispatch(handleAddProduct(addProductData, token)).then((res) => {
            alert('Product added successfully.');
            handleRefreshProducts();
            handleCloseAddModal();
        })
    };


    return (
        <Flex alignItems="center" justifyContent="center" boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}>
            <Box margin={'20px'} padding={'20px'} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
                <Flex mb={4} justifyContent={'space-around'}>
                    <Input width="50%" placeholder="Search by name" onChange={(e) => handleProductFilter(e.target.value)} border="1px solid black" />
                    <Button ml={4} colorScheme="blue" variant="outline" onClick={() => handleRefreshProducts()}>Refresh</Button>
                    <Button colorScheme="blue" variant="outline" onClick={handleAddProductModal} ml={'10px'}>
                        Add Product
                    </Button>
                </Flex>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Title</Th>
                            <Th>Description</Th>
                            <Th>Price</Th>
                            <Th>Category</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {flagP ? (
                            filteredProductsData && filteredProductsData.map((product) => (
                                <Tr key={product._id}>
                                    <Td>{product.title}</Td>
                                    <Td>{product.description}</Td>
                                    <Td>{product.price}</Td>
                                    <Td>{product.category}</Td>
                                    <Td>
                                        <Button colorScheme="teal" variant="outline" mr={2} onClick={() => handleEdit(product._id)}>Edit</Button>
                                        <Button colorScheme="red" variant="outline" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            productsData && productsData.map((product) => (
                                <Tr key={product._id}>
                                    <Td>{product.title}</Td>
                                    <Td>{product.description}</Td>
                                    <Td>{product.price}</Td>
                                    <Td>{product.category}</Td>
                                    <Td>
                                        <Button colorScheme="teal" variant="outline" mr={2} onClick={() => handleEdit(product._id)}>Edit</Button>
                                        <Button colorScheme="red" variant="outline" onClick={() => handleDeleteProduct(product._id)}>Delete</Button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </Box>

            {/* Add Product Modal */}
            <Modal isOpen={isOpenAddModal} onClose={handleCloseAddModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Title</Text>
                        <Input type='text' name={'title'} value={addProductData.title} onChange={handleAddProductChange} />
                        <Text>Description</Text>
                        <Input type='text' name={'description'} value={addProductData.description} onChange={handleAddProductChange} />
                        <Text>Price</Text>
                        <Input type='number' name={'price'} value={addProductData.price} onChange={handleAddProductChange} />
                        <Text>Category</Text>
                        <Input type='text' name={'category'} value={addProductData.category} onChange={handleAddProductChange} />
                        <Text>Image</Text>
                        <Input type='text' name={'image'} value={addProductData.image} onChange={handleAddProductChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleAddProductSubmit}>
                            Submit
                        </Button>
                        <Button onClick={handleCloseAddModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Edit Product Modal */}
            <Modal isOpen={isOpenEditModal} onClose={handleCloseEditModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>Title</Text>
                        <Input type='text' name={'title'} value={editProduct.title} onChange={handleEditProductChange} />
                        <Text>Description</Text>
                        <Input type='text' name={'description'} value={editProduct.description} onChange={handleEditProductChange} />
                        <Text>Price</Text>
                        <Input type='number' name={'price'} value={editProduct.price} onChange={handleEditProductChange} />
                        <Text>Category</Text>
                        <Input type='text' name={'category'} value={editProduct.category} onChange={handleEditProductChange} />
                        <Text>Image</Text>
                        <Input type='text' name={'image'} value={editProduct.image} onChange={handleEditProductChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleEditProductSubmit}>
                            Update
                        </Button>
                        <Button onClick={handleCloseEditModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default ProductsTable;
