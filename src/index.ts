// import fs from 'fs/promises';

import * as dotenv from 'dotenv';
dotenv.config();

// import { reposListForOrg } from "./octokit";
import health from './health';
import { reposListForOrg } from "./octokit-ql";

(async function() {
  const data = await reposListForOrg(process.env.GITHUB_ORG_NAME ?? '');
  // try {
  //   await fs.writeFile('./response.json', JSON.stringify(data, null, 2));
  //   console.log('Response saved at response.json file!');

  // } catch (err) {
  //   console.log(err);
  // }
  health(data);
}());