'use client'

import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'

import type { ProjectDialogProps } from '@/app/components/project-dialog'

export const LazyProjectDialog = dynamic(
	() => import('@/app/components/project-dialog').then((module) => ({ default: module.ProjectDialog })),
	{ ssr: false },
) as ComponentType<Readonly<ProjectDialogProps>>
