import type {SitebeaconResponse} from '../types'

/**
 * Mock leaderboard for lemonhive.com with seven URLs.
 *
 * `/` is taken from a real API response - the ids, timestamps, tag lists and
 * float precision are copied verbatim, including `cwv_assessment: 'N/A'` on
 * mobile and a desktop `severity_counts` with no `critical` key. The other
 * pages are invented but hold the same shape.
 *
 * One domain with several pages is a valid leaderboard: the API compares
 * whatever URLs were submitted.
 *
 * The pages deliberately cover every state the UI has to render:
 *   /                     completed, both devices, real-user data on desktop
 *   /blog                 completed, both devices, healthy scores
 *   /pricing/enterprise…  completed, long URL with a query string
 *   /portfolio            completed, poor scores, video-heavy
 *   /services             processing, no device results yet
 *   /about                queued, nothing measured
 *   /careers              failed, nothing measured
 */
export const mockLeaderboard: SitebeaconResponse = {
  leaderboard: {
    id: '074259e3-e02b-4ece-b3df-556b9da8dffc',
    leaderboard_name: '',
    status: 'completed',
    created_at: '2026-07-06T05:13:46.124062Z',
    results_ready_at: '2026-07-06T05:15:09.536450Z',
    total_urls: 7,
    completed_urls: 4,
    failed_urls: 1,
    // Queued and in-progress scans are counted together.
    processing_urls: 2,

    items: [
      // ================================================================= home
      // Copied from a real API response.
      {
        submitted_url: 'lemonhive.com',
        normalized_url: 'https://lemonhive.com',
        display_domain: 'https://www.lemonhive.com/',
        status: 'completed',
        url_report_id: '6fde88fc-e364-4e6e-a5f1-2a3ec68c1e8e',
        image_url: 'https://sitebeacon-app.s3.eu-west-2.amazonaws.com/siteico+(1).png',
        updated_at: '2026-07-06T05:15:08.923122Z',
        is_green_hosting: false,

        average_carbon_emission: 0.7581704,
        average_energy: 0.0015741761,
        kilobytes_transferred: 2777.08,

        desktop: {
          strategy: 'desktop',
          cwv_assessment: 'Failed',
          carbon_emission: 0.779879,
          perf: 63,
          acs: 94,
          seo: 100,
          bp: 77,
          field_metrics: {
            fcp: 1.32,
            lcp: null,
            cls: 0.17,
            fid: null,
            inp: 68,
            ttfb: null,
            speed_index: null,
            total_blocking_time: null,
            time_to_interactive: null,
          },
          lab_metrics: {
            fcp: 0.6,
            lcp: 1.2,
            cls: 0.17,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 1.8,
            total_blocking_time: 600,
            time_to_interactive: 4.1,
          },
          resources: [
            {
              label: 'Script',
              requestCount: 52,
              resourceType: 'script',
              transferSize: 1865975,
              carbonEmission: 0.5118603061217233,
            },
            {
              label: 'Other',
              requestCount: 28,
              resourceType: 'other',
              transferSize: 558544,
              carbonEmission: 0.15321561265421657,
            },
            {
              label: 'Image',
              requestCount: 31,
              resourceType: 'image',
              transferSize: 152078,
              carbonEmission: 0.04171689954816085,
            },
            {
              label: 'Document',
              requestCount: 2,
              resourceType: 'document',
              transferSize: 103001,
              carbonEmission: 0.02825446396165202,
            },
            {
              label: 'Stylesheet',
              requestCount: 11,
              resourceType: 'stylesheet',
              transferSize: 85788,
              carbonEmission: 0.02353272253999673,
            },
            {
              label: 'Font',
              requestCount: 3,
              resourceType: 'font',
              transferSize: 77644,
              carbonEmission: 0.02129872137006931,
            },
            // Unused resource types still come back, as zeros.
            {
              label: 'Media',
              requestCount: 0,
              resourceType: 'media',
              transferSize: 0,
              carbonEmission: 0,
            },
            {
              label: 'Third-party',
              requestCount: 37,
              resourceType: 'third-party',
              transferSize: 2082012,
              carbonEmission: 0.5711219601919111,
            },
          ],
          accessibility_summary: {
            violation_count: 7,
            assisted_count: 0,
            tags: [
              'EN-301-549',
              'EN-9.1.4.3',
              'RGAA-3.2.1',
              'RGAA-9.2.1',
              'RGAAv4',
              'TT13.c',
              'TTv5',
              'best-practice',
              'wcag111',
              'wcag143',
              'wcag241',
              'wcag2a',
              'wcag2aa',
            ],
            // No `critical` key: the count is zero, so the key is absent.
            severity_counts: {minor: 2, moderate: 1, serious: 4},
          },
        },

        mobile: {
          strategy: 'mobile',
          cwv_assessment: 'N/A',
          carbon_emission: 0.743698,
          perf: 39,
          acs: 88,
          seo: 100,
          bp: 77,
          field_metrics: null,
          lab_metrics: {
            fcp: 10.5,
            lcp: 16.1,
            cls: 0,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 10.5,
            total_blocking_time: 670,
            time_to_interactive: 18.1,
          },
          resources: [
            {
              label: 'Script',
              requestCount: 45,
              resourceType: 'script',
              transferSize: 1853249,
              carbonEmission: 0.5083694049811909,
            },
            {
              label: 'Other',
              requestCount: 25,
              resourceType: 'other',
              transferSize: 532320,
              carbonEmission: 0.14602204110704364,
            },
            {
              label: 'Document',
              requestCount: 2,
              resourceType: 'document',
              transferSize: 103070,
              carbonEmission: 0.02827339152559173,
            },
            {
              label: 'Stylesheet',
              requestCount: 11,
              resourceType: 'stylesheet',
              transferSize: 85790,
              carbonEmission: 0.02353327116503846,
            },
            {
              label: 'Font',
              requestCount: 3,
              resourceType: 'font',
              transferSize: 77643,
              carbonEmission: 0.021298447057548443,
            },
            {
              label: 'Image',
              requestCount: 18,
              resourceType: 'image',
              transferSize: 59063,
              carbonEmission: 0.016201720419870228,
            },
            {
              label: 'Media',
              requestCount: 0,
              resourceType: 'media',
              transferSize: 0,
              carbonEmission: 0,
            },
            {
              label: 'Third-party',
              requestCount: 37,
              resourceType: 'third-party',
              transferSize: 2082726,
              carbonEmission: 0.5713178193318089,
            },
          ],
          accessibility_summary: {
            violation_count: 8,
            assisted_count: 0,
            tags: [
              'EN-301-549',
              'EN-9.1.4.3',
              'EN-9.4.1.2',
              'RGAA-11.9.1',
              'RGAA-3.2.1',
              'RGAA-9.2.1',
              'RGAAv4',
              'TT13.c',
              'TT6.a',
              'TTv5',
              'best-practice',
              'section508',
              'section508.22.a',
              'wcag111',
              'wcag143',
              'wcag241',
              'wcag2a',
              'wcag2aa',
              'wcag412',
            ],
            severity_counts: {critical: 1, minor: 2, moderate: 1, serious: 4},
          },
        },
      },

      // ================================================================= blog
      {
        submitted_url: 'https://lemonhive.com/blog',
        normalized_url: 'https://lemonhive.com/blog',
        display_domain: 'https://www.lemonhive.com/blog',
        status: 'completed',
        url_report_id: 'page-blog',
        image_url: null,
        updated_at: '2026-07-06T05:15:02.117885Z',
        is_green_hosting: true,

        average_carbon_emission: 0.5123804,
        average_energy: 0.0010811,
        kilobytes_transferred: 1893.44,

        desktop: {
          strategy: 'desktop',
          cwv_assessment: 'Passed',
          carbon_emission: 0.42923,
          perf: 74,
          acs: 96,
          seo: 100,
          bp: 92,
          field_metrics: {
            fcp: 0.94,
            lcp: 1.42,
            cls: 0.04,
            fid: null,
            inp: 92,
            ttfb: 0.31,
            speed_index: null,
            total_blocking_time: null,
            time_to_interactive: null,
          },
          lab_metrics: {
            fcp: 0.7,
            lcp: 1.4,
            cls: 0.04,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 1.5,
            total_blocking_time: 140,
            time_to_interactive: 3.2,
          },
          resources: [
            {
              label: 'Script',
              requestCount: 31,
              resourceType: 'script',
              transferSize: 1042118,
              carbonEmission: 0.2864183,
            },
            {
              label: 'Image',
              requestCount: 24,
              resourceType: 'image',
              transferSize: 288410,
              carbonEmission: 0.0791501,
            },
            {
              label: 'Stylesheet',
              requestCount: 7,
              resourceType: 'stylesheet',
              transferSize: 54310,
              carbonEmission: 0.0149022,
            },
            {
              label: 'Font',
              requestCount: 2,
              resourceType: 'font',
              transferSize: 41220,
              carbonEmission: 0.0113076,
            },
            {
              label: 'Document',
              requestCount: 1,
              resourceType: 'document',
              transferSize: 62104,
              carbonEmission: 0.0170402,
            },
            {
              label: 'Other',
              requestCount: 9,
              resourceType: 'other',
              transferSize: 74410,
              carbonEmission: 0.0204117,
            },
            {
              label: 'Media',
              requestCount: 0,
              resourceType: 'media',
              transferSize: 0,
              carbonEmission: 0,
            },
            {
              label: 'Third-party',
              requestCount: 14,
              resourceType: 'third-party',
              transferSize: 184220,
              carbonEmission: 0.0505219,
            },
          ],
          accessibility_summary: {
            violation_count: 3,
            assisted_count: 0,
            tags: ['EN-301-549', 'RGAA-3.2.1', 'RGAAv4', 'wcag111', 'wcag2a', 'wcag2aa'],
            severity_counts: {minor: 3},
          },
        },

        mobile: {
          strategy: 'mobile',
          cwv_assessment: 'Passed',
          carbon_emission: 0.41723,
          perf: 61,
          acs: 94,
          seo: 100,
          bp: 92,
          field_metrics: {
            fcp: 2.1,
            lcp: 2.64,
            cls: 0.06,
            fid: null,
            inp: 174,
            ttfb: 0.72,
            speed_index: null,
            total_blocking_time: null,
            time_to_interactive: null,
          },
          lab_metrics: {
            fcp: 1.9,
            lcp: 2.6,
            cls: 0.06,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 2.8,
            total_blocking_time: 310,
            time_to_interactive: 6.4,
          },
          resources: [
            {
              label: 'Script',
              requestCount: 33,
              resourceType: 'script',
              transferSize: 1108244,
              carbonEmission: 0.3045612,
            },
            {
              label: 'Image',
              requestCount: 16,
              resourceType: 'image',
              transferSize: 190233,
              carbonEmission: 0.0522103,
            },
            {
              label: 'Stylesheet',
              requestCount: 7,
              resourceType: 'stylesheet',
              transferSize: 54880,
              carbonEmission: 0.0150604,
            },
            {
              label: 'Font',
              requestCount: 2,
              resourceType: 'font',
              transferSize: 41640,
              carbonEmission: 0.0114173,
            },
            {
              label: 'Document',
              requestCount: 1,
              resourceType: 'document',
              transferSize: 62710,
              carbonEmission: 0.0172108,
            },
            {
              label: 'Other',
              requestCount: 7,
              resourceType: 'other',
              transferSize: 61120,
              carbonEmission: 0.0167703,
            },
            {
              label: 'Media',
              requestCount: 0,
              resourceType: 'media',
              transferSize: 0,
              carbonEmission: 0,
            },
            {
              label: 'Third-party',
              requestCount: 13,
              resourceType: 'third-party',
              transferSize: 171004,
              carbonEmission: 0.0468901,
            },
          ],
          accessibility_summary: {
            violation_count: 3,
            assisted_count: 0,
            tags: ['EN-301-549', 'RGAA-3.2.1', 'RGAAv4', 'wcag111', 'wcag2a', 'wcag2aa'],
            severity_counts: {minor: 3},
          },
        },
      },

      // ============================================================== pricing
      // Long URL with a query string, for testing truncation and search.
      {
        submitted_url:
          'https://lemonhive.com/pricing/enterprise?plan=annual&ref=campaign-q3&utm_source=email',
        normalized_url:
          'https://lemonhive.com/pricing/enterprise?plan=annual&ref=campaign-q3&utm_source=email',
        display_domain: null,
        status: 'completed',
        url_report_id: 'page-pricing-enterprise',
        image_url: null,
        updated_at: '2026-07-06T05:14:51.902214Z',
        is_green_hosting: false,

        average_carbon_emission: 0.6602417,
        average_energy: 0.0013962,
        kilobytes_transferred: 2410.63,

        desktop: {
          strategy: 'desktop',
          cwv_assessment: 'Passed',
          carbon_emission: 0.275519,
          perf: 81,
          acs: 98,
          seo: 100,
          bp: 96,
          field_metrics: null,
          lab_metrics: {
            fcp: 0.5,
            lcp: 1.1,
            cls: 0.01,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 1.2,
            total_blocking_time: 90,
            time_to_interactive: 2.6,
          },
          resources: [
            {
              label: 'Script',
              requestCount: 22,
              resourceType: 'script',
              transferSize: 741220,
              carbonEmission: 0.2037104,
            },
            {
              label: 'Stylesheet',
              requestCount: 6,
              resourceType: 'stylesheet',
              transferSize: 48930,
              carbonEmission: 0.0134288,
            },
            {
              label: 'Document',
              requestCount: 1,
              resourceType: 'document',
              transferSize: 58210,
              carbonEmission: 0.0159702,
            },
            {
              label: 'Font',
              requestCount: 2,
              resourceType: 'font',
              transferSize: 38980,
              carbonEmission: 0.0106901,
            },
            {
              label: 'Image',
              requestCount: 8,
              resourceType: 'image',
              transferSize: 74410,
              carbonEmission: 0.0204117,
            },
            {
              label: 'Other',
              requestCount: 5,
              resourceType: 'other',
              transferSize: 41220,
              carbonEmission: 0.0113076,
            },
            {
              label: 'Media',
              requestCount: 0,
              resourceType: 'media',
              transferSize: 0,
              carbonEmission: 0,
            },
            {
              label: 'Third-party',
              requestCount: 11,
              resourceType: 'third-party',
              transferSize: 158770,
              carbonEmission: 0.0435308,
            },
          ],
          accessibility_summary: {
            violation_count: 1,
            assisted_count: 0,
            tags: ['RGAA-9.2.1', 'RGAAv4', 'best-practice'],
            // Only `minor` present.
            severity_counts: {minor: 1},
          },
        },

        mobile: {
          strategy: 'mobile',
          cwv_assessment: 'Failed',
          carbon_emission: 0.292998,
          perf: 54,
          acs: 95,
          seo: 100,
          bp: 96,
          field_metrics: null,
          lab_metrics: {
            fcp: 2.4,
            lcp: 5.2,
            cls: 0.09,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 4.1,
            total_blocking_time: 520,
            time_to_interactive: 9.8,
          },
          resources: [
            {
              label: 'Script',
              requestCount: 25,
              resourceType: 'script',
              transferSize: 822014,
              carbonEmission: 0.2259041,
            },
            {
              label: 'Stylesheet',
              requestCount: 6,
              resourceType: 'stylesheet',
              transferSize: 49330,
              carbonEmission: 0.0135402,
            },
            {
              label: 'Document',
              requestCount: 1,
              resourceType: 'document',
              transferSize: 58710,
              carbonEmission: 0.0161104,
            },
            {
              label: 'Font',
              requestCount: 2,
              resourceType: 'font',
              transferSize: 39420,
              carbonEmission: 0.0108126,
            },
            {
              label: 'Image',
              requestCount: 6,
              resourceType: 'image',
              transferSize: 58110,
              carbonEmission: 0.0159402,
            },
            {
              label: 'Other',
              requestCount: 4,
              resourceType: 'other',
              transferSize: 38990,
              carbonEmission: 0.0106901,
            },
            {
              label: 'Media',
              requestCount: 0,
              resourceType: 'media',
              transferSize: 0,
              carbonEmission: 0,
            },
            {
              label: 'Third-party',
              requestCount: 10,
              resourceType: 'third-party',
              transferSize: 145110,
              carbonEmission: 0.0397804,
            },
          ],
          accessibility_summary: {
            violation_count: 1,
            assisted_count: 0,
            tags: ['RGAA-9.2.1', 'RGAAv4', 'best-practice'],
            severity_counts: {minor: 1},
          },
        },
      },

      // ============================================================= portfolio
      // A deliberately bad page: heavy video, poor scores.
      {
        submitted_url: 'https://lemonhive.com/portfolio',
        normalized_url: 'https://lemonhive.com/portfolio',
        display_domain: 'https://www.lemonhive.com/portfolio',
        status: 'completed',
        url_report_id: 'page-portfolio',
        image_url: null,
        updated_at: '2026-07-06T05:14:37.558109Z',
        is_green_hosting: null,

        average_carbon_emission: 1.7044113,
        average_energy: 0.0038194,
        kilobytes_transferred: 8942.08,

        desktop: {
          strategy: 'desktop',
          cwv_assessment: 'Failed',
          carbon_emission: 2.27124,
          perf: 34,
          acs: 71,
          seo: 83,
          bp: 64,
          field_metrics: null,
          lab_metrics: {
            fcp: 2.4,
            lcp: 5.9,
            cls: 0.28,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 5.2,
            total_blocking_time: 1480,
            time_to_interactive: 12.4,
          },
          resources: [
            {
              label: 'Media',
              requestCount: 3,
              resourceType: 'media',
              transferSize: 4820110,
              carbonEmission: 1.3224017,
            },
            {
              label: 'Script',
              requestCount: 64,
              resourceType: 'script',
              transferSize: 2418804,
              carbonEmission: 0.6648172,
            },
            {
              label: 'Other',
              requestCount: 17,
              resourceType: 'other',
              transferSize: 412330,
              carbonEmission: 0.1130904,
            },
            {
              label: 'Image',
              requestCount: 38,
              resourceType: 'image',
              transferSize: 401220,
              carbonEmission: 0.1100903,
            },
            {
              label: 'Document',
              requestCount: 2,
              resourceType: 'document',
              transferSize: 96410,
              carbonEmission: 0.0264502,
            },
            {
              label: 'Stylesheet',
              requestCount: 9,
              resourceType: 'stylesheet',
              transferSize: 74110,
              carbonEmission: 0.0203401,
            },
            {
              label: 'Font',
              requestCount: 3,
              resourceType: 'font',
              transferSize: 51220,
              carbonEmission: 0.0140504,
            },
            {
              label: 'Third-party',
              requestCount: 22,
              resourceType: 'third-party',
              transferSize: 498110,
              carbonEmission: 0.1365803,
            },
          ],
          accessibility_summary: {
            violation_count: 12,
            assisted_count: 3,
            tags: ['EN-301-549', 'RGAA-3.2.1', 'RGAAv4', 'section508', 'wcag2a', 'wcag2aa'],
            severity_counts: {critical: 2, serious: 5, moderate: 3, minor: 2},
          },
        },

        mobile: {
          strategy: 'mobile',
          cwv_assessment: 'Failed',
          carbon_emission: 2.633952,
          perf: 22,
          acs: 64,
          seo: 83,
          bp: 64,
          field_metrics: {
            fcp: 4.1,
            lcp: 12.4,
            cls: 0.22,
            fid: null,
            inp: 540,
            ttfb: 1.2,
            speed_index: null,
            total_blocking_time: null,
            time_to_interactive: null,
          },
          lab_metrics: {
            fcp: 4.8,
            lcp: 17.2,
            cls: 0.33,
            fid: null,
            inp: null,
            ttfb: null,
            speed_index: 14.6,
            total_blocking_time: 2210,
            time_to_interactive: 21.7,
          },
          resources: [
            {
              label: 'Media',
              requestCount: 3,
              resourceType: 'media',
              transferSize: 6110420,
              carbonEmission: 1.6760803,
            },
            {
              label: 'Script',
              requestCount: 68,
              resourceType: 'script',
              transferSize: 2604118,
              carbonEmission: 0.7155504,
            },
            {
              label: 'Other',
              requestCount: 15,
              resourceType: 'other',
              transferSize: 371220,
              carbonEmission: 0.1018403,
            },
            {
              label: 'Image',
              requestCount: 27,
              resourceType: 'image',
              transferSize: 288110,
              carbonEmission: 0.0790602,
            },
            {
              label: 'Document',
              requestCount: 2,
              resourceType: 'document',
              transferSize: 97110,
              carbonEmission: 0.0266304,
            },
            {
              label: 'Stylesheet',
              requestCount: 9,
              resourceType: 'stylesheet',
              transferSize: 74880,
              carbonEmission: 0.0205503,
            },
            {
              label: 'Font',
              requestCount: 3,
              resourceType: 'font',
              transferSize: 51930,
              carbonEmission: 0.0142406,
            },
            {
              label: 'Third-party',
              requestCount: 21,
              resourceType: 'third-party',
              transferSize: 447220,
              carbonEmission: 0.1226403,
            },
          ],
          accessibility_summary: {
            violation_count: 12,
            assisted_count: 3,
            tags: ['EN-301-549', 'RGAA-3.2.1', 'RGAAv4', 'section508', 'wcag2a', 'wcag2aa'],
            severity_counts: {critical: 2, serious: 5, moderate: 3, minor: 2},
          },
        },
      },

      // ============================================================= services
      // Scan in progress: no device results yet.
      {
        submitted_url: 'https://lemonhive.com/services',
        normalized_url: 'https://lemonhive.com/services',
        display_domain: 'https://www.lemonhive.com/services',
        status: 'processing',
        url_report_id: 'page-services',
        image_url: null,
        updated_at: '2026-07-06T05:15:11.204883Z',
        is_green_hosting: false,

        average_carbon_emission: null,
        average_energy: null,
        kilobytes_transferred: null,

        desktop: null,
        mobile: null,
      },

      // ================================================================ about
      // Queued: the scan has not started, so nothing is known.
      {
        submitted_url: 'https://lemonhive.com/about',
        normalized_url: 'https://lemonhive.com/about',
        display_domain: 'https://www.lemonhive.com/about',
        status: 'queued',
        url_report_id: 'page-about',
        image_url: null,
        updated_at: null,
        is_green_hosting: false,

        average_carbon_emission: null,
        average_energy: null,
        kilobytes_transferred: null,

        desktop: null,
        mobile: null,
      },

      // ============================================================== careers
      // Failed: the scan errored, so nothing is known.
      {
        submitted_url: 'https://lemonhive.com/careers',
        normalized_url: 'https://lemonhive.com/careers',
        display_domain: 'https://www.lemonhive.com/careers',
        status: 'failed',
        url_report_id: 'page-careers',
        image_url: null,
        updated_at: null,
        is_green_hosting: false,

        average_carbon_emission: null,
        average_energy: null,
        kilobytes_transferred: null,

        desktop: null,
        mobile: null,
      },
    ],
  },

  error_message: null,
}

