import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateGitHubContributions() {
  const username = 'tamatar-23';
  console.log(`Fetching GitHub contribution graph for @${username}...`);

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch contributions, HTTP status ${res.status}`);
    }

    const html = await res.text();
    const dayMap = {};

    const tds = html.match(/<td[^>]*class=\x22ContributionCalendar-day\x22[^>]*>/g) || [];
    for (const td of tds) {
      const id = td.match(/id=\x22([^\x22]+)\x22/)?.[1];
      const date = td.match(/data-date=\x22([^\x22]+)\x22/)?.[1];
      const levelStr = td.match(/data-level=\x22([^\x22]+)\x22/)?.[1];
      if (id && date) {
        dayMap[id] = { date, level: parseInt(levelStr || '0', 10), count: 0 };
      }
    }

    const tooltips = html.match(/<tool-tip[^>]*for=\x22([^\x22]+)\x22[^>]*>([^<]+)<\/tool-tip>/g) || [];
    for (const tt of tooltips) {
      const forId = tt.match(/for=\x22([^\x22]+)\x22/)?.[1];
      const text = tt.match(/<tool-tip[^>]*>([^<]+)<\/tool-tip>/)?.[1];
      if (forId && text && dayMap[forId]) {
        const countMatch = text.match(/^(\d+|No)\s+contribution/i);
        if (countMatch) {
          dayMap[forId].count = countMatch[1] === 'No' ? 0 : parseInt(countMatch[1], 10);
        }
      }
    }

    let days = Object.values(dayMap).sort((a, b) => a.date.localeCompare(b.date));

    if (days.length === 0) {
      throw new Error('No contribution days parsed from HTML output.');
    }

    // Auto-pad missing days up to today if needed
    const lastDateStr = days[days.length - 1].date;
    const todayStr = new Date().toISOString().split('T')[0];

    if (lastDateStr < todayStr) {
      let currentDate = new Date(lastDateStr);
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      const targetDate = new Date(todayStr);

      while (currentDate <= targetDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        days.push({ date: dateStr, count: 0, level: 0 });
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
      }
    }

    // Remove any items without date property
    days = days.map(({ date, count, level }) => ({ date, count, level }));
    const total = days.reduce((sum, d) => sum + d.count, 0);

    const tsContent = `import { Activity } from 'react-activity-calendar';

// Exact contribution dataset extracted from @${username} GitHub profile matching actual activity
export const exactGitHubContributions: { total: number; days: Activity[] } = ${JSON.stringify(
      { total, days },
      null,
      2
    )};
`;

    const targetFilePath = path.resolve(__dirname, '../src/lib/github-data.ts');
    fs.writeFileSync(targetFilePath, tsContent, 'utf-8');
    console.log(`Successfully updated ${targetFilePath} with ${days.length} days (${total} total contributions).`);
  } catch (err) {
    console.error('Error fetching/updating GitHub contributions:', err);
    process.exit(1);
  }
}

updateGitHubContributions();
