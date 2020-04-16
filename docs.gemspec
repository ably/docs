Gem::Specification.new do |spec|
  spec.name          = 'ably-docs'
  spec.version       = '1.2.0'
  spec.authors       = ["Matthew O'Riordan"]
  spec.email         = ['support@ably.io']
  spec.description   = %q{Documentation repository Gem for Ably}
  spec.summary       = %q{Allows the Ably documentation Textile files to be accessed by other Ruby applications}
  spec.homepage      = 'http://github.com/ably/docs'
  spec.license       = 'MIT'

  spec.files         = `git ls-files`.split($/)
  spec.executables   = []
  spec.test_files    = []
  spec.require_paths = ['lib']

  spec.add_runtime_dependency 'RedCloth', '~> 4.2'
  spec.add_runtime_dependency 'jsbin-client'
end
