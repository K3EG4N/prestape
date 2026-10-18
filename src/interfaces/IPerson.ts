export interface IPersonSummary {
  code: string;
  fullName: string;
  firstName: string;
  middleName: string | null;
  paternalSurname: string;
  maternalSurname: string | null;
  documentNumber: string;
  phone: string;
}

export interface ICreatePersonRequest {
  firstName: string;
  middleName?: string;
  paternalSurname: string;
  maternalSurname?: string;
  documentNumber: string;
  phone: string;
}

export type IUpdatePersonRequest = ICreatePersonRequest;
