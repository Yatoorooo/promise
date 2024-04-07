'use strict';

function searchPost() {
    const postId = document.getElementById("postIdInput").value;
    if (postId < 1 || postId > 100) {
        alert("Post ID must be between 1 and 100.");
        return;
    }

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(post => {
            const postContainer = document.getElementById("postContainer");
            postContainer.innerHTML = `
                <div>
                    <h3>Post Title: ${post.title}</h3>
                    <p>${post.body}</p>
                    <button onclick="fetchComments(${postId})">Get Comments</button>
                </div>
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch post. Please try again.');
        });
}

function fetchComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(comments => {
            const postContainer = document.getElementById("postContainer");
            const commentsHTML = comments.map(comment => `
                <div>
                    <strong>${comment.name}</strong>
                    <p>${comment.body}</p>
                </div>
            `).join("");
            postContainer.insertAdjacentHTML('beforeend', `<div><h4>Comments:</h4>${commentsHTML}</div>`);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to fetch comments. Please try again.');
        });
}