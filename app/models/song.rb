# == Schema Information
#
# Table name: songs
#
#  id          :bigint           not null, primary key
#  playlist_id :bigint
#  link        :string           not null
#  order       :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Song < ApplicationRecord
    validates :link, :order, presence: true

    belongs_to :playlist
end
