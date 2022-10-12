class User < ApplicationRecord
  has_secure_password
  validates :username, 
    uniqueness: true, 
    length: { in: 3..30 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true

  before_validation :ensure_session_token

  def self.find_by_credentials(credential, password)

    if URI::MailTo::EMAIL_REGEXP.match?(credential)
      user = User.find_by(email: credential)
    else 
      user = User.find_by(username: credential)
    end

    return nil if user.nil?
    return user.authenticate(password)
  end

  def reset_session_token!
    # self.session_token = generate_unique_session_token
    # save!
    # self.session_token
    self.update!(session_token: generate_unique_session_token)
    session_token
  end

  private

  def generate_unique_session_token
    session_token = SecureRandom.base64(16)
    while User.exists?(session_token: session_token)
      session_token = SecureRandom.base64(16)
    end
    return session_token
    # in a loop:
      # use SecureRandom.base64 to generate a random token
      # use `User.exists?` to check if this `session_token` is already in use
      # if already in use, continue the loop, generating a new token
      # if not in use, return the token
  end

  def ensure_session_token
    # if `self.session_token` is already present, leave it be
    # if `self.session_token` is nil, set it to `generate_unique_session_token`
    self.session_token ||= generate_unique_session_token
  end
end