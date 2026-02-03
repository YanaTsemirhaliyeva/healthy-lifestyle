import { Box,Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { getHealthPhrases, getRecipePhrases } from '~/consts/consts';

import { FortuneWheelComponent } from './FortuneWheel';

export const WheelTabs = () => (
    <Tabs variant="enclosed" colorScheme="blue" isLazy>
      <TabList>
        <Tab fontWeight="bold">🎯 ЗОЖ Задачи</Tab>
        {/* <Tab fontWeight="bold">💪 Упражнения</Tab> */}
        <Tab fontWeight="bold">🥗 Рецепты ПП</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box p={4}>
            <FortuneWheelComponent 
              items={getHealthPhrases()}
              wheelId="health" // Уникальный ID для ЗОЖ колеса
            />
          </Box>
        </TabPanel>
        
        {/* <TabPanel>
          <Box p={4}>
            <FortuneWheelComponent 
              items={getExercisePhrases()}
              wheelId="exercise" // Уникальный ID для упражнений
            />
          </Box>
        </TabPanel> */}
        
        <TabPanel>
          <Box p={4}>
            <FortuneWheelComponent 
              items={getRecipePhrases()}
              wheelId="recipes" // Уникальный ID для рецептов
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );