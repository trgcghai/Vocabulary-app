import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function Header() {
    return <div className="bg-blue-500 py-2">
        <div className="container mx-auto">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink href={'#'} className="px-5 bg-white rounded-md block text-4xl font-bold text-blue-500">
                            Voca
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </div>
}