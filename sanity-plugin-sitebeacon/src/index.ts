import {definePlugin} from 'sanity'

import {SitebeaconTool} from './tool/SitebeaconTool'

export const sitebeaconPlugin = definePlugin(() => ({
  name: 'sitebeacon-plugin',

  tools: [
    {
      name: 'sitebeacon-analysis',
      title: 'Sitebeacon Analysis',
      component: SitebeaconTool,
    },
  ],
}))