import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGaurdGuard } from './../auth/auth-gaurd.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'details/:id/:name', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'tab4', canActivate: [AuthGaurdGuard], loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'tab5', canActivate: [AuthGaurdGuard], loadChildren: './tab5/tab5.module#Tab5PageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  {
    path: 'public',
    canActivate: [AuthGaurdGuard],
    loadChildren: './tabs/tabs.module#TabsPageModule'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
