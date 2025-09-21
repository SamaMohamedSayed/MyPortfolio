import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [{ path: '', loadChildren: () => import('./main-pages/main-pages.module').then(m => m.MainPagesModule) }, 
  ...(environment.enableDashboard? [
        {
          path: 'dashboard',
          loadChildren: () =>
            import('./dashboard/dashboard.module').then(
              m => m.DashboardModule
            )
        }]: [])]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
