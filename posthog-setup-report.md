<wizard-report>
# PostHog post-wizard report

The wizard has completed a PostHog integration for the TractionLab landing page. PostHog is initialized via a reusable `posthog.astro` component embedded in the shared `Layout.astro`. All pages that use that layout automatically load PostHog. The waitlist form (`WaitlistForm.astro`) identifies users on signup via `posthog.identify()` and captures key conversion and error events. UTM source attribution is captured on every submission. PII (email, first name) is sent only to `identify()`, never to `capture()`.

| Event | Description | File |
|---|---|---|
| `page_viewed` | Fires when a visitor loads the landing page — top of the conversion funnel | `src/pages/index.astro` |
| `waitlist_signup_submitted` | Fires on every successful form submission. Properties: `top_problem`, `source` (UTM) | `src/components/WaitlistForm.astro` |
| `waitlist_signup_failed` | Fires when submission is blocked by validation or an unexpected error. Properties: `reason`, `missing_first_name`, `missing_email` | `src/components/WaitlistForm.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/455988/dashboard/1680392)
- [Total waitlist signups](https://us.posthog.com/project/455988/insights/SdlgyBN9)
- [Waitlist signups over time](https://us.posthog.com/project/455988/insights/PQHt2Zrr)
- [Landing page views over time](https://us.posthog.com/project/455988/insights/u8UgJSK2)
- [Signups vs failures](https://us.posthog.com/project/455988/insights/r5RcoWu2)
- [Signups by traffic source](https://us.posthog.com/project/455988/insights/uHI2ILeZ)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
