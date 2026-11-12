# LunarX Account-Linkage Risk API

A Rust API that estimates whether two LunarX accounts may be linked. It returns one **pair-level linkage score**, the evidence supporting it, contradictory evidence, and narrowly scoped review candidates. It does not identify a real-world person, prove ownership, or enforce restrictions.

## What it covers

- **Browser/device:** opaque browser and device fingerprint matches.
- **Writing style:** function-word patterns, punctuation, capitalization, repeated unusual typos, emoji placement, formatting and message-length distributions from public LunarX-authored text.
- **`/chat`:** public text-channel usage distribution, active-hour distribution, inter-message gap distribution, message bursts per session, and optional stylometry of already-posted public messages.
- **General activity:** session cadence, active hours, viewing/reading sequences and repeated activity handoffs.
- **Account context:** account creation proximity, registration bursts, referral overlap, shared AniList links and verified email age.
- **Profile:** similar public usernames/display names and matching avatar/banner asset hashes.
- **LunarX rewards/progression:** Luna Coins, ad points, pulls, Gacha, XP, achievements and unusual guild reward transfers.
- **Community/content:** coordinated public engagement, reciprocal boosting, guild activity, trading, duplicate uploads and repeated templates.
- **Moderation:** chat, community, upload, guild and site-ban evasion records.

There are **no payment or payment-processor signals**.

## `/chat` collection boundary

The scorer accepts aggregate evidence from LunarX's `/chat` page. Chat evidence is limited to messages already posted in public text channels. The collector must exclude:

- DMs and other private conversations.
- Staff/private channels.
- Voice channels or audio.
- Unsent drafts, clipboard content, keypresses and inter-key timing.

“Typing patterns” means patterns in messages a user has actually sent, such as writing style, message lengths, punctuation and posted-message cadence. It is not keystroke biometrics or a hidden keylogger. Raw message samples, when explicitly included for public-chat stylometry, are compared in memory and are not returned in the response. Do not log or persist the request body or raw samples.

`public_text_channels_only` must be set by trusted server-side code after selecting eligible channels. It is not a substitute for enforcing this boundary in the collector.

### Chat sample thresholds

| Chat evidence | Minimum data | Similarity threshold |
|---|---|---:|
| Channel usage distribution | 40 public messages per account | 78/100 |
| Active-hour distribution | 14 active days per account and 24 hourly buckets | 78/100 |
| Message cadence | 10 sessions per account and 6 inter-message-gap buckets | 78/100 |
| Messages per session | 10 sessions per account and 5 message-count buckets | 78/100 |
| Public-chat writing style | 300 words per account, same supported language, `writing_style` checked | 70/100 |

Chat timing is calculated from timestamps of messages sent, not typing speed. All `/chat` evidence—including chat writing style and chat activity—is placed in one `chat` convergence group, so multiple measurements from the same chat surface cannot falsely count as several independent sources.

## Normal-user experience

The scorer is passive. Low and moderate scores do not trigger a CAPTCHA, warning, verification prompt, logout or account restriction. Scores from 20–59 return `observe_silently` for internal evidence accumulation only. Scores of 60+ enter human review; the score itself never applies a ban or lock. Any proposed restriction must be tied to a matching abuse/evasion event, limited to the affected feature and approved by a human reviewer.

## Pair symmetry

The relationship is assessed as one pair: X↔Y. `pair_id` is canonical and remains the same when account order is reversed. `overall_score` is the same pair-level score; `account_a_id` is the caller's reference side and `possible_alt_account_id` is the candidate label for reviewer convenience. It is a heuristic review-priority score, **not a calibrated probability**. Direction-sensitive moderation records must still be reviewed for which account attempted to evade which restriction.

For the email-age signal, prefer `age_hours_a` and `age_hours_b`. Either account being newly created can contribute the same low-weight pair signal. Legacy `age_hours` is treated as the youngest verified email age in the pair; it is not “account B only”. Never estimate email age from the address, domain or provider.

## Privacy and fairness

- Compare fingerprint data only through opaque server-generated match tokens. Never send raw fingerprint attributes or raw IP addresses.
- Use public user-selected content only for stylometry. Do not include private chat or DMs.
- Do not score dialect, language proficiency, nationality, disability or other protected traits.
- Similar names, shared interests, common fandom language, shared households and shared networks are weak/confounded clues.
- A shared IP/ASN is extremely low weight and never establishes common ownership.
- Store evidence references and derived scores, not raw comparison text, beyond the short review window defined by LunarX policy.
- Calibrate the weights and thresholds against labelled linked/unlinked account pairs and routinely audit false positives before enforcement use.

## Run

The project pins stable Rust 1.100.0.

```bash
cargo run --release
```

The service listens on `0.0.0.0:8787` and exposes:

- `POST /api/account-linkage/score`

