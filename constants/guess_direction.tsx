export const GuessDirection = {
  lower: "lower",
  higher: "higher",
} as const;

export type GuessDirectionType =
  (typeof GuessDirection)[keyof typeof GuessDirection];
