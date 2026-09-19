import { renderPageLayout } from './layout';

/**
 * Renders the complete, interactive CRUD dashboard for Student Records (GET /api/students).
 */
export const getStudentsPageHtml = (): string => {
  const extraHead = `
    <style>
      /* Modal Styles */
      .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(3, 7, 18, 0.78);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1rem;
        opacity: 0;
        transition: opacity 0.25s ease;
      }

      .modal-backdrop.open {
        display: flex;
        opacity: 1;
      }

      .modal-box {
        background: #0d121f;
        border: 1px solid var(--border-card);
        border-radius: 18px;
        width: 100%;
        max-width: 520px;
        padding: 2rem;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 30px rgba(99, 102, 241, 0.15);
        position: relative;
        transform: translateY(16px) scale(0.98);
        transition: all 0.25s ease;
      }

      .modal-backdrop.open .modal-box {
        transform: translateY(0) scale(1);
      }

      .modal-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #06b6d4, #3b82f6);
        border-top-left-radius: 18px;
        border-top-right-radius: 18px;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1.5rem;
      }

      .modal-title {
        font-size: 1.35rem;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -0.02em;
      }

      .modal-close {
        background: transparent;
        border: none;
        color: var(--text-dim);
        font-size: 1.5rem;
        line-height: 1;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 6px;
        transition: color 0.15s ease;
      }

      .modal-close:hover {
        color: #ffffff;
      }

      .form-group {
        margin-bottom: 1.25rem;
      }

      .form-label {
        display: block;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-muted);
        margin-bottom: 0.4rem;
      }

      .form-input, .form-select {
        width: 100%;
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.12);
        color: #ffffff;
        padding: 0.65rem 0.95rem;
        border-radius: 8px;
        font-size: 0.9rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .form-input:focus, .form-select:focus {
        border-color: var(--accent-cyan);
        box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.18);
      }

      .form-select option {
        background: #0f172a;
        color: #ffffff;
      }

      .modal-alert {
        display: none;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        font-size: 0.85rem;
        margin-bottom: 1.25rem;
        background: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.35);
        color: #fca5a5;
      }

      .modal-alert.show {
        display: block;
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.75rem;
        margin-top: 1.75rem;
        padding-top: 1.25rem;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      /* Action Buttons */
      .btn-action-view {
        padding: 0.3rem 0.65rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--accent-cyan-light);
        background: rgba(6, 182, 212, 0.1);
        border: 1px solid rgba(6, 182, 212, 0.25);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .btn-action-view:hover {
        background: rgba(6, 182, 212, 0.25);
        border-color: var(--accent-cyan-light);
        color: #ffffff;
      }

      .btn-action-edit {
        padding: 0.3rem 0.65rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: #a5b4fc;
        background: rgba(99, 102, 241, 0.1);
        border: 1px solid rgba(99, 102, 241, 0.25);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .btn-action-edit:hover {
        background: rgba(99, 102, 241, 0.25);
        border-color: #a5b4fc;
        color: #ffffff;
      }

      .btn-action-delete {
        padding: 0.3rem 0.65rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: #fb7185;
        background: rgba(244, 63, 94, 0.1);
        border: 1px solid rgba(244, 63, 94, 0.25);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .btn-action-delete:hover {
        background: rgba(244, 63, 94, 0.25);
        border-color: #fb7185;
        color: #ffffff;
      }

      .btn-danger {
        background: linear-gradient(135deg, #e11d48, #f43f5e);
        color: #ffffff;
        border: none;
        box-shadow: 0 4px 14px rgba(225, 29, 72, 0.35);
      }

      .btn-danger:hover {
        box-shadow: 0 6px 20px rgba(244, 63, 94, 0.5);
        transform: translateY(-1px);
      }

      /* Spinner */
      .spinner {
        width: 18px;
        height: 18px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: #ffffff;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        display: inline-block;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;

  const content = `
    <div class="card">
      <!-- Top Dashboard Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem;">
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.35rem;">
            <h1 style="font-size: 2.15rem; font-weight: 700; letter-spacing: -0.025em; color: #ffffff;">
              Student Records
            </h1>
            <span class="badge badge-api-online" id="count-badge">
              <span class="dot dot-cyan"></span>
              <span id="total-count-text">0 Records</span>
            </span>
          </div>
          <p style="font-size: 0.95rem; color: var(--text-muted);">
            Complete REST API CRUD management dashboard
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="openCreateModal()" id="btn-add-student">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Student
          </button>
          <a href="/api/students?format=json" target="_blank" class="btn btn-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem;" title="View raw JSON API response">
            Raw JSON &rarr;
          </a>
        </div>
      </div>

      <!-- Search & Filter Controls -->
      <div style="display: flex; gap: 0.85rem; flex-wrap: wrap; margin-bottom: 1.75rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-subtle); padding: 1rem 1.25rem; border-radius: 12px;">
        <div style="flex: 2; min-width: 240px;">
          <input 
            type="text" 
            id="search-input" 
            placeholder="Search by name, roll number, or department..." 
            class="form-input"
            oninput="applyFilters()"
          />
        </div>

        <div style="flex: 1; min-width: 160px;">
          <select id="dept-select" class="form-select" onchange="applyFilters()">
            <option value="">All Departments</option>
          </select>
        </div>

        <div style="flex: 1; min-width: 130px;">
          <select id="year-select" class="form-select" onchange="applyFilters()">
            <option value="">All Years</option>
            <option value="1">Year 1</option>
            <option value="2">Year 2</option>
            <option value="3">Year 3</option>
            <option value="4">Year 4</option>
          </select>
        </div>

        <button class="btn btn-secondary" onclick="loadStudents()" title="Refresh student records list" style="padding: 0.5rem 0.85rem;">
          ↻ Refresh
        </button>
      </div>

      <!-- Loading State -->
      <div id="loading-state" style="text-align: center; padding: 4rem 1.5rem;">
        <div class="spinner" style="width: 32px; height: 32px; border-width: 3px; border-top-color: var(--accent-cyan); margin-bottom: 1rem;"></div>
        <div style="font-size: 0.95rem; color: var(--text-muted);">Fetching student records from API...</div>
      </div>

      <!-- Error State -->
      <div id="error-state" style="display: none; padding: 2rem 1.5rem; text-align: center; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 12px; margin-bottom: 1.5rem;">
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
        <div style="font-size: 1.1rem; font-weight: 600; color: #f87171; margin-bottom: 0.5rem;" id="error-message">
          Unable to connect to the database.
        </div>
        <p style="font-size: 0.85rem; color: var(--text-dim); max-width: 460px; margin: 0 auto 1.25rem;">
          Please verify your MongoDB connectivity or backend server status, then try again.
        </p>
        <button class="btn btn-secondary" onclick="loadStudents()">
          ↻ Retry Connection
        </button>
      </div>

      <!-- Students Table -->
      <div id="table-container" style="display: none; overflow-x: auto; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 1.5rem;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.875rem;">
          <thead>
            <tr style="background: rgba(15, 23, 42, 0.9); border-bottom: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-dim); text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.06em;">
              <th style="padding: 0.85rem 1.25rem;">Name</th>
              <th style="padding: 0.85rem 1rem;">Roll Number</th>
              <th style="padding: 0.85rem 1rem;">Department</th>
              <th style="padding: 0.85rem 1rem;">Year</th>
              <th style="padding: 0.85rem 1.25rem; text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody id="students-tbody">
            <!-- Dynamically populated rows -->
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div id="empty-state" style="display: none; text-align: center; padding: 3.5rem 1.5rem; background: rgba(15, 23, 42, 0.4); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 12px;">
        <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📋</div>
        <h3 style="font-size: 1.2rem; font-weight: 600; color: #ffffff; margin-bottom: 0.5rem;" id="empty-title">
          No Student Records Found
        </h3>
        <p style="font-size: 0.875rem; color: var(--text-dim); max-width: 440px; margin: 0 auto 1.5rem;" id="empty-desc">
          Get started by adding your first student record to the system.
        </p>
        <button class="btn btn-primary" onclick="openCreateModal()">
          + Add First Student
        </button>
      </div>
    </div>

    <!-- CREATE / EDIT MODAL -->
    <div class="modal-backdrop" id="student-modal" onclick="onBackdropClick(event, 'student-modal')">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title" id="modal-heading">Add Student</h2>
          <button class="modal-close" onclick="closeModal('student-modal')">&times;</button>
        </div>

        <div class="modal-alert" id="form-alert"></div>

        <form id="student-form" onsubmit="handleFormSubmit(event)">
          <input type="hidden" id="student-id" value="" />

          <div class="form-group">
            <label class="form-label" for="form-name">Full Name</label>
            <input type="text" id="form-name" class="form-input" placeholder="e.g. Pranav Karthick" required autocomplete="off" />
          </div>

          <div class="form-group">
            <label class="form-label" for="form-roll">Roll Number (Unique)</label>
            <input type="text" id="form-roll" class="form-input" placeholder="e.g. ECE001" required autocomplete="off" style="text-transform: uppercase;" />
          </div>

          <div class="form-group">
            <label class="form-label" for="form-dept">Department</label>
            <input type="text" id="form-dept" class="form-input" placeholder="e.g. Electronics and Communication" required autocomplete="off" />
          </div>

          <div class="form-group">
            <label class="form-label" for="form-year">Academic Year</label>
            <select id="form-year" class="form-select" required>
              <option value="1">Year 1 (First Year)</option>
              <option value="2">Year 2 (Second Year)</option>
              <option value="3">Year 3 (Third Year)</option>
              <option value="4">Year 4 (Final Year)</option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onclick="closeModal('student-modal')">Cancel</button>
            <button type="submit" class="btn btn-primary" id="form-submit-btn">
              <span id="submit-btn-text">Save Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- VIEW DETAIL MODAL -->
    <div class="modal-backdrop" id="view-modal" onclick="onBackdropClick(event, 'view-modal')">
      <div class="modal-box">
        <div class="modal-header">
          <h2 class="modal-title">Student Profile</h2>
          <button class="modal-close" onclick="closeModal('view-modal')">&times;</button>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; padding-bottom: 1.25rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
          <div id="view-avatar" style="width: 52px; height: 52px; border-radius: 14px; background: linear-gradient(135deg, #6366f1, #06b6d4); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: #ffffff;">
            P
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <h3 id="view-name" style="font-size: 1.35rem; font-weight: 700; color: #ffffff;">Name</h3>
              <span id="view-roll" style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 6px; background: rgba(99, 102, 241, 0.15); color: #a5b4fc; font-weight: 600;">ROLL</span>
            </div>
            <p id="view-subtitle" style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">Department &bull; Year</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-dim);">Department</div>
            <div id="view-detail-dept" style="font-size: 0.95rem; font-weight: 600; color: #ffffff; margin-top: 0.25rem;">Dept</div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-dim);">Academic Year</div>
            <div id="view-detail-year" style="font-size: 0.95rem; font-weight: 600; color: #fbbf24; margin-top: 0.25rem;">Year 1</div>
          </div>

          <div style="grid-column: 1 / -1; background: rgba(15, 23, 42, 0.6); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
              <span style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-dim);">MongoDB ID</span>
              <button class="btn-copy" id="view-copy-id-btn" style="padding: 0.15rem 0.5rem; font-size: 0.7rem;">Copy</button>
            </div>
            <div id="view-detail-id" style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--accent-cyan-light); word-break: break-all;">ID</div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-dim);">Created At</div>
            <div id="view-detail-created" style="font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; color: var(--text-muted); margin-top: 0.25rem;">Date</div>
          </div>

          <div style="background: rgba(15, 23, 42, 0.6); padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-dim);">Last Updated</div>
            <div id="view-detail-updated" style="font-family: 'JetBrains Mono', monospace; font-size: 0.775rem; color: var(--text-muted); margin-top: 0.25rem;">Date</div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeModal('view-modal')">Close</button>
          <button type="button" class="btn btn-primary" id="view-edit-btn">Edit Student</button>
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRMATION MODAL -->
    <div class="modal-backdrop" id="delete-modal" onclick="onBackdropClick(event, 'delete-modal')">
      <div class="modal-box" style="max-width: 440px;">
        <div class="modal-header">
          <h2 class="modal-title" style="color: #fb7185;">Confirm Deletion</h2>
          <button class="modal-close" onclick="closeModal('delete-modal')">&times;</button>
        </div>

        <p style="font-size: 0.925rem; color: var(--text-main); margin-bottom: 1rem;">
          Are you sure you want to delete this student?
        </p>

        <div style="background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); border-radius: 10px; padding: 0.85rem 1rem; margin-bottom: 1.5rem;">
          <div style="font-weight: 600; color: #ffffff;" id="delete-student-name">Student Name</div>
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: #fb7185; margin-top: 0.2rem;" id="delete-student-roll">ROLL</div>
        </div>

        <input type="hidden" id="delete-student-id" value="" />

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeModal('delete-modal')">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirm-delete-btn" onclick="executeDelete()">
            <span id="delete-btn-text">Delete Record</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      // API Base URL Resolver
      const getApiBase = () => {
        const host = window.location.hostname;
        if (host === 'localhost' || host === '127.0.0.1' || host.includes('192.168.') || host.includes('10.') || host.includes('.local')) {
          return window.location.origin;
        }
        if (window.location.origin.includes('onrender.com')) {
          return window.location.origin;
        }
        return 'https://forese-student-api.onrender.com';
      };

      const API_BASE = getApiBase();

      let allStudents = [];
      let currentEditingStudent = null;

      // Initialize on DOM load
      document.addEventListener('DOMContentLoaded', () => {
        loadStudents();
      });

      // Fetch all students from GET /api/students
      async function loadStudents() {
        const loadingState = document.getElementById('loading-state');
        const errorState = document.getElementById('error-state');
        const tableContainer = document.getElementById('table-container');
        const emptyState = document.getElementById('empty-state');

        loadingState.style.display = 'block';
        errorState.style.display = 'none';
        tableContainer.style.display = 'none';
        emptyState.style.display = 'none';

        try {
          const res = await fetch(API_BASE + '/api/students', {
            headers: { 'Accept': 'application/json' }
          });

          const data = await res.json();

          loadingState.style.display = 'none';

          if (!res.ok || !data.success) {
            errorState.style.display = 'block';
            document.getElementById('error-message').textContent = data.message || 'Failed to fetch student records.';
            return;
          }

          allStudents = data.data || [];
          populateDepartmentFilter();
          applyFilters();
        } catch (err) {
          loadingState.style.display = 'none';
          errorState.style.display = 'block';
          document.getElementById('error-message').textContent = 'Network error: ' + err.message;
        }
      }

      // Populate department filter dynamically
      function populateDepartmentFilter() {
        const deptSelect = document.getElementById('dept-select');
        const currentVal = deptSelect.value;
        const depts = Array.from(new Set(allStudents.map(s => s.department).filter(Boolean))).sort();

        deptSelect.innerHTML = '<option value="">All Departments</option>' + 
          depts.map(d => '<option value="' + d + '" ' + (d === currentVal ? 'selected' : '') + '>' + d + '</option>').join('');
      }

      // Apply search and dropdown filters
      function applyFilters() {
        const query = document.getElementById('search-input').value.toLowerCase().trim();
        const dept = document.getElementById('dept-select').value.toLowerCase();
        const year = document.getElementById('year-select').value;

        const filtered = allStudents.filter(s => {
          const nameMatch = (s.name || '').toLowerCase().includes(query);
          const rollMatch = (s.rollNumber || '').toLowerCase().includes(query);
          const deptMatch = (s.department || '').toLowerCase().includes(query);
          const matchesQuery = !query || nameMatch || rollMatch || deptMatch;

          const matchesDept = !dept || (s.department || '').toLowerCase() === dept;
          const matchesYear = !year || String(s.year) === year;

          return matchesQuery && matchesDept && matchesYear;
        });

        renderTable(filtered);
      }

      // Render students table
      function renderTable(students) {
        const tableContainer = document.getElementById('table-container');
        const emptyState = document.getElementById('empty-state');
        const tbody = document.getElementById('students-tbody');
        const countText = document.getElementById('total-count-text');

        countText.textContent = allStudents.length + ' ' + (allStudents.length === 1 ? 'Record' : 'Records');

        if (allStudents.length === 0) {
          tableContainer.style.display = 'none';
          emptyState.style.display = 'block';
          document.getElementById('empty-title').textContent = 'No Student Records Found';
          document.getElementById('empty-desc').textContent = 'Get started by adding your first student record to the system.';
          return;
        }

        if (students.length === 0) {
          tableContainer.style.display = 'none';
          emptyState.style.display = 'block';
          document.getElementById('empty-title').textContent = 'No Matching Records';
          document.getElementById('empty-desc').textContent = 'No student records match your current search and filter criteria.';
          return;
        }

        emptyState.style.display = 'none';
        tableContainer.style.display = 'block';

        tbody.innerHTML = students.map(s => {
          const initial = (s.name || 'S').charAt(0).toUpperCase();
          const studentJson = JSON.stringify(s).replace(/'/g, '&#39;');

          return '<tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: background 0.15s ease;">' +
            '<td style="padding: 1rem 1.25rem; font-weight: 600; color: #ffffff;">' +
              '<div style="display: flex; align-items: center; gap: 0.65rem;">' +
                '<div style="width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(6, 182, 212, 0.25)); border: 1px solid rgba(6, 182, 212, 0.3); display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 700; color: var(--accent-cyan-light);">' +
                  initial +
                '</div>' +
                '<span>' + escapeHtml(s.name) + '</span>' +
              '</div>' +
            '</td>' +
            '<td style="padding: 1rem 1rem;">' +
              '<span style="font-family: \\'JetBrains Mono\\', monospace; font-size: 0.8rem; padding: 0.25rem 0.6rem; border-radius: 6px; background: rgba(99, 102, 241, 0.12); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.25); font-weight: 600;">' +
                escapeHtml(s.rollNumber) +
              '</span>' +
            '</td>' +
            '<td style="padding: 1rem 1rem; color: var(--text-muted);">' + escapeHtml(s.department) + '</td>' +
            '<td style="padding: 1rem 1rem;">' +
              '<span style="padding: 0.2rem 0.55rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; background: rgba(6, 182, 212, 0.1); color: var(--accent-cyan-light); border: 1px solid rgba(6, 182, 212, 0.25);">' +
                'Year ' + s.year +
              '</span>' +
            '</td>' +
            '<td style="padding: 1rem 1.25rem; text-align: right;">' +
              '<div style="display: inline-flex; align-items: center; gap: 0.4rem;">' +
                '<button class="btn-action-view" onclick=\\'openViewModal(' + studentJson + ')\\'>View</button>' +
                '<button class="btn-action-edit" onclick=\\'openEditModal(' + studentJson + ')\\'>Edit</button>' +
                '<button class="btn-action-delete" onclick=\\'openDeleteModal(' + studentJson + ')\\'>Delete</button>' +
              '</div>' +
            '</td>' +
          '</tr>';
        }).join('');
      }

      // Open Modal Helpers
      function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('open');
      }

      function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('open');
      }

      function onBackdropClick(e, id) {
        if (e.target.id === id) closeModal(id);
      }

      // Open Create Modal
      function openCreateModal() {
        document.getElementById('modal-heading').textContent = 'Add Student';
        document.getElementById('submit-btn-text').textContent = 'Create Student';
        document.getElementById('student-id').value = '';
        document.getElementById('form-name').value = '';
        document.getElementById('form-roll').value = '';
        document.getElementById('form-dept').value = '';
        document.getElementById('form-year').value = '1';

        const alert = document.getElementById('form-alert');
        alert.className = 'modal-alert';
        alert.textContent = '';

        openModal('student-modal');
        setTimeout(() => document.getElementById('form-name').focus(), 50);
      }

      // Open Edit Modal
      function openEditModal(student) {
        currentEditingStudent = student;
        document.getElementById('modal-heading').textContent = 'Edit Student Record';
        document.getElementById('submit-btn-text').textContent = 'Update Student';
        document.getElementById('student-id').value = student._id;
        document.getElementById('form-name').value = student.name;
        document.getElementById('form-roll').value = student.rollNumber;
        document.getElementById('form-dept').value = student.department;
        document.getElementById('form-year').value = String(student.year);

        const alert = document.getElementById('form-alert');
        alert.className = 'modal-alert';
        alert.textContent = '';

        openModal('student-modal');
        setTimeout(() => document.getElementById('form-name').focus(), 50);
      }

      // Handle Form Submit (CREATE & UPDATE)
      async function handleFormSubmit(e) {
        e.preventDefault();

        const id = document.getElementById('student-id').value;
        const name = document.getElementById('form-name').value.trim();
        const rollNumber = document.getElementById('form-roll').value.trim().toUpperCase();
        const department = document.getElementById('form-dept').value.trim();
        const year = parseInt(document.getElementById('form-year').value, 10);

        const alert = document.getElementById('form-alert');
        const submitBtn = document.getElementById('form-submit-btn');
        const submitBtnText = document.getElementById('submit-btn-text');

        alert.className = 'modal-alert';
        alert.textContent = '';

        const isEdit = Boolean(id);
        const url = isEdit ? API_BASE + '/api/students/' + id : API_BASE + '/api/students';
        const method = isEdit ? 'PUT' : 'POST';

        submitBtn.disabled = true;
        submitBtnText.textContent = isEdit ? 'Updating...' : 'Creating...';

        try {
          const res = await fetch(url, {
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, rollNumber, department, year })
          });

          const data = await res.json();

          if (!res.ok || !data.success) {
            alert.className = 'modal-alert show';
            if (data.errors && Array.isArray(data.errors)) {
              alert.textContent = data.errors.join(' ');
            } else {
              alert.textContent = data.message || 'Failed to save student record.';
            }
            submitBtn.disabled = false;
            submitBtnText.textContent = isEdit ? 'Update Student' : 'Create Student';
            return;
          }

          closeModal('student-modal');
          showToast(isEdit ? 'Student updated successfully' : 'Student created successfully');
          await loadStudents();
        } catch (err) {
          alert.className = 'modal-alert show';
          alert.textContent = 'Network error: ' + err.message;
        } finally {
          submitBtn.disabled = false;
          submitBtnText.textContent = isEdit ? 'Update Student' : 'Create Student';
        }
      }

      // Open View Modal
      function openViewModal(student) {
        document.getElementById('view-avatar').textContent = (student.name || 'S').charAt(0).toUpperCase();
        document.getElementById('view-name').textContent = student.name;
        document.getElementById('view-roll').textContent = student.rollNumber;
        document.getElementById('view-subtitle').textContent = student.department + ' • Year ' + student.year;
        document.getElementById('view-detail-dept').textContent = student.department;
        document.getElementById('view-detail-year').textContent = 'Year ' + student.year;
        document.getElementById('view-detail-id').textContent = student._id;

        document.getElementById('view-copy-id-btn').onclick = () => copyToClipboard(student._id);

        const created = student.createdAt ? new Date(student.createdAt).toLocaleString() : 'N/A';
        const updated = student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'N/A';

        document.getElementById('view-detail-created').textContent = created;
        document.getElementById('view-detail-updated').textContent = updated;

        document.getElementById('view-edit-btn').onclick = () => {
          closeModal('view-modal');
          openEditModal(student);
        };

        openModal('view-modal');
      }

      // Open Delete Modal
      function openDeleteModal(student) {
        document.getElementById('delete-student-id').value = student._id;
        document.getElementById('delete-student-name').textContent = student.name;
        document.getElementById('delete-student-roll').textContent = student.rollNumber;

        openModal('delete-modal');
      }

      // Execute Delete
      async function executeDelete() {
        const id = document.getElementById('delete-student-id').value;
        const deleteBtn = document.getElementById('confirm-delete-btn');
        const deleteBtnText = document.getElementById('delete-btn-text');

        deleteBtn.disabled = true;
        deleteBtnText.textContent = 'Deleting...';

        try {
          const res = await fetch(API_BASE + '/api/students/' + id, {
            method: 'DELETE',
            headers: { 'Accept': 'application/json' }
          });

          const data = await res.json();

          if (!res.ok || !data.success) {
            showToast('Delete failed: ' + (data.message || 'Unknown error'));
            deleteBtn.disabled = false;
            deleteBtnText.textContent = 'Delete Record';
            return;
          }

          closeModal('delete-modal');
          showToast('Student deleted successfully');
          await loadStudents();
        } catch (err) {
          showToast('Network error: ' + err.message);
        } finally {
          deleteBtn.disabled = false;
          deleteBtnText.textContent = 'Delete Record';
        }
      }

      // Utility: HTML escaper
      function escapeHtml(str) {
        if (!str) return '';
        return String(str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }
    </script>
  `;

  return renderPageLayout({
    title: 'Student Records',
    activeNav: 'students',
    content,
    extraHead,
    extraScripts,
  });
};
