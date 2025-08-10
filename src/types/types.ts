export type Task = {
  id: number;
  text: string;
  completed: boolean;
  section?: string; // NEW
};
