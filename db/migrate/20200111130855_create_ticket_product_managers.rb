class CreateTicketProductManagers < ActiveRecord::Migration[6.0]
  def change
    create_table :ticket_product_managers do |t|
      t.belongs_to :ticket
      t.belongs_to :product
      t.timestamps
    end
  end
end
