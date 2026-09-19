import { renderPageLayout } from './layout';

export interface StudentItem {
  _id: string;
  name: string;
  rollNumber: string;
  department: string;
  year: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface StudentsPageOptions {
  students: StudentItem[];
}

/**
 * Renders the browser-friendly Student Records dashboard for GET /api/students.
 */
export const getStudentsPageHtml = (options: StudentsPageOptions): string => {
  const { students } = options;

  const totalCount = students.length;

  // Extract unique departments for filter dropdown
  const departments = Array.from(new Set(students.map((s) => s.department))).sort();

  const content = `
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <a href="/" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            &larr; Back to Dashboard
          </a>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="badge badge-api-online" style="font-size: 0.8rem; padding: 0.4rem 0.9rem;">
            <span class="dot dot-cyan"></span>
            <span id="count-badge">${totalCount} Total ${totalCount === 1 ? 'Record' : 'Records'}</span>
          </span>
          <a href="/api/students?format=json" target="_blank" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
            Raw JSON &rarr;
          </a>
        </div>
      </div>

      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: 700; letter-spacing: -0.025em; color: #ffffff; margin-bottom: 0.5rem;">
          Student Records
        </h1>
        <p style="font-size: 1rem; color: var(--text-muted);">
          Inspect, search, and manage registered student profiles in the system
        </p>
      </div>

      <!-- Search & Filter Controls -->
      <div style="display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 1.75rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); padding: 1rem 1.25rem; border-radius: 12px;">
        <div style="flex: 2; min-width: 240px; position: relative;">
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search by name, roll number, or department..." 
            style="width: 100%; background: var(--bg-input); border: 1px solid rgba(255, 255, 255, 0.12); color: #ffffff; padding: 0.6rem 1rem; border-radius: 8px; font-size: 0.875rem; font-family: inherit; outline: none; transition: border-color 0.2s ease;"
            oninput="filterStudents()"
          />
        </div>

        <div style="flex: 1; min-width: 160px;">
          <select 
            id="dept-select" 
            style="width: 100%; background: var(--bg-input); border: 1px solid rgba(255, 255, 255, 0.12); color: var(--text-main); padding: 0.6rem 0.85rem; border-radius: 8px; font-size: 0.875rem; font-family: inherit; outline: none; cursor: pointer;"
            onchange="filterStudents()"
          >
            <option value="">All Departments</option>
            ${departments.map((d) => `<option value="${d}">${d}</option>`).join('')}
          </select>
        </div>

        <div style="flex: 1; min-width: 130px;">
          <select 
            id="year-select" 
            style="width: 100%; background: var(--bg-input); border: 1px solid rgba(255, 255, 255, 0.12); color: var(--text-main); padding: 0.6rem 0.85rem; border-radius: 8px; font-size: 0.875rem; font-family: inherit; outline: none; cursor: pointer;"
            onchange="filterStudents()"
          >
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>
      </div>

      <!-- Students Table / List Container -->
      <div id="students-table-wrapper" style="overflow-x: auto; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 1.5rem; ${students.length === 0 ? 'display: none;' : ''}">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
          <thead>
            <tr style="background: rgba(15, 23, 42, 0.9); border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-dim); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.06em;">
              <th style="padding: 0.85rem 1.25rem;">Name</th>
              <th style="padding: 0.85rem 1rem;">Roll Number</th>
              <th style="padding: 0.85rem 1rem;">Department</th>
              <th style="padding: 0.85rem 1rem;">Year</th>
              <th style="padding: 0.85rem 1.25rem; text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody id="students-tbody">
            ${students
              .map(
                (s) => `
              <tr class="student-row" data-name="${s.name.toLowerCase()}" data-roll="${s.rollNumber.toLowerCase()}" data-dept="${s.department.toLowerCase()}" data-year="${s.year}" style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.15s ease;">
                <td style="padding: 1rem 1.25rem; font-weight: 600; color: #ffffff;">
                  <div style="display: flex; align-items: center; gap: 0.65rem;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.25)); border: 1px solid rgba(6, 182, 212, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan-light);">
                      ${s.name.charAt(0).toUpperCase()}
                    </div>
                    <span>${s.name}</span>
                  </div>
                </td>
                <td style="padding: 1rem 1rem;">
                  <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px; background: rgba(99, 102, 241, 0.12); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.25); font-weight: 600;">
                    ${s.rollNumber}
                  </span>
                </td>
                <td style="padding: 1rem 1rem; color: var(--text-muted);">${s.department}</td>
                <td style="padding: 1rem 1rem;">
                  <span style="padding: 0.2rem 0.55rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: rgba(6, 182, 212, 0.1); color: var(--accent-cyan-light); border: 1px solid rgba(6, 182, 212, 0.25);">
                    Year ${s.year}
                  </span>
                </td>
                <td style="padding: 1rem 1.25rem; text-align: right;">
                  <a href="/api/students/${s._id}" class="btn-test" style="font-size: 0.775rem; padding: 0.35rem 0.75rem;">
                    View Profile &rarr;
                  </a>
                </td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <!-- Empty State / No Match State -->
      <div id="empty-state" style="text-align: center; padding: 3.5rem 1.5rem; background: rgba(15, 23, 42, 0.4); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 12px; ${students.length === 0 ? '' : 'display: none;'}">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📋</div>
        <h3 style="font-size: 1.2rem; font-weight: 600; color: #ffffff; margin-bottom: 0.5rem;" id="empty-title">
          ${students.length === 0 ? 'No Student Records Yet' : 'No Matching Students Found'}
        </h3>
        <p style="font-size: 0.875rem; color: var(--text-dim); max-width: 420px; margin: 0 auto 1.5rem;" id="empty-desc">
          ${students.length === 0 ? 'Create a student record using POST /api/students to populate the database.' : 'Try adjusting your search query or filters to find student records.'}
        </p>
        ${students.length === 0 ? `
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(0,0,0,0.5); border: 1px solid var(--border-subtle); padding: 0.5rem 1rem; border-radius: 8px;">
            <span class="method method-post">POST</span>
            <code style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--text-main);">/api/students</code>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      function filterStudents() {
        const query = document.getElementById('search-input').value.toLowerCase().trim();
        const dept = document.getElementById('dept-select').value.toLowerCase();
        const year = document.getElementById('year-select').value;

        const rows = document.querySelectorAll('.student-row');
        let visibleCount = 0;

        rows.forEach(row => {
          const name = row.getAttribute('data-name') || '';
          const roll = row.getAttribute('data-roll') || '';
          const rowDept = row.getAttribute('data-dept') || '';
          const rowYear = row.getAttribute('data-year') || '';

          const matchesQuery = !query || name.includes(query) || roll.includes(query) || rowDept.includes(query);
          const matchesDept = !dept || rowDept === dept;
          const matchesYear = !year || rowYear === year;

          if (matchesQuery && matchesDept && matchesYear) {
            row.style.display = '';
            visibleCount++;
          } else {
            row.style.display = 'none';
          }
        });

        const tableWrapper = document.getElementById('students-table-wrapper');
        const emptyState = document.getElementById('empty-state');
        const countBadge = document.getElementById('count-badge');
        const emptyTitle = document.getElementById('empty-title');
        const emptyDesc = document.getElementById('empty-desc');

        if (countBadge) {
          countBadge.textContent = visibleCount + ' ' + (visibleCount === 1 ? 'Record' : 'Records');
        }

        if (visibleCount === 0) {
          if (tableWrapper) tableWrapper.style.display = 'none';
          if (emptyState) {
            emptyState.style.display = '';
            if (emptyTitle) emptyTitle.textContent = 'No Matching Students Found';
            if (emptyDesc) emptyDesc.textContent = 'Try adjusting your search query or filters to find student records.';
          }
        } else {
          if (tableWrapper) tableWrapper.style.display = '';
          if (emptyState) emptyState.style.display = 'none';
        }
      }
    </script>
  `;

  return renderPageLayout({
    title: 'Student Records',
    activeNav: 'students',
    content,
    extraScripts,
  });
};
