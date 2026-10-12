import {Box, Button, Card, Flex, Select, Text, TextInput} from '@sanity/ui'

import type {DeviceStrategy} from '../types'

export type SortKey =
  | 'url'
  | 'status'
  | 'perf'
  | 'acs'
  | 'cwv'
  | 'violations'
  | 'carbon'
  | 'transfer'

export type SortDirection = 'asc' | 'desc'

export type StatusFilter = 'all' | 'completed' | 'processing' | 'failed'

export interface ToolbarProps {
  device: DeviceStrategy
  onDeviceChange: (device: DeviceStrategy) => void
  query: string
  onQueryChange: (value: string) => void
  status: StatusFilter
  onStatusChange: (value: StatusFilter) => void
  sort: SortKey
  direction: SortDirection
  onSortChange: (sort: SortKey, direction: SortDirection) => void
  onRefresh: () => void
  totalCount: number
  shownCount: number
}

const STATUS_FILTERS: StatusFilter[] = ['all', 'completed', 'processing', 'failed']

function isStatusFilter(value: string): value is StatusFilter {
  return STATUS_FILTERS.some((option) => option === value)
}

const SORT_KEYS: SortKey[] = [
  'url',
  'status',
  'perf',
  'acs',
  'cwv',
  'violations',
  'carbon',
  'transfer',
]

function isSortKey(value: string): value is SortKey {
  return SORT_KEYS.some((option) => option === value)
}

function isSortDirection(value: string): value is SortDirection {
  return value === 'asc' || value === 'desc'
}

const SORT_OPTIONS: Array<{value: string; label: string}> = [
  {value: 'url:asc', label: 'URL (A–Z)'},
  {value: 'url:desc', label: 'URL (Z–A)'},
  {value: 'perf:desc', label: 'Performance (high to low)'},
  {value: 'perf:asc', label: 'Performance (low to high)'},
  {value: 'acs:desc', label: 'Accessibility (high to low)'},
  {value: 'acs:asc', label: 'Accessibility (low to high)'},
  {value: 'violations:asc', label: 'Violations (fewest first)'},
  {value: 'carbon:asc', label: 'CO₂e per view (lowest first)'},
  {value: 'transfer:desc', label: 'Data transferred (largest first)'},
  {value: 'status:asc', label: 'Status'},
]

export function Toolbar({
  device,
  onDeviceChange,
  query,
  onQueryChange,
  status,
  onStatusChange,
  sort,
  direction,
  onSortChange,
  onRefresh,
  totalCount,
  shownCount,
}: ToolbarProps) {
  return (
    <Card padding={4} radius={2} tone="transparent" border>
      {/*
        One row, never wrapped. Wrapping is what made the controls stack into a
        column in a narrow Studio pane, so the row scrolls horizontally instead.
      */}
      <Flex
        align="center"
        direction="row"
        gap={2}
        wrap="nowrap"
        paddingBottom={1}
        style={{overflowX: 'auto'}}
      >
        <Flex align="center" direction="row" gap={1} style={{flexShrink: 0}}>
          <Button
            fontSize={1}
            mode={device === 'desktop' ? 'default' : 'ghost'}
            onClick={() => onDeviceChange('desktop')}
            text="Desktop"
          />
          <Button
            fontSize={1}
            mode={device === 'mobile' ? 'default' : 'ghost'}
            onClick={() => onDeviceChange('mobile')}
            text="Mobile"
          />
        </Flex>

        <Box style={{flex: '1 1 140px', minWidth: 120}}>
          <TextInput
            fontSize={1}
            onChange={(event) => onQueryChange(event.currentTarget.value)}
            placeholder="Search by URL"
            radius={2}
            value={query}
          />
        </Box>

        {/*
          `Select` does not forward `style` to its root element - it lands on
          the inner native <select>, leaving the wrapper un-sized and its
          chevron mispositioned. Sizing a Box around it fixes both.
        */}
        <Box style={{flexShrink: 0, width: 130}}>
          <Select
            fontSize={1}
            onChange={(event) => {
              const next = event.currentTarget.value
              if (isStatusFilter(next)) {
                onStatusChange(next)
              }
            }}
            radius={2}
            value={status}
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </Select>
        </Box>

        <Box style={{flexShrink: 0, width: 190}}>
          <Select
            fontSize={1}
            onChange={(event) => {
              const [nextSort, nextDirection] = event.currentTarget.value.split(':')

              if (isSortKey(nextSort) && isSortDirection(nextDirection)) {
                onSortChange(nextSort, nextDirection)
              }
            }}
            radius={2}
            value={`${sort}:${direction}`}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>

        <Button
          fontSize={1}
          mode="ghost"
          onClick={onRefresh}
          text="Refresh"
          style={{flexShrink: 0}}
        />
      </Flex>

      <Box marginTop={2}>
        <Text size={0} muted>
          Showing {shownCount} of {totalCount} report{totalCount === 1 ? '' : 's'} for{' '}
          {device === 'desktop' ? 'desktop' : 'mobile'}.
        </Text>
      </Box>
    </Card>
  )
}
