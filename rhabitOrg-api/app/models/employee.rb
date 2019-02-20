class Employee < ApplicationRecord
    has_ancestry :orphan_strategy => :adopt
end
