Rails.application.routes.draw do
  resources :profiles
  resources :books, only: [:index, :show, :create, :update, :destroy] do
    post 'upload', on: :collection
  end
  resources :transactions, only: [:new, :create, :index]
  post '/transactions', to: 'transactions#create'
  get '/transactions/new', to: 'transactions#new'
  get '/transactions/:id/confirm', to: 'transactions#confirm', as: 'confirm_transaction'

  get '/users', to: 'users#index'


  # Routes for users
  resources :users, only: [:create]
  post '/login', to: 'users#login'
end
