# Podcast Notes Experiments

Experiments before building the podcast notes app.

Design is not important, just to explore the functionality and get a basic
understanding of how to build the actual mobile app.

## Tasks

- [x] Understand podcast RSS feed structure
- [x] Display single podcast + episodes
- [x] Podcast playback
- [x] Podcast transcript playback
- [ ] Create data schema
- [ ] Download podcast episodes (IndexedDB for storage)
- [ ] Download and cache all assets (e.g. album art)
- [ ] Show download progress (HTTP range headers?)
- [ ] Podcast note (associated with timestamp)

Main idea is to use Whisper V3 Turbo (Groq) to transcribe the podcast.
Cost is $0.04 per hour, 200x speedup.
Compared to OpenAI's Whisper, $0.36 per hour

Gemini Flash to identify sponsored segments.

About ~30k tokens for a 10 minute clip of The Daily.
We can assume about ~300k tokens for a 1h 30 min podcast.
Equivalent to $0.03 input token cost for Gemini Flash 2.0.
Output tokens cost is essentially nothing, since we're just returning the
ranges of the sponsored segments.

^ Above calculation was done by pasting the transcription JSON.
If we just use the text + segments, maybe something like SRT format, the token count is 5-10x less.

This means that we can assume we will never bust Gemini's token limit,
which is good because we don't have to chunk the transcription separately.

- [ ] Go through Expo tutorial
- [ ] Rebuild in React Native
- [ ] Understand playback, media track API
- [ ] Storage APIs on mobile, drizzle expo sqlite
- [ ] Using emulator for dev, creating release build locally
- [ ] Running in the background - important to persist progress
  - [ ] Transcription
  - [ ] Downloads

Additional features (essential, but not for MVP)

- [ ] Transcription with Whisper (handling specific audio chunks?)
- [ ] Gemini Flash to identify sponsored segments
- [ ] Add RSS feed for more podcasts (slide up kind of UI)
- [ ] Better handling of RSS feeds (range queries?)
- [ ] Highlights / quotations of the transcript associated with note
- [ ] UI similar to libby
- [ ] Export notes to markdown / obsidian
- [ ] [Post-processing of transcripts](https://platform.openai.com/docs/guides/speech-to-text#longer-inputs) maybe with Gemini Flash again?
- [ ] Check for native transcription for podcast
- [ ] Test with more podcasts that sponsored segment identification is ok.