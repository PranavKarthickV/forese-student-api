import { renderPageLayout } from './layout';

export interface StudentDetailItem {
  _id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface StudentDetailPageOptions {
  student: StudentDetailItem;
}

/**
 * Renders the browser-friendly Student Detail Profile page for GET /api/students/:id.
 */
export const getStudentDetailPageHtml = (options: StudentDetailPageOptions): string => {
  const { student } = options;

  const createdAtFormatted = student.createdAt
    ? new Date(student.createdAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      })
    : 'N/A';

  const updatedAtFormatted = student.updatedAt
    ? new Date(student.updatedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      })
    : 'N/A';

  const content = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <a href="/api/students" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            &larr; Back to Students
          </a>
          <a href="/" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            Dashboard
          </a>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <a href="/api/students/${student._id}?format=json" target="_blank" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            Raw JSON &rarr;
          </a>
        </div>
      </div>

      <!-- Student Profile Header Card -->
      <div style="display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
        <div style="width: 72px; height: 72px; border-radius: 18px; background: linear-gradient(135deg, #6366f1, #06b6d4); display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700; color: #ffffff; box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);">
          ${student.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.25rem;">
            <h1 style="font-size: 2rem; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">
              ${student.name}
            </h1>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; padding: 0.25rem 0.75rem; border-radius: 8px; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.3); font-weight: 600;">
              ${student.rollNumber}
            </span>
          </div>
          <p style="font-size: 0.95rem; color: var(--text-muted);">
            ${student.department} &bull; Academic Year ${student.year}
          </p>
        </div>
      </div>

      <!-- Detail Fields Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; margin-bottom: 2rem;">
        <!-- Full Name -->
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.4rem;">
            Full Name
          </div>
          <div style="font-size: 1.1rem; font-weight: 600; color: #ffffff;">
            ${student.name}
          </div>
        </div>

        <!-- Roll Number -->
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.4rem;">
            Roll Number (Unique)
          </div>
          <div style="font-size: 1.1rem; font-weight: 600; color: var(--accent-cyan-light); font-family: 'JetBrains Mono', monospace;">
            ${student.rollNumber}
          </div>
        </div>

        <!-- Department -->
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.4rem;">
            Department
          </div>
          <div style="font-size: 1.1rem; font-weight: 600; color: #ffffff;">
            ${student.department}
          </div>
        </div>

        <!-- Academic Year -->
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.4rem;">
            Academic Year
          </div>
          <div style="font-size: 1.1rem; font-weight: 600; color: #fbbf24;">
            Year ${student.year}
          </div>
        </div>

        <!-- Student ID -->
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem; grid-column: 1 / -1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
            <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim);">
              MongoDB Document ID (_id)
            </div>
            <button class="btn-copy" onclick="copyToClipboard('${student._id}')">Copy ID</button>
          </div>
          <div style="font-size: 0.95rem; font-family: 'JetBrains Mono', monospace; color: #a5b4fc; word-break: break-all;">
            ${student._id}
          </div>
        </div>

        <!-- Timestamps -->
        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.4rem;">
            Created At
          </div>
          <div style="font-size: 0.9rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
            ${createdAtFormatted}
          </div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.65); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.25rem 1.5rem;">
          <div style="font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-dim); margin-bottom: 0.4rem;">
            Last Updated
          </div>
          <div style="font-size: 0.9rem; color: var(--text-muted); font-family: 'JetBrains Mono', monospace;">
            ${updatedAtFormatted}
          </div>
        </div>
      </div>
    </div>
  `;

  return renderPageLayout({
    title: `${student.name} - Profile`,
    activeNav: 'students',
    content,
  });
};
