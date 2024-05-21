const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];

const postSection = document.getElementById("post-section");

document.addEventListener("DOMContentLoaded", function () {
  posts.forEach((postContent) => {
    // Create a new section for each post
    const section = document.createElement("section");

    // Create user details section
    const userDetails = document.createElement("div");
    userDetails.classList.add("user-details");

    // Create and append user avatar
    const avatarImg = document.createElement("img");
    avatarImg.src = postContent.avatar;
    avatarImg.classList.add("avatar");
    userDetails.appendChild(avatarImg);

    // Create and append user information
    const userInfo = document.createElement("p");
    userInfo.innerHTML = `<strong>${postContent.name}</strong><br>${postContent.location}`;
    userDetails.appendChild(userInfo);

    // Append user details to the new section
    section.appendChild(userDetails);

    // Create and append post image
    const postImg = document.createElement("img");
    postImg.src = postContent.post;
    postImg.classList.add("post");
    section.appendChild(postImg);

    // Create reactions container
    const reactionsContainer = document.createElement("div");
    reactionsContainer.classList.add("reactions-container");

    // Create and append reaction icons
    ["heart", "comment", "dm"].forEach((icon) => {
      const iconLink = document.createElement("a");
      iconLink.href = "#";
      const iconImg = document.createElement("img");
      iconImg.src = `images/icon-${icon}.png`;
      iconImg.alt = `${icon}-icon`;
      iconImg.classList.add("reactions");
      iconLink.appendChild(iconImg);
      reactionsContainer.appendChild(iconLink);
    });

    // Create and append info paragraph
    const infoParagraph = document.createElement("p");
    infoParagraph.classList.add("info");
    infoParagraph.textContent = `${postContent.likes} likes`;
    reactionsContainer.appendChild(infoParagraph);

    // Create and append comment paragraph
    const commentParagraph = document.createElement("p");
    commentParagraph.classList.add("comment");
    commentParagraph.innerHTML = `<span class="info">${postContent.username}</span> ${postContent.comment}`;
    reactionsContainer.appendChild(commentParagraph);

    // Append reactions container to the new section
    section.appendChild(reactionsContainer);

    // Append the new section to the main post section
    postSection.appendChild(section);
  });
});
