import { graphql, GraphQlQueryResponseData } from "@octokit/graphql";


const query1 = `
  query healthcheck($owner: String!) {
    rateLimit {
      remaining
    }
    organization(login: $owner) {
      repositories(first: 10) {
        totalCount
        nodes {
          nameWithOwner
          codeOfConduct {
            id
          }
          licenseInfo {
            name
            hidden
            spdxId
          }
          branchProtectionRules(first: 10) {
            ...BranchProtectionRuleConnectionFragment
          }
          defaultBranchRef {
            name
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
      name
    }
  }

  fragment BranchProtectionRuleConnectionFragment on BranchProtectionRuleConnection {
    nodes {
      databaseId
      pattern
      matchingRefs(first: 10) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

const query2 = `
  query allRepos($owner: String!) {
    rateLimit {
      remaining
    }
    organization(login: $owner) {
      name
      repositories(first: 10) {
        totalCount
        nodes {
          nameWithOwner
          codeOfConduct {
            id
          }
          licenseInfo {
            name
            hidden
            spdxId
          }
          defaultBranchRef {
            name
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

export const reposListForOrg = async(orgName: string) => {
  const response: GraphQlQueryResponseData = await graphql<GraphQlQueryResponseData>(
    query1,
    {
      owner: orgName,
      headers: {
        authorization: `token ${process.env.GITHUB_PAT}`,
      },
    }
  );

  return response;
}



