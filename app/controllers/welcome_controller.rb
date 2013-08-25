class WelcomeController < ApplicationController
  before_filter :authenticate_user!, :only => :index

	def index
		@student = current_user.student
		@matches = @student.find_matches
  	end

  	def show
  		redirect_to '/users/sign_up'
  	end
end
