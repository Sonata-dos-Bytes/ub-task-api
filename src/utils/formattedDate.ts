import { StatusTask, TaskDeadlineInfo } from '../types/enum';
import { differenceInCalendarDays, parse } from 'date-fns';
import { pt } from 'date-fns/locale';

export function parsePortugueseDate(raw: string): Date | null {
    const match = raw.match(/(\d{1,2}) (\w+)\.? (\d{4}), (\d{2}):(\d{2})/i);
    if (!match) return null;

    const [, day, month, year, hour, minute] = match;
    const formatted = `${day} ${month} ${year} ${hour}:${minute}`;

    try {
        return parse(formatted, 'd MMM yyyy HH:mm', new Date(), { locale: pt });
    } catch (error) {
        return null;
    }
}

export function getTaskDeadlineInfo(deadline: Date, isCompleted: boolean = false): TaskDeadlineInfo {
    const today = new Date();
    const daysLeft = differenceInCalendarDays(deadline, today);

    let status: StatusTask;

    if (isCompleted) {
        status = 'completed';
    } else if (daysLeft < 0) {
        status = 'overdue';
    } else if (daysLeft === 0) {
        status = 'due';
    } else {
        status = 'upcoming';
    }

    return { daysLeft, status };
}
