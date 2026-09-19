export interface LayoutOptions {
  title: string;
  activeNav?: 'dashboard' | 'health' | 'students' | 'none';
  content: string;
  extraHead?: string;
  extraScripts?: string;
}

/**
 * Common HTML layout with unified dark developer aesthetic, navigation, and styling.
 * Strictly adheres to project branding: "Student Records API".
 */
export const renderPageLayout = (options: LayoutOptions): string => {
  const { title, activeNav = 'none', content, extraHead = '', extraScripts = '' } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Student Records API</title>
  <meta name="description" content="REST API for managing student records with strict validation, MongoDB persistence, and full CRUD support." />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-primary: #07090e;
      --bg-surface: #0b0f19;
      --bg-card: rgba(13, 17, 28, 0.85);
      --bg-card-hover: rgba(19, 25, 41, 0.95);
      --bg-input: rgba(15, 23, 42, 0.8);
      --border-subtle: rgba(99, 102, 241, 0.2);
      --border-card: rgba(99, 102, 241, 0.22);
      --border-highlight: rgba(6, 182, 212, 0.4);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --accent-indigo: #6366f1;
      --accent-indigo-hover: #4f46e5;
      --accent-cyan: #06b6d4;
      --accent-cyan-light: #22d3ee;
      --method-get-bg: rgba(6, 182, 212, 0.12);
      --method-get-text: #22d3ee;
      --method-get-border: rgba(6, 182, 212, 0.3);
      --method-post-bg: rgba(34, 197, 94, 0.12);
      --method-post-text: #4ade80;
      --method-post-border: rgba(34, 197, 94, 0.3);
      --method-put-bg: rgba(245, 158, 11, 0.12);
      --method-put-text: #fbbf24;
      --method-put-border: rgba(245, 158, 11, 0.3);
      --method-delete-bg: rgba(244, 63, 94, 0.12);
      --method-delete-text: #fb7185;
      --method-delete-border: rgba(244, 63, 94, 0.3);
      --status-green: #22c55e;
      --status-red: #ef4444;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: var(--bg-primary);
      background-image: 
        radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.14) 0%, transparent 45%),
        radial-gradient(circle at 90% 90%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.65) 0%, transparent 100%);
      background-attachment: fixed;
      color: var(--text-main);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      line-height: 1.6;
    }

    .nav-header {
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .nav-container {
      max-width: 1040px;
      margin: 0 auto;
      padding: 0.85rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 700;
      font-size: 1.05rem;
      letter-spacing: -0.02em;
      transition: opacity 0.2s ease;
    }

    .brand-link:hover {
      opacity: 0.9;
    }

    .brand-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 7px;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      color: #ffffff;
      font-size: 0.85rem;
      box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      padding: 0.45rem 0.85rem;
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    .nav-link:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.06);
    }

    .nav-link.active {
      color: var(--accent-cyan-light);
      background: rgba(6, 182, 212, 0.12);
      border: 1px solid rgba(6, 182, 212, 0.25);
    }

    .nav-right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .github-link {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.4rem 0.85rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: var(--text-main);
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .github-link:hover {
      background: rgba(99, 102, 241, 0.2);
      border-color: rgba(99, 102, 241, 0.45);
      color: #ffffff;
      transform: translateY(-1px);
    }

    .github-icon {
      width: 15px;
      height: 15px;
      fill: currentColor;
    }

    .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2.25rem 1.25rem;
    }

    .container {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
    }

    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-card);
      border-radius: 20px;
      padding: 2.5rem 2.25rem;
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.75),
        0 0 35px rgba(99, 102, 241, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      position: relative;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #6366f1, #06b6d4, #3b82f6);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .badge-api-online {
      background: rgba(6, 182, 212, 0.15);
      color: var(--accent-cyan-light);
      border: 1px solid rgba(6, 182, 212, 0.3);
    }

    .badge-db-connected {
      color: #4ade80;
      border: 1px solid rgba(34, 197, 94, 0.35);
      background: rgba(34, 197, 94, 0.12);
    }

    .badge-db-disconnected {
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.35);
      background: rgba(239, 68, 68, 0.12);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      position: relative;
    }

    .dot-cyan {
      background: var(--accent-cyan-light);
      box-shadow: 0 0 10px var(--accent-cyan-light);
      animation: pulse-glow 2s infinite ease-in-out;
    }

    .dot-green {
      background: var(--status-green);
      box-shadow: 0 0 10px var(--status-green);
      animation: pulse-glow 2s infinite ease-in-out;
    }

    .dot-red {
      background: var(--status-red);
      box-shadow: 0 0 10px var(--status-red);
    }

    @keyframes pulse-glow {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .method {
      display: inline-block;
      min-width: 64px;
      text-align: center;
      padding: 0.25rem 0.5rem;
      font-size: 0.725rem;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      border-radius: 6px;
      letter-spacing: 0.05em;
    }

    .method-get {
      background: var(--method-get-bg);
      color: var(--method-get-text);
      border: 1px solid var(--method-get-border);
    }

    .method-post {
      background: var(--method-post-bg);
      color: var(--method-post-text);
      border: 1px solid var(--method-post-border);
    }

    .method-put {
      background: var(--method-put-bg);
      color: var(--method-put-text);
      border: 1px solid var(--method-put-border);
    }

    .method-delete {
      background: var(--method-delete-bg);
      color: var(--method-delete-text);
      border: 1px solid var(--method-delete-border);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      color: #ffffff;
      border: none;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);
    }

    .btn-primary:hover {
      box-shadow: 0 6px 20px rgba(6, 182, 212, 0.45);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-main);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-test {
      padding: 0.3rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--accent-cyan-light);
      background: rgba(6, 182, 212, 0.1);
      border: 1px solid rgba(6, 182, 212, 0.25);
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .btn-test:hover {
      background: rgba(6, 182, 212, 0.25);
      border-color: var(--accent-cyan-light);
      color: #ffffff;
    }

    .btn-copy {
      padding: 0.3rem 0.6rem;
      font-size: 0.75rem;
      font-family: inherit;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn-copy:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-main);
    }

    .footer {
      width: 100%;
      max-width: 1040px;
      margin: 0 auto;
      padding: 1.5rem 1.25rem 2.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      font-size: 0.825rem;
      color: var(--text-dim);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer a {
      color: var(--accent-indigo);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer a:hover {
      color: var(--accent-cyan-light);
    }

    .toast {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #1e1b4b;
      border: 1px solid var(--accent-indigo);
      color: #e0e7ff;
      padding: 0.65rem 1.25rem;
      border-radius: 8px;
      font-size: 0.85rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.25s ease;
      pointer-events: none;
      z-index: 100;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    @media (max-width: 640px) {
      .nav-container {
        flex-direction: column;
        align-items: flex-start;
        padding: 0.75rem 1rem;
      }
      .nav-links {
        width: 100%;
        overflow-x: auto;
        padding-bottom: 0.25rem;
      }
      .nav-right {
        display: none;
      }
      .card {
        padding: 1.75rem 1.25rem;
      }
      .footer {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  </style>
  ${extraHead}
</head>
<body>
  <header class="nav-header">
    <div class="nav-container">
      <a href="/" class="brand-link" title="Student Records API Dashboard">
        <span class="brand-badge">⚡</span>
        <span>Student Records API</span>
      </a>
      <nav class="nav-links">
        <a href="/" class="nav-link ${activeNav === 'dashboard' ? 'active' : ''}">Dashboard</a>
        <a href="/api/health" class="nav-link ${activeNav === 'health' ? 'active' : ''}">Health</a>
        <a href="/api/students" class="nav-link ${activeNav === 'students' ? 'active' : ''}">Students</a>
      </nav>
      <div class="nav-right">
        <a href="https://github.com/PranavKarthickV/forese-student-api" target="_blank" rel="noopener noreferrer" class="github-link">
          <svg class="github-icon" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </header>

  <main class="main-wrapper">
    <div class="container">
      ${content}
    </div>
  </main>

  <footer class="footer">
    <span>Student Records API &bull; REST Service</span>
    <a href="https://github.com/PranavKarthickV/forese-student-api" target="_blank" rel="noopener noreferrer">
      View on GitHub &rarr;
    </a>
  </footer>

  <div id="toast" class="toast">Copied to clipboard!</div>

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
      if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
          toast.classList.remove('show');
        }, 2000);
      }
    }
  </script>
  ${extraScripts}
</body>
</html>`;
};
