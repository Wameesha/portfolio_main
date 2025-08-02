'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { navigation } from '@/data/personal'
import { cn } from '@/lib/utils'

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        // Always use dark theme
        document.documentElement.classList.add('dark')

        // Always scroll to top on page load/refresh
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Hide/show navbar based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down and past 100px
                setIsVisible(false)
                setIsOpen(false) // Close mobile menu when hiding
            } else {
                // Scrolling up
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)

            // Active section detection
            const sections = navigation.map(item => item.href.substring(1))
            const scrollPosition = currentScrollY + 100

            for (const section of sections) {
                const element = document.getElementById(section)
                if (element) {
                    const { offsetTop, offsetHeight } = element
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section)
                        break
                    }
                }
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const scrollToSection = (href: string) => {
        const element = document.getElementById(href.substring(1))
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsOpen(false)
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16">
                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="flex items-baseline space-x-8">
                            {navigation.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => scrollToSection(item.href)}
                                    className={cn(
                                        "relative px-1 py-2 text-sm font-medium transition-all duration-300 group",
                                        activeSection === item.href.substring(1)
                                            ? "text-purple-400"
                                            : "text-gray-300 hover:text-white"
                                    )}
                                >
                                    {item.name}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-0.5 bg-purple-400"
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: activeSection === item.href.substring(1) ? '100%' : 0
                                        }}
                                        whileHover={{ width: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden absolute right-4">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-700/50"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <motion.button
                                    key={item.name}
                                    onClick={() => scrollToSection(item.href)}
                                    whileHover={{ x: 8 }}
                                    transition={{ duration: 0.2 }}
                                    className={cn(
                                        "block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 relative",
                                        activeSection === item.href.substring(1)
                                            ? "text-purple-400"
                                            : "text-gray-300 hover:text-white"
                                    )}
                                >
                                    {item.name}
                                    {activeSection === item.href.substring(1) && (
                                        <motion.div
                                            layoutId="mobile-active-indicator"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
