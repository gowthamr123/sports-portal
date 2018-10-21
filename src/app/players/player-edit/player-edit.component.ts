import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../_services/data.service';
import { Players } from '../../models/players.model';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../_services/authenticate.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit, OnChanges {

  @Input() selectedPlayer: any;

  playerForm: FormGroup
  disableTextBox = 'readonly';
  editMode:boolean = true;
  localUrl = '';
  isUserAdmin: boolean = false;
  errorMessage: string = '';

  constructor(private dataService: DataService, private auth: AuthenticateService, private router:Router, private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.isUserAdmin = this.auth.isUserAdmin();
    this.initForm(this.selectedPlayer);
    // this.dataService.getPlayersList().subscribe(
    //   (data: Players[]) => {
    //     this.dataService.setPlayersData(data);
    //   }
    // );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedPlayer = changes.selectedPlayer.currentValue;
    this.editMode = true;
    this.disableTextBox = 'readonly';
    this.initForm(this.selectedPlayer);
  }

  initForm(selectedPlayer?) {
    let playerName = '';
    let playerCountry = '';
    let playerRole = '';
    let playerPhoto = '';

    if(this.editMode) {
      playerName = selectedPlayer.name;
      playerCountry = selectedPlayer.country;
      playerRole = selectedPlayer.role;
      playerPhoto = selectedPlayer.photo;

      this.playerForm = new FormGroup({
        'name': new FormControl(playerName, Validators.required),
        'country': new FormControl(playerCountry, Validators.required),
        'role': new FormControl(playerRole, Validators.required),
        'photo': new FormControl(playerPhoto),
  
      });
    } else {
      this.playerForm = new FormGroup({
        'name': new FormControl(playerName, Validators.required),
        'country': new FormControl(playerCountry, Validators.required),
        'role': new FormControl(playerRole, Validators.required),
        'photo': new FormControl(null, Validators.required),
      });
    }

    

  }

  onSubmit() {
    if (this.editMode) {
      this.dataService.updatePlayersData(this.selectedPlayer.index, this.playerForm.value).subscribe(
        (data: Response) => {
          if (data) {
            this.dataService.playersUpdated.emit(this.dataService.playersData);
            this.editMode = true;
            this.disableTextBox = 'readonly';
            this.selectedPlayer = this.playerForm.value;
            this.initForm(this.selectedPlayer);
          }
        },
        error => {
          this.errorMessage = error;
        }
      );
    } else {
      this.dataService.addNewPlayer(this.playerForm.value).subscribe(
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

  }

  enableTextBox()
  {
    if(this.isUserAdmin) {
      this.disableTextBox = '';
    }
  }

  modifyMode() {
    this.enableTextBox();
    this.editMode = false;
    this.initForm();
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        this.playerForm.patchValue({
          file: reader.result
       });
      
        this.changeDetector.markForCheck();
      };
    }
  }



}
