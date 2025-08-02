'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi'
import { personalInfo, socialLinks } from '@/data/personal'

export default function Footer() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const currentYear = new Date().getFullYear()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const footerSocials = [
        { icon: FiGithub, href: socialLinks.github, label: 'GitHub' },
        { icon: FiLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
        { icon: FiMail, href: socialLinks.email, label: 'Email' }
    ]

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
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <footer ref={ref} className="bg-black text-white relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-50" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <motion.h3
                            className="text-2xl font-bold text-purple-400"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            {personalInfo.name}
                        </motion.h3>
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-300 leading-relaxed"
                        >
                            Computer Science undergraduate passionate about full-stack development and creating innovative software solutions that solve real-world problems.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex space-x-4">
                            {footerSocials.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    whileHover={{ scale: 1.2, y: -5, rotateY: 15 }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="p-3 bg-gray-800/80 hover:bg-purple-600 rounded-xl transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <nav className="space-y-2">
                            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    whileHover={{ x: 8, color: '#a855f7' }}
                                    transition={{ duration: 0.2 }}
                                    className="block text-gray-300 hover:text-purple-400 transition-colors duration-200"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h4 className="text-lg font-semibold">Get In Touch</h4>
                        <div className="space-y-2 text-gray-300">
                            <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                {personalInfo.email}
                            </motion.p>
                            <motion.p whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                                {personalInfo.location}
                            </motion.p>
                            <motion.div
                                variants={itemVariants}
                                className="flex items-center space-x-2 mt-4"
                            >
                                <motion.div
                                    className="w-2 h-2 bg-green-400 rounded-full"
                                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <span className="text-sm">Available for new projects</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center"
                >
                    <motion.p
                        className="text-gray-400 text-sm"
                        whileHover={{ color: '#9ca3af' }}
                    >
                        © {currentYear} {personalInfo.name}. All rights reserved.
                    </motion.p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ scale: 1.1, y: -2, boxShadow: '0 10px 25px rgba(168, 85, 247, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 sm:mt-0 p-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                        aria-label="Back to top"
                    >
                        <FiArrowUp className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </footer>
    )
}
