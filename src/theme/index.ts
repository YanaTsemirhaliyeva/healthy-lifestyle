import { extendTheme, ThemeConfig } from '@chakra-ui/react';

import colors from './colors';

const breakpoints = {
    '2xl': '1920px',
    xl: '1536px',
    lg: '1440px',
    '2md': '1360px',
    md: '1200.9px',
    sm: '960px',
    xs: '768px',
    xxs: '740px',
    '2xs': '620px',
    '3xs': '360px',
    base: '0px',
};

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    config,
    colors,
    breakpoints,
    styles: {
        global: {
            'input:focus-visible': {
                boxShadow: 'none !important',
                outline: 'none !important',
            },
            '[data-focus-visible]': {
                boxShadow: 'none !important',
                outline: 'none !important',
            },
        },
    },
    components: {
        Switch: {
            baseStyle: {
                track: {
                    _checked: {
                        bg: 'lime.400',
                    },
                },
            },
        },
        Progress: {
            variants: {
                limeWhiteStripe: {
                    filledTrack: {
                        bg: 'lime.300',
                        backgroundImage: `linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.5) 25%,
              transparent 25%,
              transparent 50%,
              rgba(255, 255, 255, 0.5) 50%,
              rgba(255, 255, 255, 0.5) 75%,
              transparent 75%,
              transparent
            )`,
                        backgroundSize: '1rem 1rem',
                        animation: 'progress-bar-stripes 1s linear infinite',
                    },
                },
            },
        },
        Modal: {
            baseStyle: {
                dialogContainer: {
                    minW: '360px',
                },
            },
        },
    },
    keyframes: {
        'progress-bar-stripes': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '1rem 0' },
        },
    },
});

export default theme;
