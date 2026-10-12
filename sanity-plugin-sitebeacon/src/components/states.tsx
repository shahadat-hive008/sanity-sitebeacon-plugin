import {Box, Button, Card, Flex, Spinner, Stack, Text} from '@sanity/ui'

/** First load, and every refresh after it. */
export function LoadingState({label = 'Loading reports'}: {label?: string}) {
  return (
    <Card padding={5} radius={2} tone="transparent">
      <Flex align="center" justify="center" gap={3}>
        <Spinner muted />
        <Text size={1} muted>
          {label}…
        </Text>
      </Flex>
    </Card>
  )
}

/** The request failed. Never conflate this with "no reports". */
export function ErrorState({message, onRetry}: {message: string; onRetry?: () => void}) {
  return (
    <Card border padding={4} radius={2} tone="critical">
      <Stack gap={3}>
        <Text size={1} weight="semibold">
          Could not load the leaderboard
        </Text>
        <Text size={1}>{message}</Text>
        {onRetry && (
          <Box>
            <Button fontSize={1} mode="ghost" onClick={onRetry} text="Try again" />
          </Box>
        )}
      </Stack>
    </Card>
  )
}

/** The leaderboard exists but holds no URLs. */
export function EmptyState() {
  return (
    <Card padding={5} radius={2} tone="transparent" border>
      <Stack gap={2}>
        <Text size={1} weight="semibold">
          No reports yet
        </Text>
        <Text size={1} muted>
          No URLs have been submitted for this leaderboard. Add a URL and run a scan to see reports
          here.
        </Text>
      </Stack>
    </Card>
  )
}

/**
 * There are reports, but none match the current search or filter. Distinct from
 * EmptyState: the data is there, the query just missed it.
 */
export function NoResultsState({query}: {query?: string}) {
  return (
    <Card padding={5} radius={2} tone="transparent" border>
      <Stack gap={2}>
        <Text size={1} weight="semibold">
          No matching reports
        </Text>
        <Text size={1} muted>
          {query
            ? `Nothing matches “${query}”. Try a different search or clear the filters.`
            : 'No reports match the selected filters. Try widening them.'}
        </Text>
      </Stack>
    </Card>
  )
}
