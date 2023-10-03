const generateRandomAvatar = () => {
  const avatar = [
    "/avatar/thumbs-1.svg",
    "/avatar/thumbs-2.svg",
    "/avatar/thumbs-2.svg",
    "/avatar/thumbs-4.svg",
  ];

  const randomAvatar = avatar[Math.floor(Math.random() * avatar.length) + 1];

  return randomAvatar;
};

export default generateRandomAvatar;
