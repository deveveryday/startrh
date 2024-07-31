import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, first } from 'rxjs/operators';
import { AccountService } from '../service/account.service';
import { User } from '../model/users.model';
import { Login } from '../model/login.model';


@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    users: User[] = []
    userSubject: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        if (this.accountService.userValue) {
            this.router.navigateByUrl('filmes');
        }
        
    }

 
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;


        if (this.form.invalid) {
            return;
        }

        this.loading = true;

        //localStorage.setItem('user', JSON.stringify(user));
        //this.userSubject.next(user);
        // this.router.navigateByUrl('dashboard').then(() => {
           
        // });
        // this.router.navigate(['/dashboard', { id: 1 }]);
        //this.router.navigateByUrl('dashboard');
        const login: Login = {
            login: this.f.username.value,
            pass: this.f.password.value
        }
        this.accountService.login(login)
            .pipe(first())
            .subscribe({
                next: () => {
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl('filmes').then(() => {
                        window.location.reload();
                      });;
                },
                error: error => {
                    this.loading = false;
                }
            });
    }
}