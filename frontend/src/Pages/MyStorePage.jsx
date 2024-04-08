import React, { useEffect, useState } from 'react';
import { Button, Box } from "@chakra-ui/react";
import Navbar from '../Components/Navbar';
import CategoryTable from '../Components/CategoryTable';
import ProductsTable from '../Components/ProductsTable';
import { deleteCategory, fetchCategories } from '../Redux/Category/action';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { deleteProduct, fetchProducts } from '../Redux/Product/action';

const MyStorePage = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const dispatch = useDispatch()
  const { categoryData, loading, error } = useSelector((store) => store.categoryReducer);

  const { productsData } = useSelector((store) => store.productReducer);
  const [displayCategory, setDisplayCategory] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(false);

  const handleCategory = async () => {

    dispatch(fetchCategories(token))
    setDisplayCategory(true);
    setDisplayProducts(false);
  };

  const handleProducts = async () => {
    dispatch(fetchProducts(token))
    setDisplayCategory(false);
    setDisplayProducts(true);
  };

  const handleRefreshCategory = async (val) => {
    await handleCategory()
  };

  const handleRefreshProducts = async () => {
    await handleProducts()
  }

  const handleDelete = async (categoryId) => {
    const token = JSON.parse(localStorage.getItem("token"))
    console.log(categoryId);

    dispatch(deleteCategory(categoryId, token)).then((res) => {
      alert("Category successfully deleted")
      handleRefreshCategory()
    })
  };

  const handleDeleteProduct = async (productId) => {
    console.log(productId);
    dispatch(deleteProduct(productId,token)).then((res)=>{
      alert("Product successfully deleted")
      handleRefreshProducts()
    })
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Box display={'flex'} justifyContent={'space-evenly'}>
        <Button variant='ghost' bg={'#00ABC5'} color={'white'} _hover={{
          bg: "#0189A3"
        }} onClick={handleCategory}>
          Category
        </Button>
        <Button variant='ghost' bg={'#00ABC5'} color={'white'} _hover={{
          bg: "#0189A3"
        }} onClick={handleProducts}>
          Products
        </Button>
      </Box>
      <Box>
        {displayCategory && <CategoryTable categoryData={categoryData && categoryData} handleRefreshCategory={handleRefreshCategory} handleDelete={handleDelete} />}
        {displayProducts && <ProductsTable productsData={productsData} handleRefreshProducts={handleRefreshProducts} handleDeleteProduct={handleDeleteProduct} />}
      </Box>
    </div>
  );
};

export default MyStorePage;
