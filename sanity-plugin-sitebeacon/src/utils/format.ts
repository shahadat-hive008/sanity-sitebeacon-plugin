import type {DeviceReport, DeviceStrategy, Metrics, Resource, UrlReport} from '../types'

/** Shown when the API did not measure something. Never substitute 0. */
export const NOT_MEASURED = '--'

/**
 * Normalise a scan status for comparison.
 *
 * `status` is a free-form string, not an enum, and casing is not guaranteed -
 * the reference implementation lowercases before comparing for the same reason.
 * Compare normalised values so a row reported as `Completed` is not mistaken for
 * an unscanned one.
 */
export function normalizeStatus(status: string | null | undefined): string {
  return (status ?? '').trim().toLowerCase()
}

/** Badge tone for a carbon reading. */
export type CarbonTone = 'positive' | 'caution' | 'critical'

/**
 * Band grams CO2e per page view.
 *
 * Carbon is the only colour-coded metric. Lighthouse scores (perf/acs/seo/bp)
 * render as plain text, because `@sanity/ui` exposes no tone or colour prop on
 * `Text`.
 *
 * Takes a measured number and returns a badge tone directly. An unmeasured value
 * never reaches here - callers render the shared placeholder first - so there is
 * no 'unavailable' case to map.
 */
export function getCarbonTone(grams: number): CarbonTone {
  if (grams < 0.493) return 'positive'
  if (grams < 0.656) return 'caution'
  return 'critical'
}

/** Format a number, or NOT_MEASURED when it was never measured. */
export function formatValue(value: number | null | undefined, decimals = 0): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return NOT_MEASURED
  }

  return value.toFixed(decimals)
}

/** Grams CO2e per page view, banded from good to very poor. */
export function getCarbonRating(grams: number | null | undefined): string | null {
  if (grams === null || grams === undefined || Number.isNaN(grams)) {
    return null
  }

  if (grams <= 0.186) return 'Excellent'
  if (grams <= 0.341) return 'Very Good'
  if (grams <= 0.493) return 'Good'
  if (grams <= 0.656) return 'Moderate'
  if (grams <= 0.846) return 'Poor'
  return 'Very Poor'
}

/** A device's report, or null when it was never scanned. */
export function getDevice(report: UrlReport, device: DeviceStrategy): DeviceReport | null {
  return report[device]
}

/** Read one metric, tolerating a null metric object. */
export function getMetric(metrics: Metrics | null | undefined, name: keyof Metrics): number | null {
  if (!metrics) {
    return null
  }

  return metrics[name]
}

/**
 * Human label for a CWV assessment. Null stays null so a device that was never
 * scanned shows nothing rather than "Failed".
 */
export function getCwvLabel(assessment: string | null | undefined): string {
  if (!assessment || assessment === 'N/A') {
    return NOT_MEASURED
  }

  return assessment
}

/**
 * Compare two nullable values. Nulls always sort last, regardless of
 * direction, so an unmeasured page is never presented as the best entry.
 */
export function compareNullable(
  a: number | null,
  b: number | null,
  direction: 'asc' | 'desc',
): number {
  if (a === null && b === null) return 0
  if (a === null) return 1
  if (b === null) return -1
  return direction === 'asc' ? a - b : b - a
}

/** Strip the scheme, a leading "www." and any trailing slash. */
export function formatUrlLabel(url: string): string {
  return url
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
}

/**
 * Bytes to a compact string. transferSize is in bytes; kilobytes_transferred
 * is already in kilobytes.
 */
export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined || Number.isNaN(bytes)) {
    return NOT_MEASURED
  }

  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(1)} kB`
  return `${bytes.toFixed(0)} B`
}

export function formatKilobytes(kb: number | null | undefined): string {
  if (kb === null || kb === undefined || Number.isNaN(kb)) {
    return NOT_MEASURED
  }

  return `${kb.toFixed(0)} kB`
}

/** Grams CO2e per page view. */
export function formatCarbon(grams: number | null | undefined): string {
  if (grams === null || grams === undefined || Number.isNaN(grams)) {
    return NOT_MEASURED
  }

  return `${grams.toFixed(2)} g`
}

/** Energy in kW, averaged over the reporting window. */
export function formatEnergy(kw: number | null | undefined): string {
  if (kw === null || kw === undefined || Number.isNaN(kw)) {
    return NOT_MEASURED
  }

  return `${kw.toFixed(4)} kW`
}

/** Sum transferSize across a device's resources, for the resource panel. */
export function sumTransferSize(resources: Resource[] | null | undefined): number {
  if (!resources) {
    return 0
  }

  return resources.reduce((total, resource) => total + (resource.transferSize ?? 0), 0)
}
