import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { parsePodcastFeed } from '../src/lib/rss/parse';

async function main() {
  try {
    const xml = readFileSync(
      join(process.cwd(), '/test/data/response.xml'),
      'utf-8'
    );
    const result = await parsePodcastFeed(xml);

    const output = {
      podcast: result.podcast,
      episodes: result.episodes.slice(0, 5),
    };

    writeFileSync(
      join(process.cwd(), '/test/data/sample-podcast.json'),
      JSON.stringify(output, null, 2)
    );

    console.log(
      'Successfully wrote sample podcast data to sample-podcast.json'
    );
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
