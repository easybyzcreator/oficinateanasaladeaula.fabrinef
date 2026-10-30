export type ProfessionType = 
  | 'profissional_apoio'
  | 'aee'
  | 'psicopedagoga'
  | 'professora'
  | 'outra';

export type SchoolGradeType = 
  | 'infantil'
  | 'fundamental_1'
  | 'fundamental_2'
  | 'outros';

export interface Registration {
  id: string;
  fullName: string;
  whatsapp: string;
  email: string;
  profession: ProfessionType | string;
  professionCustom?: string;
  schoolGrade: SchoolGradeType | string;
  schoolGradeCustom?: string;
  createdAt: string;
  status: 'pendente' | 'confirmada';
  syncedToSheets?: boolean;
}

export interface GoogleSheetsConfig {
  webhookUrl: string;
  sheetName?: string;
  autoSync: boolean;
}
