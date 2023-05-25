class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :set_current_user

  def encode_token(payload)
    JWT.encode(payload,"secret")
  end

  def decode_token
    if auth_header = request.headers['Authorization']
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, 'secret', true, algorith: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def authorized_user
    decoded_token =decode_token()
    if decoded_token
      user_id = decoded_token[0]['user_id']
      user = User.find_by( id: user_id)
    end
  end

  def authorize
    render json: { message:"You have to log in"}, status: :unauthorized unless authorized_user
  end

end
