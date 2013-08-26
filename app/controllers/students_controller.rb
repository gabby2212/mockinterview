class StudentsController < ApplicationController
  before_filter :authenticate_user!

  def index
  end

  def new
    @student = Student.new
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

  def edit
    @student = Student.find_by_id(params[:id])
  end 


  def update
    @student = Student.find(params[:id])
    if @student.update_attributes(params[:student])
      redirect_to welcome_index_path, notice: "You have successfully updated your profile"
    else
      render 'edit'
    end
  end
end
