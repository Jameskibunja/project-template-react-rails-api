class AddImageToBooks < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :image, :binary
  end
end
