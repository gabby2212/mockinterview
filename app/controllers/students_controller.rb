class StudentsController < ApplicationController
  def index
  end

  def show
  	@student = current_user.student
  end

  def create
  	@student = current_user.build_student(params[:student])
    if @student.save
      	redirect_to welcome_index_path
    else
      	render "new"
    end
  end

  def new
  	@student = Student.new
  end
end
