export const aboutData = {
  title: 'About',
  sub: 'Introduction',
  deco: '✦ ❧ ✦',
  entries: [
    {
      title: 'Hira Sajid',
      meta: 'Software Engineer · CS @ NUST · Islamabad',
      body: "A Computer Science graduate from NUST with a focus on software engineering and machine learning. Experienced in building AI-powered automation workflows, training ML models on biomedical signal data, and developing full-stack applications for production use.\n\nProficient in designing clean system architectures, maintaining thorough documentation, and delivering solutions that address real-world problems. Active in volunteer work and technical writing."
    },
    {
      title: 'Current Focus',
      meta: 'Day-to-Day',
      body: "Currently working as a Jr. Software Engineer at Quest, building AI-powered automation workflows, LangChain pipelines, and deploying cloud-based services. Previously interned at Zoomiez.io, contributing to OCR pipelines, embedding systems, and FAISS-based retrieval for education technology. Committed to clean architectures, reliable pipelines, and maintainable systems."
    }
  ]
};

export const projectsData = {
  title: 'Projects',
  sub: 'Selected Work',
  deco: '❧',
  entries: [
    {
      title: 'Voice AI Agent',
      meta: 'Conversational AI / Backend',
      body: 'Built a voice AI agent using Retell AI, with a knowledge base to answer questions during calls. Connected Google APIs for sending emails and integrated a Twilio phone number. Developed a Python backend to expose APIs for the agent and deployed it on DigitalOcean.',
      tags: ['retell ai', 'python', 'digitalocean', 'twilio', 'google apis'],
      tagsType: 'green'
    },
    {
      title: 'PANDA',
      meta: 'ML / AI · 2024 – Present',
      body: 'EEG-based infant pain detection using a layered ML pipeline. Processed 12,000+ EEG samples and benchmarked CNNs, transformers, and classical ML approaches. Custom architecture achieved 87.3% accuracy.',
      tags: ['python', 'tensorflow', 'pytorch', 'scikit-learn'],
      tagsType: 'purple'
    },
    {
      title: 'Rate My Dost',
      meta: 'Full-Stack · 2025',
      body: 'A social voting platform enabling link sharing and community-driven rankings. Built with Clerk authentication, React + Vite frontend, and FastAPI backend with Neon DB for real-time vote tracking.',
      tags: ['react', 'fastapi', 'neon db', 'clerk'],
      tagsType: 'green',
      link: 'https://ratemydost.hirasajid.dev/'
    },
    {
      title: 'AgriTech Lens',
      meta: 'ML / Computer Vision · 2024',
      body: 'CNN model for plant disease and soil type detection from images. Integrated OpenAI API to generate smart farming recommendations based on model predictions.',
      tags: ['python', 'opencv', 'tensorflow', 'openai'],
      tagsType: 'purple'
    },
    {
      title: 'MoodWave',
      meta: 'ML / Audio · 2024',
      body: 'Speech emotion recognition system trained on 4,000 audio samples across 5 emotion classes. Utilized MFCC feature extraction via Librosa. Achieved 82% accuracy, outperforming baseline models.',
      tags: ['python', 'tensorflow', 'librosa'],
      tagsType: 'purple'
    },
    {
      title: 'Pact AI',
      meta: 'Mobile · 2024',
      body: 'A 7-screen Flutter application for mental wellness and habit tracking. Integrated Gemini API chatbots with custom prompting for guided conversations.',
      tags: ['flutter', 'dart', 'gemini api'],
      tagsType: 'green'
    },
    {
      title: 'Satiate',
      meta: 'Frontend · 2023',
      body: 'Developed 10 responsive pages for donor and NGO workflows as part of a 3-member team. Implemented REST API integration for real-time data synchronization across user roles.',
      tags: ['react', 'rest apis'],
      tagsType: 'green'
    }
  ]
};

