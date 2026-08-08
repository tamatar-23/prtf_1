import React, { useEffect, useState } from 'react';
import { ActivityCalendar, Activity } from 'react-activity-calendar';
import { useTheme } from '@/hooks/use-theme';
import { personal } from '@/lib/data';
import { exactGitHubContributions } from '@/lib/github-data';
import { Github, ExternalLink } from './ui/Icons';

// Custom theme palette matching portfolio's high-contrast editorial grayscale system with enhanced visibility
const customTheme = {
  light: [
    '#E5E5E2', // Level 0: Crisp, visible neutral gray against light surface
    '#A8A7A1', // Level 1: Mid-light gray
    '#706F69', // Level 2: Medium charcoal
    '#3D3C38', // Level 3: Dark charcoal
    '#121211', // Level 4: Deep solid obsidian black
  ],
  dark: [
    '#2B2B28', // Level 0: Distinct dark neutral block against dark surface
    '#52524D', // Level 1: Mid-dark gray
    '#87867E', // Level 2: Medium light gray
    '#C4C3BA', // Level 3: Bright light gray
    '#FFFFFF', // Level 4: Brilliant solid white
  ],
};

export const GitHubActivity: React.FC = () => {
  const { theme } = useTheme();
  const [activities, setActivities] = useState<Activity[]>(exactGitHubContributions.days);
  const [totalCount, setTotalCount] = useState<number>(exactGitHubContributions.total);

  const username = personal.github.split('/').filter(Boolean).pop() || 'tamatar-23';

  useEffect(() => {
    let isMounted = true;

    // Dynamically merge live events from GitHub API if available
    const syncLiveEvents = async () => {
      try {
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events`);
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          if (Array.isArray(events) && events.length > 0) {
            const eventCounts: Record<string, number> = {};

            events.forEach((evt: any) => {
              if (evt.created_at) {
                const dateStr = evt.created_at.split('T')[0];
                eventCounts[dateStr] = (eventCounts[dateStr] || 0) + 1;
              }
            });

            if (isMounted && Object.keys(eventCounts).length > 0) {
              setActivities((prev) => {
                const updated = prev.map((item) => {
                  const liveCount = eventCounts[item.date];
                  if (liveCount) {
                    const newCount = Math.max(item.count, liveCount);
                    const newLevel = Math.min(4, Math.max(1, Math.ceil(newCount / 2))) as 0 | 1 | 2 | 3 | 4;
                    return { ...item, count: newCount, level: newLevel };
                  }
                  return item;
                });
                setTotalCount(updated.reduce((sum, item) => sum + item.count, 0));
                return updated;
              });
            }
          }
        }
      } catch (err) {
        console.warn('Live GitHub event sync skipped:', err);
      }
    };

    syncLiveEvents();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <section id="github" className="py-24 px-6 bg-bg relative z-10 border-b border-border select-none">
      <div className="container mx-auto px-0 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-mono-tech text-text-muted uppercase tracking-wider block mb-1">
              [Open Source Activity]
            </span>
            <h2 className="text-3xl md:text-4xl font-serif-editorial font-normal text-text tracking-tight flex items-center gap-3">
              GitHub Activity
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs md:text-sm font-mono-tech text-text-muted">
              {`${totalCount} GitHub activities in the last year`}
            </span>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-text hover:text-text-muted transition-colors border border-border bg-bg-elevated px-3 py-1.5 rounded-none"
            >
              <Github size={14} />
              <span>@{username}</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Contribution Graph Container */}
        <div className="border border-border bg-bg-elevated dark:bg-[#1C1C1B]/40 p-6 md:p-8 rounded-none transition-all duration-300 relative overflow-x-auto">
          <div className="min-w-[700px] flex justify-center py-2">
            <ActivityCalendar
              data={activities}
              theme={customTheme}
              colorScheme={theme === 'dark' ? 'dark' : 'light'}
              blockSize={12}
              blockMargin={4}
              blockRadius={2}
              fontSize={12}
              labels={{
                months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                totalCount: '{{count}} GitHub activities in the last year',
                legend: {
                  less: 'Less active',
                  more: 'More active',
                },
              }}
              renderBlock={(block, activity) =>
                React.cloneElement(block, {
                  children: (
                    <title>
                      {activity.count === 0
                        ? `No contributions on ${activity.date}`
                        : `${activity.count} contribution${activity.count > 1 ? 's' : ''} on ${activity.date}`}
                    </title>
                  ),
                })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
