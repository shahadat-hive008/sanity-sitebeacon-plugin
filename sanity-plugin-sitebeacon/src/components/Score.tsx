import {Badge, Flex, Text} from '@sanity/ui'

import type {CwvAssessment} from '../types'
import {
  formatCarbon,
  getCarbonRating,
  getCarbonTone,
  getCwvLabel,
  normalizeStatus,
  NOT_MEASURED,
} from '../utils/format'

/**
 * A single 0-100 Lighthouse score.
 *
 * An unmeasured value renders as a muted dash, never as a zero. Scores are not
 * colour coded - see `CarbonCell` for the one metric that is.
 */
export function Score({value}: {value: number | null}) {
  return (
    <Text muted={value === null} size={1} weight="medium">
      {value === null ? NOT_MEASURED : value}
    </Text>
  )
}

/**
 * The placeholder for a value the API did not measure.
 *
 * Deliberately a muted dash, never `0` - a missing metric and a score of zero
 * are different facts.
 */
export function NotMeasured() {
  return (
    <Text muted size={1}>
      {NOT_MEASURED}
    </Text>
  )
}

/**
 * Grams CO2e per page view, with its rating and colour band.
 *
 * This is the one colour-coded metric. The value is measured for the URL as a
 * whole, so it does not vary by device and takes no `device` argument.
 *
 * An unmeasured value falls back to the shared placeholder before the tone is
 * ever computed, so `getCarbonTone` never has to handle a missing reading.
 */
export function CarbonCell({grams}: {grams: number | null}) {
  if (grams === null) {
    return <NotMeasured />
  }

  const rating = getCarbonRating(grams)

  return (
    <Flex align="center" gap={2}>
      <Badge fontSize={1} tone={getCarbonTone(grams)}>
        {formatCarbon(grams)}
      </Badge>
      {rating && (
        <Text muted size={0}>
          {rating}
        </Text>
      )}
    </Flex>
  )
}

/**
 * Core Web Vitals assessment for the selected device. 'N/A' is a real value the
 * API returns, distinct from a device that was never scanned.
 */
export function CwvBadge({assessment}: {assessment: CwvAssessment | null}) {
  const label = getCwvLabel(assessment)

  if (label === NOT_MEASURED) {
    return <NotMeasured />
  }

  return (
    <Badge tone={assessment === 'Passed' ? 'positive' : 'critical'} fontSize={1}>
      {label}
    </Badge>
  )
}

/**
 * Scan status. Unknown values still render, so a new status is never hidden.
 *
 * Comparison is case-insensitive because `status` is a free-form string from the
 * API, not an enum.
 */
export function StatusBadge({status}: {status: string}) {
  const kind = normalizeStatus(status)
  const tone = kind === 'completed' ? 'positive' : kind === 'failed' ? 'critical' : 'caution'

  return (
    <Badge tone={tone} fontSize={1}>
      {status}
    </Badge>
  )
}
