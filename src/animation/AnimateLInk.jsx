// components/AnimatedLink.tsx
"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';

const AnimatedLink = ({ href, label, isActive = false }) => {
    return (
        <motion.div
            whileHover="hover"
            initial="rest"
            animate={isActive ? "hover" : "rest"}
            className="group flex items-center"
        >
            <Link href={href} passHref>
                <motion.a
                    className={`flex items-center text-sm font-medium transition-colors duration-300 ${isActive ? 'text-secondary' : 'text-black hover:text-secondary'
                        }`}
                >
                    {/* Arrow Icon */}
                    <motion.span
                        variants={{
                            rest: { opacity: 0, x: -10, scale: 0.8 },
                            hover: { opacity: 1, x: 0, scale: 1 },
                        }}
                        transition={{ duration: 0.3 }}
                        className="mr-2 text-secondary"
                    >
                        <FaAngleRight />
                    </motion.span>

                    {/* Link Label */}
                    <motion.span
                        variants={{
                            rest: { x: 0 },
                            hover: { x: 5 },
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {label}
                    </motion.span>
                </motion.a>
            </Link>
        </motion.div>
    );
};

export default AnimatedLink;