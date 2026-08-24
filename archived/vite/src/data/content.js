// Every fact here comes from the resume and the previous site. Nothing is
// invented: no employers, no traffic numbers, no rounded-up metrics.

export const profile = {
  name: 'Sankalp Shankar',
  role: 'ML Engineer',
  email: 'sankalpshankar02@gmail.com',
  resume: 'sankalp-shankar-resume.pdf',
  portrait: 'sankalp-shankar.jpeg',
  location: 'Bangalore, India',
}

export const links = [
  { label: 'GitHub', href: 'https://github.com/sankalp-happy' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sankalp-shankar-734007284/' },
  { label: 'LeetCode', href: 'https://leetcode.com/sankalpshankar/' },
  { label: 'Wellfound', href: 'https://wellfound.com/u/sankalp-shankar-1' },
]

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Results', href: '#results' },
  { label: 'Stack', href: '#stack' },
  { label: 'About', href: '#about' },
]

export const leadProjects = [
  {
    id: 'pharmaguard',
    figure: 'Fig. 2',
    name: 'PharmaGuard',
    kind: 'Clinical decision support',
    summary:
      'A genomic VCF file goes in. CPIC-guided prescribing recommendations come out, with an explanation a clinician can actually read.',
    body: [
      'The PharmCAT pipeline calls star alleles from the variant file, a deterministic rule engine scores drug risk against CPIC guidelines, and Llama 3.3 on Groq turns the resulting evidence into clinician-facing language. The model never decides anything. It explains a decision the rule engine already made, which is the only way this is safe to ship.',
      'FastAPI serves the pipeline, React drives the review interface, and the whole thing exports EHR-ready JSON. Containerized with Docker and deployed on AWS.',
    ],
    stack: ['FastAPI', 'React', 'PharmCAT', 'Llama 3.3', 'Groq', 'Docker', 'AWS'],
    facts: [
      ['Input', 'Genomic VCF'],
      ['Output', 'CPIC recommendation + EHR JSON'],
      ['Model role', 'Explanation only, never adjudication'],
    ],
  },
  {
    id: 'switchboard',
    figure: 'Fig. 3',
    name: 'SwitchBoard',
    kind: 'LLM gateway',
    summary:
      'One endpoint in front of OpenAI, Gemini and Groq. When a provider degrades, the request keeps moving.',
    body: [
      'Requests route across providers on a fallback chain with retries, quota monitoring and centralized logging. A provider can be swapped, rate limited or taken out entirely without a single change in application code, because the application never learns which provider answered it.',
      'The interesting part is not the routing. It is that failure has a defined shape: every retry, every downgrade and every quota event lands in one log stream you can actually debug from.',
    ],
    stack: ['Python', 'OpenAI', 'Gemini', 'Groq', 'Fallback chains', 'Observability'],
    facts: [
      ['Providers', 'OpenAI, Gemini, Groq'],
      ['On failure', 'Retry, then next link in the chain'],
      ['Provider swap', 'No application-layer change'],
    ],
  },
  {
    id: 'mediassist',
    figure: 'Fig. 4',
    name: 'MediAssist AI',
    kind: 'Agentic RAG',
    award: 'Runner-up, 48-hour hackathon',
    summary:
      'Retrieval over structured medical knowledge, with an XGBoost layer that puts a confidence number next to every differential.',
    body: [
      'LangChain agents query a vector database for medical context, then an XGBoost model scores the differential diagnosis so the output carries explainable confidence instead of fluent guessing. An NLP feedback loop folds corrections back into retrieval quality.',
      'Built and deployed full-stack inside a 48-hour window, which is most of why the architecture is boring on purpose.',
    ],
    stack: ['LangChain', 'Vector DB', 'OpenAI', 'XGBoost', 'NLP feedback loop'],
    facts: [
      ['Retrieval', 'Vector search over medical knowledge'],
      ['Scoring', 'XGBoost, confidence-weighted'],
      ['Loop', 'Feedback re-ranks future retrieval'],
    ],
  },
]

