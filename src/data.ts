// Personal information and portfolio content.
// Project visuals are illustrative interface studies.

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  stack: string[];
  theme: 'property' | 'nft' | 'api' | 'analytics';
  description: string;
  detail: string;
  github?: string;
};

export type DeveloperNote = {
  title: string;
  tag: string;
  body: string;
};

/* -------------------------------------------------------------------------- */
/* Personal information                                                       */
/* -------------------------------------------------------------------------- */

export const profile = {
  name: 'Nabeel Ahmad',

  location: 'Paris, France',

  github: 'https://github.com/Nabeel1401',

  linkedin: 'https://www.linkedin.com/in/nabeelahmad14/',

  // Add your email address here to enable the email contact button.
  email: '',

  availability: 'Seeking a 6-month internship · February 2027',
};

/* -------------------------------------------------------------------------- */
/* Selected projects                                                          */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: 'rentease',
    number: '01',
    title: 'RentEase',
    category: 'FULL-STACK WEB APPLICATION',

    stack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
    ],

    theme: 'property',

    description:
      'A full-stack MERN rental platform combining property discovery, ' +
      'smart search filters, pricing recommendations, and reviews ' +
      'in one connected experience.',

    detail:
      'Features include property listings and dealer information, ' +
      'inquiry flows, questionnaire-based Vastu / Feng Shui scoring, ' +
      'and ratings and reviews for tenants, landlords, and properties.',

    github: 'https://github.com/Nabeel1401/rentease',
  },

  {
    id: 'nft',
    number: '02',
    title: 'NFT App',
    category: 'BLOCKCHAIN · FRONTEND DEVELOPMENT',

    stack: [
      'React',
      'MetaMask',
      'Web3',
    ],

    theme: 'nft',

    description:
      'An NFT web application connecting wallet integration, ' +
      'digital collection browsing, and NFT purchase flows.',

    detail:
      'Developed during my Redblox internship as part of a ' +
      'four-person team. I worked on the React frontend, ' +
      'MetaMask wallet integration, and NFT display, ' +
      'collaborating with teammates responsible for backend ' +
      'and blockchain functionality.',

    github: 'https://github.com/Nabeel1401/Nft-App',
  },

  {
    id: 'bench',
    number: '03',
    title: 'Bench',
    category: 'MICROSERVICES · API DEVELOPMENT',

    stack: [
      'FastAPI',
      'React',
      'Docker',
    ],

    theme: 'api',

    description:
      'A microservices project connecting a React interface ' +
      'with Python APIs and a containerized development environment.',

    detail:
      'Explores service separation and API-driven interfaces ' +
      'using FastAPI, React, and Docker. A detailed architecture ' +
      'overview and project repository link will be added ' +
      'in a future update.',
  },

  {
    id: 'anticipa',
    number: '04',
    title: 'Anticipa AI',
    category: 'MACHINE LEARNING · ANALYTICS',

    stack: [
      'Python',
      'XGBoost',
      'SHAP',
    ],

    theme: 'analytics',

    description:
      'An HR analytics project combining predictive modelling ' +
      'with interpretable machine learning results.',

    detail:
      'Uses XGBoost and SHAP to connect predictions with ' +
      'explanations. Further implementation details and ' +
      'verified results will be added to the project case study.',
  },
];

/* -------------------------------------------------------------------------- */
/* Developer notes                                                            */
/* -------------------------------------------------------------------------- */

export const notes: DeveloperNote[] = [
  {
    title: 'From interface to complete product',
    tag: 'FULL-STACK',

    body:
      'I enjoy connecting the visible interface to the data ' +
      'and services behind it. My projects span React interfaces, ' +
      'APIs, databases, and containerized environments. ' +
      'Working across these layers helps me understand ' +
      'how individual features become a complete application.',
  },

  {
    title: 'Making APIs part of the experience',
    tag: 'BACKEND',

    body:
      'The interface and API should work together. ' +
      'My toolkit includes Node.js, Express, FastAPI, ' +
      'and relational and document databases. ' +
      'I am interested in how clear API design supports ' +
      'reliable features and a smoother user experience.',
  },

  {
    title: 'A security-minded approach to development',
    tag: 'PERSPECTIVE',

    body:
      'My Cybersecurity & Cloud Computing studies at ESILV ' +
      'complement my Information Technology background ' +
      'and interest in building web applications. ' +
      'This combination encourages me to consider ' +
      'security alongside functionality and usability.',
  },

  {
    title: 'Build. Refine. Repeat.',
    tag: 'PROCESS',

    body:
      'From a Rust port scanner to full-stack web projects, ' +
      'I learn by turning ideas into working software ' +
      'and improving the details along the way. ' +
      'Each project is an opportunity to explore a tool, ' +
      'solve a problem, and strengthen my development skills.',
  },
];