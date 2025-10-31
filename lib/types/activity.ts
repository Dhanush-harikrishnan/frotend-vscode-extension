// TypeScript types for VS Code Typing Tracker Activity Logs
// Based on frontend-api-design.md specification

export interface TypingMetrics {
  keystrokesPerMinute?: number
  wordsPerMinute?: number
  averageTypingBurst?: number
  typingSessionDuration?: number
}

export interface FileOperations {
  filesOpened?: number
  filesClosed?: number
  filesSwitched?: number
  filesCreated?: number
  filesDeleted?: number
  filesRenamed?: number
  filesSaved?: number
}

export interface Commands {
  totalCommandsExecuted?: number
  mostUsedCommand?: string
  commandPaletteOpened?: number
}

export interface AIExtensionMetrics {
  aiSuggestionsShown?: number
  aiSuggestionsAccepted?: number
  aiSuggestionsRejected?: number
  aiProvider?: string
  aiGeneratedLines?: number
  aiAssistanceUsed?: boolean
  copilotChatInteractions?: number
  aiEditingSessions?: number
  inlineCompletionsShown?: number
  inlineCompletionsAccepted?: number
  aiTypingTime?: number
  manualTypingTime?: number
  extensionsActive?: number
  extensionsInstalled?: number
  themeUsed?: string
}

export interface SystemEnvironmentMetrics {
  idleTime?: number
  activeCodingTime?: number
  systemSleepTime?: number
  systemLockTime?: number
  systemWakeCount?: number
  workspaceSwitches?: number
  currentWorkspace?: string
  previousWorkspace?: string
  workspaceSwitchTimestamp?: string
  operatingSystem?: string
  cpuUsage?: number
  memoryUsage?: number
  batteryLevel?: number
  isCharging?: boolean
}

export interface TerminalUsageMetrics {
  totalCommandsExecuted?: number
  commandHistory?: string[]
  frequentCommands?: Record<string, number>
  gitCommands?: number
  npmCommands?: number
  buildCommands?: number
  testCommands?: number
  dockerCommands?: number
  customScripts?: number
  commandsWithErrors?: number
  commandsSuccessful?: number
  errorRate?: number
  buildFailures?: number
  buildSuccesses?: number
  testFailures?: number
  testSuccesses?: number
  buildSuccessRate?: number
  testSuccessRate?: number
  terminalSessions?: number
  averageCommandsPerSession?: number
  longestCommandExecutionTime?: number
  totalTerminalTime?: number
}

export interface VersionControlMetrics {
  commitsCount?: number
  linesAdded?: number
  linesRemoved?: number
  codeChurn?: number
  filesModified?: number
  averageFilesPerCommit?: number
  commitsByHour?: Record<string, number>
  lastCommitTimestamp?: string
  commitFrequency?: number
  commitMessages?: string[]
  averageMessageLength?: number
  conventionalCommits?: number
  commitMessageQualityScore?: number
  prsCreated?: number
  prsReviewed?: number
  prCommentsMade?: number
  prCommentsReceived?: number
  averagePrMergeTime?: number
  prsMerged?: number
  prsClosed?: number
  issuesMentioned?: number
  issuesClosed?: number
  issuesCreated?: number
  issueCommentsAdded?: number
  branchesCreated?: number
  branchesDeleted?: number
  featureBranches?: number
  bugfixBranches?: number
  hotfixBranches?: number
  activeBranches?: string[]
  currentBranch?: string
  mergesPerformed?: number
  conflictsEncountered?: number
  conflictsResolved?: number
  conflictRate?: number
  ciPipelineRuns?: number
  ciPipelineFailures?: number
  ciPipelineSuccesses?: number
  linterFailuresInPR?: number
  testFailuresInPR?: number
  ciSuccessRate?: number
  codeReviewsGiven?: number
  codeReviewsReceived?: number
  approvalRate?: number
  changesRequested?: number
}

export interface ActivityLog {
  _id?: string
  username: string
  fileName: string
  filePath?: string
  date: string
  time?: string
  timestamp?: string
  actionType: string
  typedLines?: number
  pastedLines?: number
  deletedLines?: number
  totalLines?: number
  wordsTyped?: number
  charactersTyped?: number
  contentSnippet?: string
  editorVersion?: string
  
  // Enhanced metrics (all optional)
  typingMetrics?: TypingMetrics
  fileOperations?: FileOperations
  commands?: Commands
  aiExtensionMetrics?: AIExtensionMetrics
  systemEnvironmentMetrics?: SystemEnvironmentMetrics
  terminalUsageMetrics?: TerminalUsageMetrics
  versionControlMetrics?: VersionControlMetrics
  
  // Session info
  sessionDuration?: number
  activeTypingTime?: number
  language?: string
  projectPath?: string
  gitBranch?: string
  
  // Timestamps
  createdAt?: string
  updatedAt?: string
}

