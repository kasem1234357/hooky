import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';
import Navbar from '../_component/Navbar';


export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions}>
    <Navbar/>
    {children}
    </HomeLayout>;
}
