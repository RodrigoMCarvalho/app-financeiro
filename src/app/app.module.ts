import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from './in-memory-database';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
