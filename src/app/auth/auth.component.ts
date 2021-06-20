import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  header: string;
  authFlow: string;
  seller: boolean;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authFlow!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData,
    public dialogRef: MatDialogRef<AuthComponent>,
  ) { }

  ngOnInit(): void {
    if(this.dialogData){
      this.authFlow = this.dialogData.authFlow
    }else{
      this.authFlow = 'Sign In'
    }
  }

  onAuthFlow(authFlow: string) {
    this.authFlow = authFlow;
    this.dialogData.header = authFlow ;
    if(authFlow === 'close'){
      this.dialogRef.close('Closed AuthFlow');
    }
  }

}
