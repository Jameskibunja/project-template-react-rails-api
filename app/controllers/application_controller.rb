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

  private

  def set_current_user
    @current_user = User.find_by(id: session[:user_id]) if session[:user_id]
  end
end