/**
 * The same leaderboard with the unfinished scans resolved, so the "all
 * complete" path can be checked.
 *
 * Counters are derived from the items rather than typed by hand, so the summary
 * can never disagree with the list it describes.
 */
const completedItems = mockLeaderboard.leaderboard!.items.filter(
  (item) => item.status === 'completed',
)

export const mockCompletedLeaderboard: SitebeaconResponse = {
  leaderboard: {
    ...mockLeaderboard.leaderboard!,
    status: 'completed',
    total_urls: completedItems.length,
    completed_urls: completedItems.length,
    failed_urls: 0,
    processing_urls: 0,
    items: completedItems,
  },
  error_message: null,
}

/** No URLs submitted yet - the empty state. */
export const mockEmptyLeaderboard: SitebeaconResponse = {
  leaderboard: {
    ...mockLeaderboard.leaderboard!,
    id: 'empty-leaderboard',
    leaderboard_name: 'Not scanned yet',
    status: 'pending',
    results_ready_at: null,
    total_urls: 0,
    completed_urls: 0,
    failed_urls: 0,
    processing_urls: 0,
    items: [],
  },
  error_message: null,
}

/** What the API returns when the request itself fails. */
export const mockErrorResponse: SitebeaconResponse = {
  leaderboard: null,
  error_message: 'Could not load the leaderboard. Check your Sitebeacon connection.',
}

/**
 * Every mock response in one object, so each state can be inspected by name:
 *
 *   getLeaderboard({fixture: 'empty'})
 */
export const mockResponses = {
  mixed: mockLeaderboard,
  completed: mockCompletedLeaderboard,
  empty: mockEmptyLeaderboard,
  error: mockErrorResponse,
}

export type MockFixtureName = keyof typeof mockResponses