Put it behind LunarX's authenticated internal API gateway. The existing API is a **scoring endpoint**, not a background collector: LunarX application services must query account records, build evidence profiles, identify candidate pairs and submit them to this endpoint. This project does not scrape `/chat` itself or query LunarX's database.

## Request example

The example below shows the public-chat input. The histogram arrays must have the specified lengths and be generated by the trusted backend.

```json
{
  "account_a_id": "user_100",
  "account_b_id": "user_204",
  "checked_categories": ["behavioral", "writing_style", "fingerprint", "lifecycle"],
  "signals": [
    { "kind": "browser_fingerprint_match", "evidence_ref": "ev_browser_001" },
    { "kind": "device_fingerprint_match", "evidence_ref": "ev_device_001" },
    {
      "kind": "email_recently_created",
      "evidence_ref": "ev_email_001",
      "age_hours_a": 420,
      "age_hours_b": 18
    }
  ],
  "chat_activity": {
    "evidence_ref": "ev_chat_001",
    "public_text_channels_only": true,
    "account_a": {
      "message_count": 160,
      "active_days": 28,
      "session_count": 24,
      "public_channel_counts": {"general": 90, "anime": 40, "manga": 20, "help": 10},
      "active_hour_counts": [0, 0, 0, 0, 0, 1, 2, 5, 8, 12, 15, 18, 20, 16, 14, 12, 10, 8, 6, 5, 3, 2, 1, 0],
      "inter_message_gap_counts": [20, 30, 18, 12, 8, 4],
      "messages_per_session_counts": [2, 8, 7, 5, 2],
      "language_code": "en",
      "public_message_samples": []
    },
    "account_b": {
      "message_count": 155,
      "active_days": 27,
      "session_count": 22,
      "public_channel_counts": {"general": 88, "anime": 42, "manga": 17, "help": 8},
      "active_hour_counts": [0, 0, 0, 0, 0, 1, 2, 5, 8, 12, 15, 18, 20, 16, 14, 12, 10, 8, 6, 5, 3, 2, 1, 0],
      "inter_message_gap_counts": [19, 31, 17, 12, 8, 4],
      "messages_per_session_counts": [2, 7, 7, 4, 2],
      "language_code": "en",
      "public_message_samples": []
    }
  }
}
```

`public_message_samples` should only be populated when `writing_style` is in `checked_categories` and the collector has selected messages from public text channels. Each account needs at least 300 words; only supported same-language comparisons currently produce a stylometry signal. The current built-in stylometry supports English and German.

`public_channel_counts` must contain only public text-channel counts. The vectors are fixed-shape histograms: 24 UTC-hour buckets; 6 gaps between consecutive messages sent by the same account (`<2s`, `2–10s`, `10–60s`, `1–5m`, `5–30m`, `>30m`); and 5 messages-per-session buckets (`1–2`, `3–5`, `6–10`, `11–20`, `>20`). Use the same bucket definitions for both accounts. These are aggregate sent-message timestamps, not per-keypress typing intervals. Do not submit channel names or metadata for private channels.

## Signals and scoring

All matching signals require an opaque evidence reference beginning with `ev_`. Similarity fields must be measured values from 0–100. Duplicate signal kinds do not stack; each category is capped, and evidence groups prevent correlated measurements from overstating confidence.

The independent groups are `technical`, `activity`, `content`, `account_context`, `abuse`, `network` and `chat`. All `/chat` signals count only as `chat`. Shared household/workplace/public networks are treated as confounders and raise the proof requirements for restrictions.

One meaningful group caps the score at 55; two cap it at 79. Three independent groups are required to exceed 79. A low score does not prove two accounts have different owners; it can also mean evidence is unavailable.

## Risk thresholds

| Score | Label | Internal response |
|---:|---|---|
| 0–19 | Low | Allow |
| 20–39 | Elevated | Observe silently |
| 40–59 | Moderate | Observe silently; no user prompt |
| 60–79 | High | Human review |
| 80–100 | Critical | Priority human review |

No score by itself authorizes a restriction. Reward restrictions require the corresponding person-limited reward event and independent supporting evidence. XP/achievement, Gacha, guild transfer, trading, community posting, upload and chat restrictions each require a matching feature-specific abuse/evasion event plus independent evidence. Site-access restrictions require explicit site-ban-evasion evidence and higher convergence. All candidates require recorded human approval.

## Tests

```bash
cargo test
```

## `/chat` pair comparison guarantees

The chat score is symmetric: comparing X against Y produces the same `pair_id`, `overall_score`, category scores and evidence-group results as comparing Y against X with the same underlying observations. The API keeps the caller's A/B order only for display labels and for moderator investigation; this does not make the linkage score directional. Chat signals are sourced from aggregated public text-channel activity on `/chat` and should be refreshed from normal message/session events by the LunarX backend. This Rust service does not currently subscribe to the live chat event stream or read the database by itself.