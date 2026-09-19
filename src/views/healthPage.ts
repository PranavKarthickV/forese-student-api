import { renderPageLayout } from './layout';

export interface HealthPageOptions {
  status: string;
  timestamp: string;
  uptime: string;
  database: string;
}

/**
 * Renders the browser-friendly Health Dashboard page for GET /api/health.
 */
export const getHealthPageHtml = (options: HealthPageOptions): string => {
  const { status, timestamp, uptime, database } = options;

  const isHealthy = status === 'OK';
  const isDbConnected = database === 'connected';

  const content = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <a href="/" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            &larr; Back to Dashboard
          </a>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;" onclick="fetchHealth()" id="refresh-btn">
            ↻ Refresh Status
          </button>
          <a href="/api/health?format=json" target="_blank" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            Raw JSON &rarr;
          </a>
        </div>
      </div>

      <div style="margin-bottom: 2.25rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
          <h1 style="font-size: 2rem; font-weight: 700; letter-spacing: -0.025em; color: #ffffff;">
            API Health & Diagnostics
          </h1>
          <span class="badge ${isHealthy ? 'badge-api-online' : 'badge-db-disconnected'}" id="status-badge">
            <span class="dot ${isHealthy ? 'dot-cyan' : 'dot-red'}"></span>
            ${status}
          </span>
        </div>
        <p style="font-size: 1rem; color: var(--text-muted);">
          Real-time service health, server uptime, and database connectivity monitoring
        </p>
      </div>

      <!-- Health Metrics Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
        <!-- Server Status -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.5rem;">
            Server Status
          </div>
          <div style="font-size: 1.5rem; font-weight: 700; color: ${isHealthy ? '#22d3ee' : '#f87171'};" id="metric-status">
            ${status}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
            HTTP 200 OK
          </div>
        </div>

        <!-- Database Connection -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.5rem;">
            Database Status
          </div>
          <div style="font-size: 1.5rem; font-weight: 700; color: ${isDbConnected ? '#4ade80' : '#f87171'}; text-transform: capitalize;" id="metric-db">
            ${database}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
            MongoDB Connection
          </div>
        </div>

        <!-- System Uptime -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.5rem;">
            Server Uptime
          </div>
          <div style="font-size: 1.5rem; font-weight: 700; color: #a5b4fc; font-family: 'JetBrains Mono', monospace;" id="metric-uptime">
            ${uptime}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
            Time since last boot
          </div>
        </div>

        <!-- Last Checked -->
        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.5rem;">
            Timestamp
          </div>
          <div style="font-size: 0.95rem; font-weight: 600; color: #f8fafc; font-family: 'JetBrains Mono', monospace; word-break: break-all;" id="metric-timestamp">
            ${timestamp}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">
            ISO 8601 UTC
          </div>
        </div>
      </div>

      <!-- Live JSON Preview -->
      <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <span style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted);">
            API Response Payload
          </span>
          <button class="btn-copy" onclick="copyToClipboard(document.getElementById('json-preview').textContent)">Copy JSON</button>
        </div>
        <pre style="font-family: 'JetBrains Mono', monospace; font-size: 0.825rem; color: #67e8f9; background: rgba(0, 0, 0, 0.4); padding: 1rem; border-radius: 8px; overflow-x: auto;"><code id="json-preview">${JSON.stringify({ status, timestamp, uptime, database }, null, 2)}</code></pre>
      </div>
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

            const statusBadge = document.getElementById('status-badge');
            if (statusBadge) {
              statusBadge.className = 'badge ' + (isHealthy ? 'badge-api-online' : 'badge-db-disconnected');
              statusBadge.innerHTML = '<span class="dot ' + (isHealthy ? 'dot-cyan' : 'dot-red') + '"></span> ' + data.status;
            }

            const metricStatus = document.getElementById('metric-status');
            if (metricStatus) {
              metricStatus.textContent = data.status;
              metricStatus.style.color = isHealthy ? '#22d3ee' : '#f87171';
            }

            const metricDb = document.getElementById('metric-db');
            if (metricDb) {
              metricDb.textContent = data.database;
              metricDb.style.color = isConnected ? '#4ade80' : '#f87171';
            }

            const metricUptime = document.getElementById('metric-uptime');
            if (metricUptime) metricUptime.textContent = data.uptime;

            const metricTimestamp = document.getElementById('metric-timestamp');
            if (metricTimestamp) metricTimestamp.textContent = data.timestamp;

            const jsonPreview = document.getElementById('json-preview');
            if (jsonPreview) jsonPreview.textContent = JSON.stringify(data, null, 2);

            showToast('Health data updated');
          }
        } catch (e) {
          showToast('Failed to refresh health');
        } finally {
          if (btn) btn.textContent = '↻ Refresh Status';
        }
      }

      // Automatically refresh health data every 5 seconds
      setInterval(fetchHealth, 5000);
    </script>
  `;

  return renderPageLayout({
    title: 'API Health',
    activeNav: 'health',
    content,
    extraScripts,
  });
};
