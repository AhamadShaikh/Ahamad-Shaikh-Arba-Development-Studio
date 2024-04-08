import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { GridItem, Box } from '@chakra-ui/react'
import { useDispatch,useSelector } from "react-redux"
import { fetchProducts } from '../Redux/Product/action'

const ProductsList = () => {
    const token = JSON.parse(localStorage.getItem("token"))
    const dispatch = useDispatch()

    const { productsData } = useSelector((store) => store.productReducer);


    const fetchData = async () => {
        dispatch(fetchProducts(token))
    }


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box display={'grid'} gridTemplateColumns={'repeat(4,1fr)'}>
            {
                productsData?.map((item, ind) => (
                    <ProductCard key={ind} item={item} />
                ))
            }
        </Box>
    )
}

export default ProductsList