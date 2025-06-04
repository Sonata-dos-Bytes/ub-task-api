import { StatusTask } from "./enum";

export interface UBProfile {
  name: string;
  email: string;
  language: string;
  userInitials: string;
  userPicture: string;
}

export interface UBTask {
  title: string;
  matter: string;
  url: string;
  matterUrl: string;
  rawStart: string | null;
  dateStart: Date | null;
  rawEnd: string;
  dateEnd: Date;
  daysLeft: number;
  status: StatusTask;
  dateDetailsInPortuguese: string | null;
  taskDetails: string | null;
}
