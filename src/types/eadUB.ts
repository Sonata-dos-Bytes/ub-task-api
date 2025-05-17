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
  rawStart: string;
  dateStart: Date;
  rawEnd: string;
  dateEnd: Date;
  daysLeft: number;
  status: StatusTask;
  dateDetailsInPortuguese: string;
  taskDetails: string;
}
