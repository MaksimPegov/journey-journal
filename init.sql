CREATE TABLE IF NOT EXISTS journeys (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  distance VARCHAR(255) NOT NULL,
  dataAndTime VARCHAR(255) NOT NULL
);

INSERT INTO journeys (title, distance, dataAndTime) VALUES
  ('Trip to Paris', '300.5', '2024-05-01 10:00:00'),
  ('Mountain Hike', '12.7', '2024-05-03 08:30:00'),
  ('Beach Run', '5.0', '2024-05-05 07:00:00');
