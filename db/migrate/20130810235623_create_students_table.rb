class CreateStudentsTable < ActiveRecord::Migration
  def up
  	create_table :students do |t|
  		t.string :first_name
  		t.string :last_name
  		t.string :school
  		t.string :degree
  		t.integer :year_of_graduation
  		t.string :major
  		t.string :interviewing_for
      t.string :interview_type
      t.references :user
 	end
  end

  def down
  	drop_table :students
  end
end
