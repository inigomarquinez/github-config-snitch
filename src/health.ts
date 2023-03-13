import fs from 'fs/promises';

import chalk from 'chalk';

import { IRepoHealth } from './types';

const health = async (data: any) => {
  const health: Record<string, IRepoHealth> = {};

  data.forEach((repo: any) => {
    const repoHealth: IRepoHealth = {};

    repoHealth.codeOfConduct = repo.codeOfConduct?.name;
    repoHealth.licenseInfo = repo.licenseInfo?.spdxId;
    repoHealth.defaultBranchRef = repo.defaultBranchRef?.name;
    repoHealth.defaultBranchProtectionRules = repo.defaultBranchRef.branchProtectionRule?.id;
    repoHealth.hasVulnerabilityAlertsEnabled = repo.hasVulnerabilityAlertsEnabled;
    repoHealth.isBlankIssuesEnabled = repo.isBlankIssuesEnabled;
    repoHealth.isPrivate = repo.isPrivate;
    repoHealth.isSecurityPolicyEnabled = repo.isSecurityPolicyEnabled;
    repoHealth.isTemplate = repo.isTemplate;
    repoHealth.pullRequests = repo.pullRequests?.totalCount;
    repoHealth.issues = repo.issues?.totalCount;

    health[repo.nameWithOwner] = repoHealth;
  });

  console.log(`🩺 `+ chalk.cyan('This is the summary of your repositories health:\n'));
  console.log(health);

   try {
    await fs.writeFile('./health.json', JSON.stringify(health, null, 2));
    console.log('Health saved at health.json file!');

  } catch (err) {
    console.log(err);
  }
}

export default health;
