'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown, FiCode, FiZap } from 'react-icons/fi'
import Image from 'next/image'
import { personalInfo, socialLinks } from '@/data/personal'
import { gsap } from 'gsap'
import dynamic from 'next/dynamic'

// Dynamically import ParticleField to avoid SSR issues
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false })

// Enhanced typing animation with GSAP
function TypingAnimation({ texts, className }: { texts: string[], className?: string }) {
    const [currentTextIndex, setCurrentTextIndex] = useState(0)
    const [currentCharIndex, setCurrentCharIndex] = useState(0)
    const [isDeleting, setIsDeleting] = useState(false)
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const currentText = texts[currentTextIndex]
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (currentCharIndex < currentText.length) {
                    setCurrentCharIndex(prev => prev + 1)
                } else {
                    setTimeout(() => setIsDeleting(true), 1500)
                }
            } else {
                if (currentCharIndex > 0) {
                    setCurrentCharIndex(prev => prev - 1)
                } else {
                    setIsDeleting(false)
                    setCurrentTextIndex(prev => (prev + 1) % texts.length)
                }
            }
        }, isDeleting ? 50 : 100)

        return () => clearTimeout(timeout)
    }, [currentTextIndex, currentCharIndex, isDeleting, texts])

    const displayText = texts[currentTextIndex].substring(0, currentCharIndex)

    return (
        <div className={className}>
            <span ref={textRef}>{displayText}</span>
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-8 bg-purple-400 ml-1"
            />
        </div>
    )
}

// Floating elements animation
function FloatingElements() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
                className="absolute top-20 left-10 text-purple-400/20"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <FiCode size={40} />
            </motion.div>
            <motion.div
                className="absolute top-40 right-20 text-purple-400/20"
                animate={{
                    y: [0, 30, 0],
                    x: [0, -10, 0],
                    rotate: [0, -180, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <FiZap size={30} />
            </motion.div>
            <motion.div
                className="absolute bottom-40 left-20 text-green-400/20"
                animate={{
                    y: [0, -40, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <div className="w-8 h-8 border-2 border-current rounded-full" />
            </motion.div>
        </div>
    )
}

export default function Hero() {
    const ref = useRef(null)

    useEffect(() => {
        // GSAP timeline for hero entrance
        const tl = gsap.timeline()

        tl.fromTo('.hero-bg',
            { scale: 1.1, opacity: 0 },
            { scale: 1, opacity: 1, duration: 2, ease: "power3.out" }
        )
            .fromTo('.hero-content',
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
                "-=1"
            )

        return () => {
            tl.kill()
        }
    }, [])

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

    const scrollToAbout = () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            ref={ref}
            id="home"
            className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
        >
            {/* 3D Particle Background */}
            <div className="hero-bg absolute inset-0">
                <ParticleField />
            </div>

            {/* Floating Elements */}
            <FloatingElements />

            {/* Content */}
            <div className="hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-center"
                >
                    {/* Profile Image with 3D effect */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 relative"
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="relative w-40 h-40 sm:w-56 sm:h-56 mx-auto mb-8">
                            <div className="absolute inset-0 rounded-full bg-purple-500 p-1 animate-pulse">
                                <div className="w-full h-full rounded-full bg-gray-900 p-1">
                                    <Image
                                        src={personalInfo.avatar || "/images/avatar-placeholder.svg"}
                                        alt={personalInfo.name}
                                        fill
                                        className="rounded-full object-cover"
                                        priority
                                    />
                                </div>
                            </div>
                            {/* Glowing ring effect */}
                            <div className="absolute -inset-2 rounded-full bg-purple-400/20 blur-xl animate-pulse"></div>
                        </div>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
                    >
                        Hi, I&apos;m{' '}
                        <span className="text-purple-400">
                            {personalInfo.name}
                        </span>
                    </motion.h1>

                    {/* Animated Title */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6"
                    >
                        <TypingAnimation
                            texts={[personalInfo.title]}
                            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 font-medium"
                        />
                    </motion.div>

                    {/* Bio */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                    >
                        {personalInfo.bio}
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
                    >
                        <motion.a
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault()
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
                                y: -5
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
                                animate={{ x: [-100, 100] }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                            <span className="relative z-10">View My Work</span>
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="relative z-10"
                            >
                                <FiArrowDown className="w-5 h-5 rotate-90" />
                            </motion.div>
                        </motion.a>

                        <motion.a
                            href={personalInfo.resume}
                            download
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
                        >
                            <FiDownload />
                            <span>Download Resume</span>
                        </motion.a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center space-x-6 mb-12"
                    >
                        <motion.a
                            href={socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                        >
                            <FiGithub size={24} />
                        </motion.a>

                        <motion.a
                            href={socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                        >
                            <FiLinkedin size={24} />
                        </motion.a>

                        <motion.a
                            href={socialLinks.email}
                            whileHover={{ scale: 1.2, y: -2 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                        >
                            <FiMail size={24} />
                        </motion.a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.button
                        onClick={scrollToAbout}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 1.5 }
                        }}
                        whileHover={{ y: -2 }}
                        className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <FiArrowDown size={24} />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
