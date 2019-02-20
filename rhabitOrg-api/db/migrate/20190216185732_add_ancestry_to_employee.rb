class AddAncestryToEmployee < ActiveRecord::Migration[5.2]
  def change
    add_column :employees, :ancestry, :string
    add_index :employees, :ancestry
  end
end
