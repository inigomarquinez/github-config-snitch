import chalk from 'chalk';

// import data from '../response.json';

const health = (data: any) => {
  console.log(`🩺 `+ chalk.cyan('This is the summary of your repositories health:\n'));

  const riskTable: Record<string,any> = {};

  data.organization.repositories.nodes.forEach((repo: any) => {
    // console.log(`🗂️ `+ chalk.cyan(repo.nameWithOwner));
      const repoRow: Record<string,any> = {
        '🔴 HIGH RISK': [],
        '🟡 MEDIUM RISK': [],
        '🔵 LOW RISK': [],
        '🟢 SAFE': [],
      };

    if (repo.branchProtectionRules.nodes?.length === 0) {
      repoRow['🔴 HIGH RISK'].push('Branch protection');
    } else {
      repoRow['🟢 SAFE'].push('Branch protection');
    }

    if (!repo.licenseInfo) {
      repoRow['🟡 MEDIUM RISK'].push('License');
    } else {
      repoRow['🟢 SAFE'].push(`License: ${repo.licenseInfo.spdxId}`);
    }

    if (!repo.codeOfConduct) {
      repoRow['🔵 LOW RISK'].push('Code of conduct');
    } else {
      repoRow['🟢 SAFE'].push('Code of conduct');
    }

    riskTable[`🗂️ ${repo.nameWithOwner}`] = repoRow;
  });

  console.table(riskTable);
}

export default health;
