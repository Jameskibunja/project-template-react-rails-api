class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize, except: [:create, :index]
  
  def encode_token(payload)
    JWT.encode(payload, 'secret')
  end

  def decode_token(token)
    JWT.decode(token, 'secret', true, algorithm: 'HS256')
  rescue JWT::DecodeError
    nil
  end

  def authorize
    auth_header = request.headers['Authorization']
    token = auth_header&.split(' ')&.last
    if token
      decoded_token = decode_token(token)
      if decoded_token
        user_id = decoded_token[0]['user_id']
        @current_user = User.find_by(id: user_id)
      end
    end
    render json: { message: 'You have to log in' }, status: :unauthorized unless @current_user
  end
end
