class CreateInterviewTypes < ActiveRecord::Migration
  def up
  	create_table :interview_type do |t|
      t.string :name
      t.text :description
 
    end
  end

  def down
  	drop_table :interview_type
  end
end
