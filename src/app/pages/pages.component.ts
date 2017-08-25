import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {
  private opened: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  private openNav() {
    this.opened = true;
  }

  private closeNav(){
    this.opened = false;
  }
}
