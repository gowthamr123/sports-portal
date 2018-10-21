import { Component, OnInit, AfterViewInit, AfterViewChecked, ViewChild, OnDestroy } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Players } from '../models/players.model';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { Router } from '@angular/router';
import { AuthenticateService } from '../_services/authenticate.service';
import { Subscription } from 'rxjs';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  data: Players[] = [];
  playerData: any = '';
  deletePlayerIndex: number;
  isAdminUser: boolean = false;
  errorMessage: string = '';
  subscription: Subscription

  constructor(private dataService: DataService, private auth: AuthenticateService, private router: Router) {
  }

  ngOnInit() {
    this.isAdminUser = this.auth.isUserAdmin();
    this.dataService.getPlayersList().subscribe(
      (data: Players[]) => {
        this.data = data;
        this.dataService.setPlayersData(data);
      },
      error => {
        this.errorMessage = error;
      }
    );

    this.subscription = this.dataService.playersUpdated.subscribe(
      (data: Players[]) => {
        if (data) {
          this.data = data;
          this.dataService.setPlayersData(data);
          this.ngOnInit();

        }
      }
    )
  }

  setPlayerData(data: any) {
    this.playerData = data;
  }

  setDeletePlayerIndex(index) {
    this.deletePlayerIndex = index;
  }

  ngAfterViewChecked() {
    var self = this;
    $(".list-group-tree").on('click', "[data-toggle=collapse]", function () {
      $(this).next(".list-group.collapse").collapse('toggle');
    })
    if (this.isAdminUser) {
      $.contextMenu({
        selector: '.context-menu-one',
        callback: function (key, options) {
          self.deletePlayer();
        },
        items: {
          "delete": { name: "Delete", icon: "delete" },
        }
      });
    }


  }

  deletePlayer() {
    this.dataService.deletePlayer(this.deletePlayerIndex).subscribe(
      (data: Response) => {
        if (data) {
          location.reload(true);
        }
      },
      error => {
        this.errorMessage = error;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
