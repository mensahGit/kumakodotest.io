import {Injectable} from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {Business} from '../Business';
import {Category} from '../Category';

@Injectable()
export class FirebaseService{
    businesses: FirebaseListObservable<Business[]>;
    categories: FirebaseListObservable<Category[]>;

    constructor(private _af: AngularFireDatabase){

    }

    getBusinesses(category:string = null){
        if(category != null){
            this.businesses = this._af.list('/businesses', {
                query: {
                    orderByChild: 'category',
                    equalTo: category
                }
            }) as
            FirebaseListObservable<Business[]>
        } else {
            this.businesses = this._af.list('/businesses') as
            FirebaseListObservable<Business[]>
        }

        return this.businesses;
    }

    getCategories(){
        this.categories = this._af.list('/categories') as
        FirebaseListObservable<Category[]>
        return this.categories;
    }

    addBusiness(newBusiness){
        return this.businesses.push(newBusiness);
    }

    updateBusiness(key, updBusiness){
        return this.businesses.update(key, updBusiness);
    }

    deleteBusiness(key){
        return this.businesses.remove(key);
    }

    
}

