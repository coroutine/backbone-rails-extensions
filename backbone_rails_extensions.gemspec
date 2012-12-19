# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'backbone_rails_extensions/version'

Gem::Specification.new do |gem|
  gem.name          = "backbone_rails_extensions"
  gem.version       = BackboneRailsExtensions::VERSION
  gem.authors       = ["Coroutine", "Tim Lowrimore", "John Dugan"]
  gem.email         = ["gems@coroutine.com"]
  gem.description   = %q{This gem provides a set of Backbone.js extensions commonly used in Coroutine projects. These extensions include simple collection views, paginated collection views, searching, and loading indicators.}
  gem.summary       = %q{This gem provides a set of Backbone.js extensions commonly used in Coroutine projects.}
  gem.homepage      = "https://github.com/coroutine/backbone-rails-extensions"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
