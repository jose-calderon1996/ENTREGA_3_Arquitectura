import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  comuna: string = '';
  direccion: string = '';
  rut: string = '';
  correo: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserData().subscribe(
      (data) => {
        this.nombre = data.nombre || '';
        this.comuna = data.comuna || '';
        this.direccion = data.direccion || '';
        this.rut = data.rut || '';
        this.correo = data.correo || '';
      },
      (error) => {
        console.error('Error al obtener datos del usuario:', error);
      }
    );
  }

  navegarEscaner() {
    this.router.navigate(['/escaner']);
  }

  async cerrarSesion() {
    try {
      await this.authService.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
}
