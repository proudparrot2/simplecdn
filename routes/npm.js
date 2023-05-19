const request = require('request');
const mime = require('mime-types');
const cache = require('memory-cache');

const cacheDuration = 60 * 1000;

module.exports = (req, res) => {
  const { package, version } = req.params;
  const filePath = req.params[0];

  const fileURL = `https://unpkg.com/${package}@${version}/${filePath}`;

  const cachedResponse = cache.get(fileURL);
  if (cachedResponse) {
    return res.send(cachedResponse);
  }

  request.get(fileURL)
    .on('response', (response) => {
      if (response.statusCode !== 200) {
        return res.status(404).send('File not found');
      }

      const fileExtension = filePath.split('.').pop();
      const contentType = mime.lookup(fileExtension);

      res.set('Content-Type', contentType);
      response.pipe(res);

      const responseBody = [];
      response.on('data', (chunk) => {
        responseBody.push(chunk);
      });

      response.on('end', () => {
        const fullResponse = Buffer.concat(responseBody).toString();
        cache.put(fileURL, fullResponse, cacheDuration);
      });
    });
}