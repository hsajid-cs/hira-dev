// Everything the site says about Hira lives in this file.
// Edit the text here; the layouts just read from it.

export const profile = {
  name: 'Hira Sajid',
  role: 'CS Student · Software Developer · Maker',
  short: 'Software Developer + Maker',
  place: 'Islamabad, Pakistan',
  intro:
    'CS graduate-in-progress at NUST who builds AI automation, ML models and full-stack apps, and who makes things by hand when the screen gets too much.',
  about: [
    'I study computer science at NUST with a focus on software engineering and machine learning. I have trained ML models on biomedical signal data, built AI-powered automation workflows, and shipped full-stack apps people actually use.',
    'I like clean architecture, thorough documentation and solving real problems. Away from the keyboard I do a lot of crafting and event décor, and I write and volunteer when I can.',
  ],
  email: 'hirasajid.dev@gmail.com',
  linkedin: 'https://linkedin.com/in/hsajid-cs',
  github: 'https://github.com/hsajid-cs',
  photo: 'hira.jpg',
};

// kind: 'ai' | 'web' | 'mobile'
export const projects = [
  {
    id: 'panda',
    name: 'PANDA',
    full: 'Pain Assessment in Neonates using Deep Learning and Analytics',
    kind: 'ai',
    year: '2024 – Present',
    summary:
      'EEG-based infant pain detection with a layered ML pipeline, benchmarked across 12,000+ samples.',
    problem:
      'Newborns cannot say where it hurts, so pain assessment leans on subjective observation. PANDA looks for pain directly in EEG signals.',
    approach:
      'Designed a layered ML pipeline and benchmarked CNNs, transformer-based models and classical approaches on the same data.',
    result: 'A custom-modified architecture reached 87.3% accuracy and F1-score.',
    contribution:
      'Designed the layered pipeline, ran the model benchmarking and modified the winning architecture. Ongoing research.',
    tags: ['python', 'tensorflow', 'pytorch', 'scikit-learn'],
    link: { href: 'https://github.com/hsajid-cs', label: 'GitHub' },
  },
  {
    id: 'pact',
    name: 'Pact AI',
    full: 'Mental wellness and habit tracking',
    kind: 'mobile',
    year: '2024',
    summary: 'A 7-screen Flutter app for mental wellness and habit tracking with Gemini-powered chat.',
    problem: 'Habit and wellbeing apps tend to be either trackers or chatbots. Pact AI puts both in one place.',
    approach: 'Seven Flutter screens, with Gemini API chatbots and custom prompting for guided conversations.',
    result: 'A working mobile app covering tracking and guided chat.',
    contribution: 'Built the app end to end: screens, state, and the prompt design for the Gemini conversations.',
    tags: ['flutter', 'dart', 'gemini api'],
    link: { href: 'https://github.com/hsajid-cs', label: 'GitHub' },
  },
  {
    id: 'rmd',
    name: 'Rate My Dost',
    full: 'A social voting platform',
    kind: 'web',
    year: '2025',
    summary: 'Share a link, let people vote, watch the community ranking move in real time.',
    problem: 'Friends want a quick, low-stakes way to rank things together.',
    approach: 'React + Vite frontend, FastAPI backend, Clerk for sign-in and Neon DB for live vote tracking.',
    result: 'Live and usable at its own subdomain.',
    contribution: 'Full-stack: frontend, API, auth and database.',
    tags: ['react', 'fastapi', 'neon db', 'clerk'],
    link: { href: 'https://ratemydost.hirasajid.dev/', label: 'Live demo' },
  },
  {
    id: 'agritech',
    name: 'AgriTech Lens',
    full: 'Plant disease and soil detection',
    kind: 'ai',
    year: '2024',
    summary: 'A CNN that spots plant disease and soil type from photos, then suggests what to do next.',
    problem: 'Farmers need quick answers from what they can photograph in the field.',
    approach: 'CNN classification on images, with the OpenAI API turning predictions into farming recommendations.',
    result: 'Photo in, diagnosis and advice out.',
    contribution: 'Trained the CNN, built the image pipeline and wired up the recommendation step.',
    tags: ['python', 'opencv', 'tensorflow', 'openai'],
    link: { href: 'https://github.com/hsajid-cs', label: 'GitHub' },
  },
  {
    id: 'moodwave',
    name: 'MoodWave',
    full: 'Speech emotion recognition',
    kind: 'ai',
    year: '2024',
    summary: '5 emotion classes from 4,000 audio samples, 82% accuracy.',
    problem: 'Tone of voice carries emotion that text alone loses.',
    approach: 'MFCC feature extraction with Librosa, then a TensorFlow model trained on 4,000 samples across 5 classes.',
    result: '82% accuracy, ahead of the baseline models.',
    contribution: 'Feature extraction, model training and evaluation against baselines.',
    tags: ['python', 'tensorflow', 'librosa'],
    link: { href: 'https://github.com/hsajid-cs', label: 'GitHub' },
  },
  {
    id: 'satiate',
    name: 'Satiate',
    full: 'Donor and NGO workflows',
    kind: 'web',
    year: '2023',
    summary: '10 responsive pages for donors and NGOs, built in a team of three.',
    problem: 'Donors and NGOs need to see the same data at the same time.',
    approach: 'Responsive React frontend with REST API integration for real-time sync across user roles.',
    result: 'Ten responsive pages shipped as part of a 3-member team.',
    contribution: 'Frontend developer: the pages and the API integration.',
    tags: ['react', 'rest apis'],
    link: { href: 'https://github.com/hsajid-cs', label: 'GitHub' },
  },
];

