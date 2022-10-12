class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages, status: :unprocessable_entity}
    end
    # render json: user_params
  end

  wrap_parameters include: User.attribute_names + ['password']

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
