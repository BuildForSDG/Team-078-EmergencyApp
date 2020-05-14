import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/user/auth.service";
import { LoadingController, AlertController } from "@ionic/angular";
@Component({
  selector: "app-admin-add-respondant",
  templateUrl: "./admin-add-respondant.page.html",
  styleUrls: ["./admin-add-respondant.page.scss"]
})
export class AdminAddRespondantPage implements OnInit {
  addReponderCredentials = {
    email: "",
    password: "",
    fullname: "",
    phone_number: "",
    address: "",
    respondant_type: "",
    respondant_unit: "",
    coordinates: ""
  };
  public loading: any;
  constructor(
    private _auth: AuthService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async adminAddResponder(): Promise<void> {
    this.loading = await this.loadingCtrl.create();
    await this.loading.present();
    this._auth
      .addResponder(
        this.addReponderCredentials.email,
        this.addReponderCredentials.password,
        this.addReponderCredentials.phone_number,
        this.addReponderCredentials.address,
        this.addReponderCredentials.respondant_type,
        this.addReponderCredentials.respondant_unit,
        this.addReponderCredentials.coordinates
      )
      .then(
        () => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: "Respondant Created",
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
          });

          this.addReponderCredentials = {
            email: "",
            password: "",
            fullname: "",
            phone_number: "",
            address: "",
            respondant_type: "",
            respondant_unit: "",
            coordinates: ""
          };
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
          });
        }
      );
  }
}
