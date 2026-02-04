import type { NavItem, SidebarNavItem } from './nav'
import type { LocaleOptions } from './i18n'

export interface DocsConfig {
  mainNav: NavItem[]
  sidebarNav: SidebarNavItem[]
}

export interface DocParams {
  slug: string[]
  locale: string
}

export interface DocPageProps {
  params: Promise<DocParams>
}
