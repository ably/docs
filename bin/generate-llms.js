#!/usr/bin/env -S node

/**
 * LLMs.txt Generator Script
 *
 * This script uses the Firecrawl API to generate a LLMs.txt file for the Ably docs.
 * It requires the FIRECRAWL environment variable to be set with your API key.
 *
 * Usage: node bin/generate-llms.js
 */

// Load environment variables from .env file
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const firecrawlModule = require('@mendable/firecrawl-js');
const FirecrawlApp = firecrawlModule.default;

// Check for required environment variable
if (!process.env.FIRECRAWL) {
  throw new Error('FIRECRAWL environment variable is not set');
}

// Initialize the client
const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL });

// Create async job
async function run() {
  try {
    console.log('Creating LLMs.txt generation job for https://ably.com/docs...');
    const job = await firecrawl.asyncGenerateLLMsText('https://ably.com/docs', {
      maxUrls: 1000
    });

    // Exit early if job ID is undefined
    if (!job || !job.id) {
      console.error('Job ID is undefined or missing. Cannot check status.');
      process.exit(1);
    }

    console.log(`Job created with ID: ${job.id}`);
    console.log('Checking job status...');

    // Helper function to poll job status
    const checkStatus = async (jobId) => {
      try {
        const status = await firecrawl.checkGenerateLLMsTextStatus(jobId);
        console.log(`Status: ${status.status}`);

        if (status.status === 'completed') {
          console.log('LLMs.txt generation completed successfully!');

          // Create static directory if it doesn't exist
          const staticDir = path.join(process.cwd(), 'static');
          if (!fs.existsSync(staticDir)) {
            fs.mkdirSync(staticDir, { recursive: true });
          }

          // Save the LLMs.txt content to file (as summary)
          if (status.data.llmstxt) {
            const summaryPath = path.join(process.cwd(), 'static', 'llms.txt');
            fs.writeFileSync(summaryPath, status.data.llmstxt);
            console.log(`LLMs summary saved to: ${summaryPath}`);
          }

          console.log('Completed');
          return true;
        } else if (status.status === 'failed') {
          console.error('Job failed:', status.error);
          return true;
        }

        return false;
      } catch (error) {
        console.error('Error checking status:', error);
        return true;
      }
    };

    // Poll the status every 5 seconds until completed
    let isFinished = false;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes max (60 * 5 seconds)

    while (!isFinished && attempts < maxAttempts) {
      isFinished = await checkStatus(job.id);
      attempts++;

      if (!isFinished) {
        console.log(`Waiting 5 seconds... (attempt ${attempts}/${maxAttempts})`);
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }

    if (!isFinished) {
      console.error('Max attempts reached. The job is taking too long.');
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

run();
