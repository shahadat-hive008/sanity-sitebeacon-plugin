import {mockResponses} from '../mock/mockLeaderboard'
import type {MockFixtureName} from '../mock/mockLeaderboard'
import type {SitebeaconResponse, UrlReport} from '../types'

export interface GetLeaderboardOptions {
  /**
   * Which mock response to return. Defaults to 'mixed', which contains every
   * scan state. Point this at 'empty', 'completed' or 'error' to check how the
   * UI renders those.
   */
  fixture?: MockFixtureName
  /** Simulated network delay, so loading states are visible. */
  latencyMs?: number
}

/**
 * Fetch the whole leaderboard for a site.
 *
 * Returns the raw API envelope: `leaderboard` is null when something went
 * wrong, and `error_message` says why. Callers check `error_message` to decide
 * between an error state and an empty state.
 */
export async function getLeaderboard(
  options: GetLeaderboardOptions = {},
): Promise<SitebeaconResponse> {
  const {fixture = 'mixed', latencyMs = 600} = options

  // Fake waiting time so you can see the loading state in the UI
  await new Promise((resolve) => setTimeout(resolve, latencyMs))

  // TODO: when the real Sitebeacon API is ready, replace this with
  //   const response = await fetch('<real api url>')
  //   return response.json()
  return mockResponses[fixture]
}

/**
 * Fetch one URL report by its report id. Returns null when there is no report
 * with that id.
 */
export async function getUrlReport(
  urlReportId: string,
  options: GetLeaderboardOptions = {},
): Promise<UrlReport | null> {
  const {fixture = 'mixed', latencyMs = 300} = options

  const response = await getLeaderboard({fixture, latencyMs})

  if (!response.leaderboard) {
    return null
  }

  return response.leaderboard.items.find((item) => item.url_report_id === urlReportId) ?? null
}
