json.array! @playlists do |playlist|
    # json.extract! playlist, :id, :title, :user_id
    
    # json.set! playlist.id do 
        json.merge! playlist.attributes
    # end

end