export interface IRepoHealth {
  codeOfConduct?: string;
  licenseInfo?: string;
  defaultBranchRef?: string;
  defaultBranchProtectionRules?: string;
  hasVulnerabilityAlertsEnabled?: boolean;
  isBlankIssuesEnabled?: boolean;
  isPrivate?: boolean;
  isSecurityPolicyEnabled?: boolean;
  isTemplate?: boolean;
  pullRequests?: number;
  issues?: number;
}
