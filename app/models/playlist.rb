# == Schema Information
#
# Table name: playlists
#
#  id          :bigint           not null, primary key
#  user_id     :bigint
#  title       :string           not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Playlist < ApplicationRecord
    validates :title, presence: true

    belongs_to :user
    
    has_many :songs
end
