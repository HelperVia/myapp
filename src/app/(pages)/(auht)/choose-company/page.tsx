"use client";

import React, { useEffect, useState, JSX } from "react";
import { AuthContainer } from "../AuthContainer";

import Button from "@mui/material/Button";
import Timezone from "@lib/timezone";

import { apiFetch } from "@lib/api/api.fetch";
import { useSession } from "next-auth/react";
import { CompanyType } from "@/types/company/company.type";
import { CompaniesFetchType } from "@/types/api/companies/companies.fetch.type";
import { _activeRequests } from "@/shared/lib/api/api.fetch";
export default function ChooseCompany() {
  const { data, update } = useSession();
  const [status, setStatus] = useState(false);
  const [companies, setCompanies] = useState<CompanyType[] | undefined>([]);
  const [user, setUser] = useState<string>("");
  const getCompanies = async () => {
    let response = await apiFetch<CompaniesFetchType>("api/user/companies", {
      method: "POST",
      body: {},
    });
    setStatus(true);
    if (response?.ok) {
      setUser(response?.data?.user || "");
      setCompanies(response?.data?.companies);
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  const chooseCompany = async (licenseNumber: string) => {
    await update({ licenseNumber: licenseNumber });
    window.location.href = "/my";
  };
  const SelectCompanyComponent = (): JSX.Element => (
    <React.Fragment>
      {companies.map((company, i) => (
        <div
          key={i}
          className="relative flex justify-between h-[120px] flex-col  mb-4 border border-hv-color-4 border-solid  hover:border-hv-color-9 p-[10px] rounded-[5px]"
        >
          <div className="text-hv-color-8">{company.company_name}</div>
          {company.owner == "Y" && (
            <div className=" absolute w-[50px] h-[20px] top-0 right-0 bg-hv-color-7 text-center text-[11px] text-white p-[5px] leading-[1]">
              Owner
            </div>
          )}
          <div>
            <Button
              onClick={() => chooseCompany(company.license_number)}
              type="submit"
              className="hv-button hv-default-button small outline"
              loading={false}
            >
              <span>Go to Company</span>
            </Button>
          </div>
          <div className="text-hv-color-2 text-[9px] uppercase">
            company created on {Timezone.convert(company.created_at).format()}
          </div>
        </div>
      ))}
    </React.Fragment>
  );

  if (_activeRequests > 0 || !status) return null;
  return (
    <AuthContainer bg_color="hv-color-12" back_login={true}>
      <div className="pl-[16px] pr-[16px] flex items-center justify-center flex-col">
        <div className="w-[320px] p-[5px] ">
          <div className=" w-[100%] mt-0 ml-auto mr-auto mb-[20px] text-center">
            <h2>Hello {user} 👋</h2>
            <p className="mt-4 text-[.9rem] text-hv-color-2">
              Your account is linked with more company. Choose where you want to
              go.
            </p>
          </div>
          <SelectCompanyComponent />
        </div>
      </div>
    </AuthContainer>
  );
}
