import { uniqueId } from "lodash";
interface MenuitemsType {
    [x: string]: any;
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: any;
    href?: string;
    children?: MenuitemsType[];
    bgcolor?: any;
    chip?: string;
    chipColor?: string;
    variant?: string;
    external?: boolean;
}

const Menuitems: MenuitemsType[] = [
    {
        navlabel: true,
        subheader: "HOME",
    },

    {
        id: uniqueId(),
        title: "Dashboard",
        icon: "screencast-2-line-duotone",
        href: "/",
    },
    {
        id: uniqueId(),
        title: "Dashboard 2",
        icon: "chart-line-duotone",
        href: "https://spike-nextjs-pro-main.vercel.app/dashboards/dashboard2",

        chip: "Pro",
    },
    {
        id: uniqueId(),
        title: "Frontend Pages",
        icon: "feed-line-duotone",
        chip: "Pro",
        href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/homepage",

        children: [
            {
                id: uniqueId(),
                title: "Homepage",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/homepage",
                chip: "Pro",
            },
            {
                id: uniqueId(),
                title: "About Us",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/about",
                chip: "Pro",
            },
            {
                id: uniqueId(),
                title: "Blog",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/blog",
                chip: "Pro",
            },
            {
                id: uniqueId(),
                title: "Blog Details",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/blog-detail",
                chip: "Pro",
            },
            {
                id: uniqueId(),
                title: "Contact",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/contact",
                chip: "Pro",
            },
            {
                id: uniqueId(),
                title: "Portfolio",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/portfolio",
                chip: "Pro",
            },
            {
                id: uniqueId(),
                title: "Pricing",
                href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/pricing",
                chip: "Pro",
            },
        ],
    },
];

export default Menuitems;
