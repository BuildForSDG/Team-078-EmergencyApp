import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-emergency-details',
  templateUrl: './emergency-details.page.html',
  styleUrls: ['./emergency-details.page.scss'],
})
export class EmergencyDetailsPage implements OnInit {
  constructor(private modalController: ModalController) { }

  @Input() public Number: string;
  @Input() public Time: string;
  @Input() public Location: string;

  ngOnInit() {
  }
  async closeModal() {
    await this.modalController.dismiss();
  }
}
