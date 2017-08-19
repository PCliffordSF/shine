require 'rails_helper'

describe "canary spec" do
  it "works" do
    expect(true).to eq(true)
  end

  it "can fails, but not here" do
    expect(false).to eq(false)
  end
end
