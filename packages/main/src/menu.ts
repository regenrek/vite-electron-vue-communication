/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Titlebar Menu Items
 */

export type TitlebarMenuItem = {
    name: string;
    action?: string;
    shortcut?: string;
    value?: string | number;
    items?: TitlebarMenuItem[];
};

export type TitlebarMenu = {
    name: string;
    items: TitlebarMenuItem[];
};

const titlebarMenus: TitlebarMenu[] = [
    {
        name: 'Author',
        items: [
            {
                name: 'Guasam',
                action: 'open_url',
                value: 'https://github.com/guasam',
                shortcut: '@guasam',
            },
        ],
    },
];

export default titlebarMenus;

