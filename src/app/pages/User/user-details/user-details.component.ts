import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  id!: string;
  userData!: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || '';
  }
  ngOnInit(): void {
    this.getSingleUser(Number(this.id));
  }

  getSingleUser(id: number): void {
    this.userService.getSingleUser(id).subscribe({
      next: (res: any) => {
        this.userData = res.data;
      },
      error: () => {
        this.openSnackBar('User Not Found');
      },
    });
  }

  backToUsers(): void {
    this.router.navigateByUrl('/users');
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok');
  }
}
