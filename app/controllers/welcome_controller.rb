class WelcomeController < ApplicationController
  def index
  end

  def show
  	redirect_to '/users/sign_up'
  end
end
