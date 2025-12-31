
import React from 'react';
import { 
  Code2, 
  Terminal, 
  Trophy, 
  Sparkles, 
  BrainCircuit, 
  ShieldAlert, 
  Gamepad2, 
  Coffee,
  Layout
} from 'lucide-react';

import type { Topic, UserProfile, TopicID, ExpertiseLevel } from '../types/index';

export const TOPICS: Topic[] = [
  {
    id: 'dsa',
    label: 'Data Structures & Algo',
    icon: 'Terminal',
    color: '#2C2C6A',
    description: 'LeetCode grind, Mock interviews',
    liveCount: 234
  },
    {
    id: 'web-dev',
    label: 'Web Dev',
    icon: 'Code2',
    color: '#1C418C',
    description: 'React, Next.js',
    liveCount: 89
  },
  {
    id: 'system-design',
    label: 'System Design',
    icon: 'Layout',
    color: '#05432D',
    description: 'HLD, LLD, Scalability discussions',
    liveCount: 156
  },
  {
    id: 'cp',
    label: 'Comp. Prog',
    icon: 'Trophy',
    color: '#7A162B',
    description: 'Codeforces, CC',
    liveCount: 112
  },
  {
    id: 'gen-ai',
    label: 'GenAI',
    icon: 'Sparkles',
    color: '#4B148E',
    description: 'LLMs, Agents',
    liveCount: 430
  },
  {
    id: 'ml-dl',
    label: 'ML / DL',
    icon: 'BrainCircuit',
    color: '#253448',
    description: 'Research, Models',
    liveCount: 67
  },
  {
    id: 'cybersec',
    label: 'CyberSec',
    icon: 'ShieldAlert',
    color: '#262626',
    description: 'CTFs, Pentesting',
    liveCount: 45
  },
  {
    id: 'gaming',
    label: 'Gaming',
    icon: 'Gamepad2',
    color: '#598211',
    description: 'Valo, CS2',
    liveCount: 210
  },
  {
    id: 'chill',
    label: 'Just Chill',
    icon: 'Coffee',
    color: '#B3410E',
    description: 'Rant, Career talk, Off-topic banter',
    liveCount: 340
  }
];

export const getIcon = (iconName: string, className?: string) => {
  switch (iconName) {
    case 'Code2': return <Code2 className={className} />;
    case 'Terminal': return <Terminal className={className} />;
    case 'Trophy': return <Trophy className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'BrainCircuit': return <BrainCircuit className={className} />;
    case 'ShieldAlert': return <ShieldAlert className={className} />;
    case 'Gamepad2': return <Gamepad2 className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Layout': return <Layout className={className} />;
    default: return null;
  }
};

export const INITIAL_PROFILE: UserProfile = {
  name: "Aryan Kumar",
  avatar: "https://picsum.photos/seed/engineer-aryan/100/100",
  college: "Indian Institute of Technology",
  gradYear: "2024",
  headline: "Frontend Wizard & Competitive Programmer",
  jobRole: "Fullstack Developer Intern",
  links: {
    github: "github.com/aryan",
    linkedin: "linkedin.com/in/aryan",
    x: "x.com/aryan_dev"
  },
  expertise: TOPICS.reduce((acc, topic) => {
    acc[topic.id] = 'Intermediate';
    return acc;
  }, {} as Record<TopicID, ExpertiseLevel>)
};