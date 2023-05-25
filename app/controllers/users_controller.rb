class UsersController < ApplicationController
    def create 
        user = User.create(user_params)
        if user.valid
            token = encode_token({user_id: user.id})
            render json: {user: user,token: token}, status: :ok
        else
            render json: {error: "Invalid username or password"}, status: :uprocessable_entity
        end

    end

    private
    def user_params
        params.require(;users).permit(:name, :password)
    end
end
