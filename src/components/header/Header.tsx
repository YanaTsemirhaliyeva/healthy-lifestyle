import {
    Box,
    Flex,
    Image,
    Show,
    Text,
} from '@chakra-ui/react';


export const Header = () =>

(
    <Box
        as='header'
        pos='relative'
        width='100%'
        minW='359px'
        zIndex='1'
        sx={{
            boxShadow: {
                base: '0 0 3px rgba(82, 121, 251, 0.6), 0 0 15px rgba(82, 121, 251, 0.5)',
                md: '0 0 6px rgba(82, 121, 251, 0.8), 0 0 25px rgba(82, 121, 251, 0.6)'
            }
        }}
        overflow='hidden'
        minH='300px'
    >
        <Image
            src='img/stat.png'
            pos='absolute'
            left={0}
            top={0}
            w='100%'
            h='100%'
            objectFit='cover'
            objectPosition='10% 25%'
        />
        <Flex
            m='0 auto'
            alignItems='center'
            p={{ base: '14px 18px', sm: '16px' }}
            maxW='5xl'
            pos='absolute'
            left={{ base: 2, sm: '10%' }}
            mr={20}
            top='40%'
            bg='rgba(30, 64, 175, 0.4)'
            backdropFilter='blur(5px)'
            borderRadius='md'
        >
            <Text
                fontWeight={800}
                fontSize={{ base: 15, sm: 22 }}
                color='white'
                textAlign='center'
                textShadow='2px 2px 4px rgba(0,0,0,0.8)'
                lineHeight='148%'
                textTransform='uppercase'
            >
                Здоровый дух <Show below='xs'><br/></Show>в здоровом теле: <br/>белорусские статистики<Show below='xs'><br/></Show> выбирают ЗОЖ
            </Text>
        </Flex>
    </Box>
)
