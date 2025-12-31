
export type TopicID = 'dsa' |  'web-dev' | 'cp' | 'gen-ai' | 'ml-dl' | 'system-design' | 'cybersec' | 'gaming' | 'chill';

export type ExpertiseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Topic {
  id: TopicID;
  label: string;
  icon: string;
  color: string;
  description: string;
  liveCount: number;
}

export type ConnectionMode = 'voice' | 'video';

export interface UserProfile {
  name: string;
  avatar: string;
  college: string;
  gradYear: string;
  jobRole?: string;
  headline: string;
  links: {
    github?: string;
    linkedin?: string;
    x?: string;
    website?: string;
  };
  expertise: Record<TopicID, ExpertiseLevel>;
}
