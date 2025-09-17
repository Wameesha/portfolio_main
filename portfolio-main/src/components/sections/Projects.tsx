'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiGithub, FiStar } from 'react-icons/fi'
import Image from 'next/image'
import { projects, type Project } from '@/data/projects'
import ProjectModal from '@/components/ui/ProjectModal'

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const filteredProjects = projects

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const cardVariants = {
        hidden: { y: 60, opacity: 0, scale: 0.8 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        }
    }

    const ProjectCard = ({ project, index }: { project: Project, index: number }) => (
        <motion.div
            layout
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
                y: -10,
                transition: { duration: 0.3 }
            }}
            className="group relative bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
            {/* Project Image */}
            <div className="relative h-40 sm:h-56">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                {project.featured && (
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        <FiStar className="w-4 h-4" />
                        <span>Featured</span>
                    </div>
                )}

                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex">
                        <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        >
                            <FiGithub className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-200">
                        {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium">
                        {project.category}
                    </span>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech: string) => (
                        <span
                            key={tech}
                            className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-sm">
                            +{project.technologies.length - 4} more
                        </span>
                    )}
                </div>

                {/* Action Button */}
                <div className="flex">
                    <motion.button
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium transition-colors duration-200"
                    >
                        View Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )

    return (
        <section
            ref={ref}
            id="projects"
            className="py-6 px-0 sm:py-20 sm:px-4 bg-gray-800"
        >
            <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                    >
                        Featured Projects
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-20 h-1 bg-purple-500 mx-auto mb-8"
                    />
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        A showcase of my best work, combining technical excellence with business value and user experience
                    </motion.p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* No Projects Message */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-gray-400 text-lg">
                            No projects found in this category.
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Project Detail Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    )
}
