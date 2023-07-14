import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, HEROES_API } from '../constants/api';

import { Hero } from '../models/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroes: Hero[] = [];

  constructor(private http: HttpClient) { }

  /**
   * We only call the http get heroes the first time to improve performance
   * @returns observable with the list of heroes
   */
  getHeroes(): Observable<Hero[]> {
    let heroesObs: Observable<Hero[]>;
    if (this.heroes?.length) {
      heroesObs = of(this.heroes);
    } else {
      heroesObs = this.http.get<any>(`${BASE_URL}${HEROES_API}`)
        .pipe(
          map(data => {
            console.log("data: ", data);
            console.log("data.heroes: ", data.heroes);

            this.heroes = data.heroes;
            console.log("this.heroes: ", this.heroes);
            
            return data.heroes;
          })
        );
    }
    return heroesObs;
  }

  /**
   * function to get a hero by its id
   * @param id the id of the hero to find
   * @returns an observable with the hero or undefined if the hero doesnt exist
   */
  getHeroById(id: string): Observable<Hero | undefined> {
    const heroesObs: Observable<Hero[]> = this.getHeroes();
    return heroesObs.pipe(
      map(heroes => {
        return heroes.find(heroe => heroe.id === id);
      })
    )
  }

  /**
   * Function to get a list of heroes by their names
   * @param name the name of a super hero
   * @returns observable with all the super heroes that contains that name
   */
  getHeroByName(name: string): Observable<Hero[]> {
    const heroesObs: Observable<Hero[]> = this.getHeroes();
    return heroesObs.pipe(
      map(heroes => {
        heroes = heroes.filter((heroe) => {
          return heroe.name.toLowerCase().includes(name.toLowerCase());
        });
        return heroes;
      })
    )
  }

  /**
   * Function to set an existing hero or to create a new one
   * @param hero the hero to set / create
   * @returns the hero setted / created
   */
  setHero(hero: Hero): Observable<Hero> {
    const heroToSetObs: Observable<Hero | undefined> = this.getHeroById(hero.id);
    return heroToSetObs.pipe(
      map(heroToSet => {
        if (!heroToSet) {
          this.heroes?.push(hero)
        } else {
          this.heroes = this.heroes?.map(heroFinded => {
            if (heroFinded.id === hero.id) {
              return hero;
            } else {
              return heroFinded;
            }
          });
        }
        return hero;
      })
    );
  }

  /**
   * function to remove a hero by id
   * @param id the id of the hero to remove
   * @returns the new list of heroes
   */
  removeHero(id: string): Observable<Hero[]> {
    const heroToRemoveObs: Observable<Hero | undefined> = this.getHeroById(id);
    return heroToRemoveObs.pipe(
      map(heroToRemove => {
        let heroes: Hero[] = this.heroes;
        if (heroToRemove) {
          this.heroes = this.heroes?.filter(hero => {
            return hero.id !== id;
          });
          heroes = this.heroes;
        } 
        return heroes;
      })
    );
  }

}
