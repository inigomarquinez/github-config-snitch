export interface IRepoHealth {
  name?: string;
  url?: string;
  codeOfConduct?: string;
  licenseInfo?: string;
  defaultBranchRef?: string;
  defaultBranchProtectionRules?: boolean;
  hasVulnerabilityAlertsEnabled?: boolean;
  isBlankIssuesEnabled?: boolean;
  isPrivate?: boolean;
  isSecurityPolicyEnabled?: boolean;
  isTemplate?: boolean;
  pullRequests?: number;
  issues?: number;
}
