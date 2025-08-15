import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

Injectable({ providedIn: 'root' })
export class CategoryService {
  
    private categoryUrl = 'http://localhost:8080/categories';

    constructor(private http: HttpClient){}

    getCategories(){
        return this.http.get(this.categoryUrl);
    }
}