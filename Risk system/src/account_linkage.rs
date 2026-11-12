use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, BTreeSet};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EvidenceCategory {
    Fingerprint,
    WritingStyle,
    Behavioral,
    Network,
    Rewards,
    Content,
    Lifecycle,
    Profile,
    SocialGraph,
    Moderation,
}

impl EvidenceCategory {
    fn convergence_group(self) -> EvidenceGroup {
        match self {
            Self::Fingerprint => EvidenceGroup::Technical,
            Self::Behavioral | Self::SocialGraph => EvidenceGroup::Activity,
            Self::WritingStyle | Self::Content => EvidenceGroup::Content,
            Self::Lifecycle | Self::Profile => EvidenceGroup::AccountContext,
            Self::Rewards | Self::Moderation => EvidenceGroup::Abuse,
            Self::Network => EvidenceGroup::Network,
        }
    }

    pub const ALL: [Self; 10] = [
        Self::Fingerprint,
        Self::WritingStyle,
        Self::Behavioral,
        Self::Network,
        Self::Rewards,
        Self::Content,
        Self::Lifecycle,
        Self::Profile,
        Self::SocialGraph,
        Self::Moderation,
    ];

    fn weight(self) -> u32 {
        match self {
            Self::Fingerprint => 24,
            Self::WritingStyle => 12,
            Self::Behavioral => 14,
            Self::Network => 3,
            Self::Rewards => 14,
            Self::Content => 8,
            Self::Lifecycle => 7,
            Self::Profile => 5,
            Self::SocialGraph => 5,
            Self::Moderation => 8,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EvidenceGroup {
    Technical,
    Activity,
    Content,
    AccountContext,
    Abuse,
    Network,
    Chat,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum EvidenceKind {
    BrowserFingerprintMatch,
    DeviceFingerprintMatch,
    BrowserAndDeviceFingerprintMatch,
    SharedIpPrefixMatch,
    SharedAsnMatch,
    ActiveHoursPatternMatch,
    SessionCadenceMatch,
    MutualExclusivityPattern,
    PlaybackSequencePatternMatch,
    ReadingSequencePatternMatch,
    ActivitySequencePatternMatch,
    ChatChannelUsagePatternMatch,
    ChatActiveHoursPatternMatch,
    ChatMessageCadencePatternMatch,
    ChatSessionBurstPatternMatch,
    PublicChatStylometricSimilarity,
    StylometricSimilarity,
    RepeatedIdiosyncraticTypo,
    PunctuationPatternMatch,
    CapitalizationPatternMatch,
    EmojiUsagePatternMatch,
    MessageFormattingPatternMatch,
    MessageLengthPatternMatch,
    ExactDuplicateUploadHash,
    NearDuplicateUploadContent,
    DuplicateCommentTemplate,
    SamePerPersonLunaCoinRewardClaim,
    SamePerPersonAdPointRewardClaim,
    SamePerPersonPullRewardClaim,
    RepeatedRewardFarmingPattern,
    AbnormalXpFarmingPattern,
    CoordinatedGachaPattern,
    GuildRewardTransferPattern,
    RegistrationBurst,
    AccountCreationProximity,
    DormancyHandoff,
    SharedReferralPattern,
    SharedAniListAccountLink,
    EmailRecentlyCreated,
    SimilarUsernamePattern,
    SimilarDisplayNamePattern,
    SameProfileAssetHash,
    CoordinatedCommunityEngagement,
    CoordinatedGuildActivity,
    RepeatedCrossAccountBoosting,
    CoordinatedTradingPattern,
    ChatBanEvasionAttempt,
    CommunityRestrictionEvasion,
    UploadRestrictionEvasion,
    GuildRestrictionEvasion,
    SiteBanEvasionAttempt,
}

impl EvidenceKind {
    fn category(self) -> EvidenceCategory {
        match self {
            Self::BrowserFingerprintMatch
            | Self::DeviceFingerprintMatch
            | Self::BrowserAndDeviceFingerprintMatch => EvidenceCategory::Fingerprint,
            Self::SharedIpPrefixMatch | Self::SharedAsnMatch => EvidenceCategory::Network,
            Self::ActiveHoursPatternMatch
            | Self::SessionCadenceMatch
            | Self::MutualExclusivityPattern
            | Self::PlaybackSequencePatternMatch
            | Self::ReadingSequencePatternMatch
            | Self::ActivitySequencePatternMatch
            | Self::ChatChannelUsagePatternMatch
            | Self::ChatActiveHoursPatternMatch
            | Self::ChatMessageCadencePatternMatch
            | Self::ChatSessionBurstPatternMatch => EvidenceCategory::Behavioral,
            Self::StylometricSimilarity
            | Self::PublicChatStylometricSimilarity
            | Self::RepeatedIdiosyncraticTypo
            | Self::PunctuationPatternMatch
            | Self::CapitalizationPatternMatch
            | Self::EmojiUsagePatternMatch
            | Self::MessageFormattingPatternMatch
            | Self::MessageLengthPatternMatch => EvidenceCategory::WritingStyle,
            Self::ExactDuplicateUploadHash
            | Self::NearDuplicateUploadContent
            | Self::DuplicateCommentTemplate => EvidenceCategory::Content,
            Self::SamePerPersonLunaCoinRewardClaim
            | Self::SamePerPersonAdPointRewardClaim
            | Self::SamePerPersonPullRewardClaim
            | Self::RepeatedRewardFarmingPattern
            | Self::AbnormalXpFarmingPattern
            | Self::CoordinatedGachaPattern
            | Self::GuildRewardTransferPattern => EvidenceCategory::Rewards,
            Self::RegistrationBurst
            | Self::AccountCreationProximity
            | Self::DormancyHandoff
            | Self::SharedReferralPattern
            | Self::SharedAniListAccountLink
            | Self::EmailRecentlyCreated => EvidenceCategory::Lifecycle,
            Self::SimilarUsernamePattern
            | Self::SimilarDisplayNamePattern
            | Self::SameProfileAssetHash => EvidenceCategory::Profile,
            Self::CoordinatedCommunityEngagement
            | Self::CoordinatedGuildActivity
            | Self::RepeatedCrossAccountBoosting
            | Self::CoordinatedTradingPattern => EvidenceCategory::SocialGraph,
            Self::ChatBanEvasionAttempt
            | Self::CommunityRestrictionEvasion
            | Self::UploadRestrictionEvasion
            | Self::GuildRestrictionEvasion
            | Self::SiteBanEvasionAttempt => {
                EvidenceCategory::Moderation
            }
        }
    }

    fn convergence_group(self) -> EvidenceGroup {
        match self {
            Self::ChatChannelUsagePatternMatch
            | Self::ChatActiveHoursPatternMatch
            | Self::ChatMessageCadencePatternMatch
            | Self::ChatSessionBurstPatternMatch
            | Self::PublicChatStylometricSimilarity => EvidenceGroup::Chat,
            _ => self.category().convergence_group(),
        }
    }

    fn points(self) -> u8 {
        match self {
            Self::BrowserFingerprintMatch => 45,
            Self::DeviceFingerprintMatch => 60,
            Self::BrowserAndDeviceFingerprintMatch => 80,
            Self::SharedIpPrefixMatch => 3,
            Self::SharedAsnMatch => 1,
            Self::ActiveHoursPatternMatch => 15,
            Self::SessionCadenceMatch => 18,
            Self::MutualExclusivityPattern => 12,
            Self::PlaybackSequencePatternMatch => 15,
            Self::ReadingSequencePatternMatch => 15,
            Self::ActivitySequencePatternMatch => 18,
            Self::ChatChannelUsagePatternMatch => 18,
            Self::ChatActiveHoursPatternMatch => 16,
            Self::ChatMessageCadencePatternMatch => 18,
            Self::ChatSessionBurstPatternMatch => 15,
            Self::PublicChatStylometricSimilarity => 40,
            Self::StylometricSimilarity => 40,
            Self::RepeatedIdiosyncraticTypo => 30,
            Self::PunctuationPatternMatch => 20,
            Self::CapitalizationPatternMatch => 15,
            Self::EmojiUsagePatternMatch => 12,
            Self::MessageFormattingPatternMatch => 15,
            Self::MessageLengthPatternMatch => 15,
            Self::ExactDuplicateUploadHash => 25,
            Self::NearDuplicateUploadContent => 20,
            Self::DuplicateCommentTemplate => 20,
            Self::SamePerPersonLunaCoinRewardClaim => 85,
            Self::SamePerPersonAdPointRewardClaim => 85,
            Self::SamePerPersonPullRewardClaim => 85,
            Self::RepeatedRewardFarmingPattern => 90,
            Self::AbnormalXpFarmingPattern => 65,
            Self::CoordinatedGachaPattern => 70,
            Self::GuildRewardTransferPattern => 55,
            Self::RegistrationBurst => 25,
            Self::AccountCreationProximity => 20,
            Self::DormancyHandoff => 20,
            Self::SharedReferralPattern => 25,
            Self::SharedAniListAccountLink => 50,
            Self::EmailRecentlyCreated => 14,
            Self::SimilarUsernamePattern => 16,
            Self::SimilarDisplayNamePattern => 12,
            Self::SameProfileAssetHash => 12,
            Self::CoordinatedCommunityEngagement => 30,
            Self::CoordinatedGuildActivity => 20,
            Self::RepeatedCrossAccountBoosting => 35,
            Self::CoordinatedTradingPattern => 30,
            Self::ChatBanEvasionAttempt => 80,
            Self::CommunityRestrictionEvasion => 80,
            Self::UploadRestrictionEvasion => 85,
            Self::GuildRestrictionEvasion => 80,
            Self::SiteBanEvasionAttempt => 90,
        }
    }

    fn requires_stylometry_sample(self) -> bool {
        matches!(
            self,
            Self::StylometricSimilarity
                | Self::PublicChatStylometricSimilarity
                | Self::RepeatedIdiosyncraticTypo
                | Self::PunctuationPatternMatch
                | Self::CapitalizationPatternMatch
                | Self::EmojiUsagePatternMatch
                | Self::MessageFormattingPatternMatch
                | Self::MessageLengthPatternMatch
        )
    }

    fn requires_similarity_score(self) -> bool {
        matches!(
            self,
            Self::StylometricSimilarity
                | Self::PublicChatStylometricSimilarity
                | Self::RepeatedIdiosyncraticTypo
                | Self::PunctuationPatternMatch
                | Self::CapitalizationPatternMatch
                | Self::EmojiUsagePatternMatch
                | Self::MessageFormattingPatternMatch
                | Self::MessageLengthPatternMatch
                | Self::ChatChannelUsagePatternMatch
                | Self::ChatActiveHoursPatternMatch
                | Self::ChatMessageCadencePatternMatch
                | Self::ChatSessionBurstPatternMatch
                | Self::NearDuplicateUploadContent
                | Self::DuplicateCommentTemplate
                | Self::SimilarUsernamePattern
                | Self::SimilarDisplayNamePattern
        )
    }

    fn explanation(self) -> &'static str {
        match self {
            Self::BrowserFingerprintMatch => "The same opaque browser-fingerprint token was observed. Browser profiles can be shared, reset, or changed.",
            Self::DeviceFingerprintMatch => "The same opaque device-fingerprint token was observed. A shared household or public device is a known alternative explanation.",
            Self::BrowserAndDeviceFingerprintMatch => "Browser and device fingerprint tokens both matched. This remains one evidence category and is not proof of common ownership.",
            Self::SharedIpPrefixMatch => "A coarse network prefix matched. Homes, schools, workplaces, and mobile networks commonly share addresses, so this has very little weight.",
            Self::SharedAsnMatch => "Both sessions used the same network operator. This is weak contextual evidence only.",
            Self::ActiveHoursPatternMatch => "The accounts show similar active-hour distributions across repeated observations. Shared schedules and time zones can explain this.",
            Self::SessionCadenceMatch => "Session lengths and intervals are similar across repeated observations. Similar routines can still occur independently.",
            Self::MutualExclusivityPattern => "The accounts repeatedly alternate activity. This is supporting evidence, not proof that one person controls both.",
            Self::PlaybackSequencePatternMatch => "Viewing order and progress timing are unusually similar. Popular shows and shared watch plans are possible explanations.",
            Self::ReadingSequencePatternMatch => "Reading order and chapter progression are unusually similar. Shared reading interests and reading groups can explain overlap.",
            Self::ActivitySequencePatternMatch => "A repeated sequence of LunarX actions is similar across the accounts. The underlying actions must be reviewed, not inferred from general popularity.",
            Self::ChatChannelUsagePatternMatch => "The accounts use public /chat text channels in a similar distribution over a sufficient observation period. Popular channels and shared interests can explain this.",
            Self::ChatActiveHoursPatternMatch => "The accounts show similar public-chat activity-hour distributions over multiple active days. Time zones, school, work, and shared routines can explain this.",
            Self::ChatMessageCadencePatternMatch => "The distribution of time gaps between public /chat messages is similar across repeated sessions. This is supporting evidence only.",
            Self::ChatSessionBurstPatternMatch => "The accounts show similar public-chat message bursts per session. This does not use keypress timing or unsent drafts.",
            Self::PublicChatStylometricSimilarity => "Writing patterns are similar in text the accounts posted to public /chat channels. Only published messages are used; DMs and keystroke data are excluded.",
            Self::StylometricSimilarity => "A writing-pattern comparison found a match across sufficiently large samples. It is supporting evidence only and must not be used alone.",
            Self::RepeatedIdiosyncraticTypo => "The same uncommon repeated typo pattern appears in both samples. Common grammar, spelling, dialect, and language proficiency are not treated as suspicious.",
            Self::PunctuationPatternMatch => "Punctuation distributions are similar across sufficiently large writing samples.",
            Self::CapitalizationPatternMatch => "Capitalization and emphasis habits are similar across sufficiently large writing samples.",
            Self::EmojiUsagePatternMatch => "Emoji selection and placement patterns are similar across sufficiently large writing samples.",
            Self::MessageFormattingPatternMatch => "Line breaks, lists, markdown, and message formatting patterns are similar across sufficiently large samples.",
            Self::MessageLengthPatternMatch => "Message-length distributions are similar across sufficiently large samples. This is a weak writing-style signal.",
            Self::ExactDuplicateUploadHash => "Both accounts uploaded a file with the same content hash. Translation teams, mirrors, and permitted reuploads can explain this.",
            Self::NearDuplicateUploadContent => "Uploaded content is near-duplicate according to a content comparison. Shared source material or team collaboration can explain it.",
            Self::DuplicateCommentTemplate => "The accounts repeatedly posted near-identical comment templates. Shared prompts or copied community templates can explain this.",
            Self::SamePerPersonLunaCoinRewardClaim => "Both accounts claimed a LunarX reward marked as limited to one person. Verify the reward ledger and policy scope.",
            Self::SamePerPersonAdPointRewardClaim => "Both accounts claimed the same person-limited ad-point reward. Verify the reward ledger.",
            Self::SamePerPersonPullRewardClaim => "Both accounts claimed the same person-limited pull reward. Verify the reward ledger.",
            Self::RepeatedRewardFarmingPattern => "The accounts show repeated overlapping claims for person-limited LunarX rewards.",
            Self::AbnormalXpFarmingPattern => "The accounts show a repeated XP or achievement progression pattern inconsistent with ordinary use. Check for automation or shared events.",
            Self::CoordinatedGachaPattern => "Gacha-related actions are unusually coordinated across the accounts. Shared event timing alone is not sufficient.",
            Self::GuildRewardTransferPattern => "Guild-related coin or reward transfers form an unusual repeated pattern involving both accounts.",
            Self::RegistrationBurst => "The accounts were created in a short time window. Group signups and shared invitations can explain this.",
            Self::AccountCreationProximity => "The account creation times are close together. Timing alone is weak evidence.",
            Self::DormancyHandoff => "One account repeatedly becomes inactive as the other becomes active. This can have legitimate explanations.",
            Self::SharedReferralPattern => "The accounts share an unusual referral path. Public or widely shared invitations are weak evidence.",
            Self::SharedAniListAccountLink => "The same AniList account connection is linked to both LunarX accounts. Shared or transferred integrations remain possible.",
            Self::EmailRecentlyCreated => "At least one account uses an email address reported as recently created. Email age is only a low-weight context signal and does not establish account ownership.",
            Self::SimilarUsernamePattern => "Public LunarX usernames have a similar construction. Common names, fandom references, and numeric suffixes can overlap by chance.",
            Self::SimilarDisplayNamePattern => "Public display names have a similar pattern. Display names are user-selected and may be copied or themed.",
            Self::SameProfileAssetHash => "The same profile image or banner asset hash appears on both accounts. Shared art, defaults, and fandom assets are common explanations.",
            Self::CoordinatedCommunityEngagement => "The accounts repeatedly interact in a coordinated pattern that goes beyond ordinary shared interests.",
            Self::CoordinatedGuildActivity => "Guild actions involving both accounts show an unusual repeated coordination pattern. Guild membership alone is not suspicious.",
            Self::RepeatedCrossAccountBoosting => "The accounts repeatedly boost one another's content or progression in a way that may violate platform rules.",
            Self::CoordinatedTradingPattern => "Trading activity between the accounts follows an unusual repeated pattern. A normal trade or shared guild alone is not suspicious.",
            Self::ChatBanEvasionAttempt => "An account in this pair appears to have attempted to evade an active chat restriction associated with the other account. Verify the ban record and direction.",
            Self::CommunityRestrictionEvasion => "An account in this pair appears to be evading an active community-posting restriction associated with the other account. Verify the moderation record and direction.",
            Self::UploadRestrictionEvasion => "An account in this pair appears to be evading an active upload restriction associated with the other account. Verify the moderation record and direction.",
            Self::GuildRestrictionEvasion => "An account in this pair appears to be evading an active guild or guild-trading restriction associated with the other account. Verify the moderation record and direction.",
            Self::SiteBanEvasionAttempt => "An account in this pair appears to have attempted to evade an active site-wide restriction associated with the other account. Priority human review is required.",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CounterSignalKind {
    ModeratorVerifiedSeparateOwnership,
    IndependentConcurrentSessions,
    KnownSharedHouseholdNetwork,
    KnownSharedWorkplaceNetwork,
    KnownSharedPublicOrInstitutionalNetwork,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EvidenceSignal {
    pub kind: EvidenceKind,
    pub evidence_ref: String,
    #[serde(default)]
    pub sample_words_a: Option<u32>,
    #[serde(default)]
    pub sample_words_b: Option<u32>,
    #[serde(default)]
    pub same_language_corpus: Option<bool>,
    #[serde(default)]
    pub similarity_score: Option<u8>,
    #[serde(default)]
    pub age_hours: Option<u32>,
    #[serde(default)]
    pub age_hours_a: Option<u32>,
    #[serde(default)]
    pub age_hours_b: Option<u32>,
}

impl EvidenceSignal {
    fn points(&self) -> u8 {
        if self.kind == EvidenceKind::EmailRecentlyCreated {
            let age_points = |age: Option<u32>| match age.unwrap_or(u32::MAX) {
                0..=24 => 14,
                25..=72 => 10,
                73..=168 => 6,
                _ => 0,
            };
            return age_points(self.age_hours_a)
                .max(age_points(self.age_hours_b))
                .max(age_points(self.age_hours));
        }
        if self.kind.requires_similarity_score() {
            let similarity = self.similarity_score.unwrap_or(0).min(100);
            if matches!(self.kind, EvidenceKind::StylometricSimilarity | EvidenceKind::PublicChatStylometricSimilarity) {
                return 25 + ((similarity.saturating_sub(70) as u16 * 15 / 30) as u8);
            }
            return (self.kind.points() as u16)
                .saturating_mul(similarity as u16)
                .checked_div(100)
                .unwrap_or(0) as u8;
        }
        self.kind.points()
    }

    fn strength(&self) -> &'static str {
        match self.points() {
            0..=19 => "low",
            20..=59 => "medium",
            _ => "high",
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CounterSignal {
    pub kind: CounterSignalKind,
    pub evidence_ref: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct TextCorpus {
    pub language_code: String,
    #[serde(default)]
    pub texts: Vec<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct StylometryInput {
    pub evidence_ref: String,
    pub public_content_only: bool,
    pub account_a: TextCorpus,
    pub account_b: TextCorpus,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ChatAccountActivity {
    pub message_count: u32,
    pub active_days: u32,
    pub session_count: u32,
    #[serde(default)]
    pub public_channel_counts: BTreeMap<String, u32>,
    #[serde(default)]
    pub active_hour_counts: Vec<u32>,
    #[serde(default)]
    pub inter_message_gap_counts: Vec<u32>,
    #[serde(default)]
    pub messages_per_session_counts: Vec<u32>,
    pub language_code: String,
    #[serde(default)]
    pub public_message_samples: Vec<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ChatActivityInput {
    pub evidence_ref: String,
    pub public_text_channels_only: bool,
    pub account_a: ChatAccountActivity,
    pub account_b: ChatAccountActivity,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ScoreRequest {
    pub account_a_id: String,
    pub account_b_id: String,
    pub checked_categories: Vec<EvidenceCategory>,
    #[serde(default)]
    pub signals: Vec<EvidenceSignal>,
    #[serde(default)]
    pub counter_signals: Vec<CounterSignal>,
    #[serde(default)]
    pub stylometry: Option<StylometryInput>,
    #[serde(default)]
    pub chat_activity: Option<ChatActivityInput>,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RiskBand {
    Low,
    Elevated,
    Moderate,
    High,
    Critical,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RecommendedAction {
    Allow,
    ObserveSilently,
    CollectMoreEvidence,
    StepUpVerification,
    HumanReview,
    PriorityHumanReview,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum RestrictionScope {
    LunaCoinRewards,
    AdPointRewards,
    PullRewards,
    XpAndAchievements,
    Gacha,
    GuildTransfers,
    Trading,
    CommunityPosting,
    Uploads,
    Chat,
    SiteAccess,
}

#[derive(Debug, Clone, Serialize)]
pub struct RestrictionCandidate {
    pub scope: RestrictionScope,
    pub reason: &'static str,
    pub requires_human_approval: bool,
}

#[derive(Debug, Clone, Serialize)]
pub struct MatchedSignal {
    pub category: EvidenceCategory,
    pub signal: EvidenceKind,
    pub evidence_ref: String,
    pub strength: &'static str,
    pub notes: &'static str,
    pub sample_words_a: Option<u32>,
    pub sample_words_b: Option<u32>,
    pub similarity_score: Option<u8>,
    pub age_hours: Option<u32>,
    pub age_hours_a: Option<u32>,
    pub age_hours_b: Option<u32>,
}

#[derive(Debug, Clone, Serialize)]
pub struct ContradictingSignal {
    pub signal: CounterSignalKind,
    pub evidence_ref: String,
    pub notes: &'static str,
}

#[derive(Debug, Clone, Serialize)]
pub struct ScoreResponse {
    pub pair_id: String,
    pub reference_account_id: String,
    pub possible_alt_account_id: String,
    pub overall_score: u8,
    pub risk_band: RiskBand,
    pub categories_scored: Vec<EvidenceCategory>,
    pub categories_unavailable: Vec<EvidenceCategory>,
    pub categories_with_meaningful_matches: Vec<EvidenceCategory>,
    pub evidence_groups_with_meaningful_matches: Vec<EvidenceGroup>,
    pub category_scores: BTreeMap<EvidenceCategory, u8>,
    pub matched_signals: Vec<MatchedSignal>,
    pub contradicting_signals: Vec<ContradictingSignal>,
    pub limitations: Vec<String>,
    pub recommended_action: RecommendedAction,
    pub human_review_required: bool,
    pub restriction_candidates: Vec<RestrictionCandidate>,
    pub rationale: String,
    pub interpretation_note: &'static str,
}

pub fn score_pair(request: ScoreRequest) -> Result<ScoreResponse, String> {
    validate_account_id(&request.account_a_id)?;
    validate_account_id(&request.account_b_id)?;

    if request.account_a_id == request.account_b_id {
        return Err("account_a_id and account_b_id must be different".into());
    }

    let checked: BTreeSet<EvidenceCategory> = request.checked_categories.into_iter().collect();
    if checked.is_empty() {
        return Err("At least one checked category is required".into());
    }

    let mut limitations = vec![
        "This is an abuse-risk priority score, not a probability or verdict that the accounts share an owner.".into(),
        "Browser and device values must be compared as opaque, server-generated identifiers. Raw fingerprint attributes and fingerprint values are never returned.".into(),
        "The candidate direction is caller-defined: account B is shown as the possible alternate relative to account A.".into(),
        "Shared devices and household networks can belong to different people. No single signal authorizes an account action.".into(),
        "Writing-style comparison uses only public LunarX-authored content. Public text channels on /chat may be included; DMs, private/staff channels, voice, drafts, keypresses and inter-key timings are excluded.".into(),
        "A recent email-creation timestamp is a low-weight, order-independent pair signal. Use age_hours_a and age_hours_b; the legacy age_hours field represents the youngest verified email age in the pair. Never guess email age from an address or provider.".into(),
    ];

    let mut incoming_signals = request.signals;
    if let Some(stylometry) = request.stylometry {
        validate_evidence_ref(&stylometry.evidence_ref)?;
        if !stylometry.public_content_only {
            limitations.push(
                "Stylometry was excluded because the supplied corpus was not marked as public LunarX-authored content.".into(),
            );
        } else {
            match compare_stylometry(&stylometry) {
                Some((words_a, words_b, similarity)) if similarity >= 70 => {
                    incoming_signals.push(EvidenceSignal {
                        kind: EvidenceKind::StylometricSimilarity,
                        evidence_ref: stylometry.evidence_ref,
                        sample_words_a: Some(words_a),
                        sample_words_b: Some(words_b),
                        same_language_corpus: Some(true),
                        similarity_score: Some(similarity),
                        age_hours: None,
                        age_hours_a: None,
                        age_hours_b: None,
                    });
                    limitations.push(
                        "Stylometry was used only as supporting evidence from same-language public samples; templated, translated, or AI-assisted writing can distort the comparison.".into(),
                    );
                }
                Some((words_a, words_b, _)) => {
                    limitations.push(format!(
                        "Stylometry was available ({words_a} and {words_b} words) but did not reach the 70-point similarity threshold."
                    ));
                }
                None => {
                    limitations.push(
                        "Stylometry was unavailable: both corpora must use the same supported language and contain at least 300 words each.".into(),
                    );
                }
            }
        }
    }

    if let Some(chat_activity) = request.chat_activity {
        validate_evidence_ref(&chat_activity.evidence_ref)?;
        if !checked.contains(&EvidenceCategory::Behavioral) {
            return Err("chat_activity requires behavioral in checked_categories".into());
        }
        let (chat_signals, chat_limitations) = compare_chat_activity(
            &chat_activity,
            checked.contains(&EvidenceCategory::WritingStyle),
        )?;
        for signal in chat_signals {
            if checked.contains(&signal.kind.category()) {
                incoming_signals.push(signal);
            } else {
                limitations.push(
                    "Public /chat writing-style evidence was not scored because writing_style was not listed in checked_categories.".into(),
                );
            }
        }
        limitations.extend(chat_limitations);
    }

    let mut unique_signals = BTreeMap::<EvidenceKind, EvidenceSignal>::new();
    for signal in incoming_signals {
        validate_evidence_ref(&signal.evidence_ref)?;
        if !checked.contains(&signal.kind.category()) {
            return Err(format!(
                "Signal category {:?} was not listed in checked_categories",
                signal.kind.category()
            ));
        }
        if signal.kind.requires_stylometry_sample() {
            let enough_words = signal.sample_words_a.unwrap_or(0) >= 300
                && signal.sample_words_b.unwrap_or(0) >= 300;
            let comparable_language = signal.same_language_corpus == Some(true);
            if !enough_words || !comparable_language {
                limitations.push(
                    "Writing-style evidence was excluded because both samples need at least 300 words in the same language. Language, dialect, and fluency are never scored.".into(),
                );
                continue;
            }
            if matches!(signal.kind, EvidenceKind::StylometricSimilarity | EvidenceKind::PublicChatStylometricSimilarity)
                && signal.similarity_score.unwrap_or(0) < 70
            {
                continue;
            }
        }
        if signal.kind.requires_similarity_score() && signal.similarity_score.is_none() {
            limitations.push(format!(
                "The {:?} signal was excluded because it requires a measured similarity_score from 0 to 100.",
                signal.kind
            ));
            continue;
        }
        if signal.kind == EvidenceKind::EmailRecentlyCreated {
            let has_valid_age = [signal.age_hours, signal.age_hours_a, signal.age_hours_b]
                .into_iter()
                .flatten()
                .any(|age| age <= 168);
            if !has_valid_age {
                limitations.push("The email-created signal was excluded because neither account had a verified email age within seven days.".into());
                continue;
            }
        }
        if let Some(score) = signal.similarity_score {
            if score > 100 {
                return Err("similarity_score must be between 0 and 100".into());
            }
            if signal.kind.requires_similarity_score() && score < 70 {
                limitations.push(format!(
                    "The {:?} signal was excluded because its similarity score was below 70.",
                    signal.kind
                ));
                continue;
            }
        }
        unique_signals.entry(signal.kind).or_insert(signal);
    }

    let mut unique_counters = BTreeMap::<CounterSignalKind, CounterSignal>::new();
    for signal in request.counter_signals {
        validate_evidence_ref(&signal.evidence_ref)?;
        unique_counters.entry(signal.kind).or_insert(signal);
    }

    let mut category_scores = BTreeMap::new();
    for category in &checked {
        category_scores.insert(*category, category_score(*category, &unique_signals));
    }

    let weight_total: u32 = checked.iter().map(|category| category.weight()).sum();
    let weighted_total: u32 = category_scores
        .iter()
        .map(|(category, score)| category.weight() * (*score as u32))
        .sum();
    let mut overall_score = (weighted_total / weight_total) as u8;

    let meaningful_categories: Vec<EvidenceCategory> = category_scores
        .iter()
        .filter(|(_, score)| **score >= 25)
        .map(|(category, _)| *category)
        .collect();
    let meaningful_groups: Vec<EvidenceGroup> = unique_signals
        .values()
        .filter(|signal| {
            category_scores
                .get(&signal.kind.category())
                .is_some_and(|score| *score >= 25)
        })
        .map(|signal| signal.kind.convergence_group())
        .collect::<BTreeSet<_>>()
        .into_iter()
        .collect();
    match meaningful_groups.len() {
        0 => {}
        1 => overall_score = overall_score.min(55),
        2 => overall_score = overall_score.min(79),
        _ => {}
    }

    let verified_separate = unique_counters
        .contains_key(&CounterSignalKind::ModeratorVerifiedSeparateOwnership);
    let independent_sessions = unique_counters
        .contains_key(&CounterSignalKind::IndependentConcurrentSessions);
    if verified_separate {
        overall_score = overall_score.saturating_sub(35);
        limitations.push(
            "Moderator-verified separate ownership reduced the score by 35 points.".into(),
        );
    }
    if independent_sessions {
        overall_score = overall_score.saturating_sub(10);
        limitations.push(
            "Independently observed concurrent sessions reduced the score by 10 points; this is not conclusive by itself.".into(),
        );
    }
    let known_shared_network = [
        CounterSignalKind::KnownSharedHouseholdNetwork,
        CounterSignalKind::KnownSharedWorkplaceNetwork,
        CounterSignalKind::KnownSharedPublicOrInstitutionalNetwork,
    ]
    .iter()
    .any(|kind| unique_counters.contains_key(kind));
    if known_shared_network {
        limitations.push(
            "A household, workplace, public, or institutional shared network was confirmed. Network overlap is treated as a confounder, not ownership evidence.".into(),
        );
    }

    if meaningful_groups.len() == 1 {
        limitations.push("Only one independent evidence group matched; the overall score is capped at 55.".into());
    } else if meaningful_groups.len() == 2 {
        limitations.push("Only two independent evidence groups matched; the overall score is capped at 79.".into());
    } else if meaningful_groups.is_empty() {
        limitations.push("No meaningful category match was supplied. A low score does not prove separate ownership.".into());
    }

    let categories_scored: Vec<EvidenceCategory> = checked.iter().copied().collect();
    let categories_unavailable: Vec<EvidenceCategory> = EvidenceCategory::ALL
        .into_iter()
        .filter(|category| !checked.contains(category))
        .collect();

    if !categories_unavailable.is_empty() {
        limitations.push(format!(
            "These categories were not checked and were excluded from the weighted score: {}.",
            categories_unavailable
                .iter()
                .map(|category| format!("{category:?}").to_lowercase())
                .collect::<Vec<_>>()
                .join(", ")
        ));
    }

    let matched_signals: Vec<MatchedSignal> = unique_signals
        .values()
        .map(|signal| MatchedSignal {
            category: signal.kind.category(),
            signal: signal.kind,
            evidence_ref: signal.evidence_ref.clone(),
            strength: signal.strength(),
            notes: signal.kind.explanation(),
            sample_words_a: signal.sample_words_a,
            sample_words_b: signal.sample_words_b,
            similarity_score: signal.similarity_score,
            age_hours: signal.age_hours,
            age_hours_a: signal.age_hours_a,
            age_hours_b: signal.age_hours_b,
        })
        .collect();

    let contradicting_signals: Vec<ContradictingSignal> = unique_counters
        .values()
        .map(|signal| ContradictingSignal {
            signal: signal.kind,
            evidence_ref: signal.evidence_ref.clone(),
            notes: match signal.kind {
                CounterSignalKind::ModeratorVerifiedSeparateOwnership => {
                    "A moderator recorded independently verified separate ownership. Review this carefully if later evidence conflicts with it."
                }
                CounterSignalKind::IndependentConcurrentSessions => {
                    "The accounts were independently active at the same time. This weakens, but does not disprove, a shared-owner hypothesis."
                }
                CounterSignalKind::KnownSharedHouseholdNetwork => {
                    "The network is known to be shared by household members; its overlap must not be treated as evidence of shared ownership."
                }
                CounterSignalKind::KnownSharedWorkplaceNetwork => {
                    "The network is known to be shared in a workplace; its overlap must not be treated as evidence of shared ownership."
                }
                CounterSignalKind::KnownSharedPublicOrInstitutionalNetwork => {
                    "The network is a public or institutional network; its overlap must not be treated as evidence of shared ownership."
                }
            },
        })
        .collect();

    let matched_reward_claims = reward_restriction_candidates(&unique_signals);
    let restriction_candidates = build_restriction_candidates(
        overall_score,
        meaningful_groups.len(),
        &unique_signals,
        matched_reward_claims,
        known_shared_network,
    );

    let risk_band = risk_band(overall_score);
    let recommended_action = recommended_action(overall_score);
    let human_review_required = overall_score >= 60 || !restriction_candidates.is_empty();
    let matched_category_names: Vec<String> = meaningful_categories
        .iter()
        .map(|category| format!("{category:?}").to_lowercase())
        .collect();
    let rationale = if matched_category_names.is_empty() {
        "No meaningful matching evidence was supplied by the checked categories. Collect additional independent evidence before drawing conclusions.".into()
    } else {
        format!(
            "Meaningful matches were found in {} across {} independent evidence groups. The score is a review-priority value, not proof of common ownership; any restriction candidate is limited to the relevant LunarX feature and requires human approval.",
            matched_category_names.join(", "),
            meaningful_groups.len()
        )
    };

    let (pair_left, pair_right) = if request.account_a_id <= request.account_b_id {
        (&request.account_a_id, &request.account_b_id)
    } else {
        (&request.account_b_id, &request.account_a_id)
    };

    Ok(ScoreResponse {
        pair_id: format!("{pair_left}::{pair_right}"),
        reference_account_id: request.account_a_id,
        possible_alt_account_id: request.account_b_id,
        overall_score,
        risk_band,
        categories_scored,
        categories_unavailable,
        categories_with_meaningful_matches: meaningful_categories,
        evidence_groups_with_meaningful_matches: meaningful_groups,
        category_scores,
        matched_signals,
        contradicting_signals,
        limitations,
        recommended_action,
        human_review_required,
        restriction_candidates,
        rationale,
        interpretation_note: "No automatic account lock, ban, merge, or restriction is performed. A reviewer must approve and record any feature-level restriction. A full-site restriction requires separate evidence of a site-wide policy violation and a documented human decision.",
    })
}

fn compare_chat_activity(
    input: &ChatActivityInput,
    include_stylometry: bool,
) -> Result<(Vec<EvidenceSignal>, Vec<String>), String> {
    let mut signals = Vec::new();
    let mut limitations = Vec::new();

    if !input.public_text_channels_only {
        limitations.push(
            "Chat evidence was excluded because the collector did not certify public text channels only. DMs, staff/private channels and voice must never be supplied.".into(),
        );
        return Ok((signals, limitations));
    }

    let a = &input.account_a;
    let b = &input.account_b;
    let reference = &input.evidence_ref;

    if a.message_count >= 40 && b.message_count >= 40 {
        let channel_score = map_distribution_similarity(
            &a.public_channel_counts,
            &b.public_channel_counts,
        );
        if let Some(score) = channel_score.filter(|score| *score >= 78) {
            signals.push(chat_signal(
                EvidenceKind::ChatChannelUsagePatternMatch,
                reference,
                score,
            ));
        }
    } else {
        limitations.push(
            "Public-chat channel distribution was not compared because each account needs at least 40 public messages.".into(),
        );
    }

    if a.active_days >= 14 && b.active_days >= 14 {
        if a.active_hour_counts.len() == 24 && b.active_hour_counts.len() == 24 {
            if let Some(score) = vector_distribution_similarity(
                &a.active_hour_counts,
                &b.active_hour_counts,
            )
        .filter(|score| *score >= 78)
        {
                signals.push(chat_signal(
                    EvidenceKind::ChatActiveHoursPatternMatch,
                    reference,
                    score,
                ));
            }
        } else {
            limitations.push("Public-chat activity-hour histograms must contain exactly 24 hourly buckets.".into());
        }
    } else {
        limitations.push(
            "Public-chat activity hours were not compared because each account needs at least 14 active days.".into(),
        );
    }

    if a.session_count >= 10 && b.session_count >= 10 {
        if a.inter_message_gap_counts.len() == 6 && b.inter_message_gap_counts.len() == 6 {
            if let Some(score) = vector_distribution_similarity(
                &a.inter_message_gap_counts,
                &b.inter_message_gap_counts,
            )
        .filter(|score| *score >= 78)
        {
                signals.push(chat_signal(
                    EvidenceKind::ChatMessageCadencePatternMatch,
                    reference,
                    score,
                ));
            }
        } else {
            limitations.push("Public-chat inter-message gap histograms must contain exactly six buckets.".into());
        }
        if a.messages_per_session_counts.len() == 5 && b.messages_per_session_counts.len() == 5 {
            if let Some(score) = vector_distribution_similarity(
                &a.messages_per_session_counts,
                &b.messages_per_session_counts,
            )
        .filter(|score| *score >= 78)
        {
                signals.push(chat_signal(
                    EvidenceKind::ChatSessionBurstPatternMatch,
                    reference,
                    score,
                ));
            }
        } else {
            limitations.push("Public-chat messages-per-session histograms must contain exactly five buckets.".into());
        }
    } else {
        limitations.push(
            "Public-chat message cadence and burst patterns were not compared because each account needs at least 10 sessions.".into(),
        );
    }

    if include_stylometry
        && a.public_message_samples.iter().map(|text| text.split_whitespace().count()).sum::<usize>() >= 300
        && b.public_message_samples.iter().map(|text| text.split_whitespace().count()).sum::<usize>() >= 300
        && a.language_code.eq_ignore_ascii_case(&b.language_code)
    {
        let stylometry = StylometryInput {
            evidence_ref: format!("{}_style", reference),
            public_content_only: true,
            account_a: TextCorpus {
                language_code: a.language_code.clone(),
                texts: a.public_message_samples.clone(),
            },