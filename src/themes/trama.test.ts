import { expect, it } from 'vitest'
import { createTheme, getContrastRatio } from '@mui/material/styles'
import { buildMuiThemeOptions } from './themeConfig'

it.each(['light', 'dark'] as const)(
  'Trama %s primary text and controls meet AA',
  mode => {
    const theme = createTheme(buildMuiThemeOptions({ themeId: 'trama', mode }))
    const { primary, secondary, background, warning } = theme.palette
    expect(
      getContrastRatio(warning.main, warning.contrastText)
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      getContrastRatio(primary.main, primary.contrastText)
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      getContrastRatio(secondary.main, secondary.contrastText)
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      getContrastRatio(secondary.main, background.paper)
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      getContrastRatio(primary.main, background.paper)
    ).toBeGreaterThanOrEqual(4.5)
    expect(
      getContrastRatio(primary.main, background.default)
    ).toBeGreaterThanOrEqual(4.5)
  }
)

it('Trama headings use the display face and body text the legible one', () => {
  const theme = createTheme(
    buildMuiThemeOptions({ themeId: 'trama', mode: 'light' })
  )
  expect(theme.typography.h4.fontFamily).toMatch(/^"Fraunces"/)
  expect(theme.typography.body1.fontFamily).toMatch(/^"Atkinson Hyperlegible"/)
})
