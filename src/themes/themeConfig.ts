import type { ThemeOptions } from '@mui/material/styles'
import type { AppThemeId } from '@/themes/appTheme'

type ThemeMode = 'light' | 'dark'

type ThemePrimary = {
  contrastText?: string
  main: string
  light?: string
  dark?: string
}

export type ThemePaletteValues = {
  background: {
    default: string
    paper: string
  }
  primary: ThemePrimary
  secondary?: ThemePrimary
  warning?: ThemePrimary
}

export type ThemeDefinition = {
  fontFamily: string
  /** Display face for h1–h6; body text keeps fontFamily. */
  headingFontFamily?: string
  palette: Record<ThemeMode, ThemePaletteValues>
  muiComponents?: ThemeOptions['components']
}

const WEST_COAST_FONT =
  '"Helvetica Neue", Helvetica, "Inter Variable", Inter, system-ui, sans-serif'

const DEFAULT_FONT =
  '"Inter Variable", "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const TRAMA_FONT =
  '"Atkinson Hyperlegible", "Inter Variable", system-ui, sans-serif'

const TRAMA_HEADING_FONT = '"Fraunces", Georgia, serif'

// Trama's añil, fixed in both modes: the logo on the bar is the white one.
const TRAMA_BAR = '#2b3a73'

export const THEME_DEFINITIONS: Record<AppThemeId, ThemeDefinition> = {
  trama: {
    fontFamily: TRAMA_FONT,
    headingFontFamily: TRAMA_HEADING_FONT,
    muiComponents: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: TRAMA_BAR,
            backgroundImage: 'none',
            color: '#fffdf8',
            '& .MuiTypography-root, & .MuiIconButton-root, & .MuiButton-root, & .MuiInputBase-root, & .MuiSelect-icon':
              {
                color: 'inherit'
              },
            '& .MuiButton-outlined, & .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 253, 248, 0.65)'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 700 }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 6 }
        }
      }
    },
    palette: {
      light: {
        // Papel, añil and grana from the Trama brand (decision 0008). Maíz
        // (#d9a23a) is too light for text, so warning uses a darker shade.
        background: { default: '#f5efe3', paper: '#fffdf8' },
        primary: { main: '#2b3a73', contrastText: '#fffdf8' },
        secondary: { main: '#9e2f35', contrastText: '#fffdf8' },
        warning: { main: '#8a5710', contrastText: '#fffdf8' }
      },
      dark: {
        background: { default: '#14182a', paper: '#1e2338' },
        primary: { main: '#a9b7f2', contrastText: '#14182a' },
        secondary: { main: '#ec8f88', contrastText: '#14182a' },
        warning: { main: '#e2b45a', contrastText: '#14182a' }
      }
    }
  },
  udg: {
    fontFamily: DEFAULT_FONT,
    muiComponents: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#202945',
            backgroundImage: 'none',
            color: '#ffffff',
            '& .MuiTypography-root, & .MuiIconButton-root, & .MuiButton-root, & .MuiInputBase-root, & .MuiSelect-icon':
              {
                color: 'inherit'
              },
            '& .MuiButton-outlined, & .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.65)'
            }
          }
        }
      }
    },
    palette: {
      light: {
        background: { default: '#f4f7fa', paper: '#ffffff' },
        // Universidad de Guadalajara palette: azul 288C; secondary is a darker
        // shade derived from olivo 7495C (#8F993E) so white text passes AA.
        primary: { main: '#202945', contrastText: '#ffffff' },
        secondary: { main: '#5f6629', contrastText: '#ffffff' },
        warning: { main: '#9c4500', contrastText: '#ffffff' }
      },
      dark: {
        background: { default: '#101820', paper: '#192734' },
        primary: { main: '#9ccaff', contrastText: '#102030' },
        // Oro 116C.
        secondary: { main: '#fdcf85', contrastText: '#202945' },
        warning: { main: '#ffb74d', contrastText: '#102030' }
      }
    }
  },
  default: {
    fontFamily: DEFAULT_FONT,
    palette: {
      light: {
        background: { default: '#f7f7f7', paper: '#ffffff' },
        primary: { main: '#1976d2' }
      },
      dark: {
        background: { default: '#101418', paper: '#171c21' },
        primary: { main: '#90caf9' }
      }
    }
  },
  'west-coast': {
    fontFamily: WEST_COAST_FONT,
    palette: {
      light: {
        background: { default: '#FAF6EF', paper: '#FFFFFF' },
        primary: { main: '#F25C2A', light: '#FBE6DC', dark: '#e44d1d' }
      },
      dark: {
        background: { default: '#0E0D11', paper: '#1B1A22' },
        primary: { main: '#F25C2A', light: '#FBE6DC', dark: '#e44d1d' }
      }
    },
    muiComponents: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 'var(--fw-radius-md)',
            fontWeight: 700,
            letterSpacing: '0.4px'
          },
          sizeLarge: {
            height: 50,
            minWidth: 160,
            padding: '0 22px',
            fontSize: 13
          },
          contained: {
            '&:not(:disabled)': {
              boxShadow: 'var(--fw-shadow-primary)'
            },
            '&:hover': {
              boxShadow: 'var(--fw-shadow-primary)'
            }
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 'var(--fw-radius-lg)'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 'var(--fw-radius-md)',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--fw-orange)'
            }
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: '1px solid var(--fw-hairline)'
          }
        }
      }
    }
  }
}

export function buildMuiThemeOptions({
  themeId,
  mode
}: {
  themeId: AppThemeId
  mode: ThemeMode
}): ThemeOptions {
  const definition = THEME_DEFINITIONS[themeId]
  const palette = definition.palette[mode]
  const themeButtonOverrides =
    definition.muiComponents?.MuiButton?.styleOverrides

  return {
    palette: {
      mode,
      background: palette.background,
      primary: palette.primary,
      ...(palette.secondary && { secondary: palette.secondary }),
      ...(palette.warning && { warning: palette.warning })
    },
    typography: {
      fontFamily: definition.fontFamily,
      ...(definition.headingFontFamily &&
        Object.fromEntries(
          (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map(variant => [
            variant,
            { fontFamily: definition.headingFontFamily }
          ])
        ))
    },
    components: {
      ...definition.muiComponents,
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          ...themeButtonOverrides,
          root: {
            whiteSpace: 'nowrap',
            textTransform: 'none',
            ...(typeof themeButtonOverrides?.root === 'object'
              ? themeButtonOverrides.root
              : {})
          }
        }
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none'
          }
        }
      }
    }
  }
}
