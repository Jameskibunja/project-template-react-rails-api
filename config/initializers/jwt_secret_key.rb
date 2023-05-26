require 'securerandom'

ENV['JWT_SECRET_KEY'] ||= SecureRandom.hex(64)
