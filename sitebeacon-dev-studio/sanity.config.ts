import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {requireEnv} from './env'
import {sitebeaconPlugin} from 'sanity-plugin-sitebeacon'
export default defineConfig({
  name: 'default',
  title: 'sitebeacon-dev-studio',

  projectId: requireEnv('SANITY_STUDIO_PROJECT_ID', process.env.SANITY_STUDIO_PROJECT_ID),
  dataset: requireEnv('SANITY_STUDIO_DATASET', process.env.SANITY_STUDIO_DATASET),

  plugins: [structureTool(), visionTool(), sitebeaconPlugin()],

  schema: {
    types: schemaTypes,
  },
})
