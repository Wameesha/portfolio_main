'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiDatabase, FiUsers, FiTrendingUp } from 'react-icons/fi'


const features = [
    {
        icon: <FiCode className="w-6 h-6" />,
        title: "Full-Stack Development",
        description: "Building complete web applications with modern technologies from frontend to backend"
    },
    {
        icon: <FiDatabase className="w-6 h-6" />,
        title: "Database Management",
        description: "Designing and implementing efficient database solutions with MySQL and MongoDB"
    },
    {
        icon: <FiUsers className="w-6 h-6" />,
        title: "Team Collaboration",
        description: "Working effectively in team environments to deliver high-quality software solutions"
    },
    {
        icon: <FiTrendingUp className="w-6 h-6" />,
        title: "Problem Solving",
        description: "Applying academic knowledge and analytical skills to solve real-world challenges"
    }
]

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.8 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        }
    }

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <motion.section
            ref={ref}
            id="about"
            className="py-20 bg-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                        About Me
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-20 h-1 bg-purple-500 mx-auto mb-8"
                    />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-6"
                    >
                        <motion.h3
                            variants={itemVariants}
                            className="text-2xl sm:text-3xl font-bold text-white"
                        >
                            Passionate About Building{' '}
                            <span className="text-purple-400">
                                Real-World Software Solutions
                            </span>
                        </motion.h3>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-300 leading-relaxed"
                        >
                            I am a proactive and motivated Computer Science undergraduate with a strong interest in 
                            software engineering. Currently pursuing B.Sc. in Computer Science at University of 
                            Colombo School of Computing (UCSC) with a GPA of 3.20/4.00, I am eager to apply my 
                            academic knowledge and problem-solving skills in real-world environments.
                        </motion.p>

                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-300 leading-relaxed"
                        >
                            Known for my collaborative mindset and positive attitude, I enjoy working in team-oriented 
                            settings and contributing to shared goals. I am passionate about continuous learning and 
                            committed to growing both personally and professionally while delivering high-quality work 
                            through projects like UniQuest, ArtAura, and Calliera.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap gap-3 pt-4"
                        >
                            {['Software Engineering', 'Full-Stack Development', 'Team Collaboration', 'Continuous Learning'].map((skill) => (
                                <span
                                    key={skill}
                                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="grid sm:grid-cols-2 gap-6"
                    >
                        {features.map((feature) => (
                            <motion.div
                                key={feature.title}
                                variants={cardVariants}
                                whileHover={{
                                    scale: 1.05,
                                    transition: { duration: 0.2 }
                                }}
                                className="p-6 bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-white mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-300">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
                >
                    {[
                        { number: "3.20", label: "GPA/4.00" },
                        { number: "3+", label: "Major Projects" },
                        { number: "10+", label: "Technologies" },
                        { number: "2026", label: "Graduation" }
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            className="space-y-2"
                        >
                            <div className="text-3xl sm:text-4xl font-bold text-purple-400">
                                {stat.number}
                            </div>
                            <div className="text-gray-300 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}
