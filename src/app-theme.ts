import type {
  CSSVariablesResolver,
  MantineBreakpointsValues,
  MantineColorsTuple,
} from '@mantine/core'
import { Button, Container, createTheme } from '@mantine/core'
import cx from 'clsx'
import classes from './App.module.css'

export const breakpoints: MantineBreakpointsValues = {
  xs: '600px',
  sm: '768px',
  md: '1024px',
  lg: '1200px',
  xl: '1400px',
}

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--mantine-color-gray-text': '#474747',
  },
  light: {
    '--mantine-color-gray-text': '#474747',
  },
  dark: {
    '--mantine-color-gray-text': '#474747',
  },
})

const empireGreen: MantineColorsTuple = [
  '#ebfef3',
  '#d6fce6',
  '#a8f9c9',
  '#78f7aa',
  '#54f690',
  '#41f57f',
  '#37f476',
  '#2cd964',
  '#21c157',
  '#057f37',
]

export const theme = createTheme({
  fontFamily: '"Nunito", sans-serif',
  primaryColor: 'empire-green',
  cursorType: 'pointer',
  defaultRadius: 'md',
  colors: {
    'empire-green': empireGreen,
  },
  primaryShade: 9,
  headings: {
    sizes: {
      h2: {
        fontSize: '1.4rem',
        fontWeight: '900',
      },
    },
  },
  breakpoints,
  components: {
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: cx({ [classes.responsiveContainer]: size === 'responsive' }),
      }),
    }),
    Button: Button.extend({
      defaultProps: {
        size: 'lg',
      },
    }),
  },
})
