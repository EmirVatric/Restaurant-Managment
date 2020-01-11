Rails.application.routes.draw do
  root 'homepage#index'

  namespace :api do
    resources :categories, only: [:index]
    resources :tickets, only: [:index, :create, :update]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
