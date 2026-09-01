import { Avatar, AvatarImage } from "./ui/avatar";

const UserAvatar = ({ image }: { image: string | null | undefined }) => {
  return (
    <Avatar>
      <AvatarImage
        src={
          image
            ? `https://79gcelddzk.ucarecd.net/${image}/`
            : "/user_profile.svg"
        }
        alt="User avatar"
      />
    </Avatar>
  );
};

export default UserAvatar;
