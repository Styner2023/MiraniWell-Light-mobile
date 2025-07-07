import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-20 h-20 object-cover border-2 border-primary-500/30"
      />

      <div className="flex-center flex-col gap-1">
        <p className="text-sm font-semibold text-charcoal text-center line-clamp-1">
          {user.name}
        </p>
        <p className="text-xs text-charcoal/70 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm font-medium h-10 rounded-md min-w-0 w-auto flex items-center justify-center">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
