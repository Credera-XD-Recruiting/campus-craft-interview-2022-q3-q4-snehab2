import { removeChildNodes } from "../utils";

/**
 * Function which generates a single list-item node based on a dataset
 *
 * @param {object} data data containing attributes of a listItem
 * @return {Node} generated markup for a card
 */
const generateListItemNode = (data) => {
  const { avatarSrc, name, jobTitle, companyName, topFriend } = data;
  const templateId = "friend-list-item-template";
  const resultCardTemplate = document.getElementById(templateId);
  const clone = document.importNode(resultCardTemplate.content, true);
  const nameNode = clone.querySelector("p.page-paragraph");
  const titleNode = clone.querySelector("p.page-micro");
  const avatarNode = clone.querySelector(".profile-list-item-avatar");
  const topFriendNode = clone.querySelector(".top-friend-flag");
  const noAvatar = clone.querySelector(".profile-avatar-initials");
  
  // visual indicator for top friend
  if(topFriend) {
    topFriendNode.style.display = "block";
    topFriendNode.style.fontWeight = "bolder";
    topFriendNode.style.fontSize = "13px";
    topFriendNode.style.backgroundColor = "#757083";
    topFriendNode.style.color = "white";
    topFriendNode.style.borderRadius = "5px";
    topFriendNode.style.width = "70px";
    topFriendNode.style.padding = "3px";
  }

  nameNode.innerHTML = `${name}`;
  titleNode.innerHTML = `${jobTitle} @ ${companyName}`;
  avatarNode.src = avatarSrc;
  avatarNode.setAttribute("aria-label", `${name}`);
  

  if (avatarSrc) {
    const avatarImg = document.createElement("img");
    avatarImg.src = avatarSrc;
    avatarImg.setAttribute("aria-label", `${name}`);
    avatarNode.appendChild(avatarImg);
  }
  else {
    let initials = name[0]; // get first initial
    for(let index = 1; index < name.length; index++) {
      // once we locate the space(s) in the name, the next character in the name is the next initial in a user's name
      if(name[index] == " ") {
        initials = initials + name[index+1];
      }
    }
    noAvatar.innerHTML = `${initials}`;
  }

  return clone;
};

/**
 * Function which accepts the JSON results from the API, and uses HTML templates
 * to generate the markup needed for the results list
 *
 * @param {object} resultsData JSON payload of results
 */
export const generateFriendsListFromTemplate = (resultsData) => {
  const friendsListSection = document.querySelector(
    "#profile-friends .profile-friends-list"
  );

  if (resultsData.friends && resultsData.friends.length > 0) {
    removeChildNodes(friendsListSection);

    for (let i = 0; i < resultsData.friends.length; i++) {
      const friendsNode = generateListItemNode(resultsData.friends[i]);
      friendsListSection.appendChild(friendsNode);
    }
  }
};
