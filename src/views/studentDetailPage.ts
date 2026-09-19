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
 * Renders the Editorial + Creative Tech Student Detail view for GET /api/students/:id.
 */
export const getStudentDetailPageHtml = (options: StudentDetailPageOptions): string => {
  const { student } = options;

  const yearFormatted = (student.year < 10 ? '0' : '') + student.year;
  const createdAtFormatted = student.createdAt ? new Date(student.createdAt).toISOString().replace('T', ' ').substring(0, 19) + ' UTC' : 'N/A';
  const updatedAtFormatted = student.updatedAt ? new Date(student.updatedAt).toISOString().replace('T', ' ').substring(0, 19) + ' UTC' : 'N/A';

  const content = `
    <!-- Top Nav -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-line);">
      <a href="/api/students" class="btn btn-secondary" style="font-size: 0.8rem;">
        &larr; Return to Directory
      </a>
      <a href="/api/students/${student._id}?format=json" target="_blank" class="btn btn-secondary" style="font-size: 0.8rem;">
        Raw JSON &rarr;
      </a>
    </div>

    <!-- Student Header -->
    <div style="margin-bottom: 3rem;">
      <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.725rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent-indigo); margin-bottom: 0.75rem;">
        // STUDENT PROFILE
      </div>
      <h1 style="font-family: 'Space Grotesk', sans-serif; font-size: 3.25rem; font-weight: 700; color: #ffffff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.75rem;">
        ${student.name}
      </h1>
      <p style="font-size: 1.05rem; color: var(--text-muted);">
        ${student.department} &bull; Academic Year ${yearFormatted}
      </p>
    </div>

    <!-- Structured Technical Metadata -->
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 720px; border-top: 1px solid var(--border-line); padding-top: 2rem;">
      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.4rem;">
          ROLL NUMBER
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 600; color: var(--accent-indigo);">
          ${student.rollNumber}
        </div>
      </div>

      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.4rem;">
          ACADEMIC YEAR
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 600; color: var(--text-main);">
          YEAR ${yearFormatted}
        </div>
      </div>

      <div style="grid-column: 1 / -1;">
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.4rem;">
          DEPARTMENT
        </div>
        <div style="font-size: 1.05rem; color: var(--text-main);">
          ${student.department}
        </div>
      </div>

      <div style="grid-column: 1 / -1;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim);">
            MONGODB ID
          </span>
          <button class="btn btn-ghost" style="padding: 0.1rem 0.4rem; font-size: 0.7rem; font-family: 'JetBrains Mono', monospace;" onclick="copyToClipboard('${student._id}')">Copy ID</button>
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-dim); word-break: break-all;">
          ${student._id}
        </div>
      </div>

      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.4rem;">
          CREATED
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.825rem; color: var(--text-muted);">
          ${createdAtFormatted}
        </div>
      </div>

      <div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 0.4rem;">
          UPDATED
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.825rem; color: var(--text-muted);">
          ${updatedAtFormatted}
        </div>
      </div>
    </div>
  `;

  return renderPageLayout({
    title: student.name,
    activeNav: 'students',
    content,
  });
};
