export type StatusTask = 'upcoming' | 'due' | 'overdue' | 'completed';

export interface TaskDeadlineInfo {
  daysLeft: number;
  status: StatusTask;
}
