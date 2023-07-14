import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from '../../services/hero.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  public heroes: Hero[] = [];
  public heroesFiltered: Hero[] = [];
  public heroesToShow: Hero[] = [];

  public pageIndex: number = 0;
  public pageSize: number = 2;

  public heroName: string = "";

  constructor(
    private heroSrv: HeroService,
    private dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.heroSrv.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
      this.heroesFiltered = heroes;
      this.filterHeroes();
    });
  }

  handlePageEvent(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.filterHeroes();
  }

  filterHeroes(): void {
    const firstPosition = this.pageIndex * this.pageSize;
    const lastPosition = firstPosition + this.pageSize;
    this.heroesToShow = this.heroesFiltered.slice(firstPosition, lastPosition);
  }

  filterList(init?: boolean): void {
    if (init) {
      this.heroName = "";
    }
    this.heroSrv.getHeroByName(this.heroName).subscribe((heroes)=> {
      this.heroesFiltered = heroes;
      this.filterHeroes();
    });
  }

  deleteHero(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroSrv.removeHero(id).subscribe((newHeroesList) => {
          this.heroes = newHeroesList;
          this.heroesFiltered = newHeroesList;
          this.filterHeroes();
        });
      }
    });
  }

  editHero(id: string): void {
    this.router.navigate(['/hero-edit', id])
  }

}
