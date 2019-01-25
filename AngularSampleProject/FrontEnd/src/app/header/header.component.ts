import { Component, OnInit } from '@angular/core';
import {AppService} from 'src/app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AppService]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AppService) { }

  ngOnInit() {
  }

}
