import "hello_angular/polyfills";

import { Component, NgModule    } from "@angular/core";
import { BrowserModule          } from "@angular/platform-browser";
import { FormsModule            } from "@angular/forms";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Http,HttpModule        } from "@angular/http";


var CustomerSearchComponent = Component({
  selector: "shine-customer-search",
  template: '\
<header> \
  <h1 class="h2">Customer Search</h1> \
</header> \
<section class="search-form"> \
  <form> \
    <label for="keywords" class="sr-only">Keywords></label> \
    <input type="text" id="keywords" name="keywords" \
           placeholder="First Name, Last Name, or Email Address"\
           bind-ngModel="keywords" \
           on-ngModelChange="search($event)" \
           class="form-control input-lg">\
  </form> \
</section> \
<section class="search-results"> \
  <header> \
    <h1 class="h3">Results</h1> \
  </header> \
  <ol class="list-group"> \
    <li *ngFor="let customer of customers" \
      class="list-group-item clearfix"> \
      <h3 class="pull-right"> \
        <small class="text-uppercase">Joined</small> \
        {{customer.created_at}} \
      </h3> \
      <h2 class="h3"> \
        {{customer.first_name}} {{customer.last_name}} \
        <small>{{customer.username}}</small> \
      </h2> \
      <h4>{{customer.email}}</h4> \
    </li> \
  </ol> \
</section> \
  '
}).Class({
  constructor: [
    Http,
    function(http) {
      this.customers = null;
      this.http      = http;
      this.keywords  = "";
    }
  ],
  search: function($event) {
    var self = this;
    self.keywords = $event;
    if (self.keywords.length < 3) {
      return;
    }
    self.http.get(
      "/customers.json?keywords=" + self.keywords
    ).subscribe(
      function(response) {
        self.customers = response.json().customers;
      },
      function(response) {
        window.alert(response);
      }
    );
  }
});

var CustomerAppModule = NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule ],
  declarations: [ CustomerSearchComponent ],
  bootstrap:    [ CustomerSearchComponent ]
})
.Class({
  constructor: function() {}
});

platformBrowserDynamic().bootstrapModule(CustomerAppModule);