export const experienceData = {
  title: 'Experience',
  sub: 'Professional Timeline',
  deco: '⁕',
  entries: [
    {
      title: 'Jr. Software Engineer',
      meta: 'Quest · January 2026 – Present · Islamabad',
      body: 'Building AI-powered workflows, RAG features, API integrations, and deployed services. Work spans automation, real estate data, multimodal AI tools, and integrations across external platforms.',
      highlights: [
        'Built 10+ workflows with n8n and Make.com, alongside LangChain-based AI pipelines, retrieval workflows, and asynchronous LLM jobs using Redis and Celery.',
        'Integrated a wide range of third-party APIs, including MLS real estate feeds, ATTOM, Zoneomics, YouTube Data, Reporting and Analytics APIs, and Mapbox.',
        'Built messaging and account flows with Twilio, Nylas, Resend, Clerk, and Supabase.',
        'Added PDF, Excel, and Word document generation directly inside AI chat experiences, including a RAG application, and worked with Claude-supported citations for grounded responses.',
        'Worked across Claude, DeepSeek, Gemini, JEV, and OpenAI models, as well as Google AI Studio, ElevenLabs, Retell AI, and HeyGen for generative AI features.',
        'Deployed and maintained services on Azure VMs, DigitalOcean, and OVH, using Docker as part of deployment workflows.'
      ],
      toolGroups: [
        { label: 'Web & backend', items: ['React', 'Next.js', 'FastAPI', 'Spring Boot (Java)', 'NestJS'] },
        { label: 'Cloud & deployment', items: ['Azure VM', 'DigitalOcean', 'OVH', 'Docker'] },
        { label: 'APIs & integrations', items: ['MLS feeds', 'ATTOM', 'Zoneomics', 'YouTube APIs', 'Mapbox'] },
        { label: 'Communications & auth', items: ['Twilio', 'Nylas', 'Resend', 'Clerk', 'Supabase'] },
        { label: 'AI & automation', items: ['LangChain', 'RAG', 'n8n', 'Make.com', 'Claude', 'DeepSeek', 'Gemini', 'JEV', 'OpenAI', 'Google AI Studio', 'ElevenLabs', 'Retell AI', 'HeyGen'] }
      ]
    },
    {
      title: 'AI Intern',
      meta: 'Zoomiez.io · June – August 2025 · Islamabad',
      body: 'Processed 200+ academic documents through OCR pipelines. Built automated MCQ explanation and extraction workflows using LLM APIs. Created FAISS retrieval pipelines for 1,000+ pages of textbook content. Tested prompt engineering strategies, improving output consistency by approximately 72%.'
    },
    {
      title: 'BS Computer Science',
      meta: 'National University of Sciences & Technology (NUST) · Islamabad',
      body: 'Specialized in AI/ML, software engineering, and systems design. Completed projects spanning EEG-based pain detection, computer vision, speech recognition, and full-stack application development.'
    }
  ]
};

export const researchData = {
  title: 'Research',
  sub: 'Publications & Ongoing Work',
  deco: '⁕ ❧ ⁕',
  entries: [
    {
      title: 'PANDA: EEG-Based Infant Pain Detection',
      meta: 'Ongoing Research · 2024 – Present',
      body: 'Designed a layered ML pipeline for neonatal pain detection from EEG signals. Benchmarked CNNs, transformer-based models, and classical approaches across 12,000+ samples. Custom-modified architecture achieved 87.3% accuracy and F1-score.'
    }
  ]
};

export const certificationsData = {
  title: 'Certifications',
  sub: 'Professional Development',
  deco: '✦',
  entries: [
    {
      title: 'Deep Learning Specialization',
      meta: 'Coursera · June 2025',
      body: ''
    },
    {
      title: 'Advanced Learning Algorithms',
      meta: 'Coursera · December 2024',
      body: ''
    },
    {
      title: 'Supervised Machine Learning',
      meta: 'Coursera · July 2024',
      body: ''
    }
  ]
};

export const volunteeringData = {
  title: 'Volunteering & Extracurriculars',
  sub: 'Community Engagement',
  deco: '✿',
  entries: [
    {
      title: 'Decor Executive — NCSC, NUST',
      meta: 'Campus Society · September 2024 – May 2025',
      body: ''
    },
    {
      title: 'Volunteer — Shaukat Khanum Hospital',
      meta: 'March 2025',
      body: ''
    },
    {
      title: 'Decor Executive — NUST Cultural Fest',
      meta: 'February 2025',
      body: ''
    },
    {
      title: 'Decor Executive — NEC Eco Carnival',
      meta: 'April 2024',
      body: ''
    },
    {
      title: 'Registration Volunteer — SGA SEECS',
      meta: 'December 2023, October 2024',
      body: ''
    },
    {
      title: 'Usher — SGA SEECS',
      meta: 'May 2024, May 2025',
      body: ''
    },
    {
      title: 'Web Content Writer — Rizq',
      meta: 'August 2020 – February 2021',
      body: ''
    }
  ]
};
