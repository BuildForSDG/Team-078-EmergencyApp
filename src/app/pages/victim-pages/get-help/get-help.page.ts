import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-get-help',
  templateUrl: './get-help.page.html',
  styleUrls: ['./get-help.page.scss'],
})
export class GetHelpPage implements OnInit {
  
  userInfo = {
    emmergency: '',
    address: '',
    phone_number:'',
    victim_id : ''
  };
  constructor(private router: Router) { 
    firebase.auth().onAuthStateChanged(user => { 
      if (user) { 
        //user is active
        this.userInfo.victim_id = user.uid;
      }else{
        //there is no user, perform anonymous login 
        //we leave this part bllank for now because
        //anonymous ogin would have been performed on the user-welcome page
        //before ever getting here
       
      }
    });
  }

  ngOnInit() {
  }
  
  submitForm(){
    
    let navigationExtras: NavigationExtras = {
      state: {
        userInfo: this.userInfo
      }
    }; 
    this.router.navigate(['/victim-confirm-loc-on-map'], navigationExtras);
  }

}
