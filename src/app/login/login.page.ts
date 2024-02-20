import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;
  showRegisterFields: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
  ) { }

  
  // Método para acessar o campo de e-mail do formulário
  get email() {
    return this.credentials.get('email');
  }

  // Método para acessar o campo de senha do formulário
  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    // Inicialização do formulário com validações
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required], 
      plan: ['', Validators.required] 
    });
  }

  // Método para registrar
  async register() {

    const userProfile = this.credentials.value;
  
    const loading = await this.loadingController.create();
    await loading.present();
  
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();
  
    if (user) {
      this.router.navigateByUrl('/home', { state: { userProfile } });
    } else {
      this.showAlert('Login Failed', 'Please Try Again');
    }
  }

  // Método de login
  async login() {

    const loading = await this.loadingController.create();
    await loading.present();

    if (this.email && this.password) {
      const user = await this.authService.login({ email: this.email.value, password: this.password.value });
      await loading.dismiss();

      if (user) {
        this.router.navigateByUrl('/home', { replaceUrl: true });
      } else {
        this.showAlert('Login Failed', 'Please Try Again');
      }
    }
  }

  // Método que exibe o alert
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
