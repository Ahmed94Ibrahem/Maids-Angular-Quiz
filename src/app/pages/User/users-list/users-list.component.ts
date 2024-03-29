import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User, UserResponse } from '../../../core/interfaces/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  currentPage: number = 1;
  usersTotal!: number;
  filteredUsersList: User[] = [];
  itemsPerPage!: number;
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUsersList(this.currentPage);
  }

  getUsersList(pageNumber: number): void {
    this.userService.getUsers(pageNumber).subscribe({
      next: (users: UserResponse) => {
        this.usersList = users.data;
        this.usersTotal = users.total;
        this.itemsPerPage = users.per_page;
        this.filteredUsersList = this.usersList;
      },
      error: () => {
        this.openSnackBar('Something Went Wrong');
      },
    });
  }

  pageChanged(event: any): void {
    if (event.pageIndex > event.previousPageIndex) {
      this.currentPage = this.currentPage + 1;
      this.getUsersList(this.currentPage);
    } else {
      this.currentPage = this.currentPage - 1;
      this.getUsersList(this.currentPage);
    }
  }

  onSearch(event: any): void {
    const id = event.target.value;
    if (id) {
      this.filteredUsersList = this.usersList.filter(
        (user) => user.id === Number(id)
      );
    } else {
      this.filteredUsersList = this.usersList;
    }
  }

  navigateToUserDetails(id: number): void {
    this.router.navigateByUrl(`users/${id}`);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Ok');
  }
}
