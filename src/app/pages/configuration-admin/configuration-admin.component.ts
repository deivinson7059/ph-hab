import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsSpinnerService, UtilsToastrService } from 'ngx-danisoft-utils';
import {
  ApiCertificateResponse,
  certificateSettingsData,
  Department,
  EmployeSettings,
  EnvironmentSettings,
  ErrorResponse,
  HttpErrorResponse,
  Invoice,
  InvoiceEeqdocs,
  Municipality,
  NumberRangeResponseT,
  Payroll,
  PayrollAdjustment,
  resolution,
  resolutionSave,
  saveEmployeSettings,
  settingsCompany,
  SoftwareData,
  sofwareEeqdocsSettings,
  sofwareEeqdocsSettingsData,
  sofwareEeqdocstestIdSettings,
  sofwareFeSettings,
  sofwareFeSettingsData,
  sofwareFetestIdSettings,
  sofwarePayrollSettings,
  sofwarePayrollSettingsData,
  sofwarePayrolltestIdSettings,
  sofwareSettingsData,
  StepItems,
  typeDocument,
} from 'src/app/core/interfaces/configuration-admin.interface';
import {
  type_document_identification,
  type_organization,
  type_regime,
  department,
  municipality,
  type_document,
  type_liability,
} from 'src/app/core/models/configuration-admin.models';
import { ConfigurationAdminService } from 'src/app/core/services/configuration-admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'pg-configuration-admin',
  templateUrl: './configuration-admin.component.html',
  styleUrls: ['./configuration-admin.component.scss'],
})
export class ConfigurationAdminComponent implements OnInit {
  constructor(
    public configurationAdminService: ConfigurationAdminService,
    private spinnerService: UtilsSpinnerService,
    private toastrService: UtilsToastrService
  ) {}
  Step: number = 1;
  StepOne: boolean = false;
  stepItems: StepItems[] = [
    {
      selected: true,
      number: 1,
      title: 'Empresa',
      description: 'Ingrese los datos de la empresa',
      status: 'is-process',
      style: {
        'flex-basis': '33.3333%',
        'margin-right': '0px',
      },
      flexClass: '',
    },
    {
      selected: false,
      number: 2,
      title: 'Certificado',
      description: 'Cargue el certificado digital',
      status: 'is-wait',
      style: {
        'flex-basis': '33.3333%',
        'margin-right': '0px',
      },
      flexClass: '',
    },
    {
      selected: false,
      number: 3,
      title: 'Habilitar Fe',
      description: 'Habilitar Facturación Electrónica',
      status: 'is-wait',
      style: {
        'flex-basis': '33.3333%',
        'margin-right': '0px',
      },
      flexClass: '',
    },

    {
      selected: false,
      number: 4,
      title: 'Habilitar Eqdocs',
      description: 'Habilitar Eqdocs',
      status: 'is-wait',
      style: {
        'flex-basis': '33.3333%',
        'margin-right': '0px',
      },
      flexClass: '',
    },
    {
      selected: false,
      number: 5,
      title: 'Habilitar Payroll',
      description: 'Habilitar Payroll',
      status: 'is-wait',
      style: {
        'flex-basis': '33.3333%',
        'margin-right': '0px',
      },
      flexClass: 'is-flex',
    },
    {
      selected: false,
      number: 6,
      title: 'Finalizar',
      description: 'Finalizar configuración',
      status: 'is-wait',
      style: {
        'flex-basis': '33.3333%',
        'margin-right': '0px',
        'max-width': '25%',
      },
      flexClass: 'is-flex',
    },
  ];

  /**
   *
   * Step 1 - Empresa
   *
   */

  configEmployeForm: FormGroup = new FormGroup({
    identification_number: new FormControl('', [Validators.required]),
    dv: new FormControl('', [Validators.required]),
    business_name: new FormControl('', [Validators.required]),
    merchant_registration: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type_document_identification: new FormControl('', [Validators.required]),
    type_organization: new FormControl('', [Validators.required]),
    type_regime: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    municipality: new FormControl('', [Validators.required]),
    type_document: new FormControl('', [Validators.required]),
    type_liability: new FormControl('', [Validators.required]),
  });

  settingsCompany_: settingsCompany = {
    type_document_identification: [],
    type_organization: [],
    type_regime: [],
    department: [],
    municipality: [],
    type_document: [],
    type_liability: [],
  };

  employeSettingsSelected: EmployeSettings = {
    identification_number: null,
    dv: null,
    business_name: '',
    merchant_registration: '0000000-00',
    address: '',
    phone: '',
    email: '',
    type_document_identification_id: null,
    type_organization_id: null,
    type_regime_id: null,
    type_liability_id: null,
    type_document_identification: null,
    type_organization: null,
    type_regime: null,
    type_liability: null,
    department: null,
    department_id: null,
    municipality: null,
    municipality_id: null,
  };

  @ViewChild('autoIdentification') autoIdentification: any;
  keyword_identification = 'name';

  onFocusedIdentificationType(e: any) {
    this.autoIdentification.open();
    if (this.employeSettingsSelected.type_document_identification == null) {
      this.autoIdentification.clear();
    } else {
      this.autoIdentification.close();
    }
  }
  onFocusIdentificationType(e: any) {
    this.autoIdentification.open();
  }
  selectIdentificationType(e: any) {
    if (e.id === 6) {
      //this.sw_identification = true;
    } else {
      //this.sw_identification = false;
    }
    this.employeSettingsSelected.type_document_identification_id = e.id;
    this.employeSettingsSelected.type_document_identification = e;
  }
  clearedIdentificationType(e: any) {
    this.employeSettingsSelected.type_document_identification = null;
    this.employeSettingsSelected.type_document_identification_id = null;
    this.autoIdentification.open();
  }

  @ViewChild('autoDepartment') autoDepartment: any;
  keyword_department = 'name';

  onFocusedDepartment(e: any) {
    this.autoDepartment.open();
    if (this.employeSettingsSelected.department == null) {
      this.autoDepartment.clear();
    } else {
      this.autoDepartment.close();
    }
  }

  onFocusDepartment(e: any) {
    this.autoDepartment.open();
  }

  selectDepartment(e: Department) {
    this.employeSettingsSelected.department = e;
    this.employeSettingsSelected.department_id = e.id;
    //filtrar municipios
    this.settingsCompany_.municipality = municipality.filter(
      (m: Municipality) => m.department_id === e.id
    );
  }
  clearedDepartment(e: any) {
    this.employeSettingsSelected.department = null;
    this.employeSettingsSelected.department_id = null;

    this.employeSettingsSelected.municipality = null;
    this.employeSettingsSelected.municipality_id = null;
    this.autoDepartment.open();
  }

  @ViewChild('autoMunicipality') autoMunicipality: any;
  keyword_municipality = 'name';

  onFocusedMunicipality(e: any) {
    this.autoMunicipality.open();
    if (this.employeSettingsSelected.municipality == null) {
      this.autoMunicipality.clear();
    } else {
      this.autoMunicipality.close();
    }
  }

