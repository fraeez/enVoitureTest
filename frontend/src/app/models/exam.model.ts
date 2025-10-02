import { Student } from "./student.model";

export class Examen {
  constructor(
    public student: Student,
    public status: ExamenStatus,
    public meeting_point?: string,
    public date?: Date,
  ) {}
}

export enum ExamenStatus {
  ToOrganize = "A organiser",
  Cancelled = "Annulé",
  LookingForSpot = "En recherche de place",
  Confirmed = "Confirmé",
}