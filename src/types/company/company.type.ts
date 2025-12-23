export type CompanyType = {
  company_name: string;
  owner: string;
  license_number: string;
  created_at: string;
};

export type CompaniesType = {
  companies: CompanyType[];
};
