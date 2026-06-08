-- Add Russian translation columns to tours table
ALTER TABLE tours ADD COLUMN IF NOT EXISTS title_ru TEXT;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS region_ru TEXT;

-- Add language-specific itinerary columns (JSONB, same structure as itinerary)
ALTER TABLE tours ADD COLUMN IF NOT EXISTS itinerary_fr JSONB;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS itinerary_ru JSONB;

-- ─── Russian translations for existing tours ───

-- Tour 1: Highlands, deserts and traditions
UPDATE tours SET title_ru = 'В сердце абиссинских нагорий, пустынь и традиций' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';
UPDATE tours SET description_ru = 'Откройте для себя исконные земли народа амхара, лунные пейзажи Данакиля и духовную глубину Лалибелы.' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';
UPDATE tours SET region_ru = 'Северная и Восточная Эфиопия' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';

-- Tour 2: Omo Valley
UPDATE tours SET title_ru = 'Пророки долины Омо и южные племена' WHERE title = 'Prophets of the Omo Valley and Southern tribes';
UPDATE tours SET description_ru = 'Погрузитесь в уникальные культуры долины Омо, где традиции встречаются с древними ритуалами в захватывающем дух пейзаже.' WHERE title = 'Prophets of the Omo Valley and Southern tribes';
UPDATE tours SET region_ru = 'Южная Эфиопия – Долина Омо' WHERE title = 'Prophets of the Omo Valley and Southern tribes';

-- Tour 3: Salt Caravans
UPDATE tours SET title_ru = 'Соляные караваны и впадина Данакиль' WHERE title = 'The Salt Caravans and Danakil Depression';
UPDATE tours SET description_ru = 'Путешествие в самую низкую точку Земли, где можно увидеть невероятные соляные караваны и вулканические чудеса Эрта Але.' WHERE title = 'The Salt Caravans and Danakil Depression';
UPDATE tours SET region_ru = 'Регион Афар – Впадина Данакиль' WHERE title = 'The Salt Caravans and Danakil Depression';

-- Tour 4: Faitlovitch
UPDATE tours SET title_ru = 'По следам Файтловича: Исторический и еврейский маршрут' WHERE title = 'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route';
UPDATE tours SET description_ru = 'Эта специализированная программа объединяет классический маршрут Северной Эфиопии с историческими достопримечательностями, связанными с миссиями Жака Файтловича к общине Бета Исраэль.' WHERE title = 'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route';
UPDATE tours SET region_ru = 'Северная Эфиопия' WHERE title = 'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route';

-- ─── French itinerary data ───

-- Tour 1: French itinerary
UPDATE tours SET itinerary_fr = jsonb_build_array(
  jsonb_build_object('day_number', 1, 'title', 'Arrivée à Addis-Abeba', 'activities', jsonb_build_array(
    jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Matin : Visite du Musée National'),
    jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Après-midi : Découverte du Merkato et de la Cathédrale Saint-Georges'),
    jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Soir : Vol vers Gondar')
  )),
  jsonb_build_object('day_number', 2, 'title', 'Gondar – Enceinte Royale et Debre Birhan Selassie', 'activities', jsonb_build_array(
    jsonb_build_object('place', 'Gondar', 'latitude', 12.6000, 'longitude', 37.4667, 'description', 'Matin : Visite de l''Enceinte Royale de Fasil Ghebbi'),
    jsonb_build_object('place', 'Gondar', 'latitude', 12.6000, 'longitude', 37.4667, 'description', 'Après-midi : Découverte de l''église Debre Birhan Selassie')
  ))
) WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';

-- ─── Russian itinerary data (sample) ───
UPDATE tours SET itinerary_ru = jsonb_build_array(
  jsonb_build_object('day_number', 1, 'title', 'Прибытие в Аддис-Абебу', 'activities', jsonb_build_array(
    jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Утро: Посещение Национального музея'),
    jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'День: Прогулка по Меркато и Собору Святого Георгия'),
    jsonb_build_object('place', 'Addis Ababa', 'latitude', 9.0192, 'longitude', 38.7468, 'description', 'Вечер: Перелёт в Гондэр')
  )),
  jsonb_build_object('day_number', 2, 'title', 'Гондэр – Королевская ограда и Дебре Бырхан Селассие', 'activities', jsonb_build_array(
    jsonb_build_object('place', 'Gondar', 'latitude', 12.6000, 'longitude', 37.4667, 'description', 'Утро: Осмотр Королевской ограды Фасил Гебби'),
    jsonb_build_object('place', 'Gondar', 'latitude', 12.6000, 'longitude', 37.4667, 'description', 'День: Посещение церкви Дебре Бырхан Селассие')
  ))
) WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';
