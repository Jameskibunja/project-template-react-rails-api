class User < ApplicationRecord
  has_secure_password
  has_many :books

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true
end
