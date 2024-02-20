import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  profile: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
  // Chama um metodo específico para carregar o perfil do usuario
    this.loadUserProfileFromState(); 
  }

  // Carrega o perfil do usuário a partir do estado de navegação atual, se disponivel.
  loadUserProfileFromState() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation && navigation.extras && navigation.extras.state) {
      const userProfile = navigation.extras.state['userProfile'];
      this.profile = userProfile;
    }
  }

  // Efetua o logout do usuario.
  async logout() {
    this.authService.logout(); 
    this.navigateToHomePage(); 
  }

  // Navega para a pagina inicial.
  navigateToHomePage() {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
