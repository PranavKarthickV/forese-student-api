export interface LayoutOptions {
  title: string;
  activeNav?: 'dashboard' | 'health' | 'students' | 'none';
  content: string;
  extraHead?: string;
  extraScripts?: string;
}

/**
 * Editorial + Creative Tech layout for Student Records API.
 * Combines high-end typography, asymmetric compositions, and refined developer styling.
 */
export const renderPageLayout = (options: LayoutOptions): string => {
  const { title, activeNav = 'none', content, extraHead = '', extraScripts = '' } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Student Records API</title>
  <meta name="description" content="High-craft REST API and database interface for managing student records." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-canvas: #050608;
      --bg-surface: #0a0d13;
      --bg-surface-elevated: #0f141f;
      --bg-surface-hover: #131a26;
      --bg-input: #07090e;
      --border-line: rgba(255, 255, 255, 0.08);
      --border-line-subtle: rgba(255, 255, 255, 0.04);
      --border-line-hover: rgba(255, 255, 255, 0.16);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --accent-indigo: #6366f1;
      --accent-indigo-hover: #4f46e5;
      --accent-indigo-subtle: rgba(99, 102, 241, 0.1);
      --accent-indigo-border: rgba(99, 102, 241, 0.28);
      --accent-cyan: #06b6d4;
      --accent-cyan-subtle: rgba(6, 182, 212, 0.1);
      --status-green: #10b981;
      --status-red: #f43f5e;
      --radius-sm: 4px;
      --radius: 6px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-canvas);
      background-image: radial-gradient(circle, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
      background-size: 28px 28px;
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Editorial Header */
    .site-header {
      width: 100%;
      border-bottom: 1px solid var(--border-line);
      background: rgba(5, 6, 8, 0.92);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .header-content {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 1.75rem;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
    }

    .brand-identity {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .brand-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-main);
      text-decoration: none;
      letter-spacing: -0.02em;
      display: flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.15s ease;
    }

    .brand-tag:hover {
      color: var(--accent-indigo);
    }

    .brand-tag-arrow {
      color: var(--accent-indigo);
      font-weight: 700;
    }

    .nav-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-item {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.825rem;
      font-weight: 500;
      padding: 0.35rem 0.75rem;
      border-radius: var(--radius-sm);
      transition: color 0.15s ease, background 0.15s ease;
    }

    .nav-item:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.04);
    }

    .nav-item.active {
      color: var(--text-main);
      font-weight: 600;
      background: rgba(255, 255, 255, 0.06);
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-muted);
    }

    .status-indicator-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--status-green);
      box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
    }

    .status-indicator-dot.offline {
      background: var(--status-red);
      box-shadow: 0 0 6px rgba(244, 63, 94, 0.5);
    }

    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .github-link:hover {
      color: var(--text-main);
    }

    /* Page Layout */
    .page-wrapper {
      flex: 1;
      width: 100%;
      max-width: 1180px;
      margin: 0 auto;
      padding: 2.5rem 1.75rem 4rem;
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-sm);
      font-size: 0.825rem;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      font-family: inherit;
      border: 1px solid transparent;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    .btn-indigo {
      background: var(--accent-indigo);
      color: #ffffff;
      border-color: var(--accent-indigo-hover);
    }

    .btn-indigo:hover {
      background: var(--accent-indigo-hover);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.04);
      border-color: var(--border-line);
      color: var(--text-main);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--border-line-hover);
    }

    .btn-ghost {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
    }

    .btn-ghost:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.04);
    }

    .btn-danger {
      background: #991b1b;
      color: #ffffff;
      border-color: #b91c1c;
    }

    .btn-danger:hover {
      background: #b91c1c;
    }

    /* Method Badges */
    .method {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.675rem;
      font-weight: 600;
      padding: 0.15rem 0.45rem;
      border-radius: 3px;
      letter-spacing: 0.02em;
    }

    .method-get {
      background: var(--accent-cyan-subtle);
      color: #22d3ee;
      border: 1px solid rgba(6, 182, 212, 0.25);
    }

    .method-post {
      background: rgba(16, 185, 129, 0.1);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.25);
    }

    .method-put {
      background: rgba(245, 158, 11, 0.1);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.25);
    }

    .method-delete {
      background: rgba(244, 63, 94, 0.1);
      color: #fb7185;
      border: 1px solid rgba(244, 63, 94, 0.25);
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #0f141f;
      border: 1px solid var(--border-line-hover);
      color: var(--text-main);
      padding: 0.65rem 1.15rem;
      border-radius: var(--radius);
      font-size: 0.825rem;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      pointer-events: none;
      z-index: 2000;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* Editorial Footer */
    .site-footer {
      width: 100%;
      border-top: 1px solid var(--border-line);
      background: rgba(5, 6, 8, 0.8);
      margin-top: auto;
    }

    .footer-content {
      max-width: 1180px;
      margin: 0 auto;
      padding: 1.5rem 1.75rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.775rem;
      color: var(--text-dim);
      font-family: 'JetBrains Mono', monospace;
    }

    .footer-links {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .footer-links a:hover {
      color: var(--accent-indigo);
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 0 1rem;
      }
      .page-wrapper {
        padding: 1.75rem 1rem 3rem;
      }
      .nav-menu {
        display: none;
      }
      .footer-content {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
  ${extraHead}
</head>
<body>
  <header class="site-header">
    <div class="header-content">
      <div class="brand-identity">
        <a href="/" class="brand-tag">
          <span class="brand-tag-arrow">&gt;</span>
          <span>student.records</span>
        </a>
        <nav class="nav-menu">
          <a href="/" class="nav-item ${activeNav === 'dashboard' ? 'active' : ''}">Overview</a>
          <a href="/api/students" class="nav-item ${activeNav === 'students' ? 'active' : ''}">Students</a>
          <a href="/api/health" class="nav-item ${activeNav === 'health' ? 'active' : ''}">Health</a>
        </nav>
      </div>

      <div class="header-right">
        <div class="status-pill" id="header-status">
          <span class="status-indicator-dot" id="header-dot"></span>
          <span id="header-status-text">MongoDB Connected</span>
        </div>
        <a href="https://github.com/PranavKarthickV/forese-student-api" target="_blank" rel="noopener noreferrer" class="github-link">
          GitHub &rarr;
        </a>
      </div>
    </div>
  </header>

  <main class="page-wrapper">
    ${content}
  </main>

  <footer class="site-footer">
    <div class="footer-content">
      <div>student.records &bull; REST API &bull; Node.js &bull; TypeScript &bull; MongoDB</div>
      <div class="footer-links">
        <a href="/api/health" target="_blank">Health Status</a>
        <a href="/api/students?format=json" target="_blank">Raw JSON</a>
        <a href="https://github.com/PranavKarthickV/forese-student-api" target="_blank" rel="noopener noreferrer">Source Code</a>
      </div>
    </div>
  </footer>

  <div id="toast" class="toast">
    <span style="color: var(--status-green);">&check;</span>
    <span id="toast-text">Copied</span>
  </div>

  <script>
    function copyToClipboard(text) {
      const fullUrl = text.startsWith('http') ? text : window.location.origin + text;
      navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Copied: ' + text);
      }).catch(() => {
        showToast('Copied to clipboard');
      });
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastText = document.getElementById('toast-text');
      if (toast && toastText) {
        toastText.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }
    }
  </script>
  ${extraScripts}
</body>
</html>`;
};
