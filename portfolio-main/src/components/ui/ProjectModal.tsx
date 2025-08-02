'use client'


import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink, FiCalendar, FiUsers, FiCheck } from 'react-icons/fi'
import Image from 'next/image'
import type { Project } from '@/data/projects'

type ProjectModalProps = {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!project) return null;

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut" as const
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50,
            transition: {
                duration: 0.2
            }
        }
    }

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="min-h-full flex items-center justify-center p-4">
                        <motion.div
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
                            >
                                <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </button>

                            {/* Content Container */}
                            <div className="overflow-y-auto max-h-[90vh]">
                                {/* Project Image */}
                                <div className="relative h-64 sm:h-80">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Featured Badge */}
                                    {project.featured && (
                                        <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                                            <FiCheck className="w-4 h-4" />
                                            <span>Featured Project</span>
                                        </div>
                                    )}

                                    {/* Project Title Overlay */}
                                    <div className="absolute bottom-4 left-4 right-16">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                            {project.title}
                                        </h2>
                                        <p className="text-gray-200 text-lg">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 sm:p-8">
                                    {/* Project Stats */}
                                    <div className="flex flex-wrap gap-6 mb-8 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <FiUsers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <span className="font-medium">Team Size:</span>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {project.teamSize === 1 ? 'Solo Project' : `${project.teamSize} people`}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FiCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                            <span className="font-medium">Duration:</span>
                                            <span className="text-gray-600 dark:text-gray-300">{project.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-3 h-3 rounded-full ${project.status === 'completed' ? 'bg-green-500' :
                                                project.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                                                }`} />
                                            <span className="font-medium">Status:</span>
                                            <span className="text-gray-600 dark:text-gray-300 capitalize">{project.status}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-4 mb-8">
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                                        >
                                            <FiExternalLink className="w-5 h-5" />
                                            <span>Live Demo</span>
                                        </motion.a>
                                        <motion.a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors duration-200"
                                        >
                                            <FiGithub className="w-5 h-5" />
                                            <span>View Code</span>
                                        </motion.a>
                                    </div>

                                    {/* Long Description */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Project Overview
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {project.longDescription}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Technologies Used
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {project.technologies.map((tech: string) => (
                                                <span
                                                    key={tech}
                                                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                            Key Features
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {project.features.map((feature: string, index: number) => (
                                                <div key={index} className="flex items-center space-x-3">
                                                    <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    {project.achievements && project.achievements.length > 0 && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                                Key Achievements
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {project.achievements.map((achievement: string, index: number) => (
                                                    <div key={index} className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                                                            <span className="text-green-700 dark:text-green-300 font-medium text-sm">
                                                                {achievement}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )
}
