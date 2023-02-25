import * as dotenv from 'dotenv';
dotenv.config();

import { reposListForOrg } from "./octokit";

(async function() {
  const data = await reposListForOrg(process.env.GITHUB_ORG_NAME ?? '');
  console.log(data);
}());