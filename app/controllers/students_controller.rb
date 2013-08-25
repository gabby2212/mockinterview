class StudentsController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def show
    respond_to do |format|
      @student = current_user.student
      format.json{render json: @student}
    end
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