export const secondaryProjects = [
  {
    name: 'Red Agent',
    kind: 'Autonomous web scanning',
    line: 'FastAPI scanning engine with an orchestrated job lifecycle and Redis-backed state, producing severity-scored vulnerability reports. Modular by design so exploit modules drop in without touching the scheduler.',
    stack: ['FastAPI', 'Redis', 'AWS', 'CI/CD'],
  },
  {
    name: 'VaidyaBot',
    kind: 'Chat and voice appointments',
    award: '1st place, state level',
    line: 'End-to-end appointment system driven by chat and voice, with LLM workflows for patient ID generation and a doctor dashboard backed by retrieval.',
    stack: ['LLM workflows', 'Voice', 'RAG'],
  },
  {
    name: 'Nirpeksha',
    kind: 'News bias mitigation',
    award: '3rd place, zonal',
    line: 'A news aggregator that labels articles for political bias and tracks a reader’s consumption pattern to surface the echo chamber they are sitting in.',
    stack: ['LLM', 'Bias detection', 'Fact-checking'],
  },
]

export const indexProjects = [
  {
    name: 'Hybrid Semantic Search Engine',
    line: 'FAISS semantic search fused with TF-IDF keyword scoring for PDF retrieval, behind a Streamlit interface.',
  },
  {
    name: 'Groundwater Level Predictor',
    line: 'Regression, random forest and neural models forecasting groundwater levels at over 95% accuracy, served full-stack.',
  },
  {
    name: 'Neural Network from Scratch',
    line: 'Dropout regularization reimplemented from the paper up, in Python and NumPy only, with the original figures reproduced.',
  },
]

export const results = [
  { result: '1st place', event: 'Hackathon, state level', detail: 'VaidyaBot' },
  { result: 'Runner-up', event: '48-hour hackathon', detail: 'MediAssist AI' },
  { result: '3rd place', event: 'Hackathon, zonal level', detail: 'Nirpeksha' },
  { result: '2 titles', event: 'National AI Ideathon', detail: '' },
  { result: 'Overall champions', event: 'XActitude Tech Fest', detail: 'Kristu Jayanti College' },
  { result: 'Gold', event: 'Tech Quiz and CTF', detail: '' },
  { result: 'Silver', event: 'SQL competition', detail: '' },
  { result: '3rd place', event: 'Code Relay and Prompt Engineering', detail: 'HackerRank' },
]

export const leadership = [
  {
    role: 'Event Head, Tech Habba',
    period: '2024',
    line: 'Led every departmental committee across a 3-day institute-wide technical festival: operations, sponsorship, marketing, logistics and budget.',
  },
  {
    role: 'Vice President, The Big O Tech Club',
    period: '2023 to present',
    line: 'Runs a 2-day annual techfest for 500+ participants, mentors junior developers, and handles industry outreach.',
  },
]

export const certifications = [
  {
    name: 'Deep Learning',
    issuer: 'NPTEL, IIT Ropar',
    detail: '84% across a 12-week course',
  },
  {
    name: 'Front-End Developer Professional Certificate',
    issuer: 'Meta',
    detail: '9 courses with capstone',
  },
]

export const stack = [
  {
    group: 'Languages and frameworks',
    items: ['Python', 'JavaScript', 'React and Next.js', 'FastAPI', 'Node.js and Express', 'HTML and CSS'],
  },
  {
    group: 'AI and LLM',
    items: ['OpenAI', 'Gemini', 'LangChain', 'RAG and vector databases', 'PyTorch', 'TensorFlow', 'XGBoost', 'scikit-learn', 'NLTK'],
  },
  {
    group: 'Data and storage',
    items: ['NumPy', 'Pandas', 'SQL', 'MongoDB', 'Redis', 'FAISS'],
  },
  {
    group: 'Cloud and tooling',
    items: ['AWS', 'Docker', 'CI/CD', 'Git and GitHub', 'Jupyter', 'VS Code'],
  },
]

export const education = {
  degree: 'BE, Artificial Intelligence and Machine Learning',
  school: 'Acharya Institute of Technology, Bangalore',
  grade: 'SGPA 8.7 / 10.0',
  graduation: 'Expected July 2027',
}

export const codeStats = [
  { label: 'LeetCode rating', value: '~1600' },
  { label: 'Problems solved', value: '260+' },
]

export const interests = [
  'Retrieval systems',
  'LLM evaluation',
  'Inference cost',
  'Full-stack ML',
  'Startups',
  'Coffee',
]
