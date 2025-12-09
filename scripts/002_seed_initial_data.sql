-- Insert initial about info
INSERT INTO public.about_info (bio, location, experience_years, projects_count)
VALUES (
  'Passionné par les technologies web depuis mes études, j''ai développé une expertise complète en développement full-stack. J''aime créer des solutions élégantes qui allient performance technique et expérience utilisateur exceptionnelle.',
  'casablanca, Morocco',
  1,
  3
) ON CONFLICT DO NOTHING;

-- Insert timeline data
INSERT INTO public.timeline (year, title, company, description, "order")
VALUES 
  ('2026', 'Full-Stack Developer', 'ISGI', 'Développement d''applications React/Node.js .', 1),
  ('2025', '1 ére année en developpement digital', 'ISGI', 'Savoir les base de programmation.', 2),
  ('2024', 'baccalauréat', 'École Alwiaame', 'baccalauréat en sciences physiques', 3)
ON CONFLICT DO NOTHING;

-- Insert skills data
INSERT INTO public.skills (category, name, level, "order")
VALUES 
  -- Frontend
  ('Frontend', 'React/Next.js', 85, 1),
  ('Frontend', 'TypeScript', 70, 2),
  ('Frontend', 'Tailwind CSS', 88, 3),
  ('Frontend', 'Vue.js', 65, 4),
  -- Backend
  ('Backend', 'Node.js', 72, 5),
  ('Backend', 'Python', 80, 6),
  -- Database
  ('Base de données', 'SQL', 85, 7),
  ('Base de données', 'MongoDB', 72, 8),
  ('Base de données', 'supabase', 60, 9),
  -- DevOps
  ('DevOps & Cloud', 'Docker', 80, 10),
  ('DevOps & Cloud', 'Vercel', 80, 11)
ON CONFLICT DO NOTHING;

-- Insert projects (from your existing projects.json)
INSERT INTO public.projects (title, description, technologies, category, demo_url, github_url, featured)
VALUES 
  (
    'IKIGAI',
    'Ikigai – Programme Innovation Entrepreneuriale est une plateforme d''accompagnement pour futurs entrepreneurs ambitieux. Elle propose un parcours structuré mêlant ateliers, mentorat, formation en stratégie d''entreprise et innovation, afin de transformer une idée innovante en projet viable.',
    ARRAY['Html', 'Css', 'Javascript', 'php', 'sql'],
    'Full-Stack',
    'https://ikigai-programme-innovation-entrepreneuriale.vercel.app',
    'https://github.com/AyaNaimi/IKIGAI.git',
    true
  ),
  (
    'Recipe Hub',
    'RecipeHub est la plateforme culinaire premium qui allie inspiration et praticité : explore des recettes authentiques du monde entier, crée des menus personnalisés selon tes goûts ou tes objectifs nutritionnels, et accède à des contenus exclusifs en version Premium.',
    ARRAY['Html', 'Css', 'Javascript', 'Api'],
    'Full-Stack',
    'https://recipe-hub-psi-nine.vercel.app',
    'https://github.com/AyaNaimi/portfolio-2.git',
    true
  ),
  (
    'Auto Guest -Gestion d''un garage',
    'Auto-Gest est une plateforme web qui facilite la gestion et l''organisation d''un garage. Elle offre une interface claire pour enregistrer, suivre et mettre à jour les informations en temps réel, tout en garantissant une utilisation rapide et efficace.',
    ARRAY['Html', 'Css', 'Javascript', 'pPh', 'Sql'],
    'Full-Stack',
    'auto-gest-umber.vercel.app',
    'https://github.com/AyaNaimi/AutoGuest.git',
    false
  )
ON CONFLICT DO NOTHING;
