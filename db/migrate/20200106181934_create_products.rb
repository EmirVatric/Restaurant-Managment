class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string "name"
      t.text "declaration"
      t.float "price"
      t.integer "category_id"
      t.timestamps
    end
  end
end
