import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.page.html',
  styleUrls: ['./get-help.page.scss'],
})
export class GetHelpPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitForm(){
    this.router.navigate(['/victim-confirm-loc-on-map']);
  }

}
