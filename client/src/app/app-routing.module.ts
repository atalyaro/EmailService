import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './components/inbox/inbox.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NewMailComponent } from './components/new-mail/new-mail.component';
import { Page404Component } from './components/page404/page404.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SentComponent } from './components/sent/sent.component';
import { LoggedGuard } from './guards/logged.guard';
import { UnloggedGuard } from './guards/unlogged.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [UnloggedGuard] },
  { path: "register", component: RegisterComponent, canActivate: [UnloggedGuard] },
  {
    path: "main", component: MainComponent, canActivate: [LoggedGuard],
    children: [
      { path: "inbox", component: InboxComponent },
      { path: "profile", component: ProfileComponent },
      { path: "sent", component: SentComponent },
      { path: "newmail", component: NewMailComponent },
      { path: "**", redirectTo: "inbox" },
    ]

  },
  { path: "", pathMatch: "full", redirectTo: "main" },
  { path: "**", component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
