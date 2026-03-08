export interface Prompt {
  id: string;
  title: string;
  seller: string;
  platform: string;
  category: string;
  price: number;
  rating: number;
  sales: number;
  images: string[];
  preview: string;
  tagline: string;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  coins: number;
}

export const prompts: Prompt[] = [
  {
    id: "1",
    title: "Viral LinkedIn Post Generator",
    seller: "marketing_ai",
    platform: "ChatGPT",
    category: "Marketing",
    price: 50,
    rating: 4.8,
    sales: 140,
    images: [
      "https://images.unsplash.com/photo-1556157382-97eda2d62296",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0"
    ],
    preview:
      "Write a viral LinkedIn post about [topic] using storytelling, curiosity hook, and emotional ending.",
    tagline: "Generate posts that actually drive engagement and leads.",
  },

  {
    id: "2",
    title: "Cinematic Product Photography Prompt",
    seller: "design_guru",
    platform: "Midjourney",
    category: "Design",
    price: 70,
    rating: 4.7,
    sales: 92,
    images: [
      "https://images.unsplash.com/photo-1512499617640-c2f999098c01",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    ],
    preview:
      "Ultra realistic cinematic product photography of [product] with studio lighting and dramatic shadows.",
    tagline: "Studio-quality product shots without the studio cost.",
  },

  {
    id: "3",
    title: "React Component Generator",
    seller: "avneesh",
    platform: "ChatGPT",
    category: "Development",
    price: 60,
    rating: 4.9,
    sales: 210,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    ],
    preview:
      "Generate a production-ready React component for [feature] using TypeScript and Tailwind.",
    tagline: "Ship features faster with pre-architected React components.",
  },

  {
    id: "4",
    title: "Startup Landing Page Copy Prompt",
    seller: "copy_ai",
    platform: "Claude",
    category: "Marketing",
    price: 45,
    rating: 4.6,
    sales: 80,
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8"
    ],
    preview:
      "Write high converting landing page copy for a SaaS startup with problem, solution, and CTA.",
    tagline: "Copy that converts visitors into paying customers.",
  },

  {
    id: "5",
    title: "AI Art Fantasy Prompt",
    seller: "ai_artist",
    platform: "Midjourney",
    category: "Design",
    price: 55,
    rating: 4.8,
    sales: 150,
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead"
    ],
    preview:
      "Create fantasy artwork of [character] in magical forest with cinematic lighting and ultra detail.",
    tagline: "Unleash your imagination with hyper-detailed fantasy art.",
  },

  {
    id: "6",
    title: "SQL Query Master Prompt",
    seller: "data_whiz",
    platform: "ChatGPT",
    category: "Development",
    price: 35,
    rating: 4.5,
    sales: 65,
    images: [
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67"
    ],
    preview: "Generate complex SQL queries for [schema] optimized for snowflake and postgres.",
    tagline: "Stop struggling with nested joins. Let AI write your SQL.",
  },

  {
    id: "7",
    title: "3D Isometric Scene Generator",
    seller: "blender_pro",
    platform: "Midjourney",
    category: "Design",
    price: 85,
    rating: 4.9,
    sales: 45,
    images: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2"
    ],
    preview: "Isometric 3D render of [room] with soft lighting and clay texture, pastel colors.",
    tagline: "Perfect isometric assets for your next app or website.",
  },

  {
    id: "8",
    title: "Email Marketing Sequences",
    seller: "growth_hacker",
    platform: "Claude",
    category: "Marketing",
    price: 40,
    rating: 4.7,
    sales: 110,
    images: [
      "https://images.unsplash.com/photo-1557200134-90327ee9fafa",
      "https://images.unsplash.com/photo-1557200134-9602ad7097c7"
    ],
    preview: "Write a 7-day email nurture sequence for [product] focusing on benefits and FOMO.",
    tagline: "Emails that people actually enjoy reading and clicking.",
  },

  {
    id: "9",
    title: "Logo Concept Brainstormer",
    seller: "brand_smith",
    platform: "ChatGPT",
    category: "Design",
    price: 25,
    rating: 4.4,
    sales: 230,
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d",
      "https://images.unsplash.com/photo-1626785774625-ddc7c82a1e5c"
    ],
    preview: "Generate 10 unique logo concepts for [brand name] in [industry] with color palettes.",
    tagline: "Never stare at a blank canvas again. Get instant logo ideas.",
  },

  {
    id: "10",
    title: "Python Automation Scripts",
    seller: "avneesh",
    platform: "ChatGPT",
    category: "Development",
    price: 95,
    rating: 5.0,
    sales: 12,
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
    ],
    preview: "Create a Python script to automate [task] using selenium and pandas.",
    tagline: "Turn manual drudgery into automated engineering excellence.",
  }
];

export const users: User[] = [
  {
    id: "u1",
    username: "avneesh",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "Full stack developer and AI prompt engineer",
    coins: 250
  },
  {
    id: "u2",
    username: "design_guru",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Midjourney prompt creator",
    coins: 600
  },
  {
    id: "u3",
    username: "marketing_ai",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "AI marketing strategist",
    coins: 120
  }
];
