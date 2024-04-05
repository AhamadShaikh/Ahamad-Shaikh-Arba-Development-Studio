import React from 'react'
import Navbar from '../Components/Navbar'
import { Box } from "@chakra-ui/react"
import Slider from '../Components/Slider'
import ProductsList from '../Components/ProductsList'

const HomePage = () => {
    return (
        <div>
            <Box>
                <Navbar />
            </Box>
            <Box>
                {/* <Slider/> */}
            </Box>
            <Box>
                <ProductsList/>
            </Box>
        </div>
    )
}

export default HomePage