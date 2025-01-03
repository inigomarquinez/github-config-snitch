import fs from 'fs/promises';

import * as dotenv from 'dotenv';

dotenv.config();

import health from './health';
import { checkOrgReposHealth } from "./octokit-ql";

(async function() {
  let data;

  if (process.env.MOCKED === 'true') {
    console.info('Reading mocked data from `mocked.json` file...')
    data = await fs.readFile('./mocked.json', 'utf8');
    data = JSON.parse(data);
  } else {
    data = await checkOrgReposHealth(process.env.GITHUB_ORG_NAME ?? '');

  }

  await health(data);
}());