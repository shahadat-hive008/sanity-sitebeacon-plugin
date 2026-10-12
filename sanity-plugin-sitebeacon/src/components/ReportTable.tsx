import {Box, Card, Text} from '@sanity/ui'
import type {ReactNode} from 'react'

import type {DeviceStrategy, UrlReport} from '../types'
import {COLUMNS} from './reportColumns'

/**
 * A neutral translucent grey so the row separator reads in both the light and
 * dark Studio themes. `@sanity/ui` does not expose a border custom property,
 * so there is no theme variable to read here.
 */
const ROW_BORDER = '1px solid rgba(128, 128, 128, 0.25)'

/** Hides the caption visually while leaving it readable to screen readers. */
const VISUALLY_HIDDEN = {
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
} as const

/**
 * Shared by header and data cells so the two cannot drift apart.
 *
 * Cell text sizes come from `Text size`, which resolves against the root font
 * size (`Text size={1}` is 0.8125rem). Do not set a font-size on the `<table>`:
 * `rem` is root-relative, so it would be silently ignored by every cell.
 */
const CELL_PADDING = '10px 16px'

/**
 * The report listing. Columns come from `reportColumns`, so this component only
 * decides layout and semantics - never what a cell contains.
 */
export function ReportTable({items, device}: {items: UrlReport[]; device: DeviceStrategy}) {
  return (
    <Card border padding={0} radius={2} tone="transparent">
      <Box style={{overflowX: 'auto'}}>
        <table style={{borderCollapse: 'collapse', minWidth: '760px', width: '100%'}}>
          <caption style={VISUALLY_HIDDEN}>
            URL reports for {device}, with performance, accessibility, SEO, carbon and transfer
            figures.
          </caption>

          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <HeaderCell key={column.key}>{column.label}</HeaderCell>
              ))}
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <ReportRow key={item.url_report_id} device={device} item={item} />
            ))}
          </tbody>
        </table>
      </Box>
    </Card>
  )
}

/** A column heading. Rendered as a `<th scope="col">` for screen readers. */
function HeaderCell({children}: {children: ReactNode}) {
  return (
    <th scope="col" style={{padding: CELL_PADDING, textAlign: 'left', whiteSpace: 'nowrap'}}>
      <Text muted size={0} weight="medium">
        {children}
      </Text>
    </th>
  )
}

/** A data cell. Rendered as a `<td>`. */
function DataCell({children}: {children: ReactNode}) {
  return (
    <td style={{padding: CELL_PADDING, verticalAlign: 'top', whiteSpace: 'nowrap'}}>{children}</td>
  )
}

/** One report, rendered as a `<tr>` with one cell per column. */
function ReportRow({device, item}: {device: DeviceStrategy; item: UrlReport}) {
  return (
    <tr style={{borderTop: ROW_BORDER}}>
      {COLUMNS.map((column) => (
        <DataCell key={column.key}>{column.render(item, device)}</DataCell>
      ))}
    </tr>
  )
}
