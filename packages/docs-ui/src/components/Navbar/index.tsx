import React from 'react';
import clsx from 'clsx';
import { NavbarLink, NavbarLinkProps } from './Link';
import { NavbarColorModeToggle } from './ColorModeToggle';
import { NavbarLogo, NavbarLogoProps } from './Logo';
import { NavbarMobileMenu } from './MobileMenu';
import { NavbarMobileMenuButtonProps } from './MobileMenu/Button';

export type NavbarProps = {
  logo: NavbarLogoProps;
  items: NavbarLinkProps[];
  showSearchOpener?: boolean;
  showColorModeToggle?: boolean;
  additionalActionsAfter?: React.ReactNode;
  additionalActionsBefore?: React.ReactNode;
  mobileMenuButton: NavbarMobileMenuButtonProps;
  isLoading?: boolean;
  className?: string;
};

export const Navbar = ({
  logo,
  items,
  showSearchOpener = true,
  showColorModeToggle = true,
  additionalActionsBefore,
  additionalActionsAfter,
  mobileMenuButton,
  isLoading,
  className,
}: NavbarProps) => {
  return (
    <nav
      className={clsx(
        'h-navbar w-full justify-between',
        'bg-docs-bg dark:bg-docs-bg-dark border-medusa-border-base border-b',
        className
      )}
    >
      <div
        className={clsx(
          'h-navbar max-w-xxl py-docs_0.75 mx-auto flex w-full justify-between px-docs_1 lg:px-docs_3'
        )}
      >
        <div className="hidden w-full items-center gap-docs_0.5 lg:flex lg:w-auto lg:gap-docs_1.5">
          <NavbarLogo {...logo} />
          {items.map((item, index) => (
            <NavbarLink key={index} {...item} />
          ))}
        </div>
        <div className="hidden min-w-0 flex-1 items-center justify-end gap-docs_0.5 lg:flex">
          {additionalActionsBefore}
          {showColorModeToggle && <NavbarColorModeToggle />}
          {additionalActionsAfter}
        </div>
        <NavbarMobileMenu
          logo={logo}
          menuButton={{
            ...mobileMenuButton,
            isLoading,
          }}
        />
      </div>
    </nav>
  );
};
