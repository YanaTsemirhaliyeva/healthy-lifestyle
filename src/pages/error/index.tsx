import { Image, Link, Text, VisuallyHidden, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router';

import { HelmetComponent } from '~/components/helmet-component/HelmetComponent';
import { AppRoute } from '~/consts/consts';
import { PAGE_META } from '~/consts/page-meta';

export const ErrorPage = () => (
    <>
        <HelmetComponent {...PAGE_META.NotFound} />
        <VStack
            as='section'
            justifyContent='center'
            alignItems='center'
            m='0 auto'
            maxW={{ base: '250px', md: '400px' }}
            pb={{ md: '80px' }}
            flexGrow={1}
        >
            <VisuallyHidden as='h1'>Страница не найдена</VisuallyHidden>
            <Image
                src='img/not-found/not-found.jpg'
                boxSize={{ base: '108px', md: '208px' }}
                mb={8}
            />
            <VStack gap={4}>
                <Text color='black' fontSize={24} fontWeight={700} textAlign='center' as='h1'>
                    Упс! Такой страницы нет
                </Text>
                <Text color='blackAlpha.700' textAlign='center'>
                    Можете поискать другой тест&nbsp;
                    <Link
                        borderBottom='1px solid'
                        borderColor='blackAlpha.700'
                        as={RouterLink}
                        to={AppRoute.Index}
                        transition='color 0.3s ease-in-out, borderColor 0.3s ease-in-out'
                        _hover={{
                            textDecor: 'none',
                            color: 'black',
                            borderColor: 'black',
                        }}
                    >
                        здесь
                    </Link>
                </Text>
            </VStack>
        </VStack>
    </>
);
