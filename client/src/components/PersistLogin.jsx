import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/auth/useRefreshToken";
import useAuth from "../hooks/auth/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const checkRefreshToken = async () => {
            try {
                await refresh();
            } catch(err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken && persist ? checkRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

    return (
        <>
            { !persist
                ? <Outlet />
                : isLoading
                    ? <h2 className="flex w-full h-screen fixed top-0 left-0 justify-center items-center bg-white"><img src="/loading.svg" width={30} height={30} alt="Loading" /></h2>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;