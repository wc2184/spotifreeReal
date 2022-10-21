require 'faker'
class Api::PlaylistsController < ApplicationController
    def index
        @playlists = Playlist.all

        render :index
    end

    def index_of_user
        @user = User.find(params[:user_id])
        
        render :index_of_user
    end

    def show

    end

    def create
        @playlist = Playlist.new(playlist_params)
        p '---- New playlist'
        p @playlist
        p '----'
        @playlist.title = Faker::Music.genre + " #" + (Playlist.all.size + 1).to_s
        # @playlist.title = @playlist.title + " #" + (Playlist.all.size + 1).to_s
        if @playlist.save
            p 'saved'
            p @playlist
        else
            p 'didnt save'
        end
        
        render :create
    end

    def update 

    end

    def destroy

    end

    def playlist_params
        params.require(:playlist).permit(:user_id, :title)
    end

    
end
