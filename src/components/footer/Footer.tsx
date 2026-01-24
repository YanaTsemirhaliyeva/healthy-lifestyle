import { Box, Flex } from "@chakra-ui/react";

export const Footer = () => (
    <Box
        as='footer'
        bgColor='lime.100'
        width='100%'
        minW='359px'
        sx={{
            boxShadow: {
                base: '0 -3px 6px rgba(225, 255, 148, 0.6)',
                md: '0 -5px 12px rgba(225, 255, 148, 0.7)'
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
             Контент носит развлекательный характер <br/>
            © {new Date().getFullYear()}. Все права защищены.
        </Flex>
    </Box>
)