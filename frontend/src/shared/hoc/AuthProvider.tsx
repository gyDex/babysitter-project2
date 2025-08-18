'use client'

import { useEffect, useState } from "react";
import { getMe } from "../api/authApi";
import { useAuth } from "@/entities/stores/useAuth";
import { setRoleCookies } from "@/features/setRoleCookie";
import { usePathname, useRouter } from "next/navigation";
import Cookies from 'js-cookie';


type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const setAuth = useAuth(state => state.setAuth);
  const setPhone = useAuth(state => state.setPhone);
  const setRole = useAuth(state => state.setRole);
  const setUser = useAuth(state => state.setUser);
  const { roleAuth } = useAuth();

  const router = useRouter();

  const pathName = usePathname();

  const [roleCookie, setRoleCookie] = useState<string | undefined>();

    useEffect(() => {
      setRoleCookie(Cookies.get('role'))
    }, [])

  useEffect(() => {
    const initMe = async () => {
      try {
        const user = await getMe();

        setRole(user.roles?.[0]);
        setRoleCookies('role', user.roles?.[0])
        setPhone(user.phone || '');
        setAuth(true);
        setUser(user);

        if (user === undefined && roleAuth === 'NANNY') {
          router.replace('/babysitter')
          return;
        }

        if (user === undefined && roleAuth === 'PARENT') {
          router.replace('/parent')
          return;
        }
        
        if (user.nannyProfile) {
          if (user.nannyProfile.isValidated) {
              router.replace('/profile-babysitter/response/')
          }
          if ((pathName === '/about-you/response/' || pathName === '/about-you') && user.nannyProfile.isValidated === true) {
              router.replace('/profile-babysitter/response/')
          }
          if (user.nannyProfile.isValidated !== true) {
              router.replace('/about-you/response/')
          }
        }

        if (user.parentProfile && pathName === '/') {
          router.replace('/profile-parent/vacancy/')
        }
      } catch (error) {
        console.log(error)

        if ((roleCookie === 'parent' && roleCookie !== undefined) && pathName !== '/auth')  router.replace('/parent')
          
        else if ((roleCookie === 'baby' && roleCookie !== undefined) && pathName !== '/auth')  router.replace('/babysitter')
        
        setAuth(false);
      }
    };

    initMe();
  }, [setAuth, setPhone, setRole, setUser, roleCookie]);

  return <>{children}</>;
};

export default AuthProvider;
