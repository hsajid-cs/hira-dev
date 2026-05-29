export const aboutData = {
  title: 'about me',
  sub: 'a letter of introduction',
  deco: '✦ ❧ ✦',
  entries: [
    {
      title: "hey, i'm hira",
      meta: 'software engineer · cs @ nust · islamabad',
      body: "i build AI workflows by day and somehow end up debugging life crises by night. i'm a CS grad from NUST who fell hard for the intersection of software engineering and machine learning — the kind of person who has opinions about RAG pipeline architectures and also about which font pairs best with which color palette.\n\ni've shipped automation pipelines, trained ML models on EEG data, and built full-stack apps that real humans actually use. i care about clean code, good docs, and making things that genuinely help people. also, i volunteer, i write, and i believe empathy makes you a better engineer."
    },
    {
      title: 'what i actually do',
      meta: 'day to day',
      body: "right now i'm a jr. software engineer at Quest, building AI-powered automation workflows, LangChain pipelines, and deploying services on cloud. before that, i interned at Zoomiez.io working on OCR, embeddings, and FAISS retrieval for education tech. i care about the craft — clean architectures, reliable pipelines, and systems that don't break at 3am."
    }
  ]
};

export const projectsData = {
  title: 'projects',
  sub: 'things i built and am not embarrassed about',
  deco: '❧',
  entries: [
    {
      title: 'PANDA',
      meta: 'ml / ai · 2024 – present',
      body: 'EEG-based infant pain detection using a layered ML pipeline. processed 12,000+ EEG samples, benchmarked CNNs, transformers, and classical ML. custom architecture hit 87.3% accuracy.',
      tags: ['python', 'tensorflow', 'pytorch', 'scikit-learn'],
      tagsType: 'purple'
    },
    {
      title: 'Rate My Dost',
      meta: 'full-stack · 2025',
      body: 'a social voting app where you share links and friends vote. clerk auth, react vite frontend, fastapi backend with neon db for real-time vote tracking.',
      tags: ['react', 'fastapi', 'neon db', 'clerk'],
      tagsType: 'green'
    },
    {
      title: 'AgriTech Lens',
      meta: 'ml / computer vision · 2024',
      body: 'CNN model for plant disease and soil type detection from images. integrated OpenAI API for smart farming recommendations from predictions.',
      tags: ['python', 'opencv', 'tensorflow', 'openai'],
      tagsType: 'purple'
    },
    {
      title: 'MoodWave',
      meta: 'ml / audio · 2024',
      body: 'speech emotion recognition trained on 4,000 audio samples across 5 emotion classes. MFCC features via librosa. hit 82% accuracy, outperformed baselines.',
      tags: ['python', 'tensorflow', 'librosa'],
      tagsType: 'purple'
    },
    {
      title: 'Pact AI',
      meta: 'mobile · 2024',
      body: '7-screen flutter app for mental wellness and habit tracking. gemini API chatbots with custom prompting for guided conversations.',
      tags: ['flutter', 'dart', 'gemini api'],
      tagsType: 'green'
    },
    {
      title: 'Satiate',
      meta: 'frontend · 2023',
      body: 'built 10 responsive pages for donor and NGO workflows in a 3-member team. REST API integration for real-time data across user roles.',
      tags: ['react', 'rest apis'],
      tagsType: 'green'
    }
  ]
};

export const experienceData = {
  title: 'experience',
  sub: 'the scroll of things i have done',
  deco: '⁕',
  entries: [
    {
      title: 'Jr. Software Engineer',
      meta: 'Quest · jan 2026 – present · islamabad',
      body: 'built 10+ automation workflows on n8n and Make.com. developed an automated YouTube pipeline with ElevenLabs voice cloning. built LangChain AI workflows with Serper and Groq. implemented RAG pipelines over 3k+ embedded chunks. queued async LLM jobs with Redis and Celery, deployed 5+ services on DigitalOcean and Azure via Docker.'
    },
    {
      title: 'AI Intern',
      meta: 'Zoomiez.io · jun – aug 2025 · islamabad',
      body: 'processed 200+ academic documents through OCR pipelines. built automated MCQ explanation and extraction workflows using LLM APIs. created FAISS retrieval pipelines for 1000+ pages of textbook content. tested prompt engineering strategies, improving output consistency by ~72%.'
    },
    {
      title: 'BS Computer Science',
      meta: 'National University of Sciences & Technology (NUST) · islamabad',
      body: "focused on AI/ML, software engineering, and systems. built projects spanning EEG-based pain detection, computer vision, speech recognition, and full-stack apps. the kind of degree where you learn to love (and fear) terminal windows."
    }
  ]
};

export const researchData = {
  title: 'research work',
  sub: 'field notes & published findings',
  deco: '⁕ ❧ ⁕',
  entries: [
    {
      title: 'PANDA: EEG-Based Infant Pain Detection',
      meta: 'ongoing research · 2024 – present',
      body: "designed a layered ML pipeline for neonatal pain detection from EEG signals. benchmarked CNNs, transformer-based models, and classical approaches across 12,000+ samples. custom-modified architecture achieved 87.3% accuracy and F1-score. it's the project where neuroscience meets deep learning, and i'm proud of it."
    }
  ]
};

export const wallOfLoveData = {
  title: 'wall of love',
  sub: 'things my people have said about me',
  deco: '✦',
  defaultComments: [
    {
      text: '"she debugged my life crisis and my code in the same afternoon and fixed both"',
      name: 'a friend',
      relationship: 'chaos co-pilot'
    },
    {
      text: '"genuinely alarming how fast she ships. also made me a birthday card that made me cry."',
      name: 'a classmate',
      relationship: 'fellow survivor'
    },
    {
      text: '"the most organized chaotic person i know. her notion is immaculate. her desk is not."',
      name: 'lab partner',
      relationship: 'witness'
    },
    {
      text: '"asked her for code review, got code review AND an emotional support text. rare."',
      name: 'teammate',
      relationship: 'grateful human'
    }
  ]
};

export const extrasData = {
  title: 'beyond the code',
  sub: 'certifications & volunteering',
  deco: '✿',
  entries: [
    {
      title: 'Deep Learning Specialization',
      meta: 'certificate · coursera · june 2025',
      body: ''
    },
    {
      title: 'Advanced Learning Algorithms',
      meta: 'certificate · coursera · dec 2024',
      body: ''
    },
    {
      title: 'Supervised Machine Learning',
      meta: 'certificate · coursera · jul 2024',
      body: ''
    },
    {
      title: 'Shaukat Khanum Hospital',
      meta: 'volunteer · mar 2025',
      body: 'campaign planning and outreach for zakat donation drives, raising PKR 100,000+.'
    },
    {
      title: 'NCSC — Decor Executive',
      meta: 'campus society · sep 2024 – may 2025',
      body: 'event planning and execution for campus-wide donation drives and awareness programs.'
    },
    {
      title: 'Rizq — Web Content Writer',
      meta: 'volunteer · aug 2020 – feb 2021',
      body: 'research and writing for food insecurity campaigns; helped raise PKR 50,000 for ration drives.'
    }
  ]
};
