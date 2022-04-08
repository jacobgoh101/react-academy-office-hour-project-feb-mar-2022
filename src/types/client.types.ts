export interface Client {
  user_id: string;
  email: string;
  name: string;
  companyDetails: CompanyDetails;
  id: string;
  totalBilled: number;
  invoicesCount: number;
}

interface CompanyDetails {
  name: string;
  vatNumber: string;
  regNumber: string;
  address: string;
}

export interface TableClientData {
  id: string;
  email: string;
  name: string;
  companyName: string;
  totalBilled: number;
  invoicesCount: number;
}
