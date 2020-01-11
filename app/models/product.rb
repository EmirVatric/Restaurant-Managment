class Product < ApplicationRecord
  belongs_to :category, class_name: "Category", foreign_key: "category_id"
  has_many :ticket_product_managers
  has_many :tickets, through: :ticket_product_managers
end
