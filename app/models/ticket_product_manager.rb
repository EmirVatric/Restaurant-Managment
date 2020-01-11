class TicketProductManager < ApplicationRecord
  belongs_to :product
  belongs_to :ticket
end
