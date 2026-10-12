import {Text} from '@sanity/ui'
import type {ReactNode} from 'react'

import type {DeviceReport, DeviceStrategy, UrlReport} from '../types'
import {formatKilobytes, formatUrlLabel, normalizeStatus} from '../utils/format'
import {CarbonCell, CwvBadge, NotMeasured, Score, StatusBadge} from './Score'

/** Every column the table can show. */
type ColumnKey =
  | 'url'
  | 'status'
  | 'perf'
  | 'acs'
  | 'seo'
  | 'bestPractices'
  | 'cwv'
  | 'violations'
  | 'carbon'
  | 'transfer'

/**
 * One table column.
 *
 * Columns are declared once, here, and drive both the header and every row.
 * Adding a column therefore cannot desynchronise the header from the cells,
 * which is the usual failure mode when a table is written as two hand-maintained
 * lists.
 *
 * Not every column is sortable - `seo` and `bestPractices` are display only.
 * The sortable subset is `SortKey`, resolved in `utils/reports`.
 */
export interface Column {
  /** Stable React key for this column. */
  key: ColumnKey
  /** Column heading shown to the user. */
  label: string
  /** Renders the cell for one report at the selected device. */
  render: (item: UrlReport, device: DeviceStrategy) => ReactNode
}

/**
 * Renders `content` only when the selected device was actually scanned.
 *
 * Anything else falls back to the "not measured" placeholder. This is the single
 * guard that stops an unscanned or failed page from showing a zero score.
 *
 * `content` receives the device report, named `deviceReport` so it is never
 * confused with the `UrlReport` the column starts from.
 */
function whenScanned(
  item: UrlReport,
  device: DeviceStrategy,
  content: (deviceReport: DeviceReport) => ReactNode,
): ReactNode {
  const deviceReport = item[device]

  if (normalizeStatus(item.status) !== 'completed' || deviceReport === null) {
    return <NotMeasured />
  }

  return content(deviceReport)
}

export const COLUMNS: Column[] = [
  {
    key: 'url',
    label: 'URL',
    render: (item) => (
      <Text size={1} style={{maxWidth: 280}} textOverflow="ellipsis" title={item.normalized_url}>
        {formatUrlLabel(item.normalized_url)}
      </Text>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (item) => <StatusBadge status={item.status} />,
  },
  {
    key: 'perf',
    label: 'Perf',
    render: (item, device) =>
      whenScanned(item, device, (deviceReport) => <Score value={deviceReport.perf} />),
  },
  {
    key: 'acs',
    label: 'A11y',
    render: (item, device) =>
      whenScanned(item, device, (deviceReport) => <Score value={deviceReport.acs} />),
  },
  {
    key: 'seo',
    label: 'SEO',
    render: (item, device) =>
      whenScanned(item, device, (deviceReport) => <Score value={deviceReport.seo} />),
  },
  {
    key: 'bestPractices',
    label: 'Best Prac.',
    render: (item, device) =>
      whenScanned(item, device, (deviceReport) => <Score value={deviceReport.bp} />),
  },
  {
    key: 'cwv',
    label: 'CWV',
    render: (item, device) =>
      whenScanned(item, device, (deviceReport) => (
        <CwvBadge assessment={deviceReport.cwv_assessment} />
      )),
  },
  {
    key: 'violations',
    label: 'Violations',
    render: (item, device) =>
      whenScanned(item, device, (deviceReport) => {
        const summary = deviceReport.accessibility_summary

        // violation_count is the API's own total. severity_counts omits keys
        // that are zero, so summing it would under-report if the breakdown
        // ever arrived incomplete.
        return summary === null ? <NotMeasured /> : <Text size={1}>{summary.violation_count}</Text>
      }),
  },
  {
    key: 'carbon',
    label: 'CO₂e / view',
    render: (item) => <CarbonCell grams={item.average_carbon_emission} />,
  },
  {
    key: 'transfer',
    label: 'Data',
    render: (item) =>
      item.kilobytes_transferred === null ? (
        <NotMeasured />
      ) : (
        <Text size={1}>{formatKilobytes(item.kilobytes_transferred)}</Text>
      ),
  },
]
