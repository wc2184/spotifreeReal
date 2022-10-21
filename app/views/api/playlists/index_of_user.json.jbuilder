json.array! @user.playlists do |playlist|
    json.merge! playlist.attributes
    # essentially does extract with all attributes
end