class CarouselController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index
    get_images
  end

  private
  def get_images
    @images = {}
    url = "https://web-assets.zeptolab.com/api/test_gallery.php"
    begin
      response = HTTParty.get(url)
      #check response code
      case response.code
        when 200
          #parse response
          @images = JSON.parse response 
        else
          flash[:notice]= "Something went wrong. Try again later! Response code: #{response.code}"
      end
    #catch exeption
    rescue HTTParty::Error => error
      flash[:notice]= "Something went wrong. Try again later! Error description: #{error}"
    rescue StandardError => error
      flash[:notice]= "Something went wrong. Try again later! Error description: #{error}"
    end

  end
end
