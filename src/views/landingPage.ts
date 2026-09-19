import { renderPageLayout } from './layout';

export interface LandingPageOptions {
  isDbConnected: boolean;
  port: number | string;
}

/**
 * Renders the Editorial + Creative Tech Overview page for GET /.
 */
export const getLandingPageHtml = (options: LandingPageOptions): string => {
  const { isDbConnected, port } = options;

  const dbDotClass = isDbConnected ? 'status-indicator-dot' : 'status-indicator-dot offline';
  const dbLabel = isDbConnected ? 'CONNECTED' : 'DISCONNECTED';

  const content = `
    <!-- Editorial Hero -->
    <section style="padding-bottom: 2.5rem; border-bottom: 1px solid var(--border-line); margin-bottom: 2.5rem;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-indigo); margin-bottom: 0.75rem;">
        // REST API &bull; SERVICE OVERVIEW
      </div>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 3.5rem; font-weight: 700; line-height: 0.95; letter-spacing: -0.04em; color: #ffffff; text-transform: uppercase; margin-bottom: 1rem;">
        STUDENT<br />RECORDS API
      </h1>
      <p style="font-size: 1.05rem; color: var(--text-muted); max-width: 600px; margin-bottom: 1.5rem;">
        A high-craft RESTful API service built for managing student academic records in MongoDB.
      </p>

      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap;">
        <a href="/api/students" class="btn btn-indigo">
          Open Student Directory &rarr;
        </a>
        <a href="/api/health" class="btn btn-secondary">
          System Diagnostics &rarr;
        </a>
        <div style="margin-left: auto; font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; color: var(--text-dim);">
          BASE URL: <code style="color: var(--text-main);" id="base-url-text">http://localhost:${port}</code>
        </div>
      </div>
    </section>

    <!-- Architecture & Endpoints Grid -->
    <section style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 3rem; margin-bottom: 3rem;">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 1.25rem;">
          // SYSTEM STATUS
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.6rem; border-bottom: 1px solid var(--border-line-subtle);">
            <span style="color: var(--text-dim);">DATABASE</span>
            <span style="color: var(--status-green); font-weight: 600;">${dbLabel}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.6rem; border-bottom: 1px solid var(--border-line-subtle);">
            <span style="color: var(--text-dim);">RUNTIME</span>
            <span style="color: var(--text-main);">NODE.JS (EXPRESS 5)</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.6rem; border-bottom: 1px solid var(--border-line-subtle);">
            <span style="color: var(--text-dim);">LANGUAGE</span>
            <span style="color: var(--text-main);">TYPESCRIPT 5</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-bottom: 0.6rem; border-bottom: 1px solid var(--border-line-subtle);">
            <span style="color: var(--text-dim);">VALIDATION</span>
            <span style="color: var(--text-main);">SCHEMA &amp; OBJECTID</span>
          </div>
        </div>
      </div>

      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 1.25rem;">
          // API ENDPOINTS
        </div>

        <div style="border-top: 1px solid var(--border-line);">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-line-subtle); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span class="method method-get">GET</span>
              <span style="color: var(--text-main);">/api/health</span>
            </div>
            <span style="color: var(--text-dim); font-size: 0.75rem;">Health status &amp; uptime</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-line-subtle); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span class="method method-get">GET</span>
              <span style="color: var(--text-main);">/api/students</span>
            </div>
            <span style="color: var(--text-dim); font-size: 0.75rem;">Retrieve all records</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-line-subtle); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span class="method method-post">POST</span>
              <span style="color: var(--text-main);">/api/students</span>
            </div>
            <span style="color: var(--text-dim); font-size: 0.75rem;">Create a new record</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-line-subtle); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span class="method method-get">GET</span>
              <span style="color: var(--text-main);">/api/students/:id</span>
            </div>
            <span style="color: var(--text-dim); font-size: 0.75rem;">Retrieve by ID</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-line-subtle); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span class="method method-put">PUT</span>
              <span style="color: var(--text-main);">/api/students/:id</span>
            </div>
            <span style="color: var(--text-dim); font-size: 0.75rem;">Update record by ID</span>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid var(--border-line-subtle); font-family: 'JetBrains Mono', monospace; font-size: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.85rem;">
              <span class="method method-delete">DELETE</span>
              <span style="color: var(--text-main);">/api/students/:id</span>
            </div>
            <span style="color: var(--text-dim); font-size: 0.75rem;">Delete record by ID</span>
          </div>
        </div>
      </div>
    </section>
  `;

  const extraScripts = `
    <script>
      const baseUrlElem = document.getElementById('base-url-text');
      if (baseUrlElem && window.location.origin) {
        baseUrlElem.textContent = window.location.origin;
      }
    </script>
  `;

  return renderPageLayout({
    title: 'Overview',
    activeNav: 'dashboard',
    content,
    extraScripts,
  });
};
