// js/app.js - shared dashboard shell, seeded data layer, and prototype actions
(function () {
    const storeKey = 'talanscan.platform.v1';

    const seed = {
        user: {
            name: 'Admin User',
            initials: 'AD',
            email: 'admin@talanscan.local',
            role: 'Workspace Administrator',
            organization: 'TalanScan Research Lab'
        },
        templates: [
            { id: 'TPL-101', name: 'Health Survey v2', source: 'AI Converted', questions: 15, updated: 'Jun 20, 2026' },
            { id: 'TPL-102', name: 'Standard Evaluation Form', source: 'Manual Build', questions: 10, updated: 'Jun 18, 2026' },
            { id: 'TPL-103', name: 'Blank Multiple Choice 50', source: 'System Default', questions: 50, updated: 'May 30, 2026' },
            { id: 'TPL-104', name: 'Employee Feedback Form', source: 'AI Converted', questions: 8, updated: 'May 21, 2026' },
            { id: 'TPL-105', name: 'HR Survey Format', source: 'Manual Build', questions: 20, updated: 'May 10, 2026' }
        ],
        surveys: [
            { id: 'SRV-001', name: 'Regional Health Census 2026', template: 'Health Survey v2', status: 'active', responses: 4102, created: 'Jun 12, 2026', completion: 84 },
            { id: 'SRV-002', name: 'Student Evaluation Fall Semester', template: 'Standard Evaluation Form', status: 'active', responses: 890, created: 'Jun 10, 2026', completion: 76 },
            { id: 'SRV-003', name: 'Local Business Feedback', template: 'Blank Multiple Choice 50', status: 'draft', responses: 0, created: 'Jun 21, 2026', completion: 0 },
            { id: 'SRV-004', name: 'Employee Engagement Q3', template: 'HR Survey Format', status: 'closed', responses: 3500, created: 'May 1, 2026', completion: 91 },
            { id: 'SRV-005', name: 'Infrastructure Assessment', template: 'Site Checklist 01', status: 'closed', responses: 420, created: 'Apr 15, 2026', completion: 68 }
        ],
        responses: [
            { id: 'SCN-9912', survey: 'Regional Health Census 2026', enumerator: 'Enum_JohnD', synced: 'Jun 22, 2026 - 15:02', confidence: 100 },
            { id: 'SCN-9911', survey: 'Regional Health Census 2026', enumerator: 'Enum_JaneS', synced: 'Jun 22, 2026 - 14:45', confidence: 85 },
            { id: 'SCN-9910', survey: 'Student Evaluation Fall Semester', enumerator: 'Enum_MikeT', synced: 'Jun 22, 2026 - 12:30', confidence: 98 },
            { id: 'SCN-9909', survey: 'Employee Engagement Q3', enumerator: 'Enum_AnaR', synced: 'Jun 21, 2026 - 18:12', confidence: 93 }
        ],
        conversions: [
            { id: 'CV-9021', fileName: 'Health_Survey_v2.pdf', date: 'Jun 22, 2026 - 14:30', status: 'completed', confidence: 98.2, pages: 2, assets: ['OMR Template', 'JSON Schema', 'Web Form'] },
            { id: 'CV-9020', fileName: 'Student_Evaluation_Scan.jpg', date: 'Jun 22, 2026 - 11:15', status: 'processing', confidence: null, pages: 1, assets: ['Extracting...'] },
            { id: 'CV-9019', fileName: 'Employee_Feedback_Form.pdf', date: 'Jun 21, 2026 - 09:45', status: 'completed', confidence: 94.5, pages: 4, assets: ['OMR Template', 'JSON Schema'] },
            { id: 'CV-9018', fileName: 'Handwritten_Census_Draft.png', date: 'Jun 20, 2026 - 08:20', status: 'failed', confidence: 45.0, pages: 1, assets: ['Review Required'] },
            { id: 'CV-9017', fileName: 'Customer_Satisfaction_Q3.pdf', date: 'Jun 19, 2026 - 16:00', status: 'completed', confidence: 99.1, pages: 1, assets: ['OMR Template', 'JSON Schema', 'Web Form'] }
        ],
        activity: [
            { icon: 'fa-magic', title: 'Health Survey v2 converted', meta: '98.2% confidence - 2 generated assets ready' },
            { icon: 'fa-inbox', title: '124 responses synced today', meta: 'Regional Health Census 2026' },
            { icon: 'fa-file-export', title: 'CSV export prepared', meta: 'Student Evaluation Fall Semester' },
            { icon: 'fa-user-check', title: 'users member added', meta: 'Research Staff joined the workspace' }
        ]
    };

    function loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem(storeKey) || 'null');
            return saved ? { ...seed, ...saved } : seed;
        } catch (error) {
            return seed;
        }
    }

    function saveState(state) {
        localStorage.setItem(storeKey, JSON.stringify(state));
    }

    const state = loadState();
    saveState(state);

    window.TalanScan = {
        state,
        save: () => saveState(state),
        addConversion(fileName) {
            const nextId = `CV-${9022 + state.conversions.length}`;
            const conversion = {
                id: nextId,
                fileName,
                date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                status: 'processing',
                confidence: null,
                pages: 1,
                assets: ['Queued']
            };
            state.conversions.unshift(conversion);
            state.activity.unshift({ icon: 'fa-cloud-upload-alt', title: `${fileName} queued for conversion`, meta: 'Gemini workflow started' });
            saveState(state);
            return conversion;
        },
        completeLatestConversion() {
            const conversion = state.conversions.find((item) => item.status === 'processing');
            if (!conversion) return null;
            conversion.status = 'completed';
            conversion.confidence = 97.4;
            conversion.assets = ['OMR Template', 'JSON Schema', 'Web Form'];
            state.templates.unshift({
                id: `TPL-${110 + state.templates.length}`,
                name: conversion.fileName.replace(/\.[^/.]+$/, '').replaceAll('_', ' '),
                source: 'AI Converted',
                questions: 12,
                updated: 'Jun 22, 2026'
            });
            state.activity.unshift({ icon: 'fa-check-circle', title: `${conversion.fileName} assets generated`, meta: 'Ready to save as survey template' });
            saveState(state);
            return conversion;
        }
    };

    const navItems = [
        ['Overview', 'dashboard.html', 'fa-home'],
        ['Surveys', 'surveys.html', 'fa-clipboard-list'],
        ['Responses', 'responses.html', 'fa-inbox'],
        ['Conversion Queue', 'conversion-dashboard.html', 'fa-wand-magic-sparkles'],
        ['Templates', 'templates.html', 'fa-file-alt'],
        ['AI Conversion', 'upload-questionnaire.html', 'fa-qrcode'],
        ['Exports', 'exports.html', 'fa-file-export'],
        ['Users', 'users.html', 'fa-users'],
        ['Profile', 'profile.html', 'fa-user-circle'],
        ['Settings', 'settings.html', 'fa-gear']
    ];

    function currentPage() {
        return window.location.pathname.split('/').pop() || 'dashboard.html';
    }

    function createSidebar() {
        if (document.querySelector('.sidebar')) return;
        const sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.id = 'sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-header">
                <a class="brand" href="dashboard.html"><i class="fas fa-qrcode"></i><span>TalanScan</span></a>
                <button id="closeSidebar" class="btn-icon mobile-menu-btn" aria-label="Close navigation"><i class="fas fa-times"></i></button>
            </div>
            <nav class="sidebar-nav">
                <p class="nav-section-title">Workspace</p>
                <ul class="nav-list">
                    ${navItems.slice(0, 5).map(renderNavItem).join('')}
                </ul>
                <p class="nav-section-title">Conversion</p>
                <ul class="nav-list">
                    ${navItems.slice(5, 7).map(renderNavItem).join('')}
                </ul>
                <p class="nav-section-title">Administration</p>
                <ul class="nav-list">
                    ${navItems.slice(7, 10).map(renderNavItem).join('')}
                </ul>
            </nav>
            <div class="sidebar-footer">
                <div class="avatar">${state.user.initials}</div>
                <div>
                    <strong>${state.user.name}</strong>
                    <a href="../index.html" class="text-muted text-sm">Log out</a>
                </div>
            </div>
        `;
        document.body.insertBefore(sidebar, document.querySelector('.main-content') || document.body.firstChild);
    }

    function renderNavItem([label, href, icon]) {
        const active = href === currentPage() ? ' active' : '';
        return `<li><a href="${href}" class="nav-link${active}" data-nav><i class="fas ${icon}"></i><span>${label}</span></a></li>`;
    }

    function upgradeTopbar() {
        const header = document.querySelector('.top-navbar, .topbar');
        if (!header) return;
        header.classList.add('top-navbar');
        if (!header.querySelector('#mobileMenuBtn')) {
            const button = document.createElement('button');
            button.id = 'mobileMenuBtn';
            button.className = 'mobile-menu-btn';
            button.setAttribute('aria-label', 'Open navigation');
            button.innerHTML = '<i class="fas fa-bars"></i>';
            header.prepend(button);
        }
        if (!header.querySelector('.nav-right')) {
            const actions = document.createElement('div');
            actions.className = 'nav-right';
            actions.innerHTML = `
                <a class="btn-icon" href="notifications.html" title="Notifications"><i class="fas fa-bell"></i></a>
                <a class="avatar avatar-sm" href="profile.html">${state.user.initials}</a>
            `;
            header.appendChild(actions);
        }
    }

    function bindNavigation() {
        const sidebar = document.getElementById('sidebar');
        const openBtn = document.getElementById('mobileMenuBtn');
        const closeBtn = document.getElementById('closeSidebar');
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        const open = () => {
            sidebar?.classList.add('open', 'mobile-open');
            overlay.classList.add('open');
        };
        const close = () => {
            sidebar?.classList.remove('open', 'mobile-open');
            overlay.classList.remove('open');
        };

        openBtn?.addEventListener('click', open);
        closeBtn?.addEventListener('click', close);
        overlay.addEventListener('click', close);

        document.querySelectorAll('[data-nav], .sidebar-nav .nav-link').forEach((link) => {
            if (link.getAttribute('href') === currentPage()) link.classList.add('active');
        });
    }

    function wirePrototypeActions() {
        document.querySelectorAll('button[title*="View"], button[title*="Preview"]').forEach((button) => {
            if (!button.onclick) button.addEventListener('click', () => { window.location.href = 'conversion-details.html'; });
        });
        document.querySelectorAll('button[title*="Download"], .asset-card .btn').forEach((button) => {
            if (!button.dataset.wired) {
                button.dataset.wired = 'true';
                button.addEventListener('click', () => {
                    button.innerHTML = '<i class="fas fa-check"></i> Ready';
                    button.classList.add('btn-primary');
                });
            }
        });

        const createSurveyForm = document.getElementById('createSurveyForm');
        if (createSurveyForm && !createSurveyForm.dataset.wired) {
            createSurveyForm.dataset.wired = 'true';
            const templateSelect = createSurveyForm.querySelector('select');
            if (templateSelect) {
                templateSelect.innerHTML = '<option value="">Choose a template</option>' + state.templates.map((template) => `<option value="${template.id}">${template.name} (${template.source})</option>`).join('');
            }
            createSurveyForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const title = createSurveyForm.querySelector('input[type="text"]')?.value.trim() || 'Untitled Survey';
                const template = createSurveyForm.querySelector('select')?.selectedOptions[0]?.textContent.replace(/\s*\(.+\)/, '') || state.templates[0].name;
                state.surveys.unshift({
                    id: `SRV-${String(100 + state.surveys.length).padStart(3, '0')}`,
                    name: title,
                    template,
                    status: 'active',
                    responses: 0,
                    created: 'Jun 22, 2026',
                    completion: 0
                });
                state.activity.unshift({ icon: 'fa-rocket', title: `${title} deployed`, meta: 'Survey campaign created from template' });
                saveState(state);
                window.location.href = 'surveys.html';
            });
        }

        const exportSelect = document.getElementById('surveySelect');
        if (exportSelect) {
            exportSelect.innerHTML = '<option value="">Choose a survey to export</option>' + state.surveys.map((survey) => `<option value="${survey.id}">${survey.name} (${survey.responses.toLocaleString()} responses)</option>`).join('');
        }

        document.querySelectorAll('.export-card .btn').forEach((button) => {
            if (!button.dataset.wired) {
                button.dataset.wired = 'true';
                button.addEventListener('click', () => {
                    button.innerHTML = '<i class="fas fa-check"></i> Export Ready';
                    button.classList.add('btn-primary');
                });
            }
        });
    }

    function renderSharedTables() {
        const responsesBody = document.getElementById('responsesBody');
        if (responsesBody) {
            responsesBody.innerHTML = state.responses.map((response) => `
                <tr>
                    <td class="font-mono text-sm">${response.id}</td>
                    <td>${response.survey}</td>
                    <td>${response.enumerator}</td>
                    <td>${response.synced}</td>
                    <td><span class="${response.confidence >= 95 ? 'confidence-high' : 'confidence-med'}">${response.confidence}%${response.confidence < 90 ? ' (Review Needed)' : ''}</span></td>
                    <td><button class="btn-icon" title="ponse" onclick="window.location.href='anal.html'"><i class="fas fa-eye text-primary"></i></button></td>
                </tr>
            `).join('');
        }

        const surveyFilter = document.getElementById('surveyFilter');
        if (surveyFilter) {
            surveyFilter.innerHTML = '<option value="">All surveys</option>' + state.surveys.map((survey) => `<option value="${survey.id}">${survey.name}</option>`).join('');
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.classList.contains('dashboard-layout') || document.querySelector('.main-content, .app-shell')) {
            createSidebar();
            upgradeTopbar();
            bindNavigation();
            renderSharedTables();
            wirePrototypeActions();
        }
    });
})();
