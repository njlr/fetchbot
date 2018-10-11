import fs from 'mz/fs';
import request from 'request';
import path from 'path';
import crypto from 'crypto';

import { parse } from './parse';

const fetchbotExtension = '.fetchbot';

const hashFile = async file => {
  const content = await fs.readFile(file);

  return crypto
    .createHash('sha256')
    .update(content, 'utf8')
    .digest('hex');
};

export const fetch = async file => {
  const content = await fs.readFile(file);

  const { urls, sha256 } = parse(content);

  const targetFile = path.resolve(file)
    .split('.')
    .slice(0, -1)
    .join('.');

  if (await fs.exists(targetFile)) {
    console.log(targetFile + ' already exists');
  } else {
    if (urls.length === 0) {
      throw new Error('No urls specified for ' + file);
    }

    console.log('Downloading... ');

    const stream = fs.createWriteStream(targetFile);

    for (const url of urls) {
      try {
        if (await fs.exists(targetFile)) {
          await fs.unlink(targetFile);
        }

        await new Promise(resolve =>
          request(url)
            .pipe(fs.createWriteStream(targetFile))
            .on('finish', resolve));

        console.log('Download complete! ');

        break;
      } catch (error) {
        console.warn('Could not download ' + file + ' from ' + url);
        console.warn(error);
      }
    }
  }

  console.log('Hashing file... ');

  const hash = await hashFile(targetFile);

  if (hash === sha256) {
    console.log('The hash ' + sha256 + ' is correct! ');
  } else {
    throw new Error('Hash mismatch! Expected ' + sha256 + ' but saw ' + hash);
  }
};
