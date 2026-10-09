import {Card, Stack, Text} from '@sanity/ui'

export function SitebeaconTool() {
  return (
    <Card padding={4}>
      <Stack gap={3}>
        <Text size={3} weight="semibold">
          Sitebeacon Analysis
        </Text>

        <Text>
          Your website analysis dashboard will appear here.
        </Text>
      </Stack>
    </Card>
  )
}