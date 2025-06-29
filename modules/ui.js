import { fadeIn, staggerUp } from './animations.js';

const root = document.getElementById('app-root');

export function clearRoot() {
    root.innerHTML = '';
}

export function renderHome(data) {
    const { home } = data;
    const homeHTML = `
        <div class="text-center animate-container">
            <h1 class="text-4xl md:text-5xl font-bold text-primary mb-4">${home.title}</h1>
            <p class="text-lg md:text-xl text-text-secondary mb-8 max-w-3xl mx-auto">${home.subtitle}</p>
            <p class="mb-12 max-w-3xl mx-auto leading-relaxed">${home.introduction}</p>
            <a href="${home.callToAction.link}" class="bg-primary text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                ${home.callToAction.text} <i data-lucide="arrow-right" class="inline-block ml-2"></i>
            </a>
        </div>
        <div class="mt-20 animate-container">
            <h2 class="text-3xl font-bold text-center mb-12">${home.advantages.title}</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${home.advantages.points.map(point => `
                    <div class="bg-card p-6 rounded-xl shadow-sm border border-gray-200/50 text-center">
                        <div class="inline-block p-3 bg-secondary/20 text-primary rounded-full mb-4">
                            <i data-lucide="${point.icon}" class="w-8 h-8"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">${point.title}</h3>
                        <p class="text-text-secondary text-sm">${point.description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    root.innerHTML = homeHTML;
    lucide.createIcons();
    fadeIn('.animate-container');
}

export function renderRoadmap(data) {
    const { roadmap } = data;
    const roadmapHTML = `
        <div class="text-center mb-16 animate-container">
            <h1 class="text-4xl font-bold mb-4">${roadmap.title}</h1>
            <p class="text-lg text-text-secondary max-w-3xl mx-auto">${roadmap.description}</p>
        </div>
        <div class="timeline-container">
            ${roadmap.phases.map((phase, index) => `
                <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'} animate-container">
                    <div class="timeline-content">
                        <span class="text-xs font-bold uppercase text-primary">${phase.duration}</span>
                        <h3 class="text-2xl font-bold my-2">${phase.target}</h3>
                        <p class="text-text-secondary mb-4">${phase.goal}</p>
                        <h4 class="font-semibold mb-2 text-text-primary">Trọng tâm:</h4>
                        <ul class="list-none space-y-2 mb-4">
                            ${phase.focus.map(f => `<li class="flex items-start"><i data-lucide="check-circle-2" class="w-5 h-5 text-green-500 mr-2 mt-0.5 shrink-0"></i><span>${f}</span></li>`).join('')}
                        </ul>
                        <h4 class="font-semibold mb-2 text-text-primary">Công cụ đề xuất:</h4>
                        <div class="flex flex-wrap gap-2">
                            ${phase.tools.map(tool => `<span class="bg-gray-100 text-text-secondary text-xs font-medium px-2.5 py-1 rounded-full">${tool}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    root.innerHTML = roadmapHTML;
    lucide.createIcons();
    staggerUp('.animate-container');
}

export function renderSkills(data) {
    const { skills } = data;
    const skillsHTML = `
        <div class="text-center mb-16 animate-container">
            <h1 class="text-4xl font-bold mb-4">${skills.title}</h1>
            <p class="text-lg text-text-secondary max-w-3xl mx-auto">${skills.description}</p>
        </div>
        <div class="w-full max-w-4xl mx-auto animate-container">
            <div class="mb-8 border-b border-gray-200">
                <nav class="-mb-px flex justify-center space-x-4 md:space-x-8" id="skill-tabs">
                    ${Object.entries(skills.categories).map(([key, value], index) => `
                        <button class="skill-tab whitespace-nowrap py-4 px-1 text-base font-medium ${index === 0 ? 'active' : ''}" data-skill="${key}">
                            <i data-lucide="${value.icon}" class="inline-block mr-2"></i> ${value.label}
                        </button>
                    `).join('')}
                </nav>
            </div>
            <div id="skill-content">
                <!-- Skill content will be injected here -->
            </div>
        </div>
    `;
    root.innerHTML = skillsHTML;

    const tabsContainer = document.getElementById('skill-tabs');
    const contentContainer = document.getElementById('skill-content');

    function renderSkillContent(skillKey) {
        const skill = skills.categories[skillKey];
        contentContainer.innerHTML = `
            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 class="text-2xl font-bold mb-4">Phương pháp học tập</h3>
                    <ul class="space-y-4">
                        ${skill.methods.map(method => `<li class="flex items-start"><i data-lucide="lightbulb" class="w-5 h-5 text-yellow-500 mr-3 mt-1 shrink-0"></i><span class="prose prose-sm">${method}</span></li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="text-2xl font-bold mb-4">Công cụ hỗ trợ</h3>
                    <ul class="space-y-3">
                         ${skill.tools.map(tool => `<li class="flex items-center"><i data-lucide="tool" class="w-5 h-5 text-secondary mr-3 shrink-0"></i><span>${tool}</span></li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        lucide.createIcons();
    }

    tabsContainer.addEventListener('click', (e) => {
        const tab = e.target.closest('.skill-tab');
        if (tab) {
            tabsContainer.querySelector('.active').classList.remove('active');
            tab.classList.add('active');
            renderSkillContent(tab.dataset.skill);
        }
    });

    renderSkillContent('listening');
    lucide.createIcons();
    fadeIn('.animate-container');
}

export function renderResources(data) {
    const { resources } = data;
    let currentFilter = 'Tất cả';
    let currentSearchTerm = '';

    const resourcesHTML = `
        <div class="text-center mb-16 animate-container">
            <h1 class="text-4xl font-bold mb-4">${resources.title}</h1>
            <p class="text-lg text-text-secondary max-w-3xl mx-auto">${resources.description}</p>
        </div>
        <div class="max-w-6xl mx-auto animate-container">
            <div class="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div id="resource-filters" class="flex flex-wrap justify-center gap-2">
                    ${resources.types.map(type => `
                        <button class="resource-filter-btn px-4 py-2 text-sm font-semibold rounded-full bg-white shadow-sm border ${type === 'Tất cả' ? 'active' : ''}" data-type="${type}">
                            ${type}
                        </button>
                    `).join('')}
                </div>
                <div class="relative w-full md:w-64">
                    <i data-lucide="search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    <input type="text" id="resource-search" placeholder="Tìm kiếm tài nguyên..." class="w-full pl-10 pr-4 py-2 border rounded-full focus:ring-2 focus:ring-primary focus:outline-none">
                </div>
            </div>
            <div id="resource-list" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Resources will be injected here -->
            </div>
        </div>
    `;
    root.innerHTML = resourcesHTML;

    const filterContainer = document.getElementById('resource-filters');
    const searchInput = document.getElementById('resource-search');
    const listContainer = document.getElementById('resource-list');

    function renderList() {
        const filteredItems = resources.items.filter(item => {
            const matchesFilter = currentFilter === 'Tất cả' || item.type === currentFilter;
            const matchesSearch = currentSearchTerm === '' ||
                item.name.toLowerCase().includes(currentSearchTerm) ||
                item.description.toLowerCase().includes(currentSearchTerm);
            return matchesFilter && matchesSearch;
        });

        if (filteredItems.length === 0) {
            listContainer.innerHTML = `<p class="text-center text-text-secondary col-span-full">Không tìm thấy tài nguyên phù hợp.</p>`;
            return;
        }

        listContainer.innerHTML = filteredItems.map(item => `
            <div class="bg-card rounded-xl shadow-sm border border-gray-200/50 p-6 flex flex-col">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-primary">${item.name}</h3>
                    <span class="bg-secondary/20 text-primary text-xs font-bold px-2 py-1 rounded-full">${item.type}</span>
                </div>
                <p class="text-text-secondary mb-4 flex-grow">${item.description}</p>
                <div class="text-sm">
                    <p class="mb-2"><strong class="text-green-600">Ưu điểm:</strong> ${item.pros}</p>
                    <p><strong class="text-red-600">Nhược điểm:</strong> ${item.cons}</p>
                </div>
            </div>
        `).join('');
    }

    filterContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.resource-filter-btn');
        if (btn) {
            filterContainer.querySelector('.active').classList.remove('active');
            btn.classList.add('active');
            currentFilter = btn.dataset.type;
            renderList();
        }
    });

    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        renderList();
    });

    renderList();
    lucide.createIcons();
    fadeIn('.animate-container');
}

