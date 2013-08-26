class Student < ActiveRecord::Base
	belongs_to :user
	has_many :free_times
	attr_accessible :first_name, :last_name, :school, :degree, :year_of_graduation, :major, :interview_type, :interviewing_for, :free_times, :free_times_attributes
	accepts_nested_attributes_for :free_times, allow_destroy: :true, reject_if: lambda { |attributes| attributes[:week_day].blank? || attributes[:time].blank?}
	validates_presence_of :first_name, :last_name, :school, :degree, :year_of_graduation, :major, :interview_type, :interviewing_for, :free_times

	def find_matches
		all_students = Student.all
		matches = []
		all_students.each do |s|
			if s.interview_type == interview_type
				s.free_times.each do |pft|
					free_times.each do |sft|
						if pft.week_day == sft.week_day && pft.time == sft.time && s.id != id
							matches.push(s)
						end
					end
				end
			end
		end
		matches = matches.uniq
		matches

	end

	def convenient
		week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
		viable = []
		free_times.each do |ft|
			v = "On " + week[ft.week_day - 1] + " at "  + convenient_time(ft.time)
			viable.push(v)
		end
		viable
	end

	def convenient_time(time)
		if time == 0
			return "12:00am"
		end
		if time < 12
			return time.to_s + ":00am"
		end
		if time == 12
			return "12:00pm"
		end
		if time > 12
			return (time - 12).to_s + ":00pm"
		end
	end


end