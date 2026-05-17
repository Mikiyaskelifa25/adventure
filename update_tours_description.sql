ALTER TABLE tours ADD COLUMN IF NOT EXISTS description TEXT;

UPDATE tours
SET description = 'Discover the ancestral lands of the Amhara people, the lunar landscapes of Danakil and the spiritual depth of Lalibela.'
WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';

UPDATE tours
SET description = 'Immerse yourself in the unique cultures of the Omo Valley, where tradition meets ancient rituals in a breathtaking setting.'
WHERE title = 'Prophets of the Omo Valley and Southern tribes';

UPDATE tours
SET description = 'A journey to the lowest point on Earth, witnessing the incredible salt caravans and the volcanic wonders of Erta Ale.'
WHERE title = 'The Salt Caravans and Danakil Depression';

ALTER TABLE tours ADD COLUMN IF NOT EXISTS type TEXT;

UPDATE tours SET type = 'Group' WHERE title = 'In the heart of Abyssinian highlands, deserts and traditions';
UPDATE tours SET type = 'Family' WHERE title = 'Prophets of the Omo Valley and Southern tribes';
UPDATE tours SET type = 'Family' WHERE title = 'The Salt Caravans and Danakil Depression';
