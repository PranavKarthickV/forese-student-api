import { renderPageLayout } from './layout';

export interface LandingPageOptions {
  isDbConnected: boolean;
  port: number | string;
}

/**
 * Renders the root API dashboard page.
 */
export const getLandingPageHtml = (options: LandingPageOptions): string => {
  const { isDbConnected, port } = options;

  const dbStatusClass = isDbConnected ? 'badge-db-connected' : 'badge-db-disconnected';
  const dbStatusLabel = isDbConnected ? 'MongoDB Connected' : 'MongoDB Disconnected';
  const dbDotColor = isDbConnected ? 'dot-green' : 'dot-red';

  const content = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <span class="badge badge-api-online">
            <span class="dot dot-cyan"></span>
            API ONLINE
          </span>
          <span class="badge ${dbStatusClass}" id="db-badge">
            <span class="dot ${dbDotColor}" id="db-dot"></span>
            <span id="db-label">${dbStatusLabel}</span>
          </span>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem; background: rgba(15, 23, 42, 0.7); border: 1px solid var(--border-subtle); padding: 0.35rem 0.85rem; border-radius: 8px;">
          <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em;">Base URL:</span>
          <code style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--accent-cyan-light);" id="base-url-text">http://localhost:${port}</code>
          <button class="btn-copy" onclick="copyToClipboard(window.location.origin)" title="Copy Base URL">Copy</button>
        </div>
      </div>

      <div style="margin-bottom: 2.5rem;">
        <h1 style="font-size: 2.25rem; font-weight: 700; letter-spacing: -0.025em; line-height: 1.2; background: linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #67e8f9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem;">
          Student Records API
        </h1>
        <p style="font-size: 1.1rem; color: var(--text-muted); margin-bottom: 0.85rem;">
          REST API for managing student records
        </p>
        <p style="font-size: 0.925rem; color: var(--text-dim); max-width: 720px; line-height: 1.6;">
          A production-ready RESTful backend built with Node.js, Express 5, TypeScript, and MongoDB.
          Provides complete CRUD operations, schema validation, roll number uniqueness, and real-time health diagnostics.
        </p>
      </div>

      <!-- Quick Navigation Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-bottom: 2.5rem;">
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem; transition: all 0.2s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span style="font-weight: 600; font-size: 0.95rem; color: #ffffff;">System Health</span>
            <span class="method method-get">GET</span>
          </div>
          <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            Inspect server uptime, operational status, and database connectivity.
          </p>
          <a href="/api/health" class="btn btn-secondary" style="width: 100%; justify-content: center; font-size: 0.8rem;">
            Open Health Dashboard &rarr;
          </a>
        </div>

        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem; transition: all 0.2s ease;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;">
            <span style="font-weight: 600; font-size: 0.95rem; color: #ffffff;">Student Records</span>
            <span class="method method-get">GET</span>
          </div>
          <p style="font-size: 0.825rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            Browse, search, and filter student records in a visual dashboard.
          </p>
          <a href="/api/students" class="btn btn-primary" style="width: 100%; justify-content: center; font-size: 0.8rem;">
            Open Student Records &rarr;
          </a>
        </div>
      </div>

      <!-- API Documentation Section -->
      <div style="margin-bottom: 2rem;">
        <div style="font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-cyan); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          API Endpoints Reference
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.65rem;">
          <!-- GET /api/health -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
              <span class="method method-get">GET</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-main); font-weight: 500;">/api/health</span>
              <span style="font-size: 0.825rem; color: var(--text-dim);">System health & database status</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <a href="/api/health" class="btn-test">Open</a>
              <button class="btn-copy" onclick="copyToClipboard('/api/health')">Copy</button>
            </div>
          </div>

          <!-- GET /api/students -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
              <span class="method method-get">GET</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-main); font-weight: 500;">/api/students</span>
              <span style="font-size: 0.825rem; color: var(--text-dim);">Retrieve all student records</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <a href="/api/students" class="btn-test">Open</a>
              <button class="btn-copy" onclick="copyToClipboard('/api/students')">Copy</button>
            </div>
          </div>

          <!-- POST /api/students -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
              <span class="method method-post">POST</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-main); font-weight: 500;">/api/students</span>
              <span style="font-size: 0.825rem; color: var(--text-dim);">Create a new student record</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="btn-copy" onclick="copyToClipboard('/api/students')">Copy</button>
            </div>
          </div>

          <!-- GET /api/students/:id -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
              <span class="method method-get">GET</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-main); font-weight: 500;">/api/students/:id</span>
              <span style="font-size: 0.825rem; color: var(--text-dim);">Retrieve student record by ID</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="btn-copy" onclick="copyToClipboard('/api/students/:id')">Copy</button>
            </div>
          </div>

          <!-- PUT /api/students/:id -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
              <span class="method method-put">PUT</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-main); font-weight: 500;">/api/students/:id</span>
              <span style="font-size: 0.825rem; color: var(--text-dim);">Update student record by ID</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="btn-copy" onclick="copyToClipboard('/api/students/:id')">Copy</button>
            </div>
          </div>

          <!-- DELETE /api/students/:id -->
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1rem; background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 10px; gap: 1rem; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 0.85rem; flex: 1; min-width: 250px;">
              <span class="method method-delete">DELETE</span>
              <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.875rem; color: var(--text-main); font-weight: 500;">/api/students/:id</span>
              <span style="font-size: 0.825rem; color: var(--text-dim);">Delete student record by ID</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button class="btn-copy" onclick="copyToClipboard('/api/students/:id')">Copy</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Data Model Schema -->
      <div style="background: rgba(15, 23, 42, 0.5); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
        <div style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); margin-bottom: 0.75rem;">
          Student Data Model
        </div>
        <pre style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #a5b4fc; background: rgba(0, 0, 0, 0.4); padding: 1rem; border-radius: 8px; overflow-x: auto;"><code>{
  "name": "string (required)",
  "rollNumber": "string (required, unique, uppercase)",
  "department": "string (required)",
  "year": "number (required, integer 1 - 4)"
}</code></pre>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      // Update Base URL text dynamically if running on a custom host/port
      const baseUrlElem = document.getElementById('base-url-text');
      if (baseUrlElem && window.location.origin) {
        baseUrlElem.textContent = window.location.origin;
      }

      // Dynamic client-side health polling
      async function checkHealth() {
        try {
          const res = await fetch('/api/health', { headers: { 'Accept': 'application/json' } });
          if (res.ok) {
            const data = await res.json();
            const isConnected = data.database === 'connected';
            const badge = document.getElementById('db-badge');
            const dot = document.getElementById('db-dot');
            const label = document.getElementById('db-label');
            if (badge && dot && label) {
              badge.className = 'badge ' + (isConnected ? 'badge-db-connected' : 'badge-db-disconnected');
              dot.className = 'dot ' + (isConnected ? 'dot-green' : 'dot-red');
              label.textContent = isConnected ? 'MongoDB Connected' : 'MongoDB Disconnected';
            }
          }
        } catch (e) {}
      }
      setInterval(checkHealth, 10000);
    </script>
  `;

  return renderPageLayout({
    title: 'API Dashboard',
    activeNav: 'dashboard',
    content,
    extraScripts,
  });
};
