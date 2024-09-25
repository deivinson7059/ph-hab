export interface StepItems {
  selected?: boolean;
  number: number;
  title: string;
  description?: string;
  status: 'is-process' | 'is-wait';
  style: { [key: string]: string };
  flexClass: string;
}
export interface typeDocumentIdentification {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface typeOrganization {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}
export interface typeRegime {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface typeLiability {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
}

export interface Municipality {
  id: number;
  department_id: number;
  name: string;
  code: string;
  created_at: string;
  updated_at: string;
  codefacturador: number;
  department: Department;
}

export interface typeDocument {
  id: number;

  name: string;
  code: string;
  cufe_algorithm: string | null;
  prefix: string | null;
  created_at: string;
  updated_at: string;
}

export interface settingsCompany {
  type_document_identification: typeDocumentIdentification[];
  type_organization: typeOrganization[];
  type_regime: typeRegime[];
  department: Department[];
  municipality: Municipality[];
  type_document: typeDocument[];
  type_liability: typeLiability[];
}

export interface EmployeSettings {
  identification_number: number | null;
  dv: number | null;
  business_name: string;
  merchant_registration: string;
  address: string;
  phone: string;
  email: string;
  type_document_identification: typeDocumentIdentification | null;
  type_document_identification_id: number | null;
  type_organization: typeOrganization | null;
  type_organization_id: number | null;
  type_regime: typeRegime | null;
  type_regime_id: number | null;
  type_liability: typeLiability | null;
  type_liability_id: number | null;
  department: Department | null;
  department_id: number | null;
  municipality: Municipality | null;
  municipality_id: number | null;
  mail_host: string | null;
  mail_port: string | null;
  mail_username: string | null;
  mail_password: string | null;
  mail_encryption: "tls" | "ssl" | null;
}

export interface sofwareFeSettings {
  id: string;
  pin: number | null;
}
export interface sofwareFetestIdSettings {
  testId: string;
  fNumber: number;
}

export interface sofwareFeSettingsData {
  id: string;
  pin: number;
}

export interface sofwareEeqdocsSettings {
  ideqdocs: string;
  pineqdocs: number | null;
}

export interface sofwareEeqdocstestIdSettings {
  testIdeqdocs: string;
  fNumber: number;
}

export interface sofwareEeqdocsSettingsData {
  ideqdocs: string;
  pineqdocs: number;
}
export interface sofwarePayrollSettings {
  idpayroll: string;
  pinpayroll: number | null;
}

export interface sofwarePayrollSettingsData {
  idpayroll: string;
  pinpayroll: number;
}

export interface sofwarePayrolltestIdSettings {
  testIdpayroll: string;
  fNumber: number;
  limit: number;
  cune: string;
  predecessor_number: number;
}

export interface sofwareSettingsData {
  id: string;
  pin: number;
  ideqdocs?: string;
  pineqdocs?: number;
  idpayroll?: string;
  pinpayroll?: number;
}

export interface saveEmployeSettings {
  type_document_identification_id: number;
  type_organization_id: number;
  type_regime_id: number;
  type_liability_id: number;
  business_name: string;
  merchant_registration: string;
  municipality_id: number;
  address: string;
  phone: string;
  email: string;
  mail_host?: string;
  mail_port?: string;
  mail_username?: string;
  mail_password?: string;
  mail_encryption?: string;
}

export interface ApiSoftwareResponse {
  success: boolean;
  message: string;
  software: Software;
}

export interface Software {
  id: number;
  identifier: string;
  pin: string;
  identifier_payroll: string;
  pin_payroll: string;
  identifier_eqdocs: string;
  pin_eqdocs: string;
  url: string;
  url_payroll: string;
  url_eqdocs: string;
  created_at: string;
  updated_at: string;
}


export interface ApiCompanyResponse {
  success: boolean;
  message: string;
  password: string;
  token: string;
  company: Company;
}

export interface Company {
  id: number;
  user_id: number;
  identification_number: string;
  dv: string;
  language_id: number;
  tax_id: number;
  type_environment_id: number;
  payroll_type_environment_id: number;
  eqdocs_type_environment_id: number;
  type_operation_id: number;
  type_document_identification_id: number;
  country_id: number;
  type_currency_id: number;
  type_organization_id: number;
  type_regime_id: number;
  type_liability_id: number;
  municipality_id: number;
  merchant_registration: string;
  address: string;
  phone: string;
  password: string | null;
  newpassword: string | null;
  type_plan_id: number;
  type_plan2_id: number;
  type_plan3_id: number;
  type_plan4_id: number;
  start_plan_date: string | null;
  start_plan_date2: string | null;
  start_plan_date3: string | null;
  start_plan_date4: string | null;
  absolut_start_plan_date: string | null;
  state: number;
  allow_seller_login: number;
  created_at: string;
  updated_at: string;
  user: User;
  send: any[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  id_administrator: number | null;
  mail_host: string | null;
  mail_port: string | null;
  mail_username: string | null;
  mail_password: string | null;
  mail_encryption: string | null;
}
export interface certificateSettingsData {
  certificate: string;
  password: string;
}
export interface ApiCertificateResponse {
  success: boolean;
  message: string;
  certificado: Certificado;
}
export interface Certificado {
  name: string;
  password: string;
  expiration_date: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface HttpErrorResponse<T> {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: T;
}

export interface ErrorResponse {
  message: string;
  errors: ErrorsCertificate;
}

export interface ErrorsCertificate {
  certificate: string;
  password: string;
}

export interface resolution {
  type_document_id: number;
  prefix: string;
  resolution?: string;
  resolution_date?: string;
  technical_key?: string;
  from: number;
  to: number;
  generated_to_date?: number;
  date_from?: string;
  date_to?: string;
}

export interface resolutionSave {
  type_document: typeDocument[] | null;
  type_document_id: number | null;
  prefix: string;
  resolution?: string;
  resolution_date?: string
  technical_key?: string;
  from: number | null;
  to: number | null;
  generated_to_date?: number;
  date_from?: string ,
  date_to?: string ;
}

export interface ApiResolutionResponse {
  success: boolean;
  message: string;
  resolution: ResolutionRes;
}

export interface ResolutionRes {
  type_document_id: number;
  resolution: string;
  prefix: string;
  resolution_date: string;
  technical_key: string | null;
  from: number;
  to: number;
  date_from: string;
  date_to: string;
  updated_at: string;
  created_at: string;
  id: number;
  number: number;
  next_consecutive: string;
}


export interface Customer {
  identification_number: string;
  dv: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  merchant_registration: string;
  type_document_identification_id: string;
  type_organization_id: string;
  type_liability_id: string;
  municipality_id: string;
  type_regime_id: string;
}

export interface PaymentForm {
  payment_form_id: number;
  payment_method_id: number;
  payment_due_date: string;
  duration_measure: string;
}

export interface LegalMonetaryTotals {
  line_extension_amount: number;
  tax_exclusive_amount: number;
  tax_inclusive_amount: number;
  payable_amount: number;
  allowance_total_amount?: number;
  charge_total_amount?: number;
}

export interface TaxTotal {
  tax_id: string | number;
  tax_amount: string;
  taxable_amount: string;
  percent: string;
}

export interface InvoiceLineTaxTotal {
  tax_id: string | number;
  tax_amount: number;
  taxable_amount: number;
  percent: string;
}

export interface AllowanceCharge {
  discount_id?: string;
  charge_indicator: boolean;
  allowance_charge_reason: string;
  amount: number;
  base_amount: number;
}

export interface InvoiceLine {
  unit_measure_id: number;
  invoiced_quantity: string;
  line_extension_amount: number;
  free_of_charge_indicator: boolean;
  tax_totals: InvoiceLineTaxTotal[];
  allowance_charges?: AllowanceCharge[];
  description: string;
  notes: string | null;
  code: string;
  type_item_identification_id: number;
  price_amount: string | number;
  base_quantity: string;
}

export interface GlobalAllowanceCharge {
  discount_id: number;
  charge_indicator: boolean;
  allowance_charge_reason: string;
  amount: number;
  base_amount: number;
}

export interface Invoice {
  number: string | number;
  prefix: string;
  type_document_id: number;
  date: string;
  time: string;
  resolution_number: string;
  sendmail: boolean;
  sendmailtome: boolean;
  notes: string | null;
  head_note: string;
  foot_note: string;
  customer: Customer;
  payment_form: PaymentForm;
  legal_monetary_totals: LegalMonetaryTotals;
  tax_totals: TaxTotal[];
  invoice_lines: InvoiceLine[];
  allowance_charges?: GlobalAllowanceCharge[];
}

export interface InvoiceEeqdocs {
  number: number;
  type_document_id: number;
  date: string;
  time: string;
  postal_zone_code: string;
  resolution_number: string;
  prefix: string;
  notes: string | null;
  sendmail: boolean;
  sendmailtome: boolean;
  foot_note: string;
  software_manufacturer: SoftwareManufacturer;
  buyer_benefits: BuyerBenefits;
  cash_information: CashInformation;
  customer: Customer;
  payment_form: PaymentForm;
  legal_monetary_totals: LegalMonetaryTotals;
  tax_totals: TaxTotal[];
  invoice_lines: InvoiceLine[];
  allowance_charges?: GlobalAllowanceCharge[];
}
export interface BuyerBenefits {
  code: string;
  name: string;
  points: string;
}
export interface CashInformation {
  plate_number: string;
  location: string;
  cashier: string;
  cash_type: string;
  sales_code: string;
  subtotal: string;
}
export interface SoftwareManufacturer {
  name: string;
  business_name: string;
  software_name: string;
}


export interface ResponseApiFe {
  success: boolean;
  message: string;
  send_email_success: boolean;
  send_email_date_time: boolean;
  urlinvoicexml: string;
  urlinvoicepdf: string;
  urlinvoiceattached: string;
  cufe: string;
  QRStr: string;
  certificate_days_left: number;
  resolution_days_left: number;
  ResponseDian: ResponseDian;
  invoicexml: string;
  zipinvoicexml: string;
  unsignedinvoicexml: string;
  reqfe: string;
  rptafe: string;
  attacheddocument: string;
}

export interface ResponseDian {
  Envelope: Envelope;
}

export interface Envelope {
  Header: Header;
  Body: Body;
}

export interface Header {
  Action: Action;
  Security: Security;
}

export interface Action {
  _attributes: Attributes;
  _value: string;
}

export interface Attributes {
  mustUnderstand: string;
}

export interface Security {
  _attributes: Attributes;
  Timestamp: Timestamp;
}

export interface Timestamp {
  _attributes: TimestampAttributes;
  Created: string;
  Expires: string;
}

export interface TimestampAttributes {
  Id: string;
}

export interface Body {
  SendTestSetAsyncResponse?: SendTestSetAsyncResponse;
  SendBillSyncResponse?: SendBillSyncResponse;
}

export interface SendTestSetAsyncResponse {
  SendTestSetAsyncResult: SendTestSetAsyncResult;
}

export interface SendTestSetAsyncResult {
  ErrorMessageList: ErrorMessageList;
  ZipKey: string;
}

export interface ErrorMessageList {
  _attributes: {
    nil: string;
  };
}


export interface SendBillSyncResponse {
  SendBillSyncResult: SendBillSyncResult;
}

export interface SendBillSyncResult {
  ErrorMessage: ErrorMessage_;
  IsValid: string;
  StatusCode: string;
  StatusDescription: string;
  StatusMessage: string;
  XmlBase64Bytes: string;
  XmlBytes: XmlBytes;
  XmlDocumentKey: string;
  XmlFileName: string;
}

export interface ErrorMessage_ {
  string: string[] | string;
}

export interface XmlBytes {
  _attributes: XmlBytesAttributes;
}

export interface XmlBytesAttributes {
  nil: string;
}

export interface Novelty {
  novelty: boolean;
  uuidnov: string | null;
}

export interface Period {
  admision_date: string;
  settlement_start_date: string;
  settlement_end_date: string;
  worked_time: string;
  issue_date: string;
}

export interface Worker {
  type_worker_id: number;
  sub_type_worker_id: number;
  payroll_type_document_identification_id: number;
  municipality_id: number;
  type_contract_id: number;
  high_risk_pension: boolean;
  identification_number: number;
  surname: string;
  second_surname: string;
  first_name: string;
  middle_name: string | null;
  address: string;
  integral_salarary: boolean;
  salary: number;
  email: string;
}

export interface Payment {
  payment_method_id: number;
  bank_name: string;
  account_type: string;
  account_number: string;
}

export interface PaymentDate {
  payment_date: string;
}

export interface Accrued {
  worked_days: string;
  salary: string;
  transportation_allowance: string;
  accrued_total: string;
}

export interface Deductions {
  eps_type_law_deductions_id: number;
  eps_deduction: string;
  pension_type_law_deductions_id: number;
  pension_deduction: string;
  deductions_total: string;
}

export interface Payroll {
  type_document_id: number;
  head_note: string | null;
  foot_note: string | null;
  novelty: Novelty;
  period: Period;
  sendmail: boolean;
  sendmailtome: boolean;
  worker_code: string;
  prefix: string;
  consecutive: number;
  payroll_period_id: string;
  notes: string | null;
  worker: Worker;
  payment: Payment;
  payment_dates: PaymentDate[];
  accrued: Accrued;
  deductions: Deductions;
}
export interface Predecessor {
  predecessor_number: number;
  predecessor_cune: string;
  predecessor_issue_date: string;
}

export interface PayrollAdjustment {
  type_document_id: number;
  head_note: string | null;
  foot_note: string | null;
  type_note: number;
  predecessor: Predecessor;
  period: Period;
  sendmail: boolean;
  sendmailtome: boolean;
  worker_code: string;
  prefix: string;
  consecutive: number;
  payroll_period_id: string;
  notes: string | null;
  worker?: Worker;
  payment?: Payment;
  payment_dates?: PaymentDate[];
  accrued?: Accrued;
  deductions?: Deductions;
}


export interface EnvironmentSettings {
  type_environment_id: number;
  payroll_type_environment_id: number;
  eqdocs_type_environment_id: number;
}


export interface CompanyC {
  id: number;
  user_id: number;
  identification_number: string;
  dv: string;
  language_id: number;
  tax_id: number;
  type_environment_id: number;
  payroll_type_environment_id: number;
  eqdocs_type_environment_id: number;
  type_operation_id: number;
  type_document_identification_id: number;
  country_id: number;
  type_currency_id: number;
  type_organization_id: number;
  type_regime_id: number;
  type_liability_id: number;
  municipality_id: number;
  merchant_registration: string;
  address: string;
  phone: string;
  password: string | null;
  newpassword: string | null;
  type_plan_id: number;
  type_plan2_id: number;
  type_plan3_id: number;
  type_plan4_id: number;
  start_plan_date: string | null;
  start_plan_date2: string | null;
  start_plan_date3: string | null;
  start_plan_date4: string | null;
  absolut_start_plan_date: string | null;
  state: number;
  allow_seller_login: number;
  created_at: string;
  updated_at: string;
  user: UserC;
  send: Send[];
}

export interface UserC {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  id_administrator: number | null;
  mail_host: string | null;
  mail_port: number | null;
  mail_username: string | null;
  mail_password: string | null;
  mail_encryption: string | null;
}

export interface Send {
  id: number;
  year: number;
  next_consecutive: number;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentUpdateResponse {
  message: string;
  company: CompanyC;
}
export interface SoftwareData {
  IDSoftware: string;
}

export interface NumberRangeResponseT {
  ResolutionNumber: string;
  ResolutionDate: string;
  Prefix: string;
  FromNumber: string;
  ToNumber: string;
  ValidDateFrom: string;
  ValidDateTo: string;
  TechnicalKey?: string | null; // Puede ser nulo o string
}

export interface GetNumberingRangeResultT {
  OperationCode: string;
  OperationDescription: string;
  ResponseList: {
    NumberRangeResponse: NumberRangeResponseT | NumberRangeResponseT[];
  };
}

export interface ResponseNumberingDian {
  Envelope: {
    Body: {
      GetNumberingRangeResponse: {
        GetNumberingRangeResult: GetNumberingRangeResultT;
      };
    };
  };
}

export interface ApiNumberingResponse {
  message: string;
  ResponseDian: ResponseNumberingDian;
  certificate_days_left: number;
}

export interface PayrollApiResponse {
  message: string;
  ResponseDian: {
    Envelope: {
      Header: {
        Action: {
          _attributes: {
            mustUnderstand: string;
          };
          _value: string;
        };
        Security: {
          _attributes: {
            mustUnderstand: string;
          };
          Timestamp: {
            _attributes: {
              Id: string;
            };
            Created: string;
            Expires: string;
          };
        };
      };
      Body: {
        SendTestSetAsyncResponse: {
          SendTestSetAsyncResult: {
            ErrorMessageList: {
              _attributes: {
                nil: string;
              };
            };
            ZipKey: string;
          };
        };
      };
    };
  };
  payrollxml: string;
  zippayrollxml: string;
  unsignedpayrollxml: string;
  reqni: string;
  rptani: string;
  urlpayrollxml: string;
  urlpayrollpdf: string;
  cune: string;
  QRStr: string;
  certificate_days_left: number;
}
