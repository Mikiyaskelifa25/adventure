INSERT INTO tours (id, title, category, duration, hero_image, banner_image, images, itinerary, highlights, tips, group_size, difficulty, description, region, display_order, type)
VALUES (
  gen_random_uuid(),
  'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route',
  'group',
  '9 days / 8 nights',
  '',
  '',
  '{}',
  jsonb_build_array(
    jsonb_build_object(
      'day_number', 1,
      'title', 'Addis Ababa – The Imperial Welcome',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Morning: Visit the National Museum'),
        jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Afternoon: Visit the Old Imperial Palace (Menelik II Palace)'),
        jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Evening: Traditional coffee ceremony in the Gulele area')
      )
    ),
    jsonb_build_object(
      'day_number', 2,
      'title', 'Flight to Bahir Dar – The Blue Nile',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Bahir Dar', 'latitude', 11.6000, 'longitude', 37.3833, 'description', 'Morning: Fly to Bahir Dar'),
        jsonb_build_object('place', 'Tis Abay', 'latitude', 11.4833, 'longitude', 37.3167, 'description', 'Afternoon: Visit the Blue Nile Falls and Portuguese bridge')
      )
    ),
    jsonb_build_object(
      'day_number', 3,
      'title', 'Lake Tana Crossing to Gorgora',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Lake Tana', 'latitude', 12.0000, 'longitude', 37.2500, 'description', 'Morning: Boat across Lake Tana, visit Ura Kidane Mehret and Azwa Maryam monasteries'),
        jsonb_build_object('place', 'Gorgora', 'latitude', 12.2333, 'longitude', 37.2833, 'description', 'Afternoon: Continue to Gorgora on the northern shore')
      )
    ),
    jsonb_build_object(
      'day_number', 4,
      'title', 'Dembiya, Azazo & The Legacy of Taamrat Emmanuel',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Dembiya', 'latitude', 12.7000, 'longitude', 37.2167, 'description', 'Morning: Drive through Dembiya, site of Faitlovitch''s first Jewish school (1913)'),
        jsonb_build_object('place', 'Azazo', 'latitude', 12.5667, 'longitude', 37.3833, 'description', 'Afternoon: Stop in Azazo, birthplace of Taamrat Emmanuel'),
        jsonb_build_object('place', 'Gondar', 'latitude', 12.6000, 'longitude', 37.4667, 'description', 'Evening: Arrive in Gondar, visit Fasilides'' Bath')
      )
    ),
    jsonb_build_object(
      'day_number', 5,
      'title', 'Gondar – The Camelot of Africa',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Gondar', 'latitude', 12.6000, 'longitude', 37.4667, 'description', 'Morning: Explore Fasil Ghebbi (Royal Enclosure)'),
        jsonb_build_object('place', 'Wolleka', 'latitude', 12.5667, 'longitude', 37.4333, 'description', 'Afternoon: Visit Debre Birhan Selassie Church and the Jewish village of Wolleka')
      )
    ),
    jsonb_build_object(
      'day_number', 6,
      'title', 'Simien Mountains (Debark)',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Debark', 'latitude', 13.1593, 'longitude', 37.8916, 'description', 'Morning: Drive to Simien Mountains National Park'),
        jsonb_build_object('place', 'Simien Mountains', 'latitude', 13.2500, 'longitude', 38.0500, 'description', 'Afternoon: Escarpment walk, view Gelada baboons')
      )
    ),
    jsonb_build_object(
      'day_number', 7,
      'title', 'Debark – Axum (The Scenic Descent)',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Limalimo', 'latitude', 13.1500, 'longitude', 38.1500, 'description', 'Full Day: Scenic drive via Limalimo Road and Tekeze River gorge'),
        jsonb_build_object('place', 'Axum', 'latitude', 14.1167, 'longitude', 38.7167, 'description', 'Overnight: Arrive in Axum')
      )
    ),
    jsonb_build_object(
      'day_number', 8,
      'title', 'Axum – The Ancient Spiritual Center',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Axum', 'latitude', 14.1167, 'longitude', 38.7167, 'description', 'Morning: Visit Stele Park, tombs of King Kaleb, Church of St. Mary of Zion'),
        jsonb_build_object('place', 'Axum', 'latitude', 14.1167, 'longitude', 38.7167, 'description', 'Afternoon: Visit Queen of Sheba''s Palace and the Ezana Stone')
      )
    ),
    jsonb_build_object(
      'day_number', 9,
      'title', 'Gheralta to Addis Ababa',
      'activities', jsonb_build_array(
        jsonb_build_object('place', 'Gheralta', 'latitude', 13.9167, 'longitude', 39.5333, 'description', 'Morning: Drive to Gheralta Mountains, visit Abuna Yemata Guh rock church'),
        jsonb_build_object('place', 'Mekele', 'latitude', 13.4927, 'longitude', 39.4753, 'description', 'Afternoon: Drive to Mekele for flight back to Addis Ababa'),
        jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Evening: Farewell dinner at a traditional house')
      )
    )
  ),
  '["Visit the Old Imperial Palace where Faitlovitch met Emperor Menelik II", "Explore the Dembiya region — site of the first Jewish school (1913)", "Walk the Jewish village of Wolleka with its synagogue remnants", "Cross Lake Tana by boat to the historic Jesuit outpost of Gorgora", "Discover Azazo, birthplace of Taamrat Emmanuel — Faitlovitch''s protégé", "Dramatic drive through the Tekeze River gorge"]',
  '["Best visited from October to March", "Moderate fitness required for Gheralta church climb", "Combine with Omo Valley for a complete heritage tour", "Respect local customs and photography restrictions at religious sites"]',
  12,
  'Moderate',
  'This specialized program combines the classic Northern Ethiopia circuit with the specific historical landmarks associated with Jacques Faitlovitch''s missions to the Beta Israel community.',
  'Northern Ethiopia',
  10,
  'Group'
);
