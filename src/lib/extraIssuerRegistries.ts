import type { EntityIdentityRegistry } from '@interop/verifier-core'

/**
 * Parses `VITE_EXTRA_ISSUER_REGISTRIES`: the issuer registries a deployment
 * adds to the known list, so a community instance can recognize its own
 * issuers without being listed by the DCC. The value is a JSON array of
 * `{ "name": string, "url": string }` objects, each a `dcc-legacy` list file
 * (`{ "registry": { "<did>": { "name", "url", "location" } } }`) served over
 * https. Anything else -- bad JSON, a non-https URL, a missing name -- is
 * dropped rather than failing the build, and the wallet keeps the DCC list.
 *
 * @param raw {string | undefined}
 * @returns {EntityIdentityRegistry[]}
 */
export function parseExtraIssuerRegistries(
  raw: string | undefined
): EntityIdentityRegistry[] {
  if (!raw?.trim()) {
    return []
  }
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }
  if (!Array.isArray(parsed)) {
    return []
  }
  const registries: EntityIdentityRegistry[] = []
  for (const entry of parsed) {
    if (!entry || typeof entry !== 'object') {
      continue
    }
    const { name, url } = entry as { name?: unknown; url?: unknown }
    if (typeof name !== 'string' || !name.trim() || typeof url !== 'string') {
      continue
    }
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url)
    } catch {
      continue
    }
    if (parsedUrl.protocol !== 'https:') {
      continue
    }
    registries.push({
      type: 'dcc-legacy',
      name: name.trim(),
      url: parsedUrl.href
    })
  }
  return registries
}

/**
 * Appends the deployment's extra registries to a registry list, skipping any
 * whose URL the list already has.
 *
 * @param registries {EntityIdentityRegistry[]}
 * @param extras {EntityIdentityRegistry[]}
 * @returns {EntityIdentityRegistry[]}
 */
export function withExtraIssuerRegistries(
  registries: EntityIdentityRegistry[],
  extras: EntityIdentityRegistry[]
): EntityIdentityRegistry[] {
  if (!extras.length) {
    return registries
  }
  const urls = new Set(
    registries.map(registry => ('url' in registry ? registry.url : undefined))
  )
  return [
    ...registries,
    ...extras.filter(extra => !('url' in extra) || !urls.has(extra.url))
  ]
}
