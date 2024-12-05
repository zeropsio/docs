import React from 'react';
import Link from '@docusaurus/Link';
import { ChevronLeft, ChevronRight } from '@medusajs/icons';

interface NavigationButtonsProps {
    prevPage?: {
        href: string;
        title: string;
    };
    nextPage?: {
        href: string;
        title: string;
    };
}

export function NavigationButtons({ prevPage, nextPage }: NavigationButtonsProps) {
    return (
        <div className="flex justify-between mt-2 border-t pt-4">
            {prevPage ? (
                <Link
                    href={`${prevPage.href}`}
                    className="flex py-1 px-1.5 rounded-lg bg-medusa-bg-subtle hover:bg-medusa-bg-base active:bg-[#EEF0F2] dark:active:bg-[#2A2C30] border border-solid border-medusa-border-base items-center gap-1.5 text-[#3B3D40] dark:text-gray-300 hover:text-gray-900 transition-colors"
                >
                    <ChevronLeft className="" />
                    <span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Previous</div>
                        <div className="font-medium">{prevPage.title}</div>
                    </span>
                </Link>
            ) : (
                <div />
            )}

            {nextPage ? (
                <Link
                    href={`${nextPage.href}`}
                    className="flex py-1 px-1.5 rounded-lg bg-medusa-bg-subtle hover:bg-medusa-bg-base active:bg-[#EEF0F2] dark:active:bg-[#2A2C30] border border-solid border-medusa-border-base items-center gap-1.5 text-[#3B3D40] dark:text-gray-300 hover:text-gray-900 transition-colors text-right"
                >
                    <span>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Next</div>
                        <div className="font-medium">{nextPage.title}</div>
                    </span>
                    <ChevronRight className="" />
                </Link>
            ) : (
                <div />
            )}
        </div>
    );
}