import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { GridItem, Box } from '@chakra-ui/react'

const ProductsList = () => {
    const [productsData, setProductsData] = useState([])


    const fetchProducts = async () => {
        try {
            let res = await fetch(`https://arba-api-v28s.onrender.com/product`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjBmYjk5ZGM4ZTA4YmY0MjJlMmM1MjkiLCJpYXQiOjE3MTIzMDg4NDcsImV4cCI6MTcxMjQ4MTY0N30.4yNJrOFKSMrAb-1fukKyJyhwaPGShbMaW695g4Qm5gE'
                },

            })
            let data = await res.json()
            setProductsData(data.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchProducts()
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