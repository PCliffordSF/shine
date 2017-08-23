Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "dashboard#index"

  get "customers/ng",                to: "customers#ng"
  get "customers/ng/*angular_route", to: "customers#ng"
  resources :customers, only: [ :index ]


end
