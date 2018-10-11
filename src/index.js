import fs from 'mz/fs';
import request from 'request';
import path from 'path';
import crypto from 'crypto';

import { fetch } from './fetch';
import { parse } from './parse';

const { argv } = process;

const main = async () => {
  const params = argv.slice(2)
    .map(x => x.trim().toLowerCase())
    .filter(x => x.length > 0);

  if (params.length === 0) {
    console.log("FetchBot");
    console.log("  Usage: fetchbot [file]");

    return;
  }

  for (const file of params) {
    console.log('Fetching ' + file + '... ');
    
    await fetch(file);
  }
};

main().catch(error => {
  const { message } = error;

  if (message) {
    console.error(message);
  } else {
    console.error(error);
  }

  process.exit(1);
});
