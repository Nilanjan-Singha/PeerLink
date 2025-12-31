"use client";

import React from 'react';
import { Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Topic } from '@/types';
import { getIcon } from '@/constants';

interface TopicCardProps {
  topic: Topic;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const { selectedTopicId, toggleTopic } = useApp();

  // Derive selection state directly from Context
  const isSelected = selectedTopicId === topic.id;

  return (
    <button
      onClick={() => toggleTopic(topic.id)}
      style={{ backgroundColor: topic.color }} // Ensure your Topic type has 'color'
      className={`w-full
        relative group flex flex-col p-6 h-52 rounded-3xl transition-all duration-300 text-left overflow-hidden
        ${isSelected 
          ? 'ring-[6px] ring-[#7c3aed] ring-offset-[3px] ring-offset-[#000000] z-10 scale-[1.02]' 
          : 'hover:brightness-110 active:scale-95 shadow-lg'}
      `}
    >
      {/* Background Icon SVG */}
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform rotate-12 group-hover:rotate-0">
        {getIcon(topic.icon, "w-40 h-40")}
      </div>

      {/* Live Badge */}
      <div className="relative z-10 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit flex items-center gap-2 border border-white/5 mb-4">
        <Users className="w-3 h-3 text-white/70" />
        <span className="text-[10px] font-bold text-white tracking-wider">{topic.liveCount} live</span>
      </div>
      
      <div className="mt-auto relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform">
            {getIcon(topic.icon, "w-5 h-5 text-white")}
          </div>
          <h3 className="font-heading font-bold text-xl leading-tight text-white">
            {topic.label}
          </h3>
        </div>
        <p className="text-white/60 text-xs font-medium line-clamp-2 max-w-[90%]">
          {topic.description}
        </p>
      </div>
    </button>
  );
};

export default TopicCard;
