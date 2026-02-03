import {
    Card,
    CardBody,
    Heading,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

type VerticalCard = {
    id: number;
    title: string;
    desc: string;
    src: string;
    route: string
};

type VerticalCardProps = {
    item: VerticalCard;
};

export const VerticalCard = ({ item }: VerticalCardProps) => {
    const { src, title, desc, route } = item;
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(route)
    };

    return (
        <Card
            onClick={handleCardClick}
            cursor='pointer'
            display='flex'
            flexDirection='column'
            h='100%'
            width='100%'
            flex='1 1 auto'
            transition='box-shadow 0.3s ease-in-out'
            _hover={{
                boxShadow: `
                  0 4px 6px -1px rgba(41, 52, 193, 0.3),
                  0 2px 4px -1px rgba(40, 23, 137, 0.36)
                `,
            }}
        >
            <CardBody p='0'>
                <Image
                    src={src}
                    alt={title}
                    width='100%'
                    h={{ base: '128px', sm: '230px' }}
                    objectFit='cover'
                    borderTopRadius='lg'
                />
                <Stack
                    spacing={{ base: 2 }}
                    px={{ base: '8px', xl: 6 }}
                    pt={{ base: 2, sm: 4, lg: 3 }}
                    pb={{ base: 2, lg: 1 }}
                >
                    <Heading
                        fontSize={{ sm: '18px', lg: '20px' }}
                        noOfLines={{ base: 2, sm: 1 }}
                        lineHeight={{ base: '24px', sm: '148%' }}
                    >

                        <Text as='span'>
                            {title}
                        </Text>

                    </Heading>
                    <Text noOfLines={3} fontSize={14} lineHeight='20px'>
                        {desc}
                    </Text>
                </Stack>
            </CardBody>

        </Card>
    );
};
