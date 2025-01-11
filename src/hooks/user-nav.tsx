'use client'

import { usePathname } from "next/navigation"

export default function usePath(){
    const pathname=usePathname();
    const path=pathname.split('/')
    let page=path[path.length-1]
    //  page->tells us in hich page we are present->,settings,billing etc
    // in case of home ->it will show the slug
    // pathname->tells the complete path
    return {page,pathname}
}