import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  public name: FormControl = new FormControl('', [Validators.required]);
  public description: FormControl = new FormControl();
  public alterEgo: FormControl = new FormControl('', [Validators.required]);

  public heroForm!: FormGroup;


  constructor(
    private heroSrv: HeroService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: this.name,
      description: this.description,
      alterEgo: this.alterEgo
    });
    this.heroId = this.activatedroute.snapshot.paramMap.get("id");
    if (this.heroId) {
      this.heroSrv.getHeroById(this.heroId).subscribe(hero => {
        if (hero) {
          this.name.setValue(hero.name);
          this.description.setValue(hero.description);
          this.alterEgo.setValue(hero.alterEgo);
        }
      });
    }
  }

  createHero(): void {
    const id = this.heroId ? this.heroId : `${this.name.value}-${Math.floor(Math.random() * 100)}`;
    const newHero: Hero = {
      id: id,
      name: this.name.value,
      description: this.description.value,
      alterEgo: this.alterEgo.value
    }
    this.heroSrv.setHero(newHero).subscribe(() => {
      this.router.navigateByUrl("/hero-list")
    });
  }



}
