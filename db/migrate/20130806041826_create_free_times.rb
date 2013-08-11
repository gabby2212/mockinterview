class CreateFreeTimes < ActiveRecord::Migration
  def up
  	create_table :free_times do |t|
      t.integer :week_day
      t.integer :time
      t.references :student
 
    end
  end

  def down
  	drop_table :free_times
  end
end