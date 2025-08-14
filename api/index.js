import express from 'express';
import fetch from 'node-fetch';
import csv from 'csvtojson';

const app = express();

const createRoute = (path, url) => {
  app.get(path, async (req, res) => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'text/csv'
        }
      });
      const text = await response.text();
      const json = await csv().fromString(text);
      res.status(200).json(json);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch or convert CSV', details: error.message });
    }
  });
};

createRoute('/api/trees', 'https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/c2cc186e-0d5e-4ed8-8a83-ed6c92666412/v1/Trees%20and%20flowers%20planted%202020%20to%202022%20csv.csv');
createRoute('/api/cleaning', 'https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/0af3cfc1-1e8f-4560-9938-5e313a4740a7/v1/General%20Cleaning%20Works%202020%20to%202022%20csv.csv');
createRoute('/api/dengue', 'https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/64ecee83-7a88-40b3-bc67-8c2c7b39bbd8/v1/Dengue%20fever%20Control%20Action%202020%20to%202022%20csv.csv');
createRoute('/api/swamp', 'https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/f30544a9-9236-4b28-b04b-1897e79143d3/v1/Swamp%20reclamation%20works%202020%20to%202022%20csv.csv');
createRoute('/api/sanitation', 'https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/d5c0c6e8-09b6-4e60-8424-140ad56d3923/v1/Environmental%20Sanitation%20Works%202021%20to%202022%20csv.csv');

export default app;