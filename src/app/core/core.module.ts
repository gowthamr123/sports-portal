import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
// import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PlayersModule } from '../players/players.module';
// import { AuthService } from '../auth/auth.service';
// import { DataStorageService } from '../shared/data-storage.service';
// import { RecipeService } from '../recipes/recipe.service';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PlayersModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
   
  ]
})
export class CoreModule {}
