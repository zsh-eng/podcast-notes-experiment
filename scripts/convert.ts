import fs from 'fs';
import path from 'path';
import { type Transcription } from '../src/lib/transcription';

// Read the input JSON file
const inputPath = path.join(process.cwd(), 'test/data/sample-transcript.json');
const outputPath = path.join(
  process.cwd(),
  'test/data/sample-podcast-parsed.json'
);

// Read and parse the input file
const rawData = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

// Convert to Transcription format
const transcription: Transcription = {
  segments: rawData.map((segment) => ({
    start: segment.start,
    end: segment.end,
    text: segment.text,
  })),
};

// Write the converted data
fs.writeFileSync(outputPath, JSON.stringify(transcription, null, 2));

console.log('Conversion complete. Output written to:', outputPath);
