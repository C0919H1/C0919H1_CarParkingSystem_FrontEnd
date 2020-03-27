import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule,AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { httpInterceptorProviders } from './auth/auth-interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatPaginatorIntl } from '@angular/material';
import { getDutchPaginatorIntl } from './dutch-paginator-intl';
import { PlugingFbGgModule } from './pluging-fb-gg.module';

const config = new AuthServiceConfig([
  {
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider("468883515766-mv38kotqlr89rt4lc91jpdpmh4lj2bb1.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("204574167620618")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PlugingFbGgModule,
    SocialLoginModule
  ],

  providers: [
    { provide: MatPaginatorIntl, 
      useValue: getDutchPaginatorIntl() 
    },
    { provide: AuthServiceConfig, 
      useFactory: provideConfig
    },
    httpInterceptorProviders,
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
