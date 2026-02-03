import { Box, Flex } from "@chakra-ui/react";

export const Footer = () => (
    <Box
        as='footer'
        bgColor='#bfcdf9'
        width='100%'
        minW='359px'
        sx={{
            boxShadow: {
                base: '0 -3px 6px rgb(82 121 251 / 40%)',
                sm: '0 -5px 12px rgb(187 202 251 / 40%)'
            }
        }}
    >
        <Flex
            m='0 auto'
            alignItems='center'
            p={{ base: '14px 18px', sm: '16px' }}
            pr={{ '2xs': 6, md: '76px' }}
            maxW='5xl'
            fontSize={12}
            fontWeight={500}
            opacity={0.8}
        >
             Контент носит развлекательный характер. Создано с помощью ИИ <br/>
            © {new Date().getFullYear()}. Все права защищены.
        </Flex>
    </Box>
)