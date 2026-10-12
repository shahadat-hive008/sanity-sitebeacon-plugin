import {mockResponses} from '../mock/mockLeaderboard'
import type {MockFixtureName} from '../mock/mockLeaderboard'
import type {SitebeaconResponse} from '../types'

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
 *
 * There is deliberately no single-report fetch alongside this. The endpoint
 * returns every URL in one response, so a second request for one report would
 * download the leaderboard again. Look reports up in the returned list with
 * `findReport` from `utils/reports` instead.
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
