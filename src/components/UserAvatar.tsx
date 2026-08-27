import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ image }: { image: string | null }) => {
  if (image)
    return (
      <Avatar>
        <AvatarImage src={`https://79gcelddzk.ucarecd.net/${image}/`} />
      </Avatar>
    );

  return (
    <Avatar>
      <AvatarImage src="/user_profile.svg" />
    </Avatar>
  );
};

export default UserAvatar;