export interface BatchActivityRequest {
  logs: ActivityLog[]
}

export interface TextMetrics {
  totalLinesTyped: number
  totalLinesPasted: number
  totalLinesDeleted: number
  totalWords: number
  totalCharacters: number
  typingVsPastingRatio: number
}

export interface FileMetrics {
  totalFilesEdited: number
  uniqueFiles: number
  mostEditedFile: string
  filesOpened: number
  filesClosed: number
  filesSwitched: number
  filesCreated: number
  filesDeleted: number
  filesRenamed: number
  filesSaved: number
}

export interface PerformanceMetrics {
  totalKeystrokesPerMinute: number
  averageKeystrokesPerMinute: number
  totalWordsPerMinute: number
  averageWordsPerMinute: number
  totalTypingBursts: number
  averageTypingBurst: number
  totalTypingSessionDuration: number
}

export interface CommandMetrics {
  totalCommandsExecuted: number
  mostUsedCommand: string
  commandPaletteOpened: number
}

export interface AggregatedAIExtensionMetrics {
  totalAISuggestionsShown: number
  totalAISuggestionsAccepted: number
  totalAISuggestionsRejected: number
  acceptanceRate: number
  totalAIGeneratedLines: number
  aiAssistanceUsed: boolean
  totalCopilotChatInteractions: number
  totalAIEditingSessions: number
  totalInlineCompletionsShown: number
  totalInlineCompletionsAccepted: number
  totalAITypingTime: number
  totalManualTypingTime: number
  aiTypingRatio: number
  mostUsedAIProvider: string
  totalExtensionsActive: number
  totalExtensionsInstalled: number
  themeUsed: string
}

export interface AggregatedSystemEnvironmentMetrics {
  totalIdleTime: number
  totalActiveCodingTime: number
  firstActivityTime: string
  lastActivityTime: string
  workDayDuration: number
  totalSystemSleepTime: number
  totalSystemLockTime: number
  totalSystemWakeCount: number
  totalWorkspaceSwitches: number
  uniqueWorkspaces: string[]
  primaryWorkspace: string
  averageCpuUsage: number
  averageMemoryUsage: number
  averageBatteryLevel: number
  activeTimePercentage: number
  focusScore: number
}

export interface AggregatedTerminalUsageMetrics {
  totalCommandsExecuted: number
  totalGitCommands: number
  totalNpmCommands: number
  totalBuildCommands: number
  totalTestCommands: number
  totalDockerCommands: number
  totalCustomScripts: number
  commandsWithErrors: number
  commandsSuccessful: number
  overallErrorRate: number
  buildFailures: number
  buildSuccesses: number
  buildSuccessRate: number
  testFailures: number
  testSuccesses: number
  testSuccessRate: number
  totalTerminalSessions: number
  totalTerminalTime: number
  longestCommandExecutionTime: number
  topCommands: string[]
  commandDiversity: number
}

export interface AggregatedVersionControlMetrics {
  totalCommits: number
  totalLinesAdded: number
  totalLinesRemoved: number
  netLinesChanged: number
  totalCodeChurn: number
  totalFilesModified: number
  averageLinesPerCommit: number
  averageFilesPerCommit: number
  pullRequestsCreated: number
  pullRequestsMerged: number
  pullRequestsReviewed: number
  prMergeRate: number
  prCommentsMade: number
  averageReviewCommentsPerPR: number
  conflictsEncountered: number
  conflictsResolved: number
  conflictResolutionRate: number
  ciPipelineRuns: number
  ciPipelineSuccesses: number
  ciPipelineFailures: number
  ciSuccessRate: number
  branchesCreated: number
  branchesDeleted: number
  mergesPerformed: number
  peakCommitHour: number
  collaborationScore: number
  codeQualityScore: number
  issuesCreated: number
  issuesClosed: number
  codeReviewsGiven: number
  codeReviewsReceived: number
}

export interface DetailedMetrics {
  username: string
  date: string
  textMetrics: TextMetrics
  fileMetrics: FileMetrics
  performanceMetrics: PerformanceMetrics
  commandMetrics: CommandMetrics
  aiExtensionMetrics: AggregatedAIExtensionMetrics
  systemEnvironmentMetrics: AggregatedSystemEnvironmentMetrics
  terminalUsageMetrics: AggregatedTerminalUsageMetrics
  versionControlMetrics: AggregatedVersionControlMetrics
  activityCount: number
  sessionCount: number
  totalSessionTime: number
}

export interface BatchMetricsRequest {
  username: string
  dates: string[]
}

export interface BatchMetricsResponse {
  success: boolean
  data: DetailedMetrics[]
}

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  errorCode?: string
}

export interface PaginationInfo {
  total: number
  limit: number
  skip: number
  hasMore: boolean
}

export interface ActivitiesResponse {
  success: boolean
  data: ActivityLog[]
  pagination: PaginationInfo
}
