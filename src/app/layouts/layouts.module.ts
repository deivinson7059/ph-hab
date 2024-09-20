import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Page404Component } from './errors/page404/page404.component';



@NgModule({
  declarations: [
    Page404Component,
  ],
  imports: [CommonModule, RouterModule],
})
export class LayoutsModule {}