export const experience = [
  {
    id: 'quest',
    company: 'Quest',
    role: 'Jr. Software Engineer',
    dates: 'January 2026 – Present',
    place: 'Islamabad',
    points: [
      'Built 10+ automation workflows on n8n and Make.com.',
      'Built an automated YouTube pipeline with ElevenLabs voice cloning.',
      'Designed LangChain AI workflows with Serper and Groq.',
      'Implemented RAG pipelines over 3,000+ embedded chunks.',
      'Managed async LLM job queues with Redis and Celery.',
      'Deployed 5+ services on DigitalOcean and Azure via Docker.',
    ],
    tags: ['n8n', 'langchain', 'rag', 'redis', 'celery', 'docker', 'azure'],
  },
  {
    id: 'zoomiez',
    company: 'Zoomiez.io',
    role: 'AI Intern',
    dates: 'June – August 2025',
    place: 'Islamabad',
    points: [
      'Processed 200+ academic documents through OCR pipelines.',
      'Built automated MCQ explanation and extraction workflows with LLM APIs.',
      'Created FAISS retrieval pipelines for 1,000+ pages of textbook content.',
      'Tested prompt strategies, improving output consistency by about 72%.',
    ],
    tags: ['ocr', 'faiss', 'llm apis', 'prompting'],
  },
  // Role, dates and details still to be written for these two.
  { id: 'cogilent', company: 'Cogilent', role: '', dates: '', place: '', points: [], tags: [] },
  { id: 'hiskytech', company: 'HiSkyTech', role: '', dates: '', place: '', points: [], tags: [] },
];

export const education = {
  school: 'National University of Sciences & Technology (NUST)',
  short: 'NUST',
  degree: 'BS Computer Science',
  place: 'Islamabad',
  body: 'Specialised in AI/ML, software engineering and systems design. Coursework projects span EEG-based pain detection, computer vision, speech recognition and full-stack apps.',
};

export const certifications = [
  { name: 'Deep Learning Specialization', by: 'Coursera', when: 'June 2025' },
  { name: 'Advanced Learning Algorithms', by: 'Coursera', when: 'December 2024' },
  { name: 'Supervised Machine Learning', by: 'Coursera', when: 'July 2024' },
];

export const volunteering = [
  { name: 'Decor Executive', where: 'NCSC, NUST', when: 'September 2024 – May 2025' },
  { name: 'Volunteer', where: 'Shaukat Khanum Hospital', when: 'March 2025' },
  { name: 'Decor Executive', where: 'NUST Cultural Fest', when: 'February 2025' },
  { name: 'Decor Executive', where: 'NEC Eco Carnival', when: 'April 2024' },
  { name: 'Registration Volunteer', where: 'SGA SEECS', when: 'December 2023, October 2024' },
  { name: 'Usher', where: 'SGA SEECS', when: 'May 2024, May 2025' },
  { name: 'Web Content Writer', where: 'Rizq', when: 'August 2020 – February 2021' },
];

export const skills = [
  { name: 'Python', group: 'language', note: 'ML models, pipelines, FastAPI' },
  { name: 'PyTorch', group: 'ml', note: 'PANDA benchmarking' },
  { name: 'TensorFlow', group: 'ml', note: 'CNNs, audio models' },
  { name: 'scikit-learn', group: 'ml', note: 'classical baselines' },
  { name: 'React', group: 'web', note: 'Vite, REST integration' },
  { name: 'Flutter', group: 'mobile', note: 'Pact AI' },
  { name: 'Backend', group: 'web', note: 'FastAPI, Redis, Celery' },
  { name: 'AI / ML', group: 'ml', note: 'signals, vision, speech' },
  { name: 'LLMs', group: 'llm', note: 'LangChain, prompting, RAG' },
  { name: 'FAISS', group: 'llm', note: 'retrieval over textbooks' },
  { name: 'Docker', group: 'ops', note: 'DigitalOcean and Azure' },
  { name: 'n8n / Make', group: 'ops', note: 'automation workflows' },
];

// Craft entries. `photo` is a path inside /public/crafts (e.g. 'crafts/paper-flowers.jpg').
// While it is null a drawn placeholder shows instead; drop a photo in and set the path.
export const crafts = [
  { id: 'fest', title: 'Cultural fest décor', kind: 'decor', photo: null, note: 'NUST Cultural Fest, February 2025. Decor executive.' },
  { id: 'eco', title: 'Eco Carnival décor', kind: 'paper', photo: null, note: 'NEC Eco Carnival, April 2024. Decor executive.' },
  { id: 'society', title: 'Society décor', kind: 'thread', photo: null, note: 'NCSC, NUST, September 2024 – May 2025.' },
  { id: 'paper', title: 'Paper work', kind: 'crane', photo: null, note: 'Folded and cut things.' },
  { id: 'sketch', title: 'Sketches', kind: 'sketch', photo: null, note: 'Pages from the sketchbook.' },
  { id: 'handmade', title: 'Handmade bits', kind: 'flower', photo: null, note: 'Small things made for people.' },
];

export const currently = [
  { label: 'building', text: 'AI automation workflows and RAG pipelines at Quest' },
  { label: 'researching', text: 'PANDA, EEG-based neonatal pain detection' },
  { label: 'learning', text: 'Git, properly this time' },
  { label: 'reading', text: 'something with no code in it' },
  { label: 'making', text: 'paper things, between deadlines' },
];

export const likes = [
  { title: 'Making things by hand', note: 'paper, thread, anything with a glue stick' },
  { title: 'Decorating spaces', note: 'three events as decor executive' },
  { title: 'Clean architecture', note: 'and documentation someone can follow' },
  { title: 'Writing', note: 'web content writer, technical writing' },
  { title: 'Volunteering', note: 'hospital, society events, registration desks' },
];
