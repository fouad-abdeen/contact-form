import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RoutesNames } from './names.routes';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: RoutesNames.english,
    pathMatch: 'full',
  },

  {
    path: RoutesNames.english,
    children: [
      {
        path: '',
        redirectTo: RoutesNames.main,
        pathMatch: 'full',
      },
      {
        path: RoutesNames.main,
        component: AppComponent,
      },
    ],
    data: { setLangAsAr: false },
  },

  {
    path: RoutesNames.arabic,
    children: [
      {
        path: '',
        redirectTo: RoutesNames.main,
        pathMatch: 'full',
      },
      {
        path: RoutesNames.main,
        component: AppComponent,
      },
    ],
    data: { setLangAsEn: false },
  },
];
