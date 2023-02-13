const plantCard = document.querySelector('#plant-card');
const plant_id = plantCard.getAttribute('data-id');

const submitCommentHandler = async (event) => {
    event.preventDefault();

    const comment_body = document.querySelector('#comment-body').value.trim();

    if (comment_body && plant_id) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment_body, plant_id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace(`/plant/${plant_id}`);
        } else {
            alert('Failed to create comment');
        };
    };
};

document
    .querySelector('#comment-form')
    .addEventListener('submit', submitCommentHandler);