  onFocusMunicipality(e: any) {
    //this.autoCountry.open();
  }

  selectMunicipality(e: any) {
    this.employeSettingsSelected.municipality = e;
    this.employeSettingsSelected.municipality_id = e.id;
  }
  clearedMunicipality(e: any) {
    this.employeSettingsSelected.municipality = null;
    this.employeSettingsSelected.municipality_id = null;
    this.autoMunicipality.open();
  }

  @ViewChild('autoRegimen') autoRegimen: any;
  keyword_regimen = 'name';
  onFocusedRegimenType(e: any) {
    this.autoRegimen.open();
    if (this.employeSettingsSelected.type_regime == null) {
      this.autoRegimen.clear();
    } else {
      this.autoRegimen.close();
    }
  }
  onFocusRegimenType(e: any) {
    this.autoRegimen.open();
  }
  selectRegimenType(e: any) {
    this.employeSettingsSelected.type_regime = e;
    this.employeSettingsSelected.type_regime_id = e.id;
  }
  clearedRegimenType(e: any) {
    this.employeSettingsSelected.type_regime = null;
    this.employeSettingsSelected.type_regime_id = null;
    this.autoRegimen.open();
  }

  @ViewChild('autoPerson') autoPerson: any;
  keyword_person = 'name';

  onFocusedPersonType(e: any) {
    this.autoPerson.open();
    if (this.employeSettingsSelected.type_organization == null) {
      this.autoPerson.clear();
    } else {
      this.autoPerson.close();
    }
  }
  onFocusPersonType(e: any) {
    this.autoPerson.open();
  }
  selectPersonType(e: any) {
    this.employeSettingsSelected.type_organization = e;
    this.employeSettingsSelected.type_organization_id = e.id;
  }
  clearedPersonType(e: any) {
    this.employeSettingsSelected.type_organization = null;
    this.employeSettingsSelected.type_organization_id = null;
    this.autoPerson.open();
  }

  @ViewChild('autoObligation') autoObligation: any;
  keyword_obligation = 'name';

  onFocusedObligationType(e: any) {
    this.autoObligation.open();
    if (this.employeSettingsSelected.type_liability == null) {
      this.autoObligation.clear();
    } else {
      this.autoObligation.close();
    }
  }
  onFocusObligationType(e: any) {
    this.autoObligation.open();
  }
  selectObligationType(e: any) {
    this.employeSettingsSelected.type_liability = e;
    this.employeSettingsSelected.type_liability_id = e.id;
  }
  clearedObligationType(e: any) {
    this.employeSettingsSelected.type_liability = null;
    this.employeSettingsSelected.type_liability_id = null;
    this.autoObligation.open();
  }

  getDiv(nit: string): void {
    if (nit.length === 0) {
      this.employeSettingsSelected.dv = null;
    } else {
      this.employeSettingsSelected.dv = this.calcularDigitoVerificacion(nit);
    }
  }
  calcularDigitoVerificacion = (myNit: any): number | null => {
    let vpri, x, y, z;

    // Se limpia el Nit
    myNit = myNit.replace(/\s/g, ''); // Espacios
    myNit = myNit.replace(/,/g, ''); // Comas
    myNit = myNit.replace(/\./g, ''); // Puntos
    myNit = myNit.replace(/-/g, ''); // Guiones

    // Se valida el nit
    if (isNaN(myNit)) {
      console.log("El nit/cédula '" + myNit + "' no es válido(a).");
      return null;
    }

    // Procedimiento
    vpri = new Array(16);
    z = myNit.length;

    vpri[1] = 3;
    vpri[2] = 7;
    vpri[3] = 13;
    vpri[4] = 17;
    vpri[5] = 19;
    vpri[6] = 23;
    vpri[7] = 29;
    vpri[8] = 37;
    vpri[9] = 41;
    vpri[10] = 43;
    vpri[11] = 47;
    vpri[12] = 53;
    vpri[13] = 59;
    vpri[14] = 67;
    vpri[15] = 71;

    x = 0;
    y = 0;
    for (let i = 0; i < z; i++) {
      y = myNit.substr(i, 1);
      // console.log ( y + "x" + vpri[z-i] + ":" ) ;
      x += y * vpri[z - i];
      // console.log ( x ) ;
    }

    y = x % 11;
    // console.log ( y ) ;
    return y > 1 ? 11 - y : y;
  };

  onConfigEmploye() {
    if (this.configEmployeForm.controls['identification_number'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de identificación válido',
      });
      return;
    }

