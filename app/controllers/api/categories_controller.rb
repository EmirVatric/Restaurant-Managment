class Api::CategoriesController < ApplicationController
  def index
    render json: {
      status: 200,
      data: Category.all.as_json(
        include: {
          products: { only: %i[id name price] }
        }
      )
    }
  end
end