import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      <Button className="flex gap-2 items-center" onClick={() => navigate("/")}>
        <img src="/spotify.png" className="size-8" alt="Spotify logo" />
        <span>Spotify</span>
      </Button>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to="/admin" className={cn(buttonVariants({ variant: "ghost" }))}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
