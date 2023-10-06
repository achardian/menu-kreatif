const generateRandomAvatar = () => {
  const avatar = [
    "/avatar/thumbs-1.svg",
    "/avatar/thumbs-2.svg",
    "/avatar/thumbs-3.svg",
    "/avatar/thumbs-4.svg",
  ];

  const randomAvatar = avatar[Math.floor(Math.random() * avatar.length)];

  return randomAvatar;
};

export default generateRandomAvatar;
