import { Injectable } from "@angular/core";
import { Menu } from "../interfaces/generic.interface";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  constructor() {
    this.cargarMenu();
  }
  dynamic: string = "activity";
  menu: Menu[] = [];

  cargarMenu(): Menu[] | [] {
    return (this.menu = [
      {
        titulo: 'Configuración',
        id: 'menu2',
        icono: 'settings',
        _id: 2,
        bre_id: 102,
        breadcrumbs: [],
        submenu: [
          {
            titulo: 'Habilitar Empresa',
            subtitle: 'Tu información personal',
            url: '/admin/configuration_admin',
            urlImagen: 'assets/images/perfil.png',
            isNew: true,
            _id: 21,
            bre_id: 121,
            breadcrumbs: [],
          }
        ],
      },
    ]);
  }
}
