export const ANALYTICS_EVENTS = {
	socialLinkClick: 'social_link_click',
	resumeClick: 'resume_click',
	linkedinProfileClick: 'linkedin_profile_click',
	scrollToSection: 'scroll_to_section',
	aboutMeOpen: 'about_me_open',
	navClick: 'nav_click',
	localeChange: 'locale_change',
	projectCardOpen: 'project_card_open',
	viewAllProjects: 'view_all_projects',
	skillsCategory: 'skills_category',
	sectionScroll: 'section_scroll',
	headerLogoClick: 'header_logo_click',
	projectLinkClick: 'project_link_click',
	gameActivate: 'game_activate',
	gameStop: 'game_stop',
	gameReset: 'game_reset',
	gameDialogOpen: 'game_dialog_open',
	gameDialogClose: 'game_dialog_close',
	gameShowTasks: 'game_show_tasks',
	gameTetrisOpen: 'game_tetris_open',
	gameTetrisClose: 'game_tetris_close',
	gameTaskComplete: 'game_task_complete',
	gameCompleted: 'game_completed',
	gameCelebrateAgain: 'game_celebrate_again',
} as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS]

export type AnalyticsEventData = Record<string, string | number | boolean>
