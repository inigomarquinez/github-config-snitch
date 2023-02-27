# GitHub snitch

This tools analyses the configuration of the GitHub repositories of your *organization* and creates a report with the risks for every repository.

⚠️ Right now it only works with GitHub organizations, not for individual accounts.


## How to run it

1. Clone this repository
2. In the root of the project create an `.env` file with the following values:

    ```bash
    GITHUB_ORG_NAME=<your_github_organization_name>
    GITHUB_PAT=<your_personal_access_token>
    ```

    You can also copy-paste and rename the example `.env.template` file.


### 🚨 Github rate limiting

Be careful when using this tool, because GitHub has a [rate limiting](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limiting).