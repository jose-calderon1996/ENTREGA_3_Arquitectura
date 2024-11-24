import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-estudiantil',
  templateUrl: './registro-estudiantil.page.html',
  styleUrls: ['./registro-estudiantil.page.scss'],
})
export class RegistroEstudiantilPage {
  datosUsuario = {
    nombre: '',
    comuna: '',
    direccion: '',
    rut: '', // Campo actualizado
    correo: '',
    password: '',
    confirmarPassword: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  async registrarUsuario() {
    const { correo, password, confirmarPassword } = this.datosUsuario;

    if (password !== confirmarPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await this.authService.register(correo, password);

      if (userCredential.user) {
        const datosUsuario = {
          nombre: this.datosUsuario.nombre,
          comuna: this.datosUsuario.comuna,
          direccion: this.datosUsuario.direccion,
          rut: this.datosUsuario.rut, // Usar rut en lugar de fechaNacimiento
          correo: this.datosUsuario.correo,
        };

        await this.authService.saveUserData(userCredential.user.uid, datosUsuario);
        console.log('Registro exitoso, datos guardados');
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }
  goToHome() {
    this.router.navigate(['/home']);
  }
  
  
}
