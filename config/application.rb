module ReactRailsApiProjectTemplate
  class Application < Rails::Application
    # Adding cookies and session middleware
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore

    # Use SameSite=Strict for all cookies to help protect against CSRF
    # https://owasp.org/www-community/SameSite
    config.action_dispatch.cookies_same_site_protection = :strict

    # Insert CORS middleware
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins do |source, env|
          # Retrieve the request's origin dynamically
          origin = env["HTTP_ORIGIN"] || env["HTTP_HOST"]

          # Add your logic here to determine if the origin is allowed
          # For example, you can check if the origin matches a specific pattern or domain

          # Return true if the origin is allowed, otherwise false
          # For demonstration purposes, we'll allow all origins
          true
        end
        resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
      end
    end

    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.1

    # Configuration for the application, engines, and railties goes here.
    # ...

    # Only loads a smaller set of middleware suitable for API only apps.
    # Middleware like session, flash, cookies can be added back manually.
    # Skip views, helpers and assets when generating a new resource.
    config.api_only = true
  end
end
