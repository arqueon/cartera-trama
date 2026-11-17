import { describe, expect, it } from 'vitest'
import {
  parseExtraIssuerRegistries,
  withExtraIssuerRegistries
} from '@/lib/extraIssuerRegistries'

describe('parseExtraIssuerRegistries', () => {
  it('reads a JSON array of named https registries as dcc-legacy', () => {
    expect(
      parseExtraIssuerRegistries(
        '[{"name":" Registro de emisores ","url":"https://example.org/registro/emisores.json"}]'
      )
    ).toEqual([
      {
        type: 'dcc-legacy',
        name: 'Registro de emisores',
        url: 'https://example.org/registro/emisores.json'
      }
    ])
  })

  it('is empty when unset, blank, not JSON or not an array', () => {
    expect(parseExtraIssuerRegistries(undefined)).toEqual([])
    expect(parseExtraIssuerRegistries('  ')).toEqual([])
    expect(parseExtraIssuerRegistries('{not json')).toEqual([])
    expect(
      parseExtraIssuerRegistries('{"name":"x","url":"https://x.org"}')
    ).toEqual([])
  })

  it('drops entries without a name or with a non-https URL', () => {
    expect(
      parseExtraIssuerRegistries(
        JSON.stringify([
          { url: 'https://a.example/r.json' },
          { name: 'Plain http', url: 'http://b.example/r.json' },
          { name: 'Not a URL', url: 'registro.json' },
          { name: 'Good', url: 'https://c.example/r.json' },
          null
        ])
      )
    ).toEqual([
      { type: 'dcc-legacy', name: 'Good', url: 'https://c.example/r.json' }
    ])
  })
})

describe('withExtraIssuerRegistries', () => {
  const base = [
    {
      type: 'dcc-legacy' as const,
      name: 'DCC',
      url: 'https://dcc.example/r.json'
    }
  ]

  it('appends extras and skips a URL the list already has', () => {
    const extras = [
      {
        type: 'dcc-legacy' as const,
        name: 'Dup',
        url: 'https://dcc.example/r.json'
      },
      {
        type: 'dcc-legacy' as const,
        name: 'Own',
        url: 'https://own.example/r.json'
      }
    ]
    expect(withExtraIssuerRegistries(base, extras)).toEqual([
      base[0],
      extras[1]
    ])
  })

  it('returns the same list when there are no extras', () => {
    expect(withExtraIssuerRegistries(base, [])).toBe(base)
  })
})
