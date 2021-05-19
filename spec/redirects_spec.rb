# frozen_string_literal: true

require 'redirects'

RSpec.describe AblyDocs::Redirects do
  describe ".redirect_for" do
    let(:redirects) {
      {
        '/general/authentication' => '/core-features/authentication',
        '/page/with-trailing-slash/' => '/page/without-trailing-slash',
      }
    }

    before(:each) do
      allow(described_class).to receive(:data).and_return(redirects)
    end

    it 'matches verbatim' do
      redirect = described_class.redirect_for('/general/authentication')

      expect(redirect).to eql '/core-features/authentication'
    end

    it 'handles trailing slashes' do
      redirect = described_class.redirect_for('/page/with-trailing-slash/')

      expect(redirect).to eql '/page/without-trailing-slash'
    end

    it 'handles missing trailing slashes' do
      redirect = described_class.redirect_for('/page/with-trailing-slash')

      expect(redirect).to eql '/page/without-trailing-slash'
    end

    it 'escapes regular expression input' do
      redirect = described_class.redirect_for('?looks-like-a-regex(.*')

      expect(redirect).to be_nil
    end
  end
end
