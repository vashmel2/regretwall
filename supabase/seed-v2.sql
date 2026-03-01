-- RegretWall Seed Data v2
-- Keyword-rich, varied topics, some with recipient_name
-- Run in Supabase SQL editor after seed.sql

insert into regrets (text, topic, recipient_name, created_at) values

-- LOVE
('I regret not telling her I was in love with her. She found out years later through a mutual friend and said she felt the same way. We were both just too scared.', 'love', null, now() - interval '3 hours'),
('I stayed in a relationship I knew was wrong for four years because I was terrified of being alone. I regret every year of it.', 'love', null, now() - interval '7 hours'),
('I regret not being honest about what I needed. I dropped hints and got angry when you didn''t catch them. That wasn''t fair to either of us.', 'love', null, now() - interval '11 hours'),
('I wish I had told Marco I loved him before he moved abroad. I convinced myself it was just a crush. It wasn''t.', 'love', 'marco', now() - interval '15 hours'),
('I regret ending things over text. She deserved a real conversation. I was too much of a coward to have it.', 'love', null, now() - interval '19 hours'),
('I should have fought harder for us. Instead I let my pride win and watched you walk out the door. I think about that night every week.', 'love', null, now() - interval '23 hours'),

-- CAREER
('I regret turning down the startup offer in 2019. They went public two years later. I''m still at the same desk.', 'career', null, now() - interval '1 day 2 hours'),
('I spent eleven years in a career chosen by my parents. I regret not having that difficult conversation sooner. They would have understood.', 'career', null, now() - interval '1 day 5 hours'),
('I should have asked for a raise three years ago. Instead I waited to be noticed. I''m still waiting.', 'career', null, now() - interval '1 day 9 hours'),
('I regret leaving that job so bitterly. I burned bridges I didn''t realize I''d need later. In a small industry, everyone knows.', 'career', null, now() - interval '1 day 13 hours'),
('I wish I had gone back to school when my company offered to pay for it. At the time it felt like too much effort. Now I can''t afford to go.', 'career', null, now() - interval '1 day 17 hours'),
('I regret not speaking up in meetings when I had something real to say. I let louder people take credit for ideas that were mine.', 'career', null, now() - interval '1 day 21 hours'),

-- FAMILY
('I regret missing my sister''s wedding because of a work trip. The client barely remembers my name now.', 'family', null, now() - interval '2 days 1 hour'),
('I should have asked my grandfather about his life before it was too late. He had stories I''ll never hear now.', 'family', null, now() - interval '2 days 4 hours'),
('I regret the years I spent blaming my parents for everything. Some of it was valid. Most of it was just easier than taking responsibility for my own choices.', 'family', null, now() - interval '2 days 8 hours'),
('I wish I had told my mom she was my best friend before she got sick. I assumed she knew. I should have said it out loud.', 'family', 'mom', now() - interval '2 days 12 hours'),
('I regret not being there for my brother during his divorce. I thought he needed space. He needed his family.', 'family', null, now() - interval '2 days 16 hours'),
('I should have called more. Not texted. Called. Now there is no one left to call.', 'family', null, now() - interval '2 days 20 hours'),

-- HEALTH
('I ignored every warning sign for two years. I regret waiting until a full crisis to take my mental health seriously.', 'health', null, now() - interval '3 days 2 hours'),
('I wish I had slept more in my twenties. It sounds silly but I genuinely think exhaustion aged me a decade.', 'health', null, now() - interval '3 days 6 hours'),
('I regret not quitting when I was 30 and it was still relatively easy. It took a health scare at 47 to finally do it.', 'health', null, now() - interval '3 days 10 hours'),
('I should have seen a therapist after the miscarriage instead of telling everyone I was fine. I wasn''t fine for years. I just got good at pretending.', 'health', null, now() - interval '3 days 14 hours'),
('I regret letting anxiety make my decisions for so long. I thought I was being careful. I was just missing my life.', 'health', null, now() - interval '3 days 18 hours'),

-- MONEY
('I regret lending money to a friend to avoid a hard conversation. Lost the money and the friendship. Neither came back.', 'money', null, now() - interval '4 days 2 hours'),
('I should have bought property when prices were still manageable. I keep watching the numbers go up. I keep waiting for them to come back down.', 'money', null, now() - interval '4 days 7 hours'),
('I regret spending my inheritance on things I don''t even own anymore. My grandmother worked her whole life for that money.', 'money', null, now() - interval '4 days 12 hours'),
('I wish I had started investing at 22 instead of telling myself I''d figure it out later. Later arrived.', 'money', null, now() - interval '4 days 17 hours'),
('I regret going into debt to impress people who forgot about me the moment I left the room.', 'money', null, now() - interval '4 days 22 hours'),

-- FEAR
('I regret every time I let fear choose for me. Fear never regrets anything. I am the one left holding the cost of its decisions.', 'fear', null, now() - interval '5 days 3 hours'),
('I should have moved to that city when I had nothing to lose. Now I have too much to leave and too little to stay.', 'fear', null, now() - interval '5 days 8 hours'),
('I regret not starting that business when the idea was still fresh. By the time I worked up the nerve, someone else had already built it.', 'fear', null, now() - interval '5 days 13 hours'),
('I regret waiting until everything was perfect before starting. Nothing has ever been perfect. Nothing ever will be.', 'fear', null, now() - interval '5 days 18 hours'),
('I wish I had been braver at 25. Not reckless. Just braver. The version of me that exists now was shaped by all the things I didn''t do.', 'fear', null, now() - interval '6 days 1 hour'),

-- GENERAL / null topic
('I regret not keeping a journal. I have no record of who I was at twenty-three and that person is completely gone.', null, null, now() - interval '6 days 6 hours'),
('I wish I had kept in touch with people from that chapter of my life. I always thought there would be more time.', null, null, now() - interval '6 days 11 hours'),
('I regret not reading more when my mind was sharp and hungry for it. Now I read half a page before sleep takes me.', null, null, now() - interval '6 days 16 hours'),
('I should have learned to sit with silence. I filled every quiet moment with noise and now I don''t know how to be still.', null, null, now() - interval '7 days'),
('I regret not keeping that friendship alive. It faded because neither of us fought for it. That was my fault too.', null, 'sarah', now() - interval '7 days 6 hours'),
('I wish I had danced more. Cared less about looking stupid. Nobody was watching as closely as I thought.', null, null, now() - interval '7 days 12 hours'),

-- WITH RECIPIENT NAMES (the viral mechanic)
('I regret never thanking you properly for what you did that summer. You probably don''t even remember it. I have never forgotten it.', null, 'james', now() - interval '8 days 2 hours'),
('I should have apologized to you years ago. My pride kept getting in the way every time I almost did. I hope you are doing okay.', null, 'mike', now() - interval '8 days 8 hours'),
('I regret what I said at the funeral. I was in pain and I took it out on you. You didn''t deserve any of it.', null, 'rachel', now() - interval '8 days 14 hours'),
('I wish I had told you that you changed the way I think about the world. You were the best teacher I ever had and I never said a word.', null, 'david', now() - interval '9 days 1 hour'),
('I regret not being there when you needed me most. I made excuses and eventually you stopped calling. I don''t blame you.', null, 'nina', now() - interval '9 days 8 hours'),
('I never told you how much you meant to me because I thought you already knew. I don''t think you did. I''m sorry.', 'love', 'alex', now() - interval '10 days 3 hours');
