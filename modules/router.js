import { fetchData } from './data_provider.js';
import { renderHome, renderRoadmap, renderSkills, renderResources, renderYkiTest, renderComparison, clearRoot } from './ui.js';

const routes = {
    '/': renderHome,
    '/roadmap': renderRoadmap,
    '/skills': renderSkills,
    '/resources': renderResources,
    '/yki-test': renderYkiTest,
    '/comparison': renderComparison
};

async function router() {
    clearRoot();
    const path = window.location.hash.slice(1) || '/';
    const renderFunction = routes[path] || routes['/'];
    
    try {
        const data = await fetchData();
        renderFunction(data);
        updateActiveLink(path);
        window.scrollTo(0, 0);
    } catch (error) {
        console.error("Failed to load or render content:", error);
        document.getElementById('app-root').innerHTML = `<p class="text-center text-red-500">Lỗi tải dữ liệu. Vui lòng thử lại sau.</p>`;
    }
}

function updateActiveLink(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
        let linkPath = new URL(link.href).hash.slice(1);
        if (linkPath === '' || linkPath === '/') {
            linkPath = '/';
        }
        
        if (linkPath === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

export function initializeRouter() {
    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);

    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.classList.contains('nav-link')) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
}