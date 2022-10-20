Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create do 
      resources :playlists, only: :index, action: :index_of_user
    end
    resource :session, only: [:show, :create, :destroy]
    resources :playlists, only: [:index, :show, :create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end

