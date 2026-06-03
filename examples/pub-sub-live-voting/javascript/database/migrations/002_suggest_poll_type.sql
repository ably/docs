ALTER TABLE polls DROP CONSTRAINT IF EXISTS polls_type_check;
ALTER TABLE polls ADD CONSTRAINT polls_type_check
  CHECK (type IN ('list', 'dpad', 'suggest'));
