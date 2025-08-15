// index.js
import express from "express";
import csv from "csvtojson";
import fetch from "node-fetch";
import https from "https";

const app = express();
const PORT = 3000;

const agent = new https.Agent({ rejectUnauthorized: false });
const commonHeaders = {
  Accept: "text/csv,application/xml;q=0.9,*/*;q=0.8",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
  Referer: "https://open.data.gov.sa/",
  "Accept-Language": "en-US,en;q=0.9",
};

const fetchCsvAsJson = async (url) => {
  const res = await fetch(url, {
    method: "GET",
    agent,
    headers: commonHeaders,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  let text = await res.text();
  text = text.replace(/^\uFEFF/, ""); // remove BOM if exists
  const data = await csv({
    delimiter: [",", ";", "\t"],
    output: "json",
  }).fromString(text);
  return data;
};

// Routes
app.get("/api/cleaning", async (req, res) => {
  try {
    const data = await fetchCsvAsJson(
      "https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/0af3cfc1-1e8f-4560-9938-5e313a4740a7/v1/General%20Cleaning%20Works%202020%20to%202022%20csv.csv"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
});

app.get("/api/dengue", async (req, res) => {
  try {
    const data = await fetchCsvAsJson(
      "https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/64ecee83-7a88-40b3-bc67-8c2c7b39bbd8/v1/Dengue%20fever%20Control%20Action%202020%20to%202022%20csv.csv"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
});

app.get("/api/swamp", async (req, res) => {
  try {
    const data = await fetchCsvAsJson(
      "https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/f30544a9-9236-4b28-b04b-1897e79143d3/v1/Swamp%20reclamation%20works%202020%20to%202022%20csv.csv"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
});

app.get("/api/sanitation", async (req, res) => {
  try {
    const data = await fetchCsvAsJson(
      "https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/d5c0c6e8-09b6-4e60-8424-140ad56d3923/v1/Environmental%20Sanitation%20Works%202021%20to%202022%20csv.csv"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
});

app.get("/api/trees", async (req, res) => {
  try {
    const data = await fetchCsvAsJson(
      "https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/c2cc186e-0d5e-4ed8-8a83-ed6c92666412/v1/Trees%20and%20flowers%20planted%202020%20to%202022%20csv.csv"
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Server running at http://localhost:${PORT}`);
  console.log("📡 Available routes:");
  console.log("/api/cleaning");
  console.log("/api/dengue");
  console.log("/api/swamp");
  console.log("/api/sanitation");
  console.log("/api/trees");
});

/*
import express from "express";
import csv from "csvtojson";
import fetch from "node-fetch";
import https from "https";

const app = express();
const PORT = 3000;

// Replace this with your CSV file URL
const csvUrl =
  "https://open.data.gov.sa/odp-public/ffade089-b532-4ac3-aa7c-2abdaa12282e/c2cc186e-0d5e-4ed8-8a83-ed6c92666412/v1/Trees%20and%20flowers%20planted%202020%20to%202022%20csv.csv";

app.get("/api/trees", async (req, res) => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await fetch(csvUrl, {
      method: "GET",
      agent,
      headers: {
        Accept: "text/csv,application/xhtml+xml,application/xml",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/115.0.0.0 Safari/537.36",
        Referer: "https://open.data.gov.sa/",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    console.log(`🔍 Response status: ${response.status}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const csvText = await response.text();
    console.log(`📦 File size: ${csvText.length} characters`);

    // Clean BOM (byte order mark) for Arabic
    const cleanText = csvText.replace(/^\uFEFF/, "");

    // Optional: show preview of content
    console.log("🔍 Preview:\n", cleanText.slice(0, 300));

    // Parse CSV using multiple delimiters (common in Arabic CSVs)
    const jsonArray = await csv({
      delimiter: [";", ",", "\t"],
      noheader: false,
      output: "json",
    }).fromString(cleanText);

    console.log(`✅ Parsed ${jsonArray.length} rows`);

    res.json(jsonArray);
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({
      error: "Failed to fetch or convert CSV",
      details: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/api/trees`);
});
*/
