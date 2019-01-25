import 'rxjs/add/operator/switchMap';
import { Component, OnInit, Injector}  from '@angular/core';
import { AppService }                   from 'src/app/app.service';
import { ActivatedRoute, Router }       from '@angular/router';
import { Location }                     from '@angular/common';
import { FormBuilder }                  from '@angular/forms';
import { ToastrService }                from 'ngx-toastr';


@Component({
    selector:'User',
    templateUrl:'user.component.html',
    styleUrls:['./user.component.css'],
})
export class UserComponent implements OnInit {
    app;
    errorMessage:any;
    totalRec : number;
    private userId = 1;
    WRN_PROFILE_DELETE: any;
    selectedAll:any;

  constructor(private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder,
    private toastr: ToastrService){}

  

  ngOnInit(){
    this.getApps();
  }

  getApps(){
    this.appService.getApps().subscribe(app=>{
      this.app=app;
      this.totalRec = this.app.currentpage,
        data=>this.app=data,
        error=> {debugger;
        this.errorMessage=error
        alert(this.errorMessage)}
      }
    )
  }

  remove(app){
    this.appService.remove(app.id)
    .subscribe(response=>{
    let index = this.app.indexOf(app);
    this.app.splice(index,1);
    this.toastr.success('Deleted successfully!');
    })
  }


  update(id: string):void {
    console.log(JSON.stringify(id));
    console.log(id)
    this.router.navigate(['/Edit', id]);
  }




}