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
                        Get In Touch
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-20 h-1 bg-purple-500 mx-auto mb-8"
                    />
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Ready to bring your ideas to life? Let&apos;s discuss your next project and how I can help make it a reality
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        variants={infoVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Let&apos;s Start a Conversation
                            </h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                I&apos;m always excited to work on new projects and collaborate with talented individuals.
                                Whether you have a specific project in mind or just want to explore possibilities,
                                I&apos;d love to hear from you.
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
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="flex items-center p-6 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all duration-300 group"
                                >
                                    <div className="p-3 bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors duration-200">
                                        <item.icon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-white">
                                            {item.label}
                                        </h4>
                                        <p className="text-gray-300">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Availability Status */}
                        <motion.div
                            variants={itemVariants}
                            className="p-6 bg-green-900/20 rounded-xl border border-green-800"
                        >
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-300 font-medium">
                                    Available for new projects
                                </span>
                            </div>
                            <p className="mt-2 text-green-400 text-sm">
                                Currently accepting freelance and full-time opportunities
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        variants={formVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <motion.div
                            className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold text-white mb-6">
                                Send a Message
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 text-white"
                                            placeholder="MyFirstName"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 text-white"
                                            placeholder="MyLastName"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 text-white ${validationErrors.email
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-600 focus:ring-purple-500'
                                                    }`}
                                                placeholder="abc123@example.com"
                                            />
                                            {validationErrors.email && (
                                                <AnimatePresence>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute top-full left-0 mt-1 z-10"
                                                    >
                                                        <div className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs">
                                                            <div className="relative">
                                                                {validationErrors.email}
                                                                <div className="absolute -top-1 left-4 w-2 h-2 bg-red-600 transform rotate-45"></div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-300 mb-2">
                                            Contact Number
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                id="contactNumber"
                                                name="contactNumber"
                                                value={formData.contactNumber}
                                                onChange={handleInputChange}
                                                required
                                                className={`w-full px-4 py-3 bg-gray-900 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 text-white ${validationErrors.contactNumber
                                                    ? 'border-red-500 focus:ring-red-500'
                                                    : 'border-gray-600 focus:ring-purple-500'
                                                    }`}
                                                placeholder="+94 77 123 4567"
                                            />
                                            {validationErrors.contactNumber && (
                                                <AnimatePresence>
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="absolute top-full left-0 mt-1 z-10"
                                                    >
                                                        <div className="bg-red-600 text-white text-sm px-3 py-2 rounded-lg shadow-lg max-w-xs">
                                                            <div className="relative">
                                                                {validationErrors.contactNumber}
                                                                <div className="absolute -top-1 left-4 w-2 h-2 bg-red-600 transform rotate-45"></div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </AnimatePresence>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 text-white"
                                        placeholder="Send a Message"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200 text-white"
                                        placeholder="Type your message..."
                                    />
                                </div>

                                {/* Submit Status Messages */}
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-4 bg-green-900/30 border border-green-700 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-green-300 font-medium">
                                                    Message sent!
                                                </p>
                                                <p className="text-green-400 text-sm">
                                                    Your message has been sent successfully. You&apos;ll receive a response shortly.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
                                        <p className="text-red-300">
                                            ❌ Sorry, there was an error sending your message. Please check your email configuration or contact rasanjani9jayasingha@gmail.com directly.
                                        </p>
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiSend className="w-5 h-5" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Success Popup (removed unused showSuccessPopup state and popup) */}
        </motion.section>
    )
}
