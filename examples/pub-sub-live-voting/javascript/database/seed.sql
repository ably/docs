-- Optional sample data for the Postgres store. The d-pad and suggest poll
-- types make the presenter view more expressive than list polls alone.
INSERT INTO shows (name) VALUES ('Ably Live Voting demo');

INSERT INTO polls (show_id, question, type, sort_order) VALUES
  (1, 'Which real-time feature do you reach for most?', 'list', 0),
  (1, 'Rate this demo with the d-pad', 'dpad', 1),
  (1, 'What should we build with Ably next?', 'suggest', 2);

INSERT INTO poll_options (poll_id, label, direction, sort_order) VALUES
  (1, 'Pub/Sub channels', NULL, 0),
  (1, 'Presence', NULL, 1),
  (1, 'Message history', NULL, 2),
  (1, 'Push notifications', NULL, 3),
  (2, 'Love it', 'up', 0),
  (2, 'It''s neat', 'right', 1),
  (2, 'Meh', 'down', 2),
  (2, 'Confused', 'left', 3);
