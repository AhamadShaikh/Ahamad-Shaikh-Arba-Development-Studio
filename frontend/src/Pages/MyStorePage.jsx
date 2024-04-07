import React, { useEffect, useState } from 'react';
import { Button, Box } from "@chakra-ui/react";
import Navbar from '../Components/Navbar';
import CategoryTable from '../Components/CategoryTable';
import ProductsTable from '../Components/ProductsTable';

const MyStorePage = () => {
  const token = JSON.parse(localStorage.getItem("token"));

  const [categoryData, setCategoryData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [displayCategory, setDisplayCategory] = useState(false);
  const [displayProducts, setDisplayProducts] = useState(false);

  const handleCategory = async () => {
    try {
      let res = await fetch(`https://arba-api-v28s.onrender.com/category`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      let data = await res.json();
      console.log(data.data);
      setCategoryData(data.data);
      setDisplayCategory(true);
      setDisplayProducts(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProducts = async () => {
    try {
      let res = await fetch(`https://arba-api-v28s.onrender.com/product`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      let data = await res.json();
      setProductsData(data.data);
      setDisplayCategory(false);
      setDisplayProducts(true);
    } catch (error) {
      console.log(error);
    }
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
    try {
      let res = await fetch(`https://arba-api-v28s.onrender.com/category/delete/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      if (res) {
        alert("Category deleted")
      }
      handleRefreshCategory()
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProduct = async (productId) => {
console.log(productId);
    try {
      const res = await fetch(`https://arba-api-v28s.onrender.com/product/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        }
      });
      if (res) {
        alert('Product deleted successfully.');
      }
      handleRefreshProducts()
    } catch (error) {
      console.log(error);
      alert('An error occurred while deleting the product.');
    }
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
        {displayCategory && <CategoryTable categoryData={categoryData} handleRefreshCategory={handleRefreshCategory} handleDelete={handleDelete} setCategoryData={setCategoryData} />}
        {displayProducts && <ProductsTable productsData={productsData} handleRefreshProducts={handleRefreshProducts} handleDeleteProduct={handleDeleteProduct} />}
      </Box>
    </div>
  );
};

export default MyStorePage;
