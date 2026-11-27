import React, { useEffect, useState } from 'react';
import { ActivityCalendar, Activity } from 'react-activity-calendar';
import { ArrowUpRight, GithubLogo } from '@phosphor-icons/react';
import { useTheme } from '@/hooks/use-theme';
import { personal } from '@/lib/data';
import { exactGitHubContributions } from '@/lib/github-data';
import { Reveal } from '@/components/ui/Reveal';

const customTheme = {
  light: ['#EAEAE7', '#B8B8B2', '#82827C', '#4A4A46', '#141413'],
  dark: ['#242422', '#494945', '#787872', '#B5B5AE', '#F2F2F0'],
};

const ensureDaysUpToToday = (baseDays: Activity[]): Activity[] => {
  if (!baseDays || baseDays.length === 0) return baseDays;

  const result = [...baseDays];
  const lastEntry = result[result.length - 1];
  const todayStr = new Date().toISOString().split('T')[0];

  if (lastEntry.date >= todayStr) {
    return result;
  }

  const currentDate = new Date(lastEntry.date);
  currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  const targetDate = new Date(todayStr);

  while (currentDate <= targetDate) {
    result.push({
      date: currentDate.toISOString().split('T')[0],
      count: 0,
      level: 0,
    });
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }

  return result;
};

const initialDays = ensureDaysUpToToday(exactGitHubContributions.days);
const initialTotal = initialDays.reduce((sum, item) => sum + item.count, 0);

interface CalendarCanvasProps {
  data: Activity[];
  colorScheme: 'light' | 'dark';
}

const MemoizedCalendar = React.memo<CalendarCanvasProps>(
  ({ data, colorScheme }) => (
    <ActivityCalendar
      data={data}
      theme={customTheme}
      colorScheme={colorScheme}
      blockSize={12}
      blockMargin={4}
      blockRadius={2}
      fontSize={12}
      labels={{
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        totalCount: '{{count}} contributions in the last year',
        legend: {
          less: 'Less',
          more: 'More',
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
  )
);

MemoizedCalendar.displayName = 'MemoizedCalendar';

export const GitHubActivity: React.FC = () => {
  const { theme } = useTheme();
  const [activities, setActivities] = useState<Activity[]>(initialDays);
  const [totalCount, setTotalCount] = useState<number>(initialTotal);

  const username = personal.github.split('/').filter(Boolean).pop() || 'tamatar-23';

  useEffect(() => {
    let isMounted = true;

    const syncLiveEvents = async () => {
      try {
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events`);
        if (!eventsRes.ok) return;

        const events = await eventsRes.json();
        if (!Array.isArray(events) || events.length === 0) return;

        const eventCounts: Record<string, number> = {};
        events.forEach((evt: { created_at?: string }) => {
          if (evt.created_at) {
            const dateStr = evt.created_at.split('T')[0];
            eventCounts[dateStr] = (eventCounts[dateStr] || 0) + 1;
          }
        });

        if (!isMounted || Object.keys(eventCounts).length === 0) return;

        setActivities((prev) => {
          let changed = false;
          const updated = prev.map((item) => {
            const liveCount = eventCounts[item.date];
            if (liveCount && liveCount > item.count) {
              changed = true;
              const newLevel = Math.min(4, Math.max(1, Math.ceil(liveCount / 2))) as
                | 0
                | 1
                | 2
                | 3
                | 4;
              return { ...item, count: liveCount, level: newLevel };
            }
            return item;
          });

          if (!changed) return prev;
          setTotalCount(updated.reduce((sum, item) => sum + item.count, 0));
          return updated;
        });
      } catch {
        // Static build-time dataset already provides full fallback coverage.
      }
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof idleWindow.requestIdleCallback === 'function') {
      const id = idleWindow.requestIdleCallback(() => {
        void syncLiveEvents();
      }, { timeout: 2500 });
      return () => {
        isMounted = false;
        idleWindow.cancelIdleCallback?.(id);
      };
    }

    const timer = window.setTimeout(() => {
      void syncLiveEvents();
    }, 1500);

    return () => {
      isMounted = false;
      window.clearTimeout(timer);
    };
  }, [username]);

  return (
    <section id="github" className="cv-auto border-b border-border bg-bg py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-medium tracking-tight text-text md:text-3xl">
                Open Source
              </h2>
              <p className="mt-1 font-mono text-xs text-text-muted">
                {`${totalCount} contributions in the last year`}
              </p>
            </div>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-1.5 rounded-md border border-border bg-bg-elevated px-3 py-1.5 font-mono text-xs text-text transition-colors duration-150 hover:bg-bg-warm active:scale-[0.98]"
            >
              <GithubLogo size={14} weight="regular" />
              <span>@{username}</span>
              <ArrowUpRight size={13} weight="regular" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="overflow-x-auto rounded-md border border-border bg-bg-elevated p-6 md:p-8">
            <div className="flex min-w-[700px] justify-center py-1">
              <MemoizedCalendar
                data={activities}
                colorScheme={theme === 'dark' ? 'dark' : 'light'}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default GitHubActivity;
