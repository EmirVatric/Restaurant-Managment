class Api::TicketsController < ApplicationController
  skip_before_action :verify_authenticity_token
  def index
    render json: {
      status: :ok,
      data: Ticket.all.as_json(
        only: %i[created_at, id, delivery],
        include: {
          products: { only: %i[name] }
        }
      )
    }
  end

  def create
    ticket = Ticket.new(delivery: ticket_params[:delivery])
    ticket_params[:products].each do |prod|
      ticket.products << Product.find(prod[:id])
    end

    unless ticket.products.size > 0
      render json: {
        status: :bad_request,
        errors: 'There are no products!'
      }
    end

    if ticket.save
      ActionCable.server.broadcast 'kitchen_channel', ticket.as_json(
        only: %i[created_at, id, delivery],
        include: {
          products: { only: %i[name] }
        }
      )
      render json: {
        status: :created,
        ticket: ticket.products
      }
    else
      render json: {
        status: :bad_request,
        errors: ticket.errors.full_messages
      }
    end
  end

  private
  def ticket_params
    params.require(:data).permit(:delivery, {products: [:id, :name, :price]})
  end
end