export function renderYkiTest(data) {
    const { yki_test } = data;
    const ykiHTML = `
        <div class="text-center mb-16 animate-container">
            <h1 class="text-4xl font-bold mb-4">${yki_test.title}</h1>
            <p class="text-lg text-text-secondary max-w-3xl mx-auto">${yki_test.description}</p>
        </div>
        <div class="max-w-6xl mx-auto grid lg:grid-cols-5 gap-12">
            <div class="lg:col-span-3 animate-container">
                <h2 class="text-3xl font-bold mb-6">${yki_test.structure.title}</h2>
                <p class="mb-6 text-text-secondary">Thời gian thi: ${yki_test.structure.duration}</p>
                <div class="space-y-6">
                    ${yki_test.structure.parts.map(part => `
                        <div class="flex items-start gap-4">
                            <div class="p-3 bg-blue-100 text-primary rounded-lg mt-1">
                                <i data-lucide="${part.icon}"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-semibold">${part.skill}</h3>
                                <p class="text-text-secondary">${part.description}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="lg:col-span-2 space-y-8 animate-container">
                <div>
                    <h3 class="text-2xl font-bold mb-4">${yki_test.tips.title}</h3>
                    <ul class="space-y-3">
                    ${yki_test.tips.points.map(tip => `
                        <li class="flex items-start"><i data-lucide="sparkle" class="w-5 h-5 text-amber-500 mr-3 mt-1 shrink-0"></i><span class="prose prose-sm">${tip}</span></li>
                    `).join('')}
                    </ul>
                </div>
                 <div>
                    <h3 class="text-2xl font-bold mb-4">${yki_test.checklist.title}</h3>
                    <ul class="space-y-3" id="yki-checklist">
                    ${yki_test.checklist.items.map((item, index) => `
                        <li>
                            <label class="flex items-center cursor-pointer">
                                <input type="checkbox" data-index="${index}" class="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary mr-3">
                                <span class="text-text-secondary">${item}</span>
                            </label>
                        </li>
                    `).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
    root.innerHTML = ykiHTML;

    const checklist = document.getElementById('yki-checklist');
    const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
    const storageKey = 'ykiChecklistState';

    function saveState() {
        const state = Array.from(checkboxes).map(cb => cb.checked);
        localStorage.setItem(storageKey, JSON.stringify(state));
    }

    function loadState() {
        const state = JSON.parse(localStorage.getItem(storageKey));
        if (state && state.length === checkboxes.length) {
            checkboxes.forEach((cb, index) => {
                cb.checked = state[index];
            });
        }
    }
    
    checklist.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            saveState();
        }
    });

    loadState();
    lucide.createIcons();
    fadeIn('.animate-container');
}

export function renderComparison(data) {
    const { comparison } = data;
    const comparisonHTML = `
        <div class="text-center mb-16 animate-container">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">${comparison.title}</h1>
            <p class="text-lg text-text-secondary max-w-3xl mx-auto">${comparison.description}</p>
        </div>
        <div class="max-w-7xl mx-auto space-y-12 animate-container">
            ${comparison.sections.map(section => `
                <div class="bg-card p-6 md:p-8 rounded-xl shadow-sm border border-gray-200/50">
                    <h2 class="text-2xl md:text-3xl font-bold mb-6 text-primary">${section.title}</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    ${section.tableData.headers.map(header => `<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">${header}</th>`).join('')}
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                ${section.tableData.rows.map(row => `
                                    <tr>
                                        ${row.map((cell, index) => `<td class="px-6 py-4 align-top text-sm ${index === 0 ? 'font-semibold text-text-primary' : 'text-text-secondary'}"><div class="prose prose-sm max-w-none">${cell}</div></td>`).join('')}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    root.innerHTML = comparisonHTML;
    fadeIn('.animate-container');
    lucide.createIcons();
}