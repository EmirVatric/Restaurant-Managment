class CreateTickets < ActiveRecord::Migration[6.0]
  def change
    create_table :tickets do |t|
      t.string :comment
      t.boolean :kitchen_status
      t.boolean :waiter_status
      t.boolean :delivery
      t.boolean :urgent
      t.integer :user_id

      t.timestamps
    end
  end
end
