import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{
  recipesChanged = new Subject<Recipe[]>();

    //private recipes: Recipe[] = [
     //   new Recipe('Test1','Desc1','https://i.kym-cdn.com/photos/images/original/002/229/946/37e.png',[new Ingredient('Meat',1), new Ingredient('Fries', 20)]),
    //    new Recipe('Test2','Desc2','https://i.kym-cdn.com/photos/images/original/002/229/946/37e.png',[new Ingredient('Buns',2), new Ingredient('Meat', 1)]),
    //  ];

    private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index:number, newRecipe:Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}