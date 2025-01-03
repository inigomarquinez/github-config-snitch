import fs from 'fs/promises';

import chalk from 'chalk';
import * as Papa from 'papaparse';

import { IRepoHealth } from './types';

const health = async (data: any) => {
  const health: Record<string, IRepoHealth> = {};

  data.forEach((repo: any) => {
    const repoHealth: IRepoHealth = {};

    repoHealth.name = repo.nameWithOwner;
    repoHealth.url = repo.url;
    repoHealth.codeOfConduct = repo.codeOfConduct?.name ?? null;
    repoHealth.licenseInfo = repo.licenseInfo?.spdxId ?? null;
    repoHealth.defaultBranchRef = repo.defaultBranchRef?.name ?? null;
    repoHealth.defaultBranchProtectionRules = repo.defaultBranchRef.branchProtectionRule?.id !== undefined;
    repoHealth.hasVulnerabilityAlertsEnabled = repo.hasVulnerabilityAlertsEnabled;
    repoHealth.isBlankIssuesEnabled = repo.isBlankIssuesEnabled;
    repoHealth.isPrivate = repo.isPrivate;
    repoHealth.isSecurityPolicyEnabled = repo.isSecurityPolicyEnabled;
    repoHealth.isTemplate = repo.isTemplate;
    repoHealth.pullRequests = repo.pullRequests?.totalCount ?? 0;
    repoHealth.issues = repo.issues?.totalCount ?? 0;

    health[repo.nameWithOwner] = repoHealth;
  });

  console.log(`🩺 `+ chalk.cyan('This is the summary of your repositories health:\n'));
  console.log(health);

   try {
    await fs.writeFile('./health.json', JSON.stringify(health, null, 2));
    console.log('Health saved at health.json file!');

    await fs.writeFile('./health.csv', Papa.unparse(Object.values(health)));
    console.log('Health saved at health.csv file!');
  } catch (err) {
    console.log(err);
  }
}

export default health;
