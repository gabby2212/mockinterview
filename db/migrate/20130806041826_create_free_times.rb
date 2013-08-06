class CreateFreeTimes < ActiveRecord::Migration
  def up
  	create_table :free_time do |t|
      t.integer :week_day
      t.text :time
 
    end
  end

  def down
  	drop_table :free_time
  end
end