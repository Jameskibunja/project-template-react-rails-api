class BooksController < ApplicationController
  before_action :set_book, only: [:show, :update, :destroy]
  before_action :authorize_user, only: [:upload]

  # GET /books
  def index
    page = params[:page].to_i || 1
    limit = params[:limit].to_i || 6

    offset = (page - 1) * limit

    @books = Book.offset(offset).limit(limit)
    render json: @books
  end

  # GET /books/:id
  def show
    render json: @book
  end

  # POST /books
  def create
    @book = Book.new(book_params)
    if @book.save
      render json: @book, status: :created
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # POST /books/upload
  def upload
    @book = current_user.books.new(book_params)
    @book.image_url = params[:book][:image_url] if params[:book][:image_url]

    if @book.save
      render json: @book, status: :created
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/:id
  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/:id
  def destroy
    @book.destroy
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author, :description, :image_url)
  end

  def authorize_user
    return if logged_in?
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
