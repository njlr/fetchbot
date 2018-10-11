export const parse = s => {
  const data = JSON.parse(s);

  const { urls, sha256 } = data;

  if (!urls) {
    throw new Error('Expected a urls element');
  }

  if (!Array.isArray(urls)) {
    throw new Error('urls must be an array');
  }

  for (const url of urls) {
    if (typeof url !== 'string') {
      throw new Error('Every url must be a string');
    }
  }

  if (!sha256) {
    throw new Error('Expected a sha256 element');
  }

  if (typeof sha256 !== 'string') {
    throw new Error('sha256 must be a string');
  }

  if (sha256.length === 0) {
    throw new Error('sha256 must be 256 bits long');
  }

  return {
    urls, 
    sha256, 
  };
};
