export async function fetchData() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Could not fetch content.json:", error);
        throw error;
    }
}