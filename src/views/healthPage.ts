import { renderPageLayout } from './layout';

export interface HealthPageOptions {
  status: string;
  timestamp: string;
  uptime: string;
  database: string;
}

/**
 * Renders the Editorial + Creative Tech Health Diagnostics page for GET /api/health.
 */
export const getHealthPageHtml = (options: HealthPageOptions): string => {
  const { status, timestamp, uptime, database } = options;

  const isHealthy = status === 'OK';
  const isDbConnected = database === 'connected';

  const content = `
    <!-- Top Header -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-bottom: 2rem; border-bottom: 1px solid var(--border-line); margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem;">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-indigo); margin-bottom: 0.75rem;">
          // SYSTEM DIAGNOSTICS
        </div>
        <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 3rem; font-weight: 700; line-height: 1; letter-spacing: -0.04em; color: #ffffff; text-transform: uppercase; margin-bottom: 0.5rem;">
          HEALTH STATUS
        </h1>
        <p style="font-size: 0.95rem; color: var(--text-muted);">
          Operational telemetry and database availability.
        </p>
      </div>

      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <button class="btn btn-secondary" onclick="fetchHealth()" id="refresh-btn">
          ↻ Refresh
        </button>
        <a href="/api/health?format=json" target="_blank" class="btn btn-secondary">
          Raw JSON &rarr;
        </a>
      </div>
    </div>

    <!-- Health Metrics Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-line); border-radius: var(--radius); padding: 1.25rem 1.5rem;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.5rem;">
          API STATUS
        </div>
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: ${isHealthy ? 'var(--status-green)' : 'var(--status-red)'};" id="metric-status">
          ${status}
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-line); border-radius: var(--radius); padding: 1.25rem 1.5rem;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.5rem;">
          DATABASE
        </div>
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: ${isDbConnected ? 'var(--status-green)' : 'var(--status-red)'}; text-transform: uppercase;" id="metric-db">
          ${database}
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-line); border-radius: var(--radius); padding: 1.25rem 1.5rem;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.5rem;">
          UPTIME
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.75rem; font-weight: 700; color: var(--text-main);" id="metric-uptime">
          ${uptime}
        </div>
      </div>

      <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-line); border-radius: var(--radius); padding: 1.25rem 1.5rem;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin-bottom: 0.5rem;">
          TIMESTAMP (UTC)
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-muted); word-break: break-all; margin-top: 0.35rem;" id="metric-timestamp">
          ${timestamp}
        </div>
      </div>
    </div>

    <!-- JSON Preview Section -->
    <div>
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
        <span>// RAW JSON OUTPUT</span>
        <button class="btn btn-ghost" style="font-size: 0.75rem;" onclick="copyToClipboard(document.getElementById('json-preview').textContent)">Copy Output</button>
      </div>
      <pre style="font-family: 'JetBrains Mono', monospace; font-size: 0.825rem; color: var(--text-muted); background: var(--bg-surface); padding: 1.25rem; border: 1px solid var(--border-line); border-radius: var(--radius); overflow-x: auto; margin: 0;"><code id="json-preview">${JSON.stringify({ status, timestamp, uptime, database }, null, 2)}</code></pre>
    </div>
  `;

  const extraScripts = `
    <script>
      async function fetchHealth() {
        const btn = document.getElementById('refresh-btn');
        if (btn) btn.textContent = 'Refreshing...';
        try {
          const res = await fetch('/api/health', { headers: { 'Accept': 'application/json' } });
          if (res.ok) {
            const data = await res.json();
            const isHealthy = data.status === 'OK';
            const isConnected = data.database === 'connected';

            const metricStatus = document.getElementById('metric-status');
            if (metricStatus) {
              metricStatus.textContent = data.status;
              metricStatus.style.color = isHealthy ? 'var(--status-green)' : 'var(--status-red)';
            }

            const metricDb = document.getElementById('metric-db');
            if (metricDb) {
              metricDb.textContent = data.database.toUpperCase();
              metricDb.style.color = isConnected ? 'var(--status-green)' : 'var(--status-red)';
            }

            const metricUptime = document.getElementById('metric-uptime');
            if (metricUptime) metricUptime.textContent = data.uptime;

            const metricTimestamp = document.getElementById('metric-timestamp');
            if (metricTimestamp) metricTimestamp.textContent = data.timestamp;

            const jsonPreview = document.getElementById('json-preview');
            if (jsonPreview) jsonPreview.textContent = JSON.stringify(data, null, 2);

            showToast('Diagnostics refreshed');
          }
        } catch (e) {
          showToast('Failed to refresh');
        } finally {
          if (btn) btn.textContent = '↻ Refresh';
        }
      }

      setInterval(fetchHealth, 10000);
    </script>
  `;

  return renderPageLayout({
    title: 'Health',
    activeNav: 'health',
    content,
    extraScripts,
  });
};
