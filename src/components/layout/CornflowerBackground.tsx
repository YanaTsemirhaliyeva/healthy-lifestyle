// components/StaticCornflowers.tsx
import { Box, Image } from '@chakra-ui/react';
import React from 'react';

export const CornflowersBg: React.FC = () => (
    <>
      {/* Левые васильки */}
      
      {/* Верхний левый - большой */}
      <Box
        position="absolute"
        left="-250px"
        top="0px"
        opacity={0.2}
        zIndex={0}
        pointerEvents="none"
        transform="rotate(90deg)"
      >
        <Image
          src="img/vasilek-3.png"
          alt=""
          w="230%"
          h="auto"
          filter="brightness(1.1) drop-shadow(0 2px 4px rgba(74, 111, 255, 0.1))"
        />
      </Box>
      
      {/* Средний левый - средний */}
      {/* <Box
        position="absolute"
        left="-40px"
        top="45%"
        opacity={0.3}
        zIndex={0}
        pointerEvents="none"
        transform="rotate(8deg)"
      >
        <Image
          src="img/vasilek-3.png"
          alt=""
          w="12%"
          h="auto"
          filter="brightness(1.1) drop-shadow(0 2px 4px rgba(74, 111, 255, 0.1))"
        />
      </Box> */}
      
      {/* Нижний левый - маленький */}
      {/* <Box
        position="absolute"
        left="-450px"
        bottom="0"
        opacity={0.4}
        zIndex={0}
        pointerEvents="none"
        transform="rotate(90deg)"
      >
        <Image
          src="img/vasilek-3.png"
          alt=""
          w="14%"
          h="auto"
          filter="brightness(1.1) drop-shadow(0 2px 4px rgba(74, 111, 255, 0.1))"
        />
      </Box>
       */}
      {/* Правые васильки */}
      
      {/* Верхний правый - средний */}
      {/* <Box
        position="absolute"
        right="-20px"
        top="22%"
        opacity={0.27}
        zIndex={0}
        pointerEvents="none"
        transform="rotate(180deg)"
      >
        <Image
          src="img/vasilek-3.png"
          alt=""
          w="140px"
          h="auto"
          filter="brightness(1.1) drop-shadow(0 2px 4px rgba(74, 111, 255, 0.1))"
        />
      </Box> */}
      
      {/* Средний правый - большой */}
      <Box
        position="absolute"
        right="-200px"
        top="50%"
        opacity={0.4}
        zIndex={0}
        pointerEvents="none"
        transform="rotate(-90deg)"
      >
        <Image
          src="img/vasilek-3.png"
          alt=""
          w="370%"
          h="auto"
          filter="brightness(1.1) drop-shadow(0 2px 4px rgba(74, 111, 255, 0.1))"
        />
      </Box>
      
      {/* Нижний правый - маленький */}
      {/* <Box
        position="absolute"
        right="-40px"
        top="75%"
        opacity={0.3}
        zIndex={0}
        pointerEvents="none"
        transform="rotate(25deg)"
      >
        <Image
          src="img/vasilek-3.png"
          alt=""
          w="120px"
          h="auto"
          filter="brightness(1.1) drop-shadow(0 2px 4px rgba(74, 111, 255, 0.1))"
        />
      </Box> */}
    </>
  );