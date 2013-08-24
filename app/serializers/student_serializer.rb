class StudentSerializer < ActiveModel::Serializer
  attributes :id, :matches, :first_name, :last_name, :school, :degree, :year_of_graduation, :major, :interviewing_for, :interview_type, :user_id

  def matches
  	object.find_connections
  end
end
