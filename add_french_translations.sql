ALTER TABLE tours ADD COLUMN IF NOT EXISTS title_fr TEXT;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS description_fr TEXT;
ALTER TABLE tours ADD COLUMN IF NOT EXISTS region_fr TEXT;

UPDATE tours SET title_fr = 'Au cœur des hauts plateaux d''Abyssinie, des déserts et des traditions' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';
UPDATE tours SET description_fr = 'Découvrez les terres ancestrales du peuple Amhara, les paysages lunaires du Danakil et la profondeur spirituelle de Lalibela.' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';
UPDATE tours SET region_fr = 'Éthiopie du Nord et de l''Est' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';

UPDATE tours SET title_fr = 'Prophètes de la vallée de l''Omo et tribus du Sud' WHERE title = 'Prophets of the Omo Valley and Southern tribes';
UPDATE tours SET description_fr = 'Immergez-vous dans les cultures uniques de la vallée de l''Omo, où la tradition rencontre les rituels anciens dans un cadre à couper le souffle.' WHERE title = 'Prophets of the Omo Valley and Southern tribes';
UPDATE tours SET region_fr = 'Éthiopie du Sud – Vallée de l''Omo' WHERE title = 'Prophets of the Omo Valley and Southern tribes';

UPDATE tours SET title_fr = 'Les caravanes de sel et la dépression du Danakil' WHERE title = 'The Salt Caravans and Danakil Depression';
UPDATE tours SET description_fr = 'Un voyage vers le point le plus bas de la Terre, découvrant les incroyables caravanes de sel et les merveilles volcaniques de l''Erta Ale.' WHERE title = 'The Salt Caravans and Danakil Depression';
UPDATE tours SET region_fr = 'Région Afar – Dépression du Danakil' WHERE title = 'The Salt Caravans and Danakil Depression';

UPDATE tours SET title_fr = 'Sur les traces de Faitlovitch : la route historique et du patrimoine juif' WHERE title = 'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route';
UPDATE tours SET description_fr = 'Ce programme spécialisé combine le circuit classique de l''Éthiopie du Nord avec les sites historiques associés aux missions de Jacques Faitlovitch auprès de la communauté Beta Israel.' WHERE title = 'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route';
UPDATE tours SET region_fr = 'Éthiopie du Nord' WHERE title = 'In the Footsteps of Faitlovitch: The Historic & Jewish Heritage Route';
