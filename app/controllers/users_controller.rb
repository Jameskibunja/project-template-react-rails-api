class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :login]

  def create
    @user = User.new(user_params)
    if @user.save
      token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), jwt: token }, status: :created
    else
      render json: { error: 'Failed to create user', errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    @user = User.find_by(username: params[:username])

    if @user && @user.authenticate(params[:password])
      token = encode_token({ user_id: @user.id })
      render json: { user: UserSerializer.new(@user), jwt: token }, status: :accepted
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
