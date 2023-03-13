import fs from 'fs/promises';

import * as dotenv from 'dotenv';

dotenv.config();

import health from './health';
import { checkOrgReposHealth } from "./octokit-ql";

(async function() {
  const data = await checkOrgReposHealth(process.env.GITHUB_ORG_NAME ?? '');

  try {
    // const data = await fs.readFile('./response.json', 'utf8');
    // await health(JSON.parse(data));
    await health(data);
  } catch (err) {
    console.log(err);
  }
}());