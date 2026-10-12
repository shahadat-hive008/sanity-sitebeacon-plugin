import {Badge, Card, Flex, Stack, Text} from '@sanity/ui'
import {useEffect, useMemo, useState} from 'react'

import {ReportTable} from '../components/ReportTable'
import {EmptyState, ErrorState, LoadingState, NoResultsState} from '../components/states'
import {Toolbar, type SortDirection, type SortKey, type StatusFilter} from '../components/Toolbar'
import {getLeaderboard} from '../services/getLeaderboard'
import type {DeviceStrategy, SitebeaconResponse} from '../types'
import {filterReports, sortReports} from '../utils/reports'

export function SitebeaconTool() {
  const [response, setResponse] = useState<SitebeaconResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  const [device, setDevice] = useState<DeviceStrategy>('desktop')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [sort, setSort] = useState<SortKey>('url')
  const [direction, setDirection] = useState<SortDirection>('asc')

  useEffect(() => {
    let cancelled = false

    void getLeaderboard({latencyMs: 600}).then((result) => {
      if (!cancelled) {
        setResponse(result)
        setIsLoading(false)
      }

      return result
    })

    return () => {
      cancelled = true
    }
  }, [refreshCount])

  const leaderboard = response?.leaderboard ?? null
  const items = useMemo(() => leaderboard?.items ?? [], [leaderboard])

  const visibleItems = useMemo(
    () => sortReports(filterReports(items, query, status), sort, direction, device),
    [items, query, status, sort, direction, device],
  )

  function handleRefresh() {
    setIsLoading(true)
    setRefreshCount((count) => count + 1)
  }

  if (isLoading) {
    return (
      <Card padding={4} radius={2}>
        <LoadingState />
      </Card>
    )
  }

  // A missing leaderboard is the failure path: getLeaderboard resolves to null
  // rather than rejecting, and error_message explains why.
  if (!leaderboard) {
    return (
      <Card padding={4} radius={2}>
        <ErrorState
          message={response?.error_message ?? 'No response received.'}
          onRetry={handleRefresh}
        />
      </Card>
    )
  }

  return (
    <Card padding={4} radius={2}>
      <Stack gap={4}>
        <Flex align="center" justify="space-between" gap={3} wrap="wrap">
          <Stack gap={3}>
            <Text size={2} weight="semibold">
              {leaderboard.leaderboard_name || 'Sitebeacon Analysis'}
            </Text>
            <Text size={1} muted>
              Scanned {leaderboard.created_at.slice(0, 10)} · {leaderboard.total_urls} URL
              {leaderboard.total_urls === 1 ? '' : 's'} submitted
            </Text>
          </Stack>

          <Flex gap={2} align="center">
            <Badge fontSize={1} tone="positive">
              {leaderboard.completed_urls} completed
            </Badge>
            {leaderboard.processing_urls > 0 && (
              <Badge fontSize={1} tone="caution">
                {leaderboard.processing_urls} in progress
              </Badge>
            )}
            {leaderboard.failed_urls > 0 && (
              <Badge fontSize={1} tone="critical">
                {leaderboard.failed_urls} failed
              </Badge>
            )}
          </Flex>
        </Flex>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <Toolbar
              device={device}
              direction={direction}
              onDeviceChange={setDevice}
              onQueryChange={setQuery}
              onRefresh={handleRefresh}
              onSortChange={(nextSort, nextDirection) => {
                setSort(nextSort)
                setDirection(nextDirection)
              }}
              onStatusChange={setStatus}
              query={query}
              shownCount={visibleItems.length}
              sort={sort}
              status={status}
              totalCount={items.length}
            />

            {visibleItems.length === 0 ? (
              <NoResultsState query={query} />
            ) : (
              <ReportTable device={device} items={visibleItems} />
            )}
          </>
        )}
      </Stack>
    </Card>
  )
}
