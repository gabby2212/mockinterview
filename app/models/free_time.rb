class FreeTime < ActiveRecord::Base
	attr_accessible :week_day, :time
	belongs_to :student
end