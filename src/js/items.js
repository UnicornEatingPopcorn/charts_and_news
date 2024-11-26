export default async function fetchAndDisplayItems() {
  try {
    const response = await fetch('src/db/db.json');
    if (!response.ok) {
      throw new Error('Failed to fetch items.');
    }

    const data = await response.json();

    const additionalInfoDiv = document.getElementById('additional-news');

    const itemsHtml = data.items
      .map(
        (item) => `
        <div class="item">
          <img src=${item.img} alt="Additional news image">
          <h1 class="title">${item.title}</h1>
          <p class="description">${item.description}</p>
          <span> 2 hours ago | Travel</span>
        </div>
      `
      )
      .join('');

    additionalInfoDiv.innerHTML = itemsHtml;
  } catch (error) {
    console.error('Error:', error);
    const additionalInfoDiv = document.getElementById('additional-news');
    additionalInfoDiv.textContent = 'Failed to load items.';
  }
}
