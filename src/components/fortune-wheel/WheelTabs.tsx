import { Box,Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { getHealthPhrases, getRecipePhrases } from '~/consts/consts';

import { FortuneWheelComponent } from './FortuneWheel';

export const WheelTabs = () => (
    <Tabs variant="enclosed" colorScheme="blue" isLazy>
      <TabList>
        <Tab fontWeight="bold" px={2}>🎯 ЗОЖ Задачи</Tab>
        <Tab fontWeight="bold" px={2}>🥗 Рецепты ПП</Tab>
      </TabList>

      <TabPanels>
        <TabPanel px={0}>
          <Box py={4}>
            <FortuneWheelComponent 
              items={getHealthPhrases()}
              wheelId="health" 
            />
          </Box>
        </TabPanel>
        
        <TabPanel px={0}>
          <Box py={4}>
            <FortuneWheelComponent 
              items={getRecipePhrases()}
              wheelId="recipes"
            />
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );