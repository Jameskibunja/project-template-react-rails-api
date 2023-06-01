class ProfilesController < ApplicationController
  before_action :set_profile, only: [:show, :update, :destroy]

  def index
    render json: Profile.all, status: :ok
  end

  def show
    render json: @profile, status: :ok
  end

  def create
    profile = Profile.new(profile_params)

    if profile.save
      render json: profile, status: :created
    else
      render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @profile.update(profile_params)
      render json: @profile, status: :ok
    else
      render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @profile.destroy
      render json: { message: "Profile deleted successfully" }, status: :ok
    else
      render json: { errors: @profile.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_profile
    @profile = Profile.find(params[:id])
  end

  def profile_params
    params.require(:profile).permit(:name, :email, :bio, :address, :image, :contacts)
  end
end
