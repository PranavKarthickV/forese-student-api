import { renderPageLayout } from './layout';

export interface ErrorPageOptions {
  statusCode?: number;
  title?: string;
  message?: string;
  path?: string;
  method?: string;
}

/**
 * Renders the Editorial + Creative Tech 404/Error view.
 */
export const getErrorPageHtml = (options: ErrorPageOptions): string => {
  const {
    statusCode = 404,
    title = 'Endpoint not found',
    message = 'The requested endpoint does not exist on this API service.',
    path = '/',
    method = 'GET',
  } = options;

  const content = `
    <div style="max-width: 600px; margin: 4rem auto; text-align: left;">
      <div style="font-family: 'Space Grotesk', sans-serif; font-size: 5rem; font-weight: 700; color: var(--status-red); line-height: 0.9; letter-spacing: -0.05em; margin-bottom: 1rem;">
        ${statusCode}
      </div>

      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-indigo); margin-bottom: 0.5rem;">
        // ERROR: ${title}
      </div>

      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.75rem; font-weight: 700; color: #ffffff; text-transform: uppercase; margin-bottom: 0.75rem;">
        ${title}
      </h1>

      <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 2rem;">
        ${message}
      </p>

      <div style="display: inline-flex; align-items: center; gap: 0.75rem; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-line); padding: 0.6rem 1rem; border-radius: var(--radius-sm); margin-bottom: 2rem; font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">
        <span class="method method-get">${method}</span>
        <code style="color: var(--text-main);">${path}</code>
      </div>

      <div>
        <a href="/" class="btn btn-secondary">
          &larr; Return to Overview
        </a>
      </div>
    </div>
  `;

  return renderPageLayout({
    title: `${statusCode} ${title}`,
    activeNav: 'none',
    content,
  });
};
