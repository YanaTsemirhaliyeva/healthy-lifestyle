import { Box, Button, Container, Heading, Show, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';

import { WheelTabs } from '~/components/fortune-wheel/WheelTabs';
import { AppRoute } from '~/consts/consts';

export const FortuneWheel = () => (
  <Container maxW="7xl" py={8} pos='relative' zIndex={2} px={{ base: 1, xs: 4 }}>
    <Button as={Link} to={AppRoute.Index} mb={6} colorScheme="blue" variant="outline">
      ← На главную
    </Button>
    <VStack spacing={8} align="stretch">
      <Box textAlign="center">
        <Heading color="blue.700" mb={4}>
          🎡 Колесо Фортуны<Show below='xs'><br /></Show> для ЗОЖ
        </Heading>
        <Text color="blue.600" maxW="3xl" mx="auto" fontWeight={600} fontSize={18}>
          Выберите категорию, крутите колесо и получайте полезные задания на день!
          Подробности откроются автоматически после остановки колеса.
        </Text>
      </Box>
      <Box mt={8}>
        <Heading size="md" mb={4} color="gray.700">
          💡 Как пользоваться:
        </Heading>
        <Box
          bg="blue.50"
          p={6}
          borderRadius="lg"
          borderLeftWidth={4}
          borderLeftColor="blue.400"
        >
          <VStack align="stretch" spacing={3}>
            <Text>1. <b>Выберите категорию</b> - переключитесь между вкладками</Text>
            <Text>2. <b>Крутите колесо</b> - нажмите "Крутить колесо!"</Text>
            <Text>3. <b>Подождите остановки</b> - колесо сделает несколько оборотов</Text>
            <Text>4. <b>Изучите детали</b> - модальное окно откроется автоматически</Text>
            <Text>5. <b>Выполняйте</b> - старайтесь сделать задание в течение дня</Text>
            <Text>6. <b>Повторите</b> - крутите колесо каждый день для новых задач!</Text>
          </VStack>
        </Box>
      </Box>

      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        p={{ base: 4, md: 6 }}
        borderWidth={1}
        borderColor="gray.100"
      >
        <WheelTabs />
      </Box>
    </VStack>
  </Container>
);