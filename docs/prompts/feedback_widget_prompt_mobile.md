# Claude Code Prompt — Shake-to-Report Feedback Widget (Mobile / React Native)

Use this prompt at the start of a Claude Code session to add shake-to-report feedback to any React Native project. Replace the bracketed values before running.

---

## Part 1 — Build the widget

```
This project needs a shake-to-report feedback widget. Add it to the mobile app globally.

WHAT IT MUST DO

Shake gesture triggers the reporter:
- On shake: automatically capture a screenshot, then open a bottom-sheet modal
- Modal contains: a free-text "What went wrong?" input and a screenshot preview
- On submission: bundle the comment, screenshot, recent logs, device info, and breadcrumb trail, then POST to the backend feedback endpoint
- The backend creates a GitHub Issue and optionally sends a Slack notification — the app itself holds no GitHub token
- Success state: show "Reported as #<issue-number>" and a Done button — no redirect

The app must never hold the GitHub token. It posts to a server-side proxy endpoint that files the issue.

LIBRARIES REQUIRED — install these before writing any code

react-native-shake       — shake gesture detection (works on iOS and Android)
react-native-view-shot   — screenshots captured at the moment of shake

For iOS: run `pod install` after installing. For Android: no extra linking needed for either library on RN 0.60+.

UTILITIES — create these first, they are used by the store and component

1. logBuffer.ts — in-memory ring buffer (150 entries) that intercepts console.log/warn/error/info from app startup. Export:
   - installLogBuffer(): void — call once in index.js before <App /> mounts
   - getRecentLogs(): string — returns formatted log history

2. breadcrumbs.ts — in-memory bounded list (50 entries) of structured user/app events. Export:
   - addBreadcrumb(category: string, message: string): void — call at navigation changes, API calls, key user actions
   - getBreadcrumbs(): string — returns formatted trail
   - clearBreadcrumbs(): void

3. deviceInfo.ts — returns a markdown-formatted string with OS name, OS version, device model (Android only), app version, and current environment (dev/staging/prod). Use react-native's Platform module and any existing config/version constants in the project.

STATE MANAGEMENT — create a Zustand store (feedback-store.ts)

State: visible, screenshot (base64 string or null), comment, submitting, error, result ({ url, number } or null)
Actions:
- open(screenshotBase64: string | null): set visible true, store screenshot, reset comment/error/result
- setComment(text: string): update comment
- submit(): call the feedback repository, set submitting/error/result accordingly
- close(): reset all state

REPOSITORY — create feedback.repository.ts

Single method: submitFeedback({ comment, screenshotBase64, logs, deviceInfo, breadcrumbs })
- POST to [FEEDBACK_ENDPOINT] (the backend proxy URL — set in your env/config, never hardcode)
- On success: return { issueUrl, issueNumber }
- On failure: throw an Error with the server's message (surface it to the user)

COMPONENT — FeedbackReporter

Mount point: add as the last child inside <SafeAreaProvider> in App.tsx (or your root layout). Mount it once globally — never inside a screen.

Behavior:
- useEffect: subscribe to RNShake.addListener. On shake, call captureScreen from react-native-view-shot (format: 'png', quality: 0.6, result: 'base64'), then call store.open(b64). Unsubscribe on unmount.
- If store.visible is false, return null
- Render a Modal (transparent, animationType="slide") with a bottom-sheet panel
- Inside: drag handle, title "Report a problem", screenshot preview (if available), comment input, error text, Cancel + Send report buttons
- Loading state on Submit while submitting
- Success state: "Thanks! Reported as #<number>" with a Done button

BACKEND ENDPOINT — POST [FEEDBACK_ENDPOINT]

The backend must:
1. Accept: comment, screenshotBase64, logs, deviceInfo, breadcrumbs
2. Validate and sanitize all inputs server-side
3. Store the screenshot to public/accessible storage (NOT GitHub raw URLs — they expire). Return a permanent public URL.
4. Create a GitHub Issue using GITHUB_FEEDBACK_TOKEN (server env var only — never in the app). Issue body should include: comment, reporter identity (from bearer token if signed in, otherwise anonymous), screenshot (inline image), device info, breadcrumbs, and recent logs in a collapsible <details> block.
5. Optionally: POST a Slack notification to SLACK_WEBHOOK_URL with a one-line summary and link to the issue
6. Respond with: { issueUrl: string, issueNumber: number } on success, or { status: false, message: string } on failure
7. Apply rate limiting (e.g. 200 req/min) — the endpoint is public so pre-login users can report too

The route should be unauthenticated (works even before login) but use the request's bearer token to attribute the reporter if one exists.

ENVIRONMENT VARIABLES — server-side only, never in the app

GITHUB_FEEDBACK_TOKEN=    [GitHub personal access token with Issues:write scope]
GITHUB_FEEDBACK_REPO=     [owner/repo-name]
SLACK_WEBHOOK_URL=        [optional — Slack incoming webhook for notifications]

The app only needs the backend URL, which is already in its existing config.

INSTRUMENTATION — add breadcrumbs at key points after the widget is wired up

Call addBreadcrumb(category, message) at:
- Navigation events: addBreadcrumb('nav', 'Navigated to ScreenName')
- API calls (success and failure): addBreadcrumb('api', 'POST /endpoint → 200')
- Key user actions: addBreadcrumb('action', 'Tapped Submit')
- Auth events: addBreadcrumb('auth', 'Signed in')

Do not instrument every tap — focus on transitions and API boundaries. 10–20 callsites across the app is enough.

BEFORE WRITING ANY CODE

Tell me:
1. Which state management library is already in use (Zustand, Redux, MobX, Context) — prefer what is already there over adding Zustand
2. Where the root layout / App entry point is
3. What env/config pattern the project uses for the backend URL
4. Whether a backend already exists and what framework it uses (Laravel, Express, Next.js API routes, etc.)

Wait for a yes before proceeding.
```

