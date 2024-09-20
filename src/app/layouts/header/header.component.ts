import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as feather from 'feather-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

import Swal from 'sweetalert2';

const { session } = environment;

@Component({
  selector: 'pg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  img_user: string = `https://plataforma.pgfacture.com/pg-admin/include/img/profile.png`;
  username: string = session.name;
  email: string = session.email;

  constructor(
    private authService: AuthService,
    private router: Router //public sidebarService: SidebarService, //private authenticationservice: AuthenticationService, //public websocketservice: WebsocketService
  ) {}

  toogleSidebar() {
    // Toggle the side navigation
    document.body.classList.toggle('sidenav-toggled');

    let sidebarToggle: boolean =
      document.body.classList.contains('sidenav-toggled');

    localStorage.setItem('pg|sidebar-toggle', sidebarToggle.toString());
  }

  isStorageSidebarToggle() {
    return localStorage.getItem('pg|sidebar-toggle') === 'true';
  }

  ngOnInit(): void {
    if (this.isStorageSidebarToggle()) {
      document.body.classList.add('sidenav-toggled');
    } else {
      document.body.classList.remove('sidenav-toggled');
    }
  }
  ngAfterViewInit(): void {
    feather.replace();
  }
  logout() {
    Swal.fire({
      title: '¿Cerrar Sesión?',
      text: '¿Confirmas que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'CANCELAR',
      confirmButtonText: 'CERRAR SESIÓN',
    }).then((result) => {
      if (result.value) {
        this.authService.logout();
      }
    });
  }
}
