import { renderPageLayout } from './layout';

/**
 * Renders the Editorial / Premium + Creative Tech dashboard for Student Records (GET /api/students).
 */
export const getStudentsPageHtml = (): string => {
  const extraHead = `
    <style>
      /* Editorial Hero Section */
      .editorial-hero {
        display: grid;
        grid-template-columns: 1.4fr 1fr;
        gap: 3rem;
        align-items: flex-end;
        padding-bottom: 2.5rem;
        border-bottom: 1px solid var(--border-line);
        margin-bottom: 2.5rem;
      }

      .hero-eyebrow {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.725rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--accent-indigo);
        margin-bottom: 0.75rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .hero-eyebrow::before {
        content: '//';
        color: var(--text-dim);
      }

      .hero-heading {
        font-family: 'Space Grotesk', -apple-system, sans-serif;
        font-size: 3.75rem;
        font-weight: 700;
        line-height: 0.95;
        letter-spacing: -0.04em;
        color: #ffffff;
        margin-bottom: 1rem;
        text-transform: uppercase;
      }

      .hero-subtitle {
        font-size: 1rem;
        color: var(--text-muted);
        margin-bottom: 0.75rem;
        font-weight: 400;
      }

      .hero-tech-line {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--text-dim);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      /* Hero Statistics Block (Asymmetric & Bold) */
      .hero-stats-panel {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding-left: 2rem;
        border-left: 1px solid var(--border-line);
      }

      .primary-stat-wrap {
        margin-bottom: 1.25rem;
      }

      .primary-stat-num {
        font-family: 'Space Grotesk', -apple-system, sans-serif;
        font-size: 4.5rem;
        font-weight: 700;
        line-height: 0.85;
        letter-spacing: -0.05em;
        color: #ffffff;
        font-variant-numeric: tabular-nums;
      }

      .primary-stat-caption {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--accent-indigo);
        margin-top: 0.35rem;
      }

      .secondary-stats-strip {
        display: flex;
        align-items: center;
        gap: 1.25rem;
        flex-wrap: wrap;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--text-muted);
        padding-top: 1rem;
        border-top: 1px solid var(--border-line-subtle);
        width: 100%;
      }

      .sec-stat-item {
        display: flex;
        align-items: baseline;
        gap: 0.35rem;
      }

      .sec-stat-val {
        color: #ffffff;
        font-weight: 600;
      }

      .sec-stat-lbl {
        font-size: 0.65rem;
        color: var(--text-dim);
        letter-spacing: 0.05em;
      }

      /* Student Directory Header */
      .directory-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 1.5rem;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .directory-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #ffffff;
        text-transform: uppercase;
        margin-bottom: 0.25rem;
      }

      .directory-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
      }

      /* Refined Control Bar */
      .editorial-controls {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }

      .search-container {
        flex: 2;
        min-width: 240px;
        position: relative;
        display: flex;
        align-items: center;
      }

      .search-icon-svg {
        position: absolute;
        left: 0.85rem;
        width: 14px;
        height: 14px;
        color: var(--text-dim);
        pointer-events: none;
      }

      .editorial-search-input {
        width: 100%;
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid var(--border-line);
        color: var(--text-main);
        padding: 0.55rem 2.25rem 0.55rem 2.4rem;
        border-radius: var(--radius-sm);
        font-size: 0.825rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.15s ease, background 0.15s ease;
      }

      .editorial-search-input:focus {
        border-color: var(--accent-indigo);
        background: rgba(255, 255, 255, 0.04);
      }

      .search-shortcut-badge {
        position: absolute;
        right: 0.75rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        color: var(--text-dim);
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid var(--border-line);
        padding: 0.1rem 0.35rem;
        border-radius: 3px;
        pointer-events: none;
      }

      .editorial-select {
        background: rgba(255, 255, 255, 0.025);
        border: 1px solid var(--border-line);
        color: var(--text-muted);
        padding: 0.55rem 0.85rem;
        border-radius: var(--radius-sm);
        font-size: 0.825rem;
        font-family: inherit;
        outline: none;
        cursor: pointer;
        transition: border-color 0.15s ease, color 0.15s ease;
      }

      .editorial-select:focus, .editorial-select:hover {
        border-color: var(--border-line-hover);
        color: var(--text-main);
      }

      .editorial-select option {
        background: #0d1117;
        color: var(--text-main);
      }

      .btn-reset-filters {
        display: none;
        font-size: 0.775rem;
        font-family: 'JetBrains Mono', monospace;
        color: var(--text-dim);
        background: transparent;
        border: 1px dashed var(--border-line);
        padding: 0.45rem 0.75rem;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all 0.15s ease;
      }

      .btn-reset-filters:hover {
        color: var(--text-main);
        border-color: var(--border-line-hover);
      }

      .btn-reset-filters.active {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
      }

      .control-meta {
        margin-left: auto;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--text-dim);
      }

      /* Editorial Table / List with Thin Separators */
      .editorial-table-wrap {
        border-top: 1px solid var(--border-line);
        border-bottom: 1px solid var(--border-line);
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        margin-bottom: 3.5rem;
      }

      .editorial-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
        font-size: 0.85rem;
      }

      .editorial-table th {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.65rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-dim);
        padding: 0.85rem 1rem;
        border-bottom: 1px solid var(--border-line);
        white-space: nowrap;
      }

      .editorial-table td {
        padding: 1.15rem 1rem;
        border-bottom: 1px solid var(--border-line-subtle);
        vertical-align: middle;
        transition: background 0.15s ease;
      }

      .editorial-table tr:last-child td {
        border-bottom: none;
      }

      .editorial-table tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }

      .index-col {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--text-dim);
        width: 48px;
      }

      .student-name {
        font-weight: 600;
        color: #ffffff;
        font-size: 0.95rem;
        letter-spacing: -0.01em;
      }

      .student-roll {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.825rem;
        color: var(--text-main);
        font-weight: 500;
      }

      .student-dept {
        color: var(--text-muted);
        font-size: 0.825rem;
      }

      .student-year {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--accent-indigo);
        letter-spacing: 0.04em;
        font-weight: 600;
      }

      .action-links {
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
      }

      .action-link {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        color: var(--text-dim);
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.2rem 0;
        text-decoration: none;
        transition: color 0.15s ease;
      }

      .action-link:hover {
        color: var(--text-main);
      }

      .action-link.view:hover {
        color: var(--accent-cyan);
      }

      .action-link.edit:hover {
        color: var(--accent-indigo);
      }

      .action-link.delete:hover {
        color: var(--status-red);
      }

      /* System / API Info Section */
      .system-info-section {
        display: grid;
        grid-template-columns: 1fr 1.5fr;
        gap: 3rem;
        padding-top: 2.5rem;
        border-top: 1px solid var(--border-line);
        margin-top: 2rem;
      }

      .info-column-title {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.725rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--text-dim);
        margin-bottom: 1.25rem;
      }

      .tech-kv-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.775rem;
      }

      .tech-kv-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 0.6rem;
        border-bottom: 1px solid var(--border-line-subtle);
      }

      .tech-kv-key {
        color: var(--text-dim);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .tech-kv-val {
        color: var(--text-main);
        font-weight: 500;
      }

      .endpoint-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .endpoint-entry {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        padding: 0.6rem 0.85rem;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--border-line-subtle);
        border-radius: var(--radius-sm);
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.775rem;
      }

      /* Refined Modals / Slide-Over Panels */
      .editorial-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 1.5rem;
      }

      .editorial-overlay.open {
        display: flex;
      }

      .editorial-panel {
        background: var(--bg-surface);
        border: 1px solid var(--border-line-hover);
        border-radius: var(--radius);
        width: 100%;
        max-width: 560px;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
        overflow-y: auto;
      }

      .panel-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.75rem;
        border-bottom: 1px solid var(--border-line);
      }

      .panel-head-title {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: -0.02em;
        text-transform: uppercase;
      }

      .panel-close {
        background: transparent;
        border: none;
        color: var(--text-dim);
        font-size: 1.35rem;
        line-height: 1;
        cursor: pointer;
        transition: color 0.15s ease;
      }

      .panel-close:hover {
        color: #ffffff;
      }

      .panel-content {
        padding: 1.75rem;
      }

      .panel-foot {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.75rem;
        padding: 1.25rem 1.75rem;
        border-top: 1px solid var(--border-line);
        background: rgba(0, 0, 0, 0.2);
      }

      /* Structured Technical Metadata (View Student) */
      .meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem 1.25rem;
      }

      .meta-block-full {
        grid-column: 1 / -1;
      }

      .meta-title {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.675rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-dim);
        margin-bottom: 0.35rem;
      }

      .meta-data {
        font-size: 0.95rem;
        color: var(--text-main);
        font-weight: 500;
      }

      .meta-data.mono {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.85rem;
      }

      /* Form Fields */
      .form-field {
        margin-bottom: 1.35rem;
      }

      .field-label {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 0.4rem;
      }

      .field-input, .field-select {
        width: 100%;
        background: var(--bg-input);
        border: 1px solid var(--border-line);
        color: var(--text-main);
        padding: 0.6rem 0.85rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        font-family: inherit;
        outline: none;
        transition: border-color 0.15s ease;
      }

      .field-input:focus, .field-select:focus {
        border-color: var(--accent-indigo);
      }

      .field-select option {
        background: #0d1117;
        color: var(--text-main);
      }

      .form-alert-box {
        display: none;
        padding: 0.75rem 1rem;
        border-radius: var(--radius-sm);
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        margin-bottom: 1.25rem;
        background: rgba(244, 63, 94, 0.08);
        border: 1px solid rgba(244, 63, 94, 0.3);
        color: #fca5a5;
      }

      /* Minimal Loading */
      .skeleton-bar {
        height: 14px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
        animation: pulse-op 1.5s ease-in-out infinite;
      }

      @keyframes pulse-op {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }

      @media (max-width: 900px) {
        .editorial-hero {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        .hero-stats-panel {
          padding-left: 0;
          border-left: none;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-line);
        }
        .hero-heading {
          font-size: 2.75rem;
        }
        .system-info-section {
          grid-template-columns: 1fr;
          gap: 2rem;
        }
      }
    </style>
  `;

  const content = `
    <!-- Editorial Hero / Overview -->
    <section class="editorial-hero">
      <div>
        <div class="hero-eyebrow">
          STUDENT DATABASE / API
        </div>
        <h1 class="hero-heading">
          STUDENT<br />
          RECORDS
        </h1>
        <p class="hero-subtitle">
          REST API for managing student records.
        </p>
        <div class="hero-tech-line">
          <span>Node.js</span> &bull;
          <span>Express</span> &bull;
          <span>TypeScript</span> &bull;
          <span>MongoDB</span>
        </div>
      </div>

      <div class="hero-stats-panel">
        <div class="primary-stat-wrap">
          <div class="primary-stat-num" id="stat-students">00</div>
          <div class="primary-stat-caption">STUDENTS</div>
        </div>

        <div class="secondary-stats-strip">
          <div class="sec-stat-item">
            <span class="sec-stat-val" id="stat-depts">00</span>
            <span class="sec-stat-lbl">DEPARTMENTS</span>
          </div>
          <span style="color: var(--border-line);">&bull;</span>
          <div class="sec-stat-item">
            <span class="sec-stat-val">REST</span>
            <span class="sec-stat-lbl">API</span>
          </div>
          <span style="color: var(--border-line);">&bull;</span>
          <div class="sec-stat-item">
            <span class="sec-stat-val" style="color: var(--status-green);">ONLINE</span>
            <span class="sec-stat-lbl">DATABASE</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Student Directory Section -->
    <section>
      <div class="directory-header">
        <div>
          <h2 class="directory-title">STUDENT DIRECTORY</h2>
          <p class="directory-desc">Manage and explore records stored in MongoDB.</p>
        </div>

        <div>
          <button class="btn btn-indigo" onclick="openCreateModal()" id="btn-add-student">
            + Add Student
          </button>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="editorial-controls">
        <div class="search-container">
          <svg class="search-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="search-input" 
            class="editorial-search-input" 
            placeholder="Search students..." 
            oninput="applyFilters()"
            autocomplete="off"
          />
          <span class="search-shortcut-badge">/</span>
        </div>

        <select id="dept-select" class="editorial-select" onchange="applyFilters()">
          <option value="">Department</option>
        </select>

        <select id="year-select" class="editorial-select" onchange="applyFilters()">
          <option value="">Year</option>
          <option value="1">Year 01</option>
          <option value="2">Year 02</option>
          <option value="3">Year 03</option>
          <option value="4">Year 04</option>
        </select>

        <button class="btn-reset-filters" id="btn-reset-filters" onclick="resetFilters()">
          &times; Clear filters
        </button>

        <div class="control-meta" id="filter-count-meta">
          0 of 0 records
        </div>
      </div>

      <!-- Subtle Error Banner -->
      <div id="error-banner" style="display: none; padding: 0.85rem 1.25rem; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; margin-bottom: 1.5rem; background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.25); color: #fca5a5; justify-content: space-between; align-items: center;">
        <span id="error-banner-text">Database unavailable. Please ensure MongoDB is running.</span>
        <button class="btn btn-secondary" style="padding: 0.25rem 0.65rem; font-size: 0.725rem;" onclick="loadStudents()">
          Retry
        </button>
      </div>

      <!-- Refined Editorial Table / List with Thin Separators -->
      <div class="editorial-table-wrap" id="table-wrapper">
        <table class="editorial-table">
          <thead>
            <tr>
              <th class="index-col">#</th>
              <th>Student</th>
              <th>Roll Number</th>
              <th>Department</th>
              <th>Year</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody id="students-tbody">
            <!-- Dynamically populated rows -->
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div id="empty-state" style="display: none; text-align: center; padding: 4rem 1.5rem; border-top: 1px solid var(--border-line); border-bottom: 1px solid var(--border-line); margin-bottom: 3rem;">
        <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; color: #ffffff; text-transform: uppercase; margin-bottom: 0.4rem;" id="empty-title">
          No student records
        </div>
        <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.5rem;" id="empty-desc">
          Add your first student record to get started.
        </p>
        <button class="btn btn-indigo" onclick="openCreateModal()">
          + Add Student
        </button>
      </div>
    </section>

    <!-- System / API Information Section -->
    <section class="system-info-section">
      <div>
        <div class="info-column-title">// SYSTEM ARCHITECTURE</div>
        <div class="tech-kv-list">
          <div class="tech-kv-row">
            <span class="tech-kv-key">API STATUS</span>
            <span class="tech-kv-val" style="color: var(--status-green);">ONLINE</span>
          </div>
          <div class="tech-kv-row">
            <span class="tech-kv-key">DATABASE</span>
            <span class="tech-kv-val" id="info-db-status" style="color: var(--status-green);">CONNECTED</span>
          </div>
          <div class="tech-kv-row">
            <span class="tech-kv-key">RUNTIME</span>
            <span class="tech-kv-val">NODE.JS</span>
          </div>
          <div class="tech-kv-row">
            <span class="tech-kv-key">DATABASE</span>
            <span class="tech-kv-val">MONGODB</span>
          </div>
        </div>
      </div>

      <div>
        <div class="info-column-title">// ENDPOINT REFERENCE</div>
        <div class="endpoint-list">
          <div class="endpoint-entry">
            <span class="method method-get">GET</span>
            <span style="color: var(--text-main);">/api/students</span>
            <span style="margin-left: auto; color: var(--text-dim); font-size: 0.7rem;">Retrieve all records</span>
          </div>
          <div class="endpoint-entry">
            <span class="method method-post">POST</span>
            <span style="color: var(--text-main);">/api/students</span>
            <span style="margin-left: auto; color: var(--text-dim); font-size: 0.7rem;">Create new record</span>
          </div>
          <div class="endpoint-entry">
            <span class="method method-put">PUT</span>
            <span style="color: var(--text-main);">/api/students/:id</span>
            <span style="margin-left: auto; color: var(--text-dim); font-size: 0.7rem;">Update record by ID</span>
          </div>
          <div class="endpoint-entry">
            <span class="method method-delete">DELETE</span>
            <span style="color: var(--text-main);">/api/students/:id</span>
            <span style="margin-left: auto; color: var(--text-dim); font-size: 0.7rem;">Delete record by ID</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ADD / EDIT SLIDE-OVER MODAL -->
    <div class="editorial-overlay" id="student-modal" onclick="onBackdropClick(event, 'student-modal')">
      <div class="editorial-panel">
        <div class="panel-head">
          <div class="panel-head-title" id="modal-heading">Add Student</div>
          <button class="panel-close" onclick="closeModal('student-modal')">&times;</button>
        </div>

        <div class="panel-content">
          <div class="form-alert-box" id="form-alert"></div>

          <form id="student-form" onsubmit="handleFormSubmit(event)">
            <input type="hidden" id="student-id" value="" />

            <div class="form-field">
              <label class="field-label" for="form-name">Name</label>
              <input type="text" id="form-name" class="field-input" placeholder="e.g. Pranav Karthick V" required autocomplete="off" />
            </div>

            <div class="form-field">
              <label class="field-label" for="form-roll">Roll Number</label>
              <input type="text" id="form-roll" class="field-input" placeholder="e.g. ECE001" required autocomplete="off" style="text-transform: uppercase; font-family: 'JetBrains Mono', monospace;" />
            </div>

            <div class="form-field">
              <label class="field-label" for="form-dept">Department</label>
              <input type="text" id="form-dept" class="field-input" placeholder="e.g. Electronics and Communication Engineering" required autocomplete="off" />
            </div>

            <div class="form-field">
              <label class="field-label" for="form-year">Year</label>
              <select id="form-year" class="field-select" required>
                <option value="1">Year 01</option>
                <option value="2">Year 02</option>
                <option value="3">Year 03</option>
                <option value="4">Year 04</option>
              </select>
            </div>

            <div class="panel-foot" style="margin: 1.75rem -1.75rem -1.75rem;">
              <button type="button" class="btn btn-secondary" onclick="closeModal('student-modal')">Cancel</button>
              <button type="submit" class="btn btn-indigo" id="form-submit-btn">
                <span id="submit-btn-text">Save Student</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- VIEW DETAIL PANEL (STRUCTURED TECHNICAL METADATA) -->
    <div class="editorial-overlay" id="view-modal" onclick="onBackdropClick(event, 'view-modal')">
      <div class="editorial-panel" style="max-width: 600px;">
        <div class="panel-head">
          <div class="panel-head-title">Student Profile</div>
          <button class="panel-close" onclick="closeModal('view-modal')">&times;</button>
        </div>

        <div class="panel-content">
          <div style="margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-line);">
            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.75rem; font-weight: 700; color: #ffffff; letter-spacing: -0.02em; line-height: 1.1;" id="view-name">
              Student Name
            </div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--accent-indigo); margin-top: 0.35rem;" id="view-roll-preview">
              ROLL
            </div>
          </div>

          <div class="meta-grid">
            <div>
              <div class="meta-title">ROLL NUMBER</div>
              <div class="meta-data mono" id="view-roll" style="color: var(--accent-indigo);">-</div>
            </div>

            <div>
              <div class="meta-title">YEAR</div>
              <div class="meta-data mono" id="view-year">-</div>
            </div>

            <div class="meta-block-full">
              <div class="meta-title">DEPARTMENT</div>
              <div class="meta-data" id="view-dept">-</div>
            </div>

            <div class="meta-block-full">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="meta-title">MONGODB ID</span>
                <button class="btn btn-ghost" id="view-copy-id-btn" style="padding: 0.1rem 0.4rem; font-size: 0.7rem; font-family: 'JetBrains Mono', monospace;">Copy</button>
              </div>
              <div class="meta-data mono" id="view-id" style="font-size: 0.8rem; color: var(--text-dim); word-break: break-all;">-</div>
            </div>

            <div>
              <div class="meta-title">CREATED</div>
              <div class="meta-data mono" id="view-created" style="font-size: 0.775rem; color: var(--text-muted);">-</div>
            </div>

            <div>
              <div class="meta-title">UPDATED</div>
              <div class="meta-data mono" id="view-updated" style="font-size: 0.775rem; color: var(--text-muted);">-</div>
            </div>
          </div>
        </div>

        <div class="panel-foot">
          <button type="button" class="btn btn-secondary" onclick="closeModal('view-modal')">Close</button>
          <button type="button" class="btn btn-indigo" id="view-edit-shortcut-btn">Edit Student</button>
        </div>
      </div>
    </div>

    <!-- DELETE CONFIRMATION -->
    <div class="editorial-overlay" id="delete-modal" onclick="onBackdropClick(event, 'delete-modal')">
      <div class="editorial-panel" style="max-width: 440px;">
        <div class="panel-head">
          <div class="panel-head-title" style="color: var(--status-red);">Confirm Deletion</div>
          <button class="panel-close" onclick="closeModal('delete-modal')">&times;</button>
        </div>

        <div class="panel-content">
          <p style="font-size: 0.9rem; color: var(--text-main); margin-bottom: 1.25rem; line-height: 1.5;">
            Are you sure you want to delete this student record? This action cannot be reversed.
          </p>

          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-line); border-radius: var(--radius-sm); padding: 0.85rem 1rem;">
            <div style="font-weight: 600; color: #ffffff;" id="delete-name">-</div>
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--status-red); margin-top: 0.25rem;" id="delete-roll">-</div>
          </div>

          <input type="hidden" id="delete-id" value="" />
        </div>

        <div class="panel-foot">
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

      document.addEventListener('DOMContentLoaded', () => {
        loadStudents();
        checkDbStatus();

        // Keyboard shortcuts: / to search, Esc to close
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            closeModal('student-modal');
            closeModal('view-modal');
            closeModal('delete-modal');
          } else if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.focus();
          }
        });
      });

      // System Health Status
      async function checkDbStatus() {
        try {
          const res = await fetch(API_BASE + '/api/health', {
            headers: { 'Accept': 'application/json' }
          });
          if (res.ok) {
            const data = await res.json();
            const isConnected = data.database === 'connected';
            const dot = document.getElementById('header-dot');
            const text = document.getElementById('header-status-text');
            const infoDbStatus = document.getElementById('info-db-status');

            if (dot && text) {
              dot.className = isConnected ? 'status-indicator-dot' : 'status-indicator-dot offline';
              text.textContent = isConnected ? 'MongoDB Connected' : 'MongoDB Disconnected';
            }
            if (infoDbStatus) {
              infoDbStatus.textContent = isConnected ? 'CONNECTED' : 'DISCONNECTED';
              infoDbStatus.style.color = isConnected ? 'var(--status-green)' : 'var(--status-red)';
            }
          }
        } catch (e) {}
      }

      // Load Students via GET /api/students
      async function loadStudents() {
        const tbody = document.getElementById('students-tbody');
        const tableWrapper = document.getElementById('table-wrapper');
        const emptyState = document.getElementById('empty-state');
        const errorBanner = document.getElementById('error-banner');

        errorBanner.style.display = 'none';

        tbody.innerHTML = 
          '<tr><td colspan="6"><div class="skeleton-bar" style="width: 30%;"></div></td></tr>' +
          '<tr><td colspan="6"><div class="skeleton-bar" style="width: 50%;"></div></td></tr>' +
          '<tr><td colspan="6"><div class="skeleton-bar" style="width: 40%;"></div></td></tr>';

        tableWrapper.style.display = 'block';
        emptyState.style.display = 'none';

        try {
          const res = await fetch(API_BASE + '/api/students', {
            headers: { 'Accept': 'application/json' }
          });

          const data = await res.json();

          if (!res.ok || !data.success) {
            tableWrapper.style.display = 'none';
            errorBanner.style.display = 'flex';
            document.getElementById('error-banner-text').textContent = data.message || 'Unable to fetch records.';
            return;
          }

          allStudents = data.data || [];
          updateHeroStats();
          populateDeptDropdown();
          applyFilters();
        } catch (err) {
          tableWrapper.style.display = 'none';
          errorBanner.style.display = 'flex';
          document.getElementById('error-banner-text').textContent = 'Network error: ' + err.message;
        }
      }

      // Update Hero Statistics
      function updateHeroStats() {
        const statStudents = document.getElementById('stat-students');
        const statDepts = document.getElementById('stat-depts');

        const studentCount = allStudents.length;
        const deptCount = new Set(allStudents.map(s => s.department).filter(Boolean)).size;

        if (statStudents) statStudents.textContent = studentCount < 10 ? '0' + studentCount : String(studentCount);
        if (statDepts) statDepts.textContent = deptCount < 10 ? '0' + deptCount : String(deptCount);
      }

      // Populate Department Dropdown
      function populateDeptDropdown() {
        const deptSelect = document.getElementById('dept-select');
        const currentVal = deptSelect.value;
        const depts = Array.from(new Set(allStudents.map(s => s.department).filter(Boolean))).sort();

        deptSelect.innerHTML = '<option value="">Department</option>' + 
          depts.map(d => '<option value="' + d + '" ' + (d === currentVal ? 'selected' : '') + '>' + d + '</option>').join('');
      }

      // Apply Search & Filters
      function applyFilters() {
        const query = (document.getElementById('search-input').value || '').toLowerCase().trim();
        const dept = (document.getElementById('dept-select').value || '').toLowerCase();
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

        // Toggle reset button
        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
          if (query || dept || year) {
            resetBtn.className = 'btn-reset-filters active';
          } else {
            resetBtn.className = 'btn-reset-filters';
          }
        }

        const countMeta = document.getElementById('filter-count-meta');
        if (countMeta) {
          countMeta.textContent = filtered.length + ' of ' + allStudents.length + ' records';
        }

        renderTable(filtered);
      }

      // Reset filters
      function resetFilters() {
        document.getElementById('search-input').value = '';
        document.getElementById('dept-select').value = '';
        document.getElementById('year-select').value = '';
        applyFilters();
      }

      // Render Editorial Table Rows
      function renderTable(students) {
        const tbody = document.getElementById('students-tbody');
        const tableWrapper = document.getElementById('table-wrapper');
        const emptyState = document.getElementById('empty-state');
        const emptyTitle = document.getElementById('empty-title');
        const emptyDesc = document.getElementById('empty-desc');

        if (allStudents.length === 0) {
          tableWrapper.style.display = 'none';
          emptyState.style.display = 'block';
          emptyTitle.textContent = 'No student records';
          emptyDesc.textContent = 'Add your first student record to get started.';
          return;
        }

        if (students.length === 0) {
          tableWrapper.style.display = 'none';
          emptyState.style.display = 'block';
          emptyTitle.textContent = 'No matching records';
          emptyDesc.textContent = 'No records match your query or active filters.';
          return;
        }

        emptyState.style.display = 'none';
        tableWrapper.style.display = 'block';

        tbody.innerHTML = students.map((s, index) => {
          const indexNum = (index + 1) < 10 ? '0' + (index + 1) : String(index + 1);
          const yearFormatted = (s.year < 10 ? '0' : '') + s.year;
          const studentJson = JSON.stringify(s).replace(/'/g, '&#39;');

          return '<tr>' +
            '<td class="index-col">' + indexNum + '</td>' +
            '<td>' +
              '<div class="student-name">' + escapeHtml(s.name) + '</div>' +
            '</td>' +
            '<td>' +
              '<span class="student-roll">' + escapeHtml(s.rollNumber) + '</span>' +
            '</td>' +
            '<td>' +
              '<span class="student-dept">' + escapeHtml(s.department) + '</span>' +
            '</td>' +
            '<td>' +
              '<span class="student-year">YEAR ' + yearFormatted + '</span>' +
            '</td>' +
            '<td style="text-align: right; white-space: nowrap;">' +
              '<div class="action-links">' +
                '<button class="action-link view" onclick=\\'openViewModal(' + studentJson + ')\\'>View</button>' +
                '<button class="action-link edit" onclick=\\'openEditModal(' + studentJson + ')\\'>Edit</button>' +
                '<button class="action-link delete" onclick=\\'openDeleteModal(' + studentJson + ')\\'>Delete</button>' +
              '</div>' +
            '</td>' +
          '</tr>';
        }).join('');
      }

      // Modal helpers
      function openModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('open');
      }

      function closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('open');
      }

      function onBackdropClick(e, id) {
        if (e.target.id === id) closeModal(id);
      }

      // Create Modal
      function openCreateModal() {
        document.getElementById('modal-heading').textContent = 'Add Student';
        document.getElementById('submit-btn-text').textContent = 'Save Student';
        document.getElementById('student-id').value = '';
        document.getElementById('form-name').value = '';
        document.getElementById('form-roll').value = '';
        document.getElementById('form-dept').value = '';
        document.getElementById('form-year').value = '1';

        const alert = document.getElementById('form-alert');
        alert.style.display = 'none';
        alert.textContent = '';

        openModal('student-modal');
        setTimeout(() => document.getElementById('form-name').focus(), 50);
      }

      // Edit Modal
      function openEditModal(student) {
        document.getElementById('modal-heading').textContent = 'Edit Student';
        document.getElementById('submit-btn-text').textContent = 'Save Student';
        document.getElementById('student-id').value = student._id;
        document.getElementById('form-name').value = student.name;
        document.getElementById('form-roll').value = student.rollNumber;
        document.getElementById('form-dept').value = student.department;
        document.getElementById('form-year').value = String(student.year);

        const alert = document.getElementById('form-alert');
        alert.style.display = 'none';
        alert.textContent = '';

        openModal('student-modal');
        setTimeout(() => document.getElementById('form-name').focus(), 50);
      }

      // Handle Submit (Create & Update)
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

        alert.style.display = 'none';
        alert.textContent = '';

        const isEdit = Boolean(id);
        const url = isEdit ? API_BASE + '/api/students/' + id : API_BASE + '/api/students';
        const method = isEdit ? 'PUT' : 'POST';

        submitBtn.disabled = true;
        submitBtnText.textContent = 'Saving...';

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
            alert.style.display = 'block';
            if (data.errors && Array.isArray(data.errors)) {
              alert.textContent = data.errors.join(' ');
            } else {
              alert.textContent = data.message || 'Failed to save student record.';
            }
            submitBtn.disabled = false;
            submitBtnText.textContent = 'Save Student';
            return;
          }

          closeModal('student-modal');
          showToast(isEdit ? 'Student updated' : 'Student created');
          await loadStudents();
        } catch (err) {
          alert.style.display = 'block';
          alert.textContent = 'Network error: ' + err.message;
        } finally {
          submitBtn.disabled = false;
          submitBtnText.textContent = 'Save Student';
        }
      }

      // View Modal
      function openViewModal(student) {
        const yearFormatted = (student.year < 10 ? '0' : '') + student.year;

        document.getElementById('view-name').textContent = student.name;
        document.getElementById('view-roll-preview').textContent = student.rollNumber;
        document.getElementById('view-roll').textContent = student.rollNumber;
        document.getElementById('view-dept').textContent = student.department;
        document.getElementById('view-year').textContent = yearFormatted;
        document.getElementById('view-id').textContent = student._id;

        document.getElementById('view-copy-id-btn').onclick = () => copyToClipboard(student._id);

        const created = student.createdAt ? new Date(student.createdAt).toLocaleString() : 'N/A';
        const updated = student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'N/A';

        document.getElementById('view-created').textContent = created;
        document.getElementById('view-updated').textContent = updated;

        document.getElementById('view-edit-shortcut-btn').onclick = () => {
          closeModal('view-modal');
          openEditModal(student);
        };

        openModal('view-modal');
      }

      // Delete Modal
      function openDeleteModal(student) {
        document.getElementById('delete-id').value = student._id;
        document.getElementById('delete-name').textContent = student.name;
        document.getElementById('delete-roll').textContent = student.rollNumber;

        openModal('delete-modal');
      }

      // Execute Delete
      async function executeDelete() {
        const id = document.getElementById('delete-id').value;
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
          showToast('Student deleted');
          await loadStudents();
        } catch (err) {
          showToast('Network error: ' + err.message);
        } finally {
          deleteBtn.disabled = false;
          deleteBtnText.textContent = 'Delete Record';
        }
      }

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
    title: 'Directory',
    activeNav: 'students',
    content,
    extraHead,
    extraScripts,
  });
};
