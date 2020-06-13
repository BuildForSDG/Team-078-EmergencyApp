import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-victim-review-page',
  templateUrl: './victim-review-page.page.html',
  styleUrls: ['./victim-review-page.page.scss'],
})
export class VictimReviewPagePage implements OnInit {

  constructor(private modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
