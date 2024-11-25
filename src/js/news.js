export default async function renderNewsPage() {
  try {
    const response = await fetch('src/assets/news.html');

    if (!response.ok) {
      throw new Error('Failed to load HTML');
    }

    const newsHtml = await response.text();

    const app = document.getElementById('app');
    app.innerHTML = newsHtml;
  } catch (error) {
    console.error(error);
    return `<h1>Error loading page content</h1>`;
  }
}
