import React, { useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup,Box } from '@chakra-ui/react'

const ProductCard = ({ item }) => {
    const { id, title, description, category, price, image } = item

    const [flag, setFlag] = useState(false)
    return (
        <Box margin={'10px'}>
            <Card maxW='sm'>
                <CardBody display={'flex'}  flexDirection={'column'}justifyContent={'center'}>
                    <Image
                        src={image}
                        borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md'>{title}</Heading>
                        <Text>
                            {description}
                        </Text>
                        <Text color='blue.600' fontSize='2xl'>
                            ${price}
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                {
                    flag ? <ButtonGroup spacing='2'>
                        <Button variant='ghost' colorScheme='blue' width={'50%'} bg={'#00ABC5'} color={'white'} 
                        _hover={{
                            bg: "#0189A3"
                        }}>
                            +
                        </Button>
                        <Button variant='ghost' colorScheme='blue'>
                            {""}
                        </Button>
                        <Button variant='ghost' colorScheme='blue' width={'50%'} bg={'#00ABC5'} color={'white'} _hover={{
                            bg: "#0189A3"
                        }}>
                            -
                        </Button>
                    </ButtonGroup> : <Button variant='ghost' colorScheme='blue' onClick={()=>setFlag(!flag)}>
                        Add to cart
                    </Button>
                }
            </Card>
        </Box>
    )
}

export default ProductCard