import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NgxDanisoftUtilsModule, UtilsDropzoneModule } from 'ngx-danisoft-utils';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesRoutes } from './pages.routing';
import { PagesComponent } from './pages.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { FooterComponent } from '../layouts/footer/footer.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { ConfigurationAdminComponent } from './configuration-admin/configuration-admin.component';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ConfigurationAdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDanisoftUtilsModule,
    SharedModule,
    LayoutsModule,
    RouterModule.forChild(PagesRoutes),
    UtilsDropzoneModule,
  ],
})
export class PagesModule {}
