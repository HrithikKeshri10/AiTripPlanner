import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function Header() {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (codeResp) => console.log(codeResp),
  });

  const GetUserProfile = async (tokenInfo) => {
    setLoading(true);
    await axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json",
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .finally(() => setLoading(false)); // Moved setLoading(false) to finally block
  };

  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center px-5">
        <a href="/">
          <img src="/logo.svg" />
        </a>
        <div>
          {user ? (
            <div className="flex items-center gap-5">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">
                  Create Trip
                </Button>
              </a>

              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>

              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    className="h-[35px] w-[35px] rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <Button
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                      className = "cursor-pointer";
                    }}
                  >
                    Logout
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" />
                <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
                <p>Sign in to the app with Google authentication securely</p>
                <Button
                  onClick={login}
                  className="w-full mt-5 flex gap-4 items-center"
                  disabled={loading} // Added disabled prop
                >
                  {loading ? (
                    <svg className="animate-spin h-7 w-7" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="12"
                        fill="currentColor"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.014 8.014 0 0112 14.25V24a8 8 0 008-8z"
                      />
                    </svg>
                  ) : (
                    <>
                      <FcGoogle className="h-7 w-7" />
                      Sign In With Google
                    </>
                  )}
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Header;
