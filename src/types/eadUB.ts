import { StatusTask } from "./enum.js";

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
  dateEnd: Date | null;
  daysLeft: number | null;
  status: StatusTask | null;
  dateDetailsInPortuguese: string | null;
  taskDetails: string | null;
}

export interface UBMatter {
  title: string;
  url: string;
}
