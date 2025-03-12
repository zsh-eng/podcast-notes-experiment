export type Segment = {
  start: number;
  end: number;
  text: string;
};

export type Transcription = {
  segments: Segment[];
};
