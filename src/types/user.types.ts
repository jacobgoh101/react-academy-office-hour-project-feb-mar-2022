export interface User {
  id: string;
  name: string;
  email: string;
  companyDetails: CompanyDetails;
}

export interface CompanyDetails {
  name: string;
  address: string;
  vatNumber: string;
  regNumber: string;
  iban: string;
  swift: string;
}
