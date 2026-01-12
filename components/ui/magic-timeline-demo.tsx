import React from 'react';
import MagicTimeline, { TimelineItem } from './magic-timeline';

const MagicTimelineDemo = () => {
  // Sample timeline data
  const timelineItems: TimelineItem[] = [
    {
      id: '1',
      date: '2024-01-15',
      title: 'Started Learning React',
      description: 'Began my journey into React development with the official documentation and tutorials.',
      category: 'Education',
      status: 'completed'
    },
    {
      id: '2',
      date: '2024-03-20',
      title: 'First Portfolio Website',
      description: 'Built my first portfolio website using HTML, CSS, and vanilla JavaScript.',
      category: 'Project',
      status: 'completed'
    },
    {
      id: '3',
      date: '2024-06-10',
      title: 'Advanced JavaScript Course',
      description: 'Completed an advanced JavaScript course covering ES6+, async programming, and design patterns.',
      category: 'Education',
      status: 'completed'
    },
    {
      id: '4',
      date: '2024-08-25',
      title: 'Frontend Developer Position',
      description: 'Started working as a Frontend Developer at TechCorp, focusing on React and TypeScript.',
      category: 'Career',
      status: 'completed'
    },
    {
      id: '5',
      date: '2024-11-01',
      title: 'Open Source Contribution',
      description: 'Made my first significant open source contribution to a popular React component library.',
      category: 'Contribution',
      status: 'in-progress'
    },
    {
      id: '6',
      date: '2025-01-15',
      title: 'Senior Developer Goals',
      description: 'Planning to advance to senior developer role and mentor junior developers.',
      category: 'Career',
      status: 'upcoming'
    },
    {
      id: '7',
      date: '2025-03-01',
      title: 'Technical Lead Aspirations',
      description: 'Aspiring to take on technical leadership responsibilities and architectural decisions.',
      category: 'Career',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Magic Timeline Demo
        </h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Vertical Timeline</h2>
          <MagicTimeline
            items={timelineItems}
            orientation="vertical"
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            glowColor="132, 0, 255"
            particleCount={8}
            spotlightRadius={300}
          />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Horizontal Timeline</h2>
          <MagicTimeline
            items={timelineItems.slice(0, 5)} // Show fewer items for horizontal layout
            orientation="horizontal"
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            enableSpotlight={true}
            glowColor="59, 130, 246" // Blue glow
            particleCount={6}
            spotlightRadius={250}
          />
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white mb-4">Minimal Timeline</h2>
          <MagicTimeline
            items={timelineItems.slice(0, 3)}
            orientation="vertical"
            disableAnimations={false}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={false}
            enableSpotlight={false}
            glowColor="34, 197, 94" // Green glow
            particleCount={4}
          />
        </div>
      </div>
    </div>
  );
};

export default MagicTimelineDemo;