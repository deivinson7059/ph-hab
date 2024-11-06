import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsHttpClientService } from 'ngx-danisoft-utils';
import { environment } from 'src/environments/environment';
import {
  ApiCertificateResponse,
  ApiCompanyResponse,
  ApiLogoResponse,
  ApiNumberingResponse,
  ApiResolutionResponse,
  ApiSoftwareResponse,
  certificateSettingsData,
  EnvironmentSettings,
  EnvironmentUpdateResponse,
  ErrorResponse,
  HttpErrorResponse,
  Invoice,
  InvoiceEeqdocs,
  logoSettingsData,
  Payroll,
  PayrollAdjustment,
  PayrollApiResponse,
  resolution,
  ResponseApiFe,
  saveEmployeSettings,
  SoftwareData,
  sofwareEeqdocsSettingsData,
  sofwareFeSettingsData,
  sofwarePayrollSettingsData,
  sofwareSettingsData,
} from '../interfaces/configuration-admin.interface';
import { lastValueFrom, Observable } from 'rxjs';
const { dian } = environment;
@Injectable({
  providedIn: 'root',
})
export class ConfigurationAdminService {
  constructor(private httpService: UtilsHttpClientService) {}

  saveConfigEmploye(
    identification_number: number,
    dv: number,
    data: saveEmployeSettings
  ): Observable<ApiCompanyResponse> {
    return this.httpService.post<ApiCompanyResponse>(
      `${dian.domain}/api/ubl2.1/config/${identification_number}/${dv}`,
      data,
      {
        headers: this.apiHeaders_,
      }
    );
  }
  configCertificate(
    data: certificateSettingsData
  ): Observable<ApiCertificateResponse | HttpErrorResponse<ErrorResponse>> {
    return this.httpService.put<
      ApiCertificateResponse | HttpErrorResponse<ErrorResponse>
    >(`${dian.domain}/api/ubl2.1/config/certificate`, data, {
      headers: this.apiHeaders,
    });
  }

  configSofwareFormFe(
    data: sofwareFeSettingsData
  ): Observable<ApiSoftwareResponse> {
    return this.httpService.put<ApiSoftwareResponse>(
      `${dian.domain}/api/ubl2.1/config/software`,
      data,
      {
        headers: this.apiHeaders,
      }
    );
  }

  configSofwareFormEeqdocs(
    data: sofwareEeqdocsSettingsData
  ): Observable<ApiSoftwareResponse> {
    return this.httpService.put<ApiSoftwareResponse>(
      `${dian.domain}/api/ubl2.1/config/softwareeqdocs`,
      data,
      {
        headers: this.apiHeaders,
      }
    );
  }

  configSofwareFormPayroll(
    data: sofwarePayrollSettingsData
  ): Observable<ApiSoftwareResponse> {
    return this.httpService.put<ApiSoftwareResponse>(
      `${dian.domain}/api/ubl2.1/config/softwarepayroll`,
      data,
      {
        headers: this.apiHeaders,
      }
    );
  }

  configResolution(data: resolution): Observable<ApiResolutionResponse> {
    return this.httpService.put<ApiResolutionResponse>(
      `${dian.domain}/api/ubl2.1/config/resolution`,
      data,
      {
        headers: this.apiHeaders,
      }
    );
  }

  configHabFe(
    data: Invoice,
    testId: string,
    hab: boolean = false
  ): Observable<ResponseApiFe> {
    let url: string =
      hab === true
        ? `${dian.domain}/api/ubl2.1/invoice/${testId}`
        : `${dian.domain}/api/ubl2.1/invoice`;
    return this.httpService.post<ResponseApiFe>(`${url}`, data, {
      headers: this.apiHeaders,
    });
  }

  configHabEeqdocs(
    data: InvoiceEeqdocs,
    testId: string,
    hab: boolean = false
  ): Observable<ResponseApiFe> {
    let url: string =
      hab === true
        ? `${dian.domain}/api/ubl2.1/eqdoc/${testId}`
        : `${dian.domain}/api/ubl2.1/eqdoc`;
    return this.httpService.post<ResponseApiFe>(`${url}`, data, {
      headers: this.apiHeaders,
    });
  }

  sendPayroll__(
    data: Payroll,
    testId: string,
    hab: boolean = false
  ): Observable<PayrollApiResponse> {
    let url: string =
      hab === true
        ? `${dian.domain}/api/ubl2.1/payroll/${testId}`
        : `${dian.domain}/api/ubl2.1/payroll`;
    return this.httpService.post<PayrollApiResponse>(`${url}`, data, {
      headers: this.apiHeaders,
    });
  }

  sendPayroll(
    data: Payroll,
    testId: string,
    hab: boolean = false
  ): Promise<PayrollApiResponse> {
    let url: string =
      hab === true
        ? `${dian.domain}/api/ubl2.1/payroll/${testId}`
        : `${dian.domain}/api/ubl2.1/payroll`;

    return lastValueFrom(
      this.httpService.post<PayrollApiResponse>(`${url}`, data, {
        headers: this.apiHeaders,
      })
    );
  }

  sendPayrollAdjustment___(
    data: PayrollAdjustment,
    testId: string,
    hab: boolean = false
  ): Observable<PayrollApiResponse> {
    let url: string =
      hab === true
        ? `${dian.domain}/api/ubl2.1/payroll-adjust-note/${testId}`
        : `${dian.domain}/api/ubl2.1/payroll-adjust-note`;
    return this.httpService.post<PayrollApiResponse>(`${url}`, data, {
      headers: this.apiHeaders,
    });
  }
  sendPayrollAdjustment(
    data: PayrollAdjustment,
    testId: string,
    hab: boolean = false
  ): Promise<PayrollApiResponse> {
    let url: string =
      hab === true
        ? `${dian.domain}/api/ubl2.1/payroll-adjust-note/${testId}`
        : `${dian.domain}/api/ubl2.1/payroll-adjust-note`;

    return lastValueFrom(
      this.httpService.post<PayrollApiResponse>(`${url}`, data, {
        headers: this.apiHeaders,
      })
    );
  }

  configLogo(
    data: logoSettingsData
  ): Observable<ApiLogoResponse | HttpErrorResponse<ErrorResponse>> {
    return this.httpService.put<
      ApiLogoResponse | HttpErrorResponse<ErrorResponse>
    >(`${dian.domain}/api/ubl2.1/config/logo`, data, {
      headers: this.apiHeaders,
    });
  }
  configEnvironment(
    data: EnvironmentSettings
  ): Observable<EnvironmentUpdateResponse> {
    return this.httpService.put<EnvironmentUpdateResponse>(
      `${dian.domain}/api/ubl2.1/config/environment`,
      data,
      {
        headers: this.apiHeaders,
      }
    );
  }

  getNumberingRange(data: SoftwareData): Observable<ApiNumberingResponse> {
    return this.httpService.post<ApiNumberingResponse>(
      `${dian.domain}/api/ubl2.1/numbering-range`,
      data,
      {
        headers: this.apiHeaders,
      }
    );
  }

  get apiHeaders(): HttpHeaders {
    const token = localStorage.getItem('pg-api-token');
    let apiHeaders_: any = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    // console.log(apiHeaders_);
    return new HttpHeaders(apiHeaders_);
  }

  get apiHeaders_(): HttpHeaders {
    let apiHeaders_: any = {
      'Content-Type': 'application/json',
    };
    // console.log(apiHeaders_);
    return new HttpHeaders(apiHeaders_);
  }
}
