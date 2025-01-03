# 🕵️ GitHub snitch

This tools analyses the configuration of the GitHub repositories of your *organization* and creates a report with the risks for every repository.

⚠️ Right now it only works with GitHub organizations, not for individual accounts.


## ▶️ How to run it

1. Clone this repository
2. In the root of the project create an `.env` file with the following values:

    ```bash
    GITHUB_ORG_NAME=<your_github_organization_name>
    GITHUB_PAT=<your_personal_access_token>
    ```

    You can also copy-paste and rename the example `.env.template` file.

    If you don't kwow how to create a Personal Access Token for your organization, follow [these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). The Personal Access Toekn you create needs to have `repo` and `admin:org > read:org` access.

## 🚨 Github rate limiting

Be careful when using this tool, because GitHub has a [rate limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting).

## 🔗 Useful links

- https://docs.github.com/es/graphql/overview/explorer