import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersComponent } from './players.component';
import { GroupByPipe } from './group-by.pipe';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularDraggableModule } from 'angular2-draggable';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularDraggableModule
  ],
  declarations: [PlayersComponent, GroupByPipe, PlayerEditComponent],
  exports: [
    PlayersComponent
  ]
})
export class PlayersModule { }
