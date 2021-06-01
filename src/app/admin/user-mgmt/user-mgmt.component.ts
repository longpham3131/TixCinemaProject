import { UserMgmtResult } from '@/core/models/userMgmt';
import { UserMgmtService } from '@/core/services/user-mgmt.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.scss']
})
export class UserMgmtComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  userList: UserMgmtResult[] = [];
  constructor(private userMgmtService: UserMgmtService) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.userMgmtService.getUserList().subscribe({
      next: (result) =>{
        this.userList = result
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      },
      error: (error) =>{
        console.log(error)
      }
    })
    
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  
}
