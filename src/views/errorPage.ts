import { renderPageLayout } from './layout';

export interface ErrorPageOptions {
  statusCode?: number;
  title?: string;
  message?: string;
  path?: string;
  method?: string;
}

/**
 * Renders a browser-friendly error page (e.g. 404 Endpoint Not Found).
 */
export const getErrorPageHtml = (options: ErrorPageOptions): string => {
  const {
    statusCode = 404,
    title = 'Endpoint not found',
    message = 'The requested resource or endpoint does not exist on this API service.',
    path = '/',
    method = 'GET',
  } = options;

  const content = `
    <div class="card" style="text-align: center; padding: 4rem 2rem;">
      <div style="font-size: 5rem; font-weight: 800; line-height: 1; letter-spacing: -0.05em; background: linear-gradient(135deg, #f43f5e, #fb7185, #fda4af); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 1rem;">
        ${statusCode}
      </div>

      <h1 style="font-size: 1.75rem; font-weight: 700; color: #ffffff; margin-bottom: 0.75rem;">
        ${title}
      </h1>

      <p style="font-size: 1rem; color: var(--text-muted); max-width: 500px; margin: 0 auto 1.75rem;">
        ${message}
      </p>

      <div style="display: inline-flex; align-items: center; gap: 0.6rem; background: rgba(0, 0, 0, 0.45); border: 1px solid var(--border-subtle); padding: 0.5rem 1rem; border-radius: 8px; margin-bottom: 2.25rem;">
        <span class="method method-get" style="font-size: 0.7rem;">${method}</span>
        <code style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--accent-cyan-light);">${path}</code>
      </div>

      <div>
        <a href="/" class="btn btn-primary" style="padding: 0.65rem 1.5rem; font-size: 0.9rem;">
          &larr; Back to API Dashboard
        </a>
      </div>
    </div>
  `;

  return renderPageLayout({
    title: `${statusCode} - ${title}`,
    activeNav: 'none',
    content,
  });
};
