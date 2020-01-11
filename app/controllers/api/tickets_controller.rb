class Api::TicketsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    ticket = Ticket.new(ticket_params)
  end

  private
  def ticket_params
    params.require(:data).permit(:ticket => [])
  end
end