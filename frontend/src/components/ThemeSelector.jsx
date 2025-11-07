import React from 'react';
import { useThemeStore } from '../store/useThemeStore';
import { PaintRoller } from 'lucide-react';
import { THEMES } from '../constants';
import { IoColorPaletteOutline } from "react-icons/io5";

const ThemeSelector = () => {

    const { theme, setTheme } = useThemeStore()

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <PaintRoller />
            </div>
            <ul
                tabIndex="-1"
                className=" dropdown-content bg-base-300 h-fit max-h-96 overflow-x-auto shadow-2xl rounded-box z-1 mt-3 w-52 p-2 overflow-scroll scroll-smooth">
                {THEMES.map(({ label, themeName, colors }) => (
                    <div
                        key={themeName}
                        onClick={() => setTheme(themeName)}
                        className={`rounded-2xl py-1 px-2
                              ${theme === themeName
                                ? "bg-primary/20 text-primary"
                                : "hover:bg-base-content/5"
                            }`}
                    >
                        <div className='py-2 flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <IoColorPaletteOutline className='text-xl' />
                                <h4>{label}</h4>
                            </div>
                            <div>
                                {colors.map(color =>
                                    <span
                                        className="rounded-full size-2 inline-block mx-px"
                                        style={{ backgroundColor: color }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ThemeSelector;