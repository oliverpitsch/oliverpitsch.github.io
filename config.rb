# Activate and configure extensions
# https://middlemanapp.com/advanced/configuration/#configuring-extensions

activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

activate :sprockets
activate :livereload
activate :relative_assets

# Layouts
# https://middlemanapp.com/basics/layouts/

# Per-page layout changes
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

helpers do
  def company_logo(name)
    root = Middleman::Application.root
    file_path = "#{root}/source/images/companies/#{name}.svg"
    return File.read(file_path) if File.exists?(file_path)
    ''
  end

  def svg(name)
    root = Middleman::Application.root
    file_path = "#{root}/source/images/social-icons/social-#{name}.svg"
    return File.read(file_path) if File.exists?(file_path)
    ''
  end
end