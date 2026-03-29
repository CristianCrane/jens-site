import cx from 'clsx'
import type {
  CSSVariablesResolver,
  MantineBreakpointsValues,
} from '@mantine/core'
import { colorsTuple, Container, createTheme } from '@mantine/core'
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

export const theme = createTheme({
  fontFamily: '"Nunito", sans-serif',
  primaryColor: 'empire-green',
  colors: {
    'empire-green': colorsTuple('#057f37'),
  },
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
  },
})
