-- Filipino seed data (Bisaya + Tagalog)
-- Wholesome, relatable, genuine — mix of topics and languages
-- Some with recipient names (Filipino first names)

INSERT INTO regrets (text, topic, created_at, recipient_name) VALUES

-- Bisaya (Cebuano) — love / crush
('Ganahan kaayo ko niya niadtong higayon, pero wala jud ko kusog moingon. Nahibaw-an nako human nga gusto pud niya ko. Sayang kaayo.', 'love', NOW() - INTERVAL '1 day', NULL),
('Nahinumdom gihapon ko nimo, classmate. Pirmi kang mura ug wala nahibaw-i nga tan-awon nako ka. Wala ko naka-goodbye sa graduation.', 'love', NOW() - INTERVAL '2 days', 'Ana'),
('Niadtong once, gi-save nako ang iyang number pero wala nako gitawagan. Nag-delete nalang ko. Kinsa man kaha siya karon.', 'love', NOW() - INTERVAL '3 days', NULL),
('Aduna siyay gibisita nako nga page sa Facebook kada gabii. Wala nako siya gi-add. Karon private na iyang account.', 'love', NOW() - INTERVAL '1 day', NULL),

-- Bisaya — family
('Ang akong mama, kanunay siyang nagtawag nako sa trabaho. Kanunay nakong gibisora. Karon naa na siya sa probinsya. Dili ko kaadto bisag gusto ko.', 'family', NOW() - INTERVAL '4 days', NULL),
('Wala ko nagpasalamat sa akong lolo sa tanan niyang gibuhat para nako. Nangita nako siya human sa graduation pero wala na siya.', 'family', NOW() - INTERVAL '5 days', NULL),
('Naregret ko nga dili nako gibalik-balik ang mga litrato namo sa una. Nawala ang phone, nawala ang tanan. Wala na pud sila.', 'family', NOW() - INTERVAL '2 days', NULL),

-- Bisaya — fear / career
('Adunay scholarship sa abroad nga wala nako gi-apply. Nahadlok ko. Hangtud karon natinguhan ko kung unsay kahimtang nako karon kung niatubang unta ko.', 'fear', NOW() - INTERVAL '6 days', NULL),
('Gusto unta nako mosulod sa theater group sa school. Nahadlok ko na basig dili ko makalusot. Wala ko nag-try. Hangtud karon, regret.', 'fear', NOW() - INTERVAL '3 days', NULL),

-- Tagalog — love / crush
('Sana sinabi ko na lang na may gusto ako sa kanya noong magkasama pa kami sa iisang klase. Ngayon nasa ibang mundo na kami.', 'love', NOW() - INTERVAL '1 day', NULL),
('Lagi siyang nagpaparamdam pero lagi akong nagpapabasta-basta. Akala ko marami pa kaming panahon. Wala na pala.', 'love', NOW() - INTERVAL '2 days', NULL),
('Hindi ko sinagot ang huling message niya noong gabi na iyon. Kinilig kasi ako at hindi ko alam ang isasagot ko. Kinabukasan, hindi na siya nag-message ulit.', 'love', NOW() - INTERVAL '3 days', 'Carlo'),
('I kept telling myself next time na lang sasabihin ko sa kanya. Wala pala talagang next time.', 'love', NOW() - INTERVAL '4 days', NULL),
('Gusto ko siyang i-add pero baka ma-seen lang naman ako. So wala. Ngayon private na profile niya at hindi ko siya mahanap.', 'love', NOW() - INTERVAL '1 day', 'Bea'),

-- Tagalog — family
('Nagsisi ako na lagi akong naka-earphones nung kakausapin pa namin ng lola ko. Hindi ko napakinggan ng marami.', 'family', NOW() - INTERVAL '5 days', NULL),
('Nagalit ako sa pinakamatalik na kaibigan ko dahil sa inggit. Wala na kaming pakikipag-usap ngayon. Siya pa naman ang pinaka-gets sa akin sa lahat.', 'family', NOW() - INTERVAL '2 days', NULL),
('Lumayo ako para makahanap ng sarili ko. Ngayon nahanap ko na ang sarili ko, pero nawala na pala yung mga taong dahil sa kanila gusto ko pa rin umuwi.', 'family', NOW() - INTERVAL '6 days', NULL),
('Pinigilan ko ang sarili ko na umiyak sa libing ng lola ko para mukhang matatag. Hanggang ngayon, parang hindi pa tapos ang pagdadalamhati ko.', 'family', NOW() - INTERVAL '7 days', NULL),

-- Tagalog — career / school
('Nag-aral ako ng kursong hindi ko gusto dahil sa pamilya. Sampung taon na akong nagtatrabaho sa isang bagay na hindi ko mahal. Sana naging matapang ako noon.', 'career', NOW() - INTERVAL '4 days', NULL),
('Lumagpas ang deadline ng application sa dream school ko dahil inantay ko na ready na ako. Hindi pa rin ako ready hanggang ngayon.', 'fear', NOW() - INTERVAL '3 days', NULL),
('Hindi ko hinanap ang guro ko na nagtiwala sa akin nung bumagsak ang lahat. Nahiya ako. Sana nagpasalamat na lang ako sa kanya.', 'career', NOW() - INTERVAL '5 days', NULL),

-- Tagalog — love with names (younger, relatable)
('Nasa iisang grupo kami sa groupchat pero hindi ko siya ni-reply kahit minsan. Ayaw ko siyang mapansin. Ngayon wala na siya sa grupo.', 'love', NOW() - INTERVAL '2 days', 'Juan'),
('Sinabi niya sa akin na miss niya ako. Sabi ko okay lang. Hindi okay. Hindi ko lang alam paano sabihin.', 'love', NOW() - INTERVAL '1 day', 'Joy'),

-- Mixed code-switching (very natural Filipino Gen Z)
('Nagsabi siya ng "take care" bago umalis. Sana sinabi ko rin. Nakatayo lang ako doon na wala.', 'love', NOW() - INTERVAL '3 days', NULL),
('Dati palagi kaming nag-uusap hanggang umaga. Ngayon pag nakita ko siya online, hindi ko na alam kung mag-chat pa ba.', 'love', NOW() - INTERVAL '2 days', 'Roel');
