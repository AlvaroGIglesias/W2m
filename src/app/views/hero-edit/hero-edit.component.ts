import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Hero } from 'src/app/models/hero.model';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.scss']
})
export class HeroEditComponent implements OnInit {

  private heroId: string | null = "";
  public heroName: string = "";
  public description: string | undefined = "";
  public alterEgo: string = "";


  constructor(
    private heroSrv: HeroService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroId = this.activatedroute.snapshot.paramMap.get("id");
    if (this.heroId) {
      this.heroSrv.getHeroById(this.heroId).subscribe(hero => {
        if (hero) {
          this.heroName = hero.name;
          this.description = hero.description;
          this.alterEgo = hero.alterEgo;
        }
      });
    }
  }

  createHero(): void {
    const newHero: Hero = {
      id: this.heroId ? this.heroId : `${this.heroName}-${Math.floor(Math.random() * 100)}`,
      name: this.heroName,
      description: this.description,
      alterEgo: this.alterEgo
    }
    this.heroSrv.setHero(newHero).subscribe(() => {
      this.router.navigateByUrl("/hero-list")
    });
  }

  

}
