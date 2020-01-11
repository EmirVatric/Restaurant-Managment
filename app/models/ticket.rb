class Ticket < ApplicationRecord
  has_many :ticket_product_managers
  has_many :products, through: :ticket_product_managers, dependent: :destroy
end
