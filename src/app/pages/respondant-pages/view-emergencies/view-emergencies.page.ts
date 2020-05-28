import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmergencyDetailsPage } from '../emergency-details/emergency-details.page';
@Component({
  selector: 'app-view-emergencies',
  templateUrl: './view-emergencies.page.html',
  styleUrls: ['./view-emergencies.page.scss'],
})
export class ViewEmergenciesPage implements OnInit {

  // Store values from emergencyList
  @Input() Number = '098765431';
  @Input() Time = 'Mon 12 Dec, 2020';
  @Input() Location = 'National Industrial Court Nigeria 6th Lugard Ave, GRA, Enugu.';
  public Response: string;

  constructor(private modalController: ModalController) { }
  async openModal() {
    const modal = await this.modalController.create({
      component: EmergencyDetailsPage,
      componentProps: {
        Number:  this.Number,
        Time: this.Time,
        Location: this.Location
      }
    });
    // return response from modal
    modal.onWillDismiss().then(dataReturned => {
      this.Response = dataReturned.data;
    });

    return await modal.present();
  }

  ngOnInit() {
  }

}

