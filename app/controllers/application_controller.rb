class ApplicationController < ActionController::Base
  protect_from_forgery

  def after_sign_in_path_for(resource)
  	if current_user.is_student?
    	show_student_path
    else
    	new_student_path
    end
  end
end
