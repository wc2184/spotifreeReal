class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.references :playlist, foreign_key: true
      t.string :link, null: false
      t.integer :order, null: false

      t.timestamps
    end
  end
end
