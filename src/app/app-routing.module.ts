import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Importa la guard

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cambio-pass',
    loadChildren: () => import('./cambio-pass/cambio-pass.module').then((m) => m.CambioPassPageModule),
    canActivate: [AuthGuard], // Protege la ruta
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then((m) => m.PerfilPageModule),
    canActivate: [AuthGuard], // Protege la ruta
  },
  {
    path: 'registro-estudiantil',
    loadChildren: () =>
      import('./registro-estudiantil/registro-estudiantil.module').then((m) => m.RegistroEstudiantilPageModule),
  },
  {
    path: 'scanner-qr',
    loadChildren: () => import('./scanner-qr/scanner-qr.module').then((m) => m.ScannerQrPageModule),
    canActivate: [AuthGuard], // Protege la ruta
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
