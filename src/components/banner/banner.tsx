import { Box, Button, Container, Image, Link, Text } from '@chakra-ui/react';

type Item = {
  id: number;
  src: string;
  title: string;
  link: string;
}

type BannerProps = {
  item: Item
}
export const Banner = ({ item }: BannerProps) => {
  const isOdd = item.id % 2 !== 0;
  return (

    <Box h='300px' pos='relative' overflow='hidden'>
      <Image
        alt="баннер"
        src={item.src}
        h='100%'
        w='100%'
        pos='absolute'
        top={0}
        left={0}
        objectFit='cover'
        objectPosition='center 5%'
      />
      <Container
        maxW='5xl'
        h='100%'
        pos='relative'
        display='flex'
        alignItems={{ base: 'center', md: isOdd ? 'flex-start' : 'flex-end' }}
        justifyContent={isOdd ? 'flex-end' : 'flex-start'}
        px={{ base: 3, md: 8 }}
        py={10}
      >
        <Box
          maxW={{ base: '300px', sm: '450px' }}
          textAlign={isOdd ? 'right' : 'left'}
        >
          <Text fontSize={{ base: 'md', sm: '2xl' }} fontWeight='bold' mb={5} color='#053158'>
            {item.title}
          </Text>
          <Button
            as={Link}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
                  '&:hover': {
                textDecor: 'none'
              },
              fontSize: '16px',
              fontWeight: '500',
            }}
            colorScheme='blue'
          >
            Подробнее
          </Button>
        </Box>
      </Container>
    </Box>
  )
}