---

## Part 2 — Issue response flow

Paste this as a standing instruction at the start of any session where you will be working on feedback issues from the widget.

```
When I ask you to handle a feedback issue from the shake-to-report widget, always follow this sequence. Do not skip steps.

STEP 1 — Read the issue

gh issue view <number> --repo <GITHUB_REPO>

Extract: the comment, the reporter identity (name/email/role if present or "Anonymous"), device info block, breadcrumb trail, and any error visible in the recent logs.

STEP 2 — Analyze before touching code

- If the comment describes a crash or unexpected behavior: read the recent logs and breadcrumb trail in the issue body first. They show exactly what happened in the 30–60 seconds before the report. Trace the relevant screen or component from the breadcrumbs before proposing anything.
- If the comment is vague ("app is slow", "something broke"): check the device info for OS version or environment mismatches that could explain it. Ask for more detail only if the logs and breadcrumbs give nothing to go on.
- If the comment is a feature request or question: treat it as a Suggestion. Assess scope before acting.

If the issue is ambiguous or the decision belongs to the PO or Tech Lead, ask before writing any code.

STEP 3 — Propose, then implement

- Low-risk changes (copy, color, spacing, minor logic fix): implement first, show the diff, ask for approval before deploying.
- Anything requiring judgment (new behavior, layout changes, API changes): propose the approach and wait for a clear yes before writing code.

STEP 4 — Deploy, close, and notify

Once the fix is live, do all three in one go — do not stop after any single one:

1. Close the GitHub issue with an explanatory comment:
   gh issue comment <number> --repo <GITHUB_REPO> --body "<what changed and why>"
   gh issue close <number> --repo <GITHUB_REPO>

2. If a Slack notification exists for this issue, reply in its thread:
   - Search the project channel for the bot message referencing this issue number
   - Reply with: what was fixed, confirmation it is live, link to the production build or deploy
   - Always use thread_ts — reply inside the thread, never as a standalone channel message

3. Do not report the task as complete until GitHub is closed and (if applicable) the Slack thread is updated.

NOTES
- The breadcrumb trail is the most valuable debugging signal — read it before asking the reporter for steps to reproduce.
- Device info will tell you if the issue is OS-version or environment specific (dev vs staging vs prod).
- Recent logs are collapsed in the issue body — expand them before concluding there is no useful information.
- GitHub repo and Slack channel ID are in the project env or CLAUDE.md if one exists.
```

---

## Architecture reference — what was built in DriveNow

The pattern above is a direct generalization of the implementation in `designli/drive-now-platform`. Key decisions made there and why:

| Decision | Reason |
|---|---|
| App POSTs to backend proxy, never calls GitHub directly | GitHub token must not ship in the APK — once in a distributed binary, it cannot be rotated safely |
| Screenshot saved to server's public storage, not GitHub | Raw GitHub URLs on private repos expire — a public URL renders inline in the issue permanently |
| logBuffer installed at `index.js` startup | Captures logs from before any screen mounts — catches startup crashes that would otherwise leave no trace |
| FeedbackReporter mounted once in root layout | Ensures the shake listener is always active, regardless of which screen is visible |
| No type selector — just a free-text comment | Reduces friction; device info + breadcrumbs + logs already provide the context a type selector was meant to add |
| Route is public (no auth required) | Users on the login screen or in onboarding can still report — those screens have the most first-run bugs |
| Reporter resolved from bearer token server-side | Attribution without requiring the app to send PII explicitly |

---

*Designli | Reusable prompt | Shake-to-report feedback widget | React Native*
