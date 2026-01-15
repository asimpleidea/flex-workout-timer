export enum IntervalType {
  Work = "work",
  Rest = "rest"
}

export interface Interval {
  id: string;
  name: string;
  type: IntervalType;
  duration: number; // in seconds
}

export interface WorkoutSet {
  id: string;
  name: string;
  iterations: number;
  color: string;
  intervals: Interval[];
}

export interface Timer {
  id: string;
  title: string;
  date: string; // ISO date string
  sets: WorkoutSet[];
}
