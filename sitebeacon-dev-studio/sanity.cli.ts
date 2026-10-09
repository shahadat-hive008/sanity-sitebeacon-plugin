import {defineCliConfig} from 'sanity/cli'
import {requireEnv} from './env'

export default defineCliConfig({
  api: {
    projectId: requireEnv('SANITY_STUDIO_PROJECT_ID', process.env.SANITY_STUDIO_PROJECT_ID),
    dataset: requireEnv('SANITY_STUDIO_DATASET', process.env.SANITY_STUDIO_DATASET)
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
