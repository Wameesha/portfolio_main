'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiMail, FiSend, FiLinkedin, FiGithub } from 'react-icons/fi'
import { personalInfo, socialLinks } from '@/data/personal'

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    // const [showSuccessPopup, setShowSuccessPopup] = useState(false)
    const [validationErrors, setValidationErrors] = useState({
        email: '',
        contactNumber: ''
    })

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
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        }
    }

    const formVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1
        }
    }

    const infoVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1
        }
    }

    // Validation functions
    const validateEmail = (email: string): string => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return '';
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address (e.g., john@example.com)';
        }
        return '';
    };

    const validateContactNumber = (number: string): string => {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        if (!number) return '';
        if (!phoneRegex.test(number)) {
            return 'Please enter a valid contact number (10-15 digits, may include +, spaces, -, (), e.g., +94 77 123 4567)';
        }
        return '';
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })

        // Real-time validation for email and contact number
        if (name === 'email') {
            setValidationErrors(prev => ({
                ...prev,
                email: validateEmail(value)
            }))
        } else if (name === 'contactNumber') {
            setValidationErrors(prev => ({
                ...prev,
                contactNumber: validateContactNumber(value)
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate email and contact number before submitting
        const emailError = validateEmail(formData.email)
        const contactError = validateContactNumber(formData.contactNumber)

        setValidationErrors({
            email: emailError,
            contactNumber: contactError
        })

        // Don't submit if there are validation errors
        if (emailError || contactError) {
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            // Send form data to our API route
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (response.ok && result.success) {
                setSubmitStatus('success')
                setValidationErrors({ email: '', contactNumber: '' })

                // Show success message for 3 seconds, then reset form
                setTimeout(() => {
                    setFormData({ firstName: '', lastName: '', email: '', contactNumber: '', subject: '', message: '' })
                    setSubmitStatus('idle')
                }, 3000)
            } else {
                throw new Error(result.message || 'Failed to send email')
            }
        } catch (error) {
            console.error('Form submission failed:', error)
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email',
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`
        },
        {
            icon: FiLinkedin,
            label: 'LinkedIn',
            value: 'Connect with me',
            href: socialLinks.linkedin
        },
        {
            icon: FiGithub,
            label: 'GitHub',
            value: 'View my work',
            href: socialLinks.github
        }
    ]

    return (
        <motion.section
            ref={ref}
            id="contact"
            className="py-20 bg-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-14"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Get In Touch
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-16 h-1 bg-purple-500 mx-auto mb-6 rounded-full"
                    />
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Ready to bring your ideas to life? Let&apos;s discuss your next project and how I can help make it a reality.
                    </motion.p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-10 justify-center items-start">
                    {/* Contact Information */}
                    <motion.div
                        variants={infoVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8 w-full md:w-1/2"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Let&apos;s Start a Conversation
                            </h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                I&apos;m always excited to work on new projects and collaborate with talented individuals. Whether you have a specific project in mind or just want to explore possibilities, I&apos;d love to hear from you.
                            </p>
                        </motion.div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    variants={itemVariants}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    whileHover={{ scale: 1.03, x: 8 }}
                                    className="flex items-center p-5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 group shadow-sm"
                                >
                                    <div className="p-2 bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors duration-200">
                                        <item.icon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-white text-base">
                                            {item.label}
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Availability Status */}
                        <motion.div
                            variants={itemVariants}
                            className="p-5 bg-green-900/20 rounded-lg border border-green-800 mt-6"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-300 font-medium">
                                    Available for new projects
                                </span>
                            </div>
                            <p className="mt-2 text-green-400 text-xs">
                                Currently accepting freelance and full-time opportunities
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
