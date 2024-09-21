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
                <NavigationMenuList className="items-end">
                    <NavigationMenuItem>
                        <NavigationMenuLink href={'/'} className="px-5 bg-white rounded-md block text-4xl font-bold text-blue-500">
                            Voca
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href={'/translate'} className="px-5 rounded-md block text-xl font-bold text-white">
                            Translator
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink href={'/learn'} className="px-5 rounded-md text-xl font-bold text-white">
                            Learning
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    </div>
}