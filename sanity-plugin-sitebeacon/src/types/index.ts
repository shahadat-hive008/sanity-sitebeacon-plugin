/**
 * The Sitebeacon leaderboard contract.
 *
 * This is the shape the dashboard renders against, declared here and backed by
 * the fixtures in `src/mock/mockLeaderboard.ts`. There is no Sitebeacon API
 * wired up; if one is added later it goes behind `getLeaderboard()` and must
 * satisfy these types. Field names and shapes are kept as-is - do not "tidy"
 * them.
 *
 * Three things that are easy to misread, encoded deliberately in the fixtures:
 *
 *  - `cwv_assessment` is 'Passed' | 'Failed' | 'N/A'. "N/A" is a real value,
 *    not a stand-in for missing data.
 *  - `accessibility_summary.severity_counts` omits keys that are zero. A
 *    desktop report with no critical issues has no `critical` key at all.
 *  - `field_metrics` is a full metrics object or null. It is not a reduced
 *    field-only shape, and individual values inside it can still be null.
 *
 * Note the two data sources that do not reconcile, as the numbers show:
 *
 *  - URL-level `average_carbon_emission` / `average_energy` /
 *    `kilobytes_transferred` are historical aggregates across page views.
 *  - Device-level `carbon_emission` / `perf` / `resources` are the latest scan.
 *
 * So the mean of two device values does not equal the URL value, and the URL
 * values must never be recomputed from the device values.
 */

export type DeviceStrategy = 'desktop' | 'mobile'

export type CwvAssessment = 'Passed' | 'Failed' | 'N/A'

/** Values the fixtures contain. Kept open so an unknown value cannot break
 * rendering. */
export type ResourceType =
  | 'image'
  | 'script'
  | 'other'
  | 'document'
  | 'stylesheet'
  | 'font'
  | 'media'
  | 'third-party'

/** The response envelope. On failure, leaderboard is null and error_message says why. */
export interface SitebeaconResponse {
  leaderboard: Leaderboard | null
  error_message: string | null
}

/** One leaderboard: a set of submitted URLs and their reports. */
export interface Leaderboard {
  id: string
  /** Can be an empty string. */
  leaderboard_name: string
  /** Observed 'completed'. Others seen in the wild include 'partial_failed'. */
  status: string
  created_at: string
  results_ready_at: string | null
  total_urls: number
  completed_urls: number
  failed_urls: number
  /** Covers queued and in-progress scans together. */
  processing_urls: number
  items: UrlReport[]
}

/** One submitted URL and its report. */
export interface UrlReport {
  /** Exactly as submitted - may have no scheme, e.g. "lemonhive.com". */
  submitted_url: string
  /** Normalised, no trailing slash. */
  normalized_url: string
  /** May differ from normalized_url, e.g. adds "www". */
  display_domain: string | null
  /** Observed 'completed'. */
  status: string
  url_report_id: string
  image_url: string | null
  updated_at: string | null
  is_green_hosting: boolean | null

  /** Grams CO2e per page view, averaged over the reporting window. */
  average_carbon_emission: number | null
  /** kW, averaged over the reporting window. */
  average_energy: number | null
  /** Kilobytes transferred over the reporting window. */
  kilobytes_transferred: number | null

  /** Null when the device was never scanned. */
  desktop: DeviceReport | null
  mobile: DeviceReport | null
}

/** The analysis for one device, from the latest scan. */
export interface DeviceReport {
  strategy: DeviceStrategy
  cwv_assessment: CwvAssessment | null

  /** Grams CO2e per page load for this device. */
  carbon_emission: number | null

  /** Lighthouse category scores, 0-100. */
  perf: number | null
  acs: number | null
  seo: number | null
  bp: number | null

  /** Real-user metrics, or null when there is not enough traffic. */
  field_metrics: Metrics | null
  /** Synthetic metrics from the scan. */
  lab_metrics: Metrics | null

  /** Always lists all eight resource types; unused ones come back as zeros. */
  resources: Resource[] | null

  accessibility_summary: AccessibilitySummary | null
}

/**
 * Every value is nullable. Verified cases include a populated field_metrics
 * whose own lcp is null, and lab_metrics where fid, inp and ttfb are null.
 */
export interface Metrics {
  /** Seconds. */
  fcp: number | null
  /** Seconds. */
  lcp: number | null
  /** Unitless. */
  cls: number | null
  /** Milliseconds. */
  fid: number | null
  /** Milliseconds. */
  inp: number | null
  /** Seconds. */
  ttfb: number | null
  /** Seconds. */
  speed_index: number | null
  /** Milliseconds. */
  total_blocking_time: number | null
  /** Seconds. */
  time_to_interactive: number | null
}

export interface Resource {
  label: string
  requestCount: number
  resourceType: ResourceType | (string & {})
  /** Bytes. */
  transferSize: number
  /** Grams CO2e. */
  carbonEmission: number
}

export interface AccessibilitySummary {
  violation_count: number
  assisted_count: number
  /** WCAG, EN 301-549, RGAA, Section508 and internal tags. */
  tags: string[]
  /** Keys with a zero count are omitted entirely. */
  severity_counts: {
    critical?: number
    serious?: number
    moderate?: number
    minor?: number
  }
}
