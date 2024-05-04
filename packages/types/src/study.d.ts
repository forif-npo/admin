export interface Study {
  studyId: number;
  tags: Tag;
  studyName: string;
  mentorName: string;
  startTime: string;
  endTime: string;
  level: 1 | 2 | 3 | 4 | 5;
  weekDay: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 99;
  interview: boolean;
  image: string;
  studyType: "자율" | "정규";
}

export type Tag = Record<string, string>;
