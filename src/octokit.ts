import { Octokit } from "octokit";

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit(
  // { auth: `personal-access-token123` }
);

export const reposListForOrg = async(orgName: string) => {
  const allRepos = [];

  const iterator = octokit.paginate.iterator(octokit.rest.repos.listForOrg, {
    org: orgName,
    per_page: 100,
  });
  
  // iterate through each response
  for await (const { data: repos } of iterator) {
    allRepos.push(repos);
    // for (const repo of repos) {
    //   console.log(repo);
    // }
  }

  return allRepos;
}



