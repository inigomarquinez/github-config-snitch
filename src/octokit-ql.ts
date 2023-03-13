import { graphql, GraphQlQueryResponseData } from "@octokit/graphql";

const query = `
  query healthcheck($owner: String!, $pageSize: Int!, $after: String) {
    rateLimit {
      remaining
    }
    organization(login: $owner) {
      name
      repositories(first: $pageSize, after: $after) {
        totalCount
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
        nodes {
          nameWithOwner
          codeOfConduct {
            name
          }
          licenseInfo {
            name
            hidden
            spdxId
          }
          defaultBranchRef {
            name
            branchProtectionRule {
              id
            }
          }
          hasVulnerabilityAlertsEnabled
          isBlankIssuesEnabled
          isPrivate
          isSecurityPolicyEnabled
          isTemplate
          pullRequests(states: OPEN) {
            totalCount
          }
          issues(states: OPEN) {
            totalCount
          }
        }
      }
    }
  }
`;

export const checkOrgReposHealth = async(orgName: string) => {
  const repositories = [];
  let next = true;
  let after;

  while (next) {
    const response: GraphQlQueryResponseData = await graphql<GraphQlQueryResponseData>(
      query,
      {
        owner: orgName,
        pageSize: 100,
        after,
        headers: {
          authorization: `token ${process.env.GITHUB_PAT}`,
        },
      }
    );
  
    repositories.push(...response.organization.repositories.nodes);
    next = response.organization.repositories.pageInfo.hasNextPage;
    after = response.organization.repositories.pageInfo.endCursor;
  }


  return repositories;
}



