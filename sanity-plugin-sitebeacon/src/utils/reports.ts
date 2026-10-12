import type {SortDirection, SortKey, StatusFilter} from '../components/Toolbar'
import type {DeviceStrategy, UrlReport} from '../types'
import {compareNullable, formatUrlLabel, normalizeStatus} from './format'

/**
 * The value a column sorts on, for the currently selected device.
 *
 * Keys match the sortable columns in `components/reportColumns`. Columns that
 * are display only - seo, bestPractices - have no entry here and never appear
 * in the sort menu.
 *
 * Returns null when that device was never scanned, so `compareNullable` pushes
 * the row to the bottom instead of ranking an unmeasured page as best.
 */
export function sortValue(
  item: UrlReport,
  key: SortKey,
  device: DeviceStrategy,
): number | string | null {
  const report = item[device]

  switch (key) {
    case 'url':
      return formatUrlLabel(item.normalized_url)

    case 'status':
      return normalizeStatus(item.status)

    case 'perf':
      return report?.perf ?? null

    case 'acs':
      return report?.acs ?? null

    case 'violations':
      return report?.accessibility_summary?.violation_count ?? null

    case 'cwv': {
      const value = report?.cwv_assessment
      // 'N/A' ranks below 'Failed': there is no verdict at all.
      if (!value || value === 'N/A') return 2
      return value === 'Failed' ? 1 : 0
    }

    case 'carbon':
      return item.average_carbon_emission

    case 'transfer':
      return item.kilobytes_transferred

    default:
      return null
  }
}

/**
 * Sort reports. Nulls always sort last, in both directions, so a page that was
 * never measured can never top the table.
 */
export function sortReports(
  items: UrlReport[],
  sort: SortKey,
  direction: SortDirection,
  device: DeviceStrategy,
): UrlReport[] {
  return [...items].sort((a, b) => {
    const left = sortValue(a, sort, device)
    const right = sortValue(b, sort, device)

    if (left === null && right === null) return 0
    if (left === null) return 1
    if (right === null) return -1

    if (typeof left === 'string' || typeof right === 'string') {
      const result = String(left).localeCompare(String(right))
      return direction === 'asc' ? result : -result
    }

    return compareNullable(left, right, direction)
  })
}

/**
 * Filter by scan status and a URL substring.
 *
 * A search that matches nothing is not the same as an empty leaderboard, so the
 * caller renders a separate "no results" state.
 */
export function filterReports(
  items: UrlReport[],
  query: string,
  status: StatusFilter,
): UrlReport[] {
  const needle = query.trim().toLowerCase()

  return items.filter((item) => {
    if (status !== 'all' && normalizeStatus(item.status) !== normalizeStatus(status)) {
      return false
    }

    if (!needle) {
      return true
    }

    return (
      item.normalized_url.toLowerCase().includes(needle) ||
      item.submitted_url.toLowerCase().includes(needle)
    )
  })
}

/**
 * Look up one report by its id.
 *
 * A pure selector rather than a fetch. `GET /leaderboards/{id}` returns every
 * URL at once, so there is no per-report request to make - asking the API for one
 * report would mean downloading the whole leaderboard again. Callers select from
 * the list they already hold.
 *
 * Returns null when no report has that id.
 */
export function findReport(items: UrlReport[], urlReportId: string): UrlReport | null {
  return items.find((item) => item.url_report_id === urlReportId) ?? null
}