    if (this.configEmployeForm.controls['dv'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un dígito de verificación válido',
      });
      return;
    }

    if (this.configEmployeForm.controls['business_name'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un nombre de empresa válido',
      });
      return;
    }

    if (this.configEmployeForm.controls['merchant_registration'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de matrícula mercantil válido',
      });
      return;
    }

    if (this.configEmployeForm.controls['address'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una dirección válida',
      });
      return;
    }

    if (this.configEmployeForm.controls['phone'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de teléfono válido',
      });
      return;
    }

    if (this.configEmployeForm.controls['email'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un correo electrónico válido',
      });
      return;
    }

    if (
      this.employeSettingsSelected.type_document_identification == null ||
      this.employeSettingsSelected.type_document_identification_id == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un tipo de documento válido',
      });
      return;
    }

    if (
      this.employeSettingsSelected.department == null ||
      this.employeSettingsSelected.department_id == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un departamento válido',
      });
      return;
    }

    if (
      this.employeSettingsSelected.municipality == null ||
      this.employeSettingsSelected.municipality_id == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un municipio válido',
      });
      return;
    }

    if (
      this.employeSettingsSelected.type_organization == null ||
      this.employeSettingsSelected.type_organization_id == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un tipo de organización válido',
      });
      return;
    }

    if (
      this.employeSettingsSelected.type_regime == null ||
      this.employeSettingsSelected.type_regime_id == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un tipo de régimen válido',
      });
      return;
    }

    if (
      this.employeSettingsSelected.type_liability == null ||
      this.employeSettingsSelected.type_liability_id == null
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un tipo de obligación válido',
      });
      return;
    }

    let data: saveEmployeSettings = {
      type_document_identification_id:
        this.employeSettingsSelected.type_document_identification_id,
      type_organization_id: this.employeSettingsSelected.type_organization_id,
      type_regime_id: this.employeSettingsSelected.type_regime_id,
      type_liability_id: this.employeSettingsSelected.type_liability_id,
      business_name: this.employeSettingsSelected.business_name.toUpperCase(),
      merchant_registration: this.employeSettingsSelected.merchant_registration,
      municipality_id: this.employeSettingsSelected.municipality_id,
      address: this.employeSettingsSelected.address,
      phone: this.employeSettingsSelected.phone,
      email: this.employeSettingsSelected.email.toLowerCase(),
    };

    Swal.fire({
      title: '¿Está seguro de guardar la configuración?',
      text: 'No podrás deshacer este paso...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Sí, guardar`,
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinnerService.show();
        this.configurationAdminService
          .saveConfigEmploye(
            this.employeSettingsSelected.identification_number!,
            this.employeSettingsSelected.dv!,
            data
          )
          .subscribe(
            (res) => {
              console.log(res);
              this.spinnerService.hide();

              if (res.success === true) {
                this.toastrService.success(res.message, 'success');
                //guaramos el token en el localstorage
                localStorage.setItem('pg-api-token', res.token);

                this.stepItems[0].status = 'is-wait';
                this.stepItems[0].selected = false;

                this.stepItems[1].status = 'is-process';
                this.stepItems[1].selected = true;

                this.Step = 2;
                this.StepOne = true;
              } else {
                this.StepOne = false;
                this.toastrService.error(res.message, 'error');
              }
            },
            (error) => {
              this.StepOne = false;
              this.spinnerService.hide();
              Swal.fire(
                'Error!',
                'Ha ocurrido un error al guardar la configuración.',
                'error'
              );
            }
          );
      }
    });
  }

  /**
   *
   * Step 2 - Certificado
   *
   */

  showbase64: boolean = false;
  files: File[] = [];
  base64: string = '';
  password_: string = '';

  configCertifForm: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  onSelect(event: any) {
    //console.log(event);
    const { rejectedFiles, addedFiles } = event;

    if (rejectedFiles.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El archivo no es válido',
      });

      this.base64 = '';
      this.files = [];
      return;
    }
    //this.files.push(...addedFiles);
    this.files = addedFiles.slice(-1);

    if (this.files.length > 0) {
      this.getToBase64(this.files[0]);
    } else {
      this.base64 = '';
    }
  }

  onRemove(file: File) {
    this.files.splice(this.files.indexOf(file), 1);
    this.base64 = '';
    this.files = [];
  }

  getToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String: string = reader.result as string;
      const base64WithoutMimeType: string = base64String.split(',')[1];
      this.base64 = base64WithoutMimeType;
    };
    reader.readAsDataURL(file);
  }
  onConfigCertif() {
    if (this.configCertifForm.controls['password'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una contraseña válida',
      });
      return;
    }

    if (this.files.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cargue un certificado válido',
      });
      return;
    }

    let data: certificateSettingsData = {
      password: this.configCertifForm.controls['password'].value,
      certificate: this.base64,
    };

    this.spinnerService.show();
    this.configurationAdminService.configCertificate(data).subscribe(
      (res) => {
        res = res as ApiCertificateResponse;
        console.log(res);
        this.spinnerService.hide();
        if (res.success === true) {
          this.toastrService.success(res.message, 'success');
          this.stepItems[1].status = 'is-wait';
          this.stepItems[1].selected = false;

          this.stepItems[2].status = 'is-process';
          this.stepItems[2].selected = true;

          this.Step = 3;
        } else {
          this.toastrService.error(res.message, 'error');
        }
      },
      (e: HttpErrorResponse<ErrorResponse>) => {
        this.spinnerService.hide();
        console.log(e);
        const { error, message } = e;

        let errors_: string =
          'message:' +
          message +
          '\n' +
          'certificate:' +
          error.errors.certificate +
          '\n' +
          'password:' +
          error.errors.password;

        Swal.fire('Error!', errors_, 'error');
      }
    );
  }

  /**
   *
   * Step 3 - Habilitar Fe
   *
   */

  isSaveSofwareFe: boolean = false;
  isSaveResolFe: boolean = false;
  isSaveHabFe: boolean = false;

  configSofwareFormFe: FormGroup = new FormGroup({
    feid: new FormControl('', [Validators.required]),
    pin: new FormControl('', [Validators.required]),
  });

  sofwareFeSettings_: sofwareFeSettings = {
    id: '',
    pin: null,
  };

  resolutionFe: resolution = {
    type_document_id: 1,
    prefix: 'SETP',
    resolution: '18760000001',
    resolution_date: '2019-01-19',
    technical_key: 'fc8eac422eba16e22ffd8c6f94b3f40a6e38162c',
    from: 990000000,
    to: 995000000,
    generated_to_date: 0,
    date_from: '2019-01-19',
    date_to: '2030-01-19',
  };

  onconfigSofwareFormFe() {
    if (this.configSofwareFormFe.controls['feid'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un ID de software válido',
      });
      return;
    }

    if (this.configSofwareFormFe.controls['pin'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un PIN válido',
      });
      return;
    }

    let data: sofwareFeSettingsData = {
      id: this.sofwareFeSettings_.id,
      pin: this.sofwareFeSettings_.pin!,
    };
    this.spinnerService.show();
    this.configurationAdminService.configSofwareFormFe(data).subscribe(
      (res) => {
        console.log(res);
        this.spinnerService.hide();
        if (res.success === true) {
          this.toastrService.success(res.message, 'success');
          this.isSaveSofwareFe = true;
        } else {
          this.toastrService.error(res.message, 'error');
        }
      },
      (error) => {
        console.log('error:::', error);
        this.spinnerService.hide();
        Swal.fire(
          'Error!',
          'Ha ocurrido un error al guardar la configuración.',
          'error'
        );
      }
    );
  }

  configSofwareTestIdFormFe: FormGroup = new FormGroup({
    testId: new FormControl('', [Validators.required]),
    fNumber: new FormControl('', [Validators.required]),
  });

  sofwareFetestIdSettings_: sofwareFetestIdSettings = {
    testId: '',
    fNumber: 990005003,
  };

  resolutionFormFe: FormGroup = new FormGroup({
    prefix: new FormControl('', [Validators.required]),
    resolution: new FormControl('', [Validators.required]),
    resolution_date: new FormControl('', [Validators.required]),
    technical_key: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
    generated_to_date: new FormControl('', [Validators.required]),
    date_from: new FormControl('', [Validators.required]),
    date_to: new FormControl('', [Validators.required]),
  });

  onConfigResolutionFe() {
    if (this.resolutionFormFe.controls['prefix'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un prefijo válido',
      });
      return;
    }

    if (this.resolutionFormFe.controls['from'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango desde válido',
      });
      return;
    }

    if (this.resolutionFormFe.controls['to'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango hasta válido',
      });
      return;
    }

    if (this.resolutionFormFe.controls['resolution'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una resolución válida',
      });
      return;
    }

    if (this.resolutionFormFe.controls['resolution_date'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha de resolución válida',
      });
      return;
    }

    if (this.resolutionFormFe.controls['date_from'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha desde válida',
      });
      return;
    }

    if (this.resolutionFormFe.controls['date_to'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha hasta válida',
      });
      return;
    }

    this.spinnerService.show();
    this.configurationAdminService
      .configResolution(this.resolutionFe)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();

          if (res.success === true) {
            this.toastrService.success(res.message, 'success Resolución FE');
            this.isSaveResolFe = true;
          } else {
            this.toastrService.error(res.message, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al guardar la resolución FE.',
            'error'
          );
        }
      );
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  invoiceFe: Invoice = {
    number: '990000001',
    prefix: 'SETP',
    type_document_id: 1,
    date: this.getCurrentDate(),
    time: '00:00:42',
    resolution_number: '18760000001',
    sendmail: false,
    sendmailtome: false,
    notes: null,
    head_note: '',
    foot_note: '',
    customer: {
      identification_number: '222222222222',
      dv: '7',
      name: 'CONSUMIDOR FINAL',
      phone: '3003000000',
      address: 'BOGOTA',
      email: 'admin@gmail.com',
      merchant_registration: '0000000-00',
      type_document_identification_id: '3',
      type_organization_id: '2',
      type_liability_id: '117',
      municipality_id: '149',
      type_regime_id: '2',
    },
    payment_form: {
      payment_form_id: 1,
      payment_method_id: 10,
      payment_due_date: this.getCurrentDate(),
      duration_measure: '0',
    },
    legal_monetary_totals: {
      line_extension_amount: 5092.59,
      tax_exclusive_amount: 5092.59,
      tax_inclusive_amount: 5500,
      payable_amount: 6050,
      charge_total_amount: 550,
    },
    tax_totals: [
      {
        tax_id: '4',
        tax_amount: '407.41',
        taxable_amount: '5092.59',
        percent: '8.00',
      },
    ],
    invoice_lines: [
      {
        unit_measure_id: 70,
        invoiced_quantity: '1.00',
        line_extension_amount: 5092.59,
        free_of_charge_indicator: false,
        tax_totals: [
          {
            tax_id: '4',
            tax_amount: 407.41,
            taxable_amount: 5092.59,
            percent: '8.00',
          },
        ],
        allowance_charges: [
          {
            discount_id: '1',
            charge_indicator: false,
            allowance_charge_reason: 'DESCUENTO GENERAL',
            amount: 0,
            base_amount: 5092.59,
          },
        ],
        description: 'JUGO COROZO',
        notes: null,
        code: 'DAN0028',
        type_item_identification_id: 4,
        price_amount: '5092.59',
        base_quantity: '1.00',
      },
    ],
    allowance_charges: [
      {
        discount_id: 13,
        charge_indicator: true,
        allowance_charge_reason: 'PROPINAS U OTROS',
        amount: 550,
        base_amount: 5500,
      },
    ],
  };

  QRStrFe: string = '';
  onHabilitarFe() {
    if (this.configSofwareTestIdFormFe.controls['testId'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un Test ID válido',
      });
      return;
    }

    if (this.configSofwareTestIdFormFe.controls['fNumber'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de factura válido',
      });
      return;
    }

    this.invoiceFe.number = this.sofwareFetestIdSettings_.fNumber;

    this.spinnerService.show();
    this.configurationAdminService
      .configHabFe(this.invoiceFe, this.sofwareFetestIdSettings_.testId, true)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();

          if (res.success === true) {
            // Acceder a IsValid
            const isValid =
              res.ResponseDian.Envelope.Body.SendBillSyncResponse
                .SendBillSyncResult.IsValid;
            //console.log(isValid);

            if (isValid === 'true') {
              this.toastrService.success(res.message, 'success Habilitar FE');
              this.isSaveHabFe = true;
              this.QRStrFe = this.formatQRStr(res.QRStr);
            } else if (isValid === 'false') {
              const errors =
                res.ResponseDian.Envelope.Body.SendBillSyncResponse
                  .SendBillSyncResult.ErrorMessage.string[0];
              Swal.fire('Error!', errors, 'error');
            }
          } else {
            this.toastrService.error(res.message, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire('Error!', 'Ha ocurrido un error al habilitar FE.', 'error');
        }
      );
  }

  /**
   *
   * Step 4
   *
   */

  isSaveSofwareEeqdocs: boolean = false;
  isSaveResolEeqdocs: boolean = false;
  isSaveHabEeqdocs: boolean = false;

  configSofwareFormEeqdocs: FormGroup = new FormGroup({
    ideqdocs: new FormControl('', [Validators.required]),
    pineqdocs: new FormControl('', [Validators.required]),
  });

  sofwareEeqdocsSettings_: sofwareEeqdocsSettings = {
    ideqdocs: '',
    pineqdocs: null,
  };

  onconfigSofwareFormEeqdocs() {
    if (this.configSofwareFormEeqdocs.controls['ideqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un ID de software válido',
      });
      return;
    }

    if (this.configSofwareFormEeqdocs.controls['pineqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un PIN válido',
      });
      return;
    }

    let data: sofwareEeqdocsSettingsData = {
      ideqdocs: this.sofwareEeqdocsSettings_.ideqdocs,
      pineqdocs: this.sofwareEeqdocsSettings_.pineqdocs!,
    };
    this.spinnerService.show();
    this.configurationAdminService.configSofwareFormEeqdocs(data).subscribe(
      (res) => {
        console.log(res);
        this.spinnerService.hide();
        if (res.success === true) {
          this.toastrService.success(res.message, 'success');
          this.isSaveSofwareEeqdocs = true;
        } else {
          this.toastrService.error(res.message, 'error');
        }
      },
      (error) => {
        console.log('error:::', error);
        this.spinnerService.hide();
        Swal.fire(
          'Error!',
          'Ha ocurrido un error al guardar la configuración.',
          'error'
        );
      }
    );
  }

  resolutionEeqdocs: resolution = {
    type_document_id: 15,
    prefix: 'EPOS',
    resolution: '18760000001',
    resolution_date: '2019-01-19',
    from: 1,
    to: 1000000,
    generated_to_date: 0,
    date_from: '2019-01-19',
    date_to: '2030-01-19',
  };

  resolutionFormEeqdocs: FormGroup = new FormGroup({
    prefixEeqdocs: new FormControl('', [Validators.required]),
    resolutionEeqdocs: new FormControl('', [Validators.required]),
    resolution_dateEeqdocs: new FormControl('', [Validators.required]),
    fromEeqdocs: new FormControl('', [Validators.required]),
    toEeqdocs: new FormControl('', [Validators.required]),
    generated_to_dateEeqdocs: new FormControl('', [Validators.required]),
    date_fromEeqdocs: new FormControl('', [Validators.required]),
    date_toEeqdocs: new FormControl('', [Validators.required]),
  });

  onConfigResolutionEeqdocs() {
    if (this.resolutionFormEeqdocs.controls['prefixEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un prefijo válido',
      });
      return;
    }

    if (this.resolutionFormEeqdocs.controls['fromEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango desde válido',
      });
      return;
    }

    if (this.resolutionFormEeqdocs.controls['toEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango hasta válido',
      });
      return;
    }

    if (this.resolutionFormEeqdocs.controls['resolutionEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una resolución válida',
      });
      return;
    }

    if (this.resolutionFormEeqdocs.controls['resolution_dateEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha de resolución válida',
      });
      return;
    }

    if (this.resolutionFormEeqdocs.controls['date_fromEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha desde válida',
      });
      return;
    }

    if (this.resolutionFormEeqdocs.controls['date_toEeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha hasta válida',
      });
      return;
    }

    this.spinnerService.show();
    this.configurationAdminService
      .configResolution(this.resolutionEeqdocs)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();

          if (res.success === true) {
            this.toastrService.success(
              res.message,
              'success Resolución Eqdocs'
            );
            this.isSaveResolEeqdocs = true;
          } else {
            this.toastrService.error(res.message, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al guardar la resolución Eqdocs.',
            'error'
          );
        }
      );
  }

  configSofwareTestIdFormEeqdocs: FormGroup = new FormGroup({
    testIdeqdocs: new FormControl('', [Validators.required]),
    fNumber: new FormControl('', [Validators.required]),
  });

  sofwareEeqdocstestIdSettings_: sofwareEeqdocstestIdSettings = {
    testIdeqdocs: '',
    fNumber: 60,
  };

  QRStrEeqdocs: string = '';

  invoiceEeqdocs: InvoiceEeqdocs = {
    number: 60,
    type_document_id: 15,
    date: this.getCurrentDate(),
    time: '00:00:12',
    postal_zone_code: '630003',
    resolution_number: '18760000001',
    prefix: 'EPOS',
    notes: null,
    sendmail: false,
    sendmailtome: false,
    foot_note: '',
    software_manufacturer: {
      name: 'PgFacture®',
      business_name: 'DANISOFT SAS',
      software_name: 'PgFacture®',
    },
    buyer_benefits: {
      code: '1129582163',
      name: 'DEIVINSON SCHMALBACH',
      points: '100',
    },
    cash_information: {
      plate_number: 'DF-000-12345',
      location: 'HOTEL OVERLOOK RECEPCION',
      cashier: 'JACK TORRANCE',
      cash_type: 'CAJA PRINCIPAL',
      sales_code: 'EPOS1',
      subtotal: '1000000.00',
    },
    customer: {
      identification_number: '222222222222',
      dv: '7',
      name: 'CONSUMIDOR FINAL',
      phone: '3003000000',
      address: 'BOGOTA',
      email: 'admin@gmail.com',
      merchant_registration: '0000000-00',
      type_document_identification_id: '3',
      type_organization_id: '2',
      type_liability_id: '117',
      municipality_id: '149',
      type_regime_id: '2',
    },
    payment_form: {
      payment_form_id: 1,
      payment_method_id: 10,
      payment_due_date: this.getCurrentDate(),
      duration_measure: '0',
    },
    legal_monetary_totals: {
      line_extension_amount: 5092.59,
      tax_exclusive_amount: 5092.59,
      tax_inclusive_amount: 5500,
      payable_amount: 6050,
      charge_total_amount: 550,
    },
    tax_totals: [
      {
        tax_id: '4',
        tax_amount: '407.41',
        taxable_amount: '5092.59',
        percent: '8.00',
      },
    ],
    invoice_lines: [
      {
        unit_measure_id: 70,
        invoiced_quantity: '1.00',
        line_extension_amount: 5092.59,
        free_of_charge_indicator: false,
        tax_totals: [
          {
            tax_id: '4',
            tax_amount: 407.41,
            taxable_amount: 5092.59,
            percent: '8.00',
          },
        ],
        allowance_charges: [
          {
            discount_id: '1',
            charge_indicator: false,
            allowance_charge_reason: 'DESCUENTO GENERAL',
            amount: 0,
            base_amount: 5092.59,
          },
        ],
        description: 'JUGO COROZO',
        notes: null,
        code: 'DAN0028',
        type_item_identification_id: 4,
        price_amount: '5092.59',
        base_quantity: '1.00',
      },
    ],
    allowance_charges: [
      {
        discount_id: 13,
        charge_indicator: true,
        allowance_charge_reason: 'PROPINAS U OTROS',
        amount: 550,
        base_amount: 5500,
      },
    ],
  };

  onHabilitarEeqdocs() {
    if (this.configSofwareTestIdFormEeqdocs.controls['testIdeqdocs'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un Test ID válido',
      });
      return;
    }

    if (this.configSofwareTestIdFormEeqdocs.controls['fNumber'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de factura válido',
      });
      return;
    }

    this.invoiceEeqdocs.number = this.sofwareEeqdocstestIdSettings_.fNumber;

    this.spinnerService.show();
    this.configurationAdminService
      .configHabEeqdocs(
        this.invoiceEeqdocs,
        this.sofwareEeqdocstestIdSettings_.testIdeqdocs,
        true
      )
      .subscribe(
        (res) => {
          console.log('configHabEeqdocs::', res);
          this.spinnerService.hide();
          const isValid =
            res.ResponseDian.Envelope.Body.SendBillSyncResponse
              .SendBillSyncResult.IsValid;

          ///console.log('isValid::', isValid);
          const StatusMessage =
            res.ResponseDian.Envelope.Body.SendBillSyncResponse
              .SendBillSyncResult.StatusMessage;

          if (isValid === 'true') {
            this.toastrService.success(StatusMessage, 'success Habilitar FE');
            this.isSaveHabEeqdocs = true;
            this.QRStrEeqdocs = this.formatQRStr(res.QRStr);
          } else {
            Swal.fire('Error!', StatusMessage, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire('Error!', 'Ha ocurrido un error al habilitar FE.', 'error');
        }
      );
  }

  /**
   *
   * Step 5
   *
   */

  isSaveSofwarePayroll: boolean = false;
  isSaveResolPayroll: boolean = false;
  isSaveResolPayrollNote: boolean = false;
  isSaveHabPayroll: boolean = false;

  sofwarePayrollSettings_: sofwarePayrollSettings = {
    idpayroll: '',
    pinpayroll: null,
  };

  configSofwareFormPayroll: FormGroup = new FormGroup({
    idpayroll: new FormControl('', []),
    pinpayroll: new FormControl('', []),
  });

  resolutionPayroll: resolution = {
    type_document_id: 9,
    prefix: 'NIM',
    from: 1,
    to: 99999999,
  };

  resolutionPayrollNote: resolution = {
    type_document_id: 10,
    prefix: 'NAM',
    from: 1,
    to: 99999999,
  };

  resolutionFormPayroll: FormGroup = new FormGroup({
    prefixPayroll: new FormControl('', [Validators.required]),
    fromPayroll: new FormControl('', [Validators.required]),
    toPayroll: new FormControl('', [Validators.required]),
  });

  resolutionFormPayrollNote: FormGroup = new FormGroup({
    prefixPayrollNote: new FormControl('', [Validators.required]),
    fromPayrollNote: new FormControl('', [Validators.required]),
    toPayrollNote: new FormControl('', [Validators.required]),
  });

  onconfigSofwareFormPayroll() {
    if (this.configSofwareFormPayroll.controls['idpayroll'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un ID de software válido',
      });
      return;
    }

    if (this.configSofwareFormPayroll.controls['pinpayroll'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un PIN válido',
      });
      return;
    }

    let data: sofwarePayrollSettingsData = {
      idpayroll: this.sofwarePayrollSettings_.idpayroll,
      pinpayroll: this.sofwarePayrollSettings_.pinpayroll!,
    };
    this.spinnerService.show();
    this.configurationAdminService.configSofwareFormPayroll(data).subscribe(
      (res) => {
        console.log(res);
        this.spinnerService.hide();
        if (res.success === true) {
          this.toastrService.success(res.message, 'success');
          this.isSaveSofwarePayroll = true;
        } else {
          this.toastrService.error(res.message, 'error');
        }
      },
      (error) => {
        console.log('error:::', error);
        this.spinnerService.hide();
        Swal.fire(
          'Error!',
          'Ha ocurrido un error al guardar la configuración.',
          'error'
        );
      }
    );
  }
  onConfigResolutionPayroll() {
    if (this.resolutionFormPayroll.controls['prefixPayroll'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un prefijo válido',
      });
      return;
    }

    if (this.resolutionFormPayroll.controls['fromPayroll'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango desde válido',
      });
      return;
    }

    if (this.resolutionFormPayroll.controls['toPayroll'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango hasta válido',
      });
      return;
    }

    this.spinnerService.show();
    this.configurationAdminService
      .configResolution(this.resolutionPayroll)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();

          if (res.success === true) {
            this.toastrService.success(
              res.message,
              'success Resolución Payroll'
            );
            this.isSaveResolPayroll = true;
          } else {
            this.toastrService.error(res.message, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al guardar la resolución Payroll.',
            'error'
          );
        }
      );
  }

  onConfigResolutionPayrollNote() {
    if (this.resolutionFormPayrollNote.controls['prefixPayrollNote'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un prefijo válido',
      });
      return;
    }

    if (this.resolutionFormPayrollNote.controls['fromPayrollNote'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango desde válido',
      });
      return;
    }

    if (this.resolutionFormPayrollNote.controls['toPayrollNote'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango hasta válido',
      });
      return;
    }

    this.spinnerService.show();
    this.configurationAdminService
      .configResolution(this.resolutionPayrollNote)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();

          if (res.success === true) {
            this.toastrService.success(
              res.message,
              'success Resolución Payroll Note'
            );
            this.isSaveResolPayrollNote = true;
          } else {
            this.toastrService.error(res.message, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al guardar la resolución Payroll Note.',
            'error'
          );
        }
      );
  }

  configSofwareTestIdFormPayroll: FormGroup = new FormGroup({
    testIdpayroll: new FormControl('', [Validators.required]),
    fNumber: new FormControl('', [Validators.required]),
    limit: new FormControl('', [Validators.required]),
  });

  sofwarePayrolltestIdSettings_: sofwarePayrolltestIdSettings = {
    testIdpayroll: '',
    fNumber: 1,
    limit: 4,
  };

  payroll: Payroll = {
    type_document_id: 9,
    head_note: null,
    foot_note:
      'Modalidad de Emision de Nomina Electronicas: SOFTWARE PROPIO - Fabricante Software: Danisoft sas - Nit: 900982478-4 - PgFacture®',
    novelty: {
      novelty: false,
      uuidnov: null,
    },
    period: {
      admision_date: this.getCurrentDate(),
      settlement_start_date: '2024-03-16',
      settlement_end_date: '2024-03-31',
      worked_time: '120.00',
      issue_date: this.getCurrentDate(),
    },
    sendmail: false,
    sendmailtome: false,
    worker_code: 'E00001',
    prefix: 'NIM',
    consecutive: 100,
    payroll_period_id: '4',
    notes: null,
    worker: {
      type_worker_id: 1,
      sub_type_worker_id: 1,
      payroll_type_document_identification_id: 3,
      municipality_id: 126,
      type_contract_id: 1,
      high_risk_pension: false,
      identification_number: 41946692,
      surname: 'CARDONA',
      second_surname: 'VILLADA',
      first_name: 'ELIZABETH',
      middle_name: null,
      address: 'BRR LIMONAR MZ 6 CS 3 ET 1',
      integral_salarary: false,
      salary: 1160000.0,
      email: 'admin@gmail.com',
    },
    payment: {
      payment_method_id: 10,
      bank_name: '',
      account_type: '',
      account_number: '',
    },
    payment_dates: [
      {
        payment_date: this.getCurrentDate(),
      },
    ],
    accrued: {
      worked_days: '15',
      salary: '580000.00',
      accrued_total: '661000.00',
      transportation_allowance: '81000.00',
    },
    deductions: {
      eps_type_law_deductions_id: 1,
      eps_deduction: '23200.00',
      pension_type_law_deductions_id: 5,
      pension_deduction: '23200.00',
      deductions_total: '46400.00',
    },
  };

  payrollAdjustment: PayrollAdjustment = {
    type_document_id: 10,
    head_note: null,
    foot_note: null,
    type_note: 1,
    predecessor: {
      predecessor_number: 1,
      predecessor_cune: '',
      predecessor_issue_date: this.getCurrentDate(),
    },
    period: {
      admision_date: this.getCurrentDate(),
      settlement_start_date: '2023-05-01',
      settlement_end_date: '2023-05-15',
      worked_time: '120.00',
      issue_date: this.getCurrentDate(),
    },
    sendmail: false,
    sendmailtome: false,
    worker_code: 'E00001',
    prefix: 'NAM',
    consecutive: 100,
    payroll_period_id: '4',
    notes: null,
    worker: {
      type_worker_id: 1,
      sub_type_worker_id: 1,
      payroll_type_document_identification_id: 3,
      municipality_id: 126,
      type_contract_id: 1,
      high_risk_pension: false,
      identification_number: 41946692,
      surname: 'CARDONA',
      second_surname: 'VILLADA',
      first_name: 'ELIZABETH',
      middle_name: null,
      address: 'BRR LIMONAR MZ 6 CS 3 ET 1',
      integral_salarary: false,
      salary: 1000000,
      email: 'admin@gmail.com',
    },
    payment: {
      payment_method_id: 42,
      bank_name: 'BANCO CAJA SOLCIAL',
      account_type: 'AHORRO',
      account_number: '1654564895',
    },
    payment_dates: [
      {
        payment_date: this.getCurrentDate(),
      },
    ],
    accrued: {
      worked_days: '15',
      salary: '500000.00',
      transportation_allowance: '58586.00',
      accrued_total: '518586.00',
    },
    deductions: {
      eps_type_law_deductions_id: 1,
      eps_deduction: '20000.00',
      pension_type_law_deductions_id: 5,
      pension_deduction: '20000.00',
      deductions_total: '40000.00',
    },
  };

  payrolls: any[] = [];
  payrollAdjustments: any[] = [];
  cufeArray: string[] = [];

  onHabilitarPayroll() {
    if (this.configSofwareTestIdFormPayroll.controls['testIdpayroll'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un Test ID válido',
      });
      return;
    }

    if (this.configSofwareTestIdFormPayroll.controls['fNumber'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de factura válido',
      });
      return;
    }

    if (this.configSofwareTestIdFormPayroll.controls['limit'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un número de documentos válidos',
      });
      return;
    }

    const payrollObservables = [];
    const { fNumber, limit } = this.sofwarePayrolltestIdSettings_;
    const prefix = this.resolutionPayroll.prefix;
    this.payroll.consecutive = fNumber;

    for (let i = 0; i < limit; i++) {
      const currentNumber = fNumber + i; // Número actual de recibo

      this.payroll.consecutive = currentNumber;
      this.payroll.prefix = prefix;

      this.spinnerService.show();

      payrollObservables.push(
        this.configurationAdminService
          .sendPayroll(
            this.payroll,
            this.sofwarePayrolltestIdSettings_.testIdpayroll,
            true
          )
          .toPromise()
          .then((res) => {
            console.log('Nómina enviada con éxito.', res);
            const isValid =
              res.ResponseDian.Envelope.Body.SendNominaSyncResponse
                .SendNominaSyncResult.IsValid;

            const StatusMessage =
              res.ResponseDian.Envelope.Body.SendNominaSyncResponse
                .SendNominaSyncResult.StatusMessage;

            if (isValid === 'true') {
              const cufe =
                res.ResponseDian.Envelope.Body.SendNominaSyncResponse
                  .SendNominaSyncResult.XmlDocumentKey;
              this.cufeArray.push(cufe); // Almacenar el CUFE en el array

              // Llenar el array con el prefijo, número, CUFE y tipo 'Nomina'
              this.payrolls.push({
                prefix,
                number: currentNumber,
                cufe,
                type: 'Nomina',
              });
            } else {
              Swal.fire('Error!', StatusMessage, 'error');
            }
          })
      );
    }

    // Cuando todas las nóminas hayan sido enviadas
    Promise.all(payrollObservables).then(() => {
      console.log('Todas las nóminas han sido enviadas');
      // Empezar a enviar los ajustes
      const firstCufe = this.cufeArray[0]; // Usar el primer CUFE para el ajuste
      const { fNumber, limit } = this.sofwarePayrolltestIdSettings_;
      const prefix = this.resolutionPayrollNote.prefix;

      this.payrollAdjustment.consecutive = fNumber;

      // Enviar `limit` nóminas de ajuste
      for (let i = 0; i < limit; i++) {
        const currentNumber = fNumber + i;
        this.payrollAdjustment.consecutive = currentNumber;
        this.payrollAdjustment.prefix = prefix;

        this.payrollAdjustment.predecessor.predecessor_cune = firstCufe; // Usar el primer CUFE

        this.configurationAdminService
          .sendPayrollAdjustment(
            this.payrollAdjustment,
            this.sofwarePayrolltestIdSettings_.testIdpayroll,
            true
          )
          .subscribe(
            (res) => {
              console.log('Nómina de ajuste enviada con éxito.', res);
              const isValid =
                res.ResponseDian.Envelope.Body.SendNominaSyncResponse
                  .SendNominaSyncResult.IsValid;

              const StatusMessage =
                res.ResponseDian.Envelope.Body.SendNominaSyncResponse
                  .SendNominaSyncResult.StatusMessage;

              if (isValid === 'true') {
                const cufe =
                  res.ResponseDian.Envelope.Body.SendNominaSyncResponse
                    .SendNominaSyncResult.XmlDocumentKey;
                this.cufeArray.push(cufe); // Almacenar el CUFE en el array

                // Llenar el array con el prefijo, número, CUFE y tipo 'Nomina'
                this.payrollAdjustments.push({
                  prefix,
                  number: currentNumber,
                  cufe: cufe,
                  type: 'Ajuste',
                });
              } else {
                Swal.fire('Error!', StatusMessage, 'error');
              }
            },
            (error) => {
              console.error('Error al enviar la nómina de ajuste:', error);
            }
          );
      }
    });
  }

  /**
   *
   * Step 6 Finalizar
   *
   */

  environmentSettings: EnvironmentSettings = {
    type_environment_id: 2, // Factura Electrónica
    payroll_type_environment_id: 2, // Nómina
    eqdocs_type_environment_id: 2, // Documentos Equivalentes
  };

  onCheckboxChange(type: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked; // Aseguramos que event.target es un HTMLInputElement

    const value = isChecked ? 1 : 2; // 1 para producción, 2 para pruebas

    if (type === 'type_environment_id') {
      this.environmentSettings.type_environment_id = value;
    } else if (type === 'payroll_type_environment_id') {
      this.environmentSettings.payroll_type_environment_id = value;
    } else if (type === 'eqdocs_type_environment_id') {
      this.environmentSettings.eqdocs_type_environment_id = value;
    }
  }

  onProduction() {
    this.spinnerService.show();
    this.configurationAdminService
      .configEnvironment(this.environmentSettings)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();
          this.toastrService.success(res.message, 'success');
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al guardar la configuración.',
            'error'
          );
        }
      );
  }

  resolutionForm: FormGroup = new FormGroup({
    type_document: new FormControl(''),
    prefixS: new FormControl('', [Validators.required]),
    resolutionS: new FormControl('', [Validators.required]),
    resolution_dateS: new FormControl('', [Validators.required]),
    technical_keyS: new FormControl(''),
    fromS: new FormControl('', [Validators.required]),
    toS: new FormControl('', [Validators.required]),
    generated_to_dateS: new FormControl('', [Validators.required]),
    date_fromS: new FormControl('', [Validators.required]),
    date_toS: new FormControl('', [Validators.required]),
  });

  type_document_: typeDocument[] = type_document;

  numberRangeResponses: NumberRangeResponseT[] = [];

  resolutionSelected: resolutionSave = {
    type_document: null,
    type_document_id: null,
    prefix: '',
    resolution: '',
    resolution_date: '2019-01-19',
    technical_key: '',
    from: null,
    to: null,
    generated_to_date: 0,
    date_from: '2019-01-19',
    date_to: '2030-01-19',
  };

  resolution_: resolution = {
    type_document_id: 0,
    prefix: '',
    from: 0,
    to: 0,
  };

  onConfigResolution() {
    if (this.resolutionForm.controls['prefixS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un prefijo válido',
      });
      return;
    }

    if (this.resolutionForm.controls['fromS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango desde válido',
      });
      return;
    }

    if (this.resolutionForm.controls['toS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese un rango hasta válido',
      });
      return;
    }

    if (this.resolutionForm.controls['resolutionS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una resolución válida',
      });
      return;
    }

    if (this.resolutionForm.controls['resolution_dateS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha de resolución válida',
      });
      return;
    }

    if (this.resolutionForm.controls['date_fromS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha desde válida',
      });
      return;
    }

    if (this.resolutionForm.controls['date_toS'].invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ingrese una fecha hasta válida',
      });
      return;
    }

    this.resolution_.type_document_id =
      this.resolutionSelected.type_document_id!;
    this.resolution_.prefix = this.resolutionSelected.prefix;
    this.resolution_.resolution = this.resolutionSelected.resolution;
    this.resolution_.resolution_date = this.resolutionSelected.resolution_date;

    if (this.resolutionSelected.technical_key != '') {
      this.resolution_.technical_key = this.resolutionSelected.technical_key;
    }
    this.resolution_.from = this.resolutionSelected.from!;
    this.resolution_.to = this.resolutionSelected.to!;
    this.resolution_.generated_to_date =
      this.resolutionSelected.generated_to_date;
    this.resolution_.date_from = this.resolutionSelected.date_from;
    this.resolution_.date_to = this.resolutionSelected.date_to;

    this.spinnerService.show();
    this.configurationAdminService
      .configResolution(this.resolution_!)
      .subscribe(
        (res) => {
          console.log(res);
          this.spinnerService.hide();

          if (res.success === true) {
            this.toastrService.success(res.message, 'success Resolución ');
            this.resolutionSelected = {
              type_document: null,
              type_document_id: null,
              prefix: '',
              resolution: '',
              resolution_date: '2019-01-19',
              technical_key: '',
              from: null,
              to: null,
              generated_to_date: 0,
              date_from: '2019-01-19',
              date_to: '2030-01-19',
            };
          } else {
            this.toastrService.error(res.message, 'error');
          }
        },
        (error) => {
          console.log('error::', error);
          this.spinnerService.hide();
          Swal.fire(
            'Error!',
            'Ha ocurrido un error al guardar la resolución',
            'error'
          );
        }
      );
  }

  @ViewChild('autoDocumento') autoDocumento: any;
  keyword_type_document = 'name';

  onFocusedTypeDocument(e: any) {
    this.autoDocumento.open();
    if (this.resolutionSelected.type_document_id == null) {
      this.autoDocumento.clear();
    } else {
      this.autoDocumento.close();
    }
  }
  onFocusTypeDocument(e: any) {
    this.autoDocumento.open();
  }
  selectTypeDocument(e: any) {
    this.resolutionSelected.type_document_id = e.id;
    this.resolutionSelected.type_document = e;
  }
  clearedTypeDocument(e: any) {
    this.resolutionSelected.type_document_id = null;
    this.resolutionSelected.type_document = null;
    this.autoIdentification.open();
  }

  IDSoftware: string = '';

  getNumberingRange() {
    this.numberRangeResponses = [];
    this.spinnerService.show();
    let data: SoftwareData = {
      IDSoftware: this.IDSoftware,
    };
    this.configurationAdminService.getNumberingRange(data).subscribe(
      (res) => {
        console.log(res);
        const responseList =
          res.ResponseDian.Envelope.Body.GetNumberingRangeResponse
            .GetNumberingRangeResult.ResponseList.NumberRangeResponse;

        // Verificar si es un array o un objeto
        if (Array.isArray(responseList)) {
          this.numberRangeResponses = responseList; // Es un array
        } else {
          this.numberRangeResponses = [responseList]; // Es un objeto, lo convertimos en un array
        }

        this.spinnerService.hide();
      },
      (error) => {
        console.log('error:::', error);
        this.spinnerService.hide();
        Swal.fire(
          'Error!',
          'Ha ocurrido un error al guardar la configuración.',
          'error'
        );
      }
    );
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.settingsCompany_.type_document_identification =
      type_document_identification;
    this.settingsCompany_.type_organization = type_organization;
    this.settingsCompany_.type_regime = type_regime;
    this.settingsCompany_.department = department;
    this.settingsCompany_.municipality = municipality;
    this.settingsCompany_.type_document = type_document;
    this.settingsCompany_.type_liability = type_liability;
  }
  StepPrevious() {
    let Step_ = this.Step;

    if (Step_ > 1) {
      // Marcar el paso actual como "is-wait"
      this.stepItems[Step_ - 1].status = 'is-wait';
      this.stepItems[Step_ - 1].selected = false;

      // Marcar el paso anterior como "is-process"
      this.stepItems[Step_ - 2].status = 'is-process';
      this.stepItems[Step_ - 2].selected = true;

      // Retroceder al paso anterior
      this.Step = Step_ - 1;
    }
  }

  StepNext() {
    let Step_ = this.Step;

    if (Step_ < this.stepItems.length) {
      // Marcar el paso actual como "is-wait"
      this.stepItems[Step_ - 1].status = 'is-wait';
      this.stepItems[Step_ - 1].selected = false;

      // Marcar el siguiente paso como "is-process"
      this.stepItems[Step_].status = 'is-process';
      this.stepItems[Step_].selected = true;

      // Avanzar al siguiente paso
      this.Step = Step_ + 1;
    }
  }

  StepFin() {
    // Restablecer todos los pasos a su estado inicial
    this.stepItems.forEach((step, index) => {
      step.status = 'is-wait'; // Cambiar el estado a "is-wait" para todos
      step.selected = false; // Deseleccionar todos los pasos
    });

    // Marcar el primer paso como "is-process" y seleccionado
    this.stepItems[0].status = 'is-process';
    this.stepItems[0].selected = true;

    // Volver al primer paso
    this.Step = 1;
    this.StepOne = false;
    //eliminamos pg-api-token del localstorage
    localStorage.removeItem('pg-api-token');
  }

  StepSelect(_step: number) {
    // no permitimos avanzar a otros pasos
    /* if (this.StepOne===false && _step > 1) {
      this.toastrService.error('Debes completar el primer paso antes de continuar.', 'Error');
      return; // Salir de la función si no existe el token
    } */

    // Restablecer todos los pasos a su estado inicial
    this.stepItems.forEach((step, index) => {
      step.status = 'is-wait'; // Cambiar el estado a "is-wait" para todos
      step.selected = false; // Deseleccionar todos los pasos
    });

    // Marcar el paso seleccionado como "is-process" y seleccionado
    this.stepItems[_step - 1].status = 'is-process'; // El índice es _step - 1 para coincidir con el array
    this.stepItems[_step - 1].selected = true;

    // Actualizar el valor de Step para reflejar el nuevo paso seleccionado
    this.Step = _step;
  }

  formatQRStr(QRStr: string): string {
    const lines = QRStr.trim().split('\n');
    const url = lines.pop()?.trim(); // Extrae el último elemento (URL)

    // Genera el HTML formateado
    return `
      <p>
      <strong>NumFac:</strong> ${lines[0].split(': ')[1]} <br>
      <strong>FecFac:</strong> ${lines[1].split(': ')[1]}<br>
      <strong>NitFac:</strong> ${lines[2].split(': ')[1]}<br>
      <strong>DocAdq:</strong> ${lines[3].split(': ')[1]}<br>
      <strong>ValFac:</strong> ${lines[4].split(': ')[1]}<br>
      <strong>ValIva:</strong> ${lines[5].split(': ')[1]}<br>
      <strong>ValOtroIm:</strong> ${lines[6].split(': ')[1]}<br>
      <strong>ValTotal:</strong> ${lines[7].split(': ')[1]}<br>
      <strong>CUFE:</strong> ${lines[8].split(': ')[1]}<br>
      <strong>Consulta el documento:</strong>
          <a href="${url}" target="_blank">Ver en DIAN</a>
      </p>
    `;
  }
}
