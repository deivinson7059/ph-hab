import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';
import { SidebarService } from 'src/app/core/services/sidebar.service';
import { environment } from 'src/environments/environment';
const { session } = environment;
@Component({
  selector: 'pg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  constructor(public sidebarService: SidebarService) {}
  session_=session;
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    feather.replace();
  }
}
