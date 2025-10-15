'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blogs', label: 'Blogs' },
    { href: '/teams', label: 'Teams' },
    { href: '/validator', label: 'Validator' },
    { href: '/contributors', label: 'Contribution Board' },
    {
      href: 'https://forms.gle/FGoyrEHC1CuP9hPSA',
      label: 'Join Us',
    },
  ];

  const programLinks = [
    {
      href: 'https://meta.wikimedia.org/wiki/Chai_with_Wiki',
      label: 'chai with wiki',
    },
    {
      href: 'https://meta.wikimedia.org/wiki/Road_to_wiki_program_UU',
      label: 'Road to wiki',
    },
  ];

  const menuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <nav className='w-full fixed top-0 left-0 z-50 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center space-x-2'>
              <Image
                src='/logo.svg'
                alt='WikiClub Tech Logo'
                width={48}
                height={48}
                className='h-12 w-auto'
              />
              <div>
                <h1 className='text-xl font-bold text-gray-700'>
                  WikiClub Tech
                </h1>
                <p className='text-sm text-gray-500'>United University</p>
              </div>
            </Link>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  className={
                    link.label === 'Join Us'
                      ? 'text-white bg-gradient-to-r from-cyan-500 to-sky-500 px-3 py-2 rounded-md text-sm font-medium'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium'
                  }
                >
                  {link.label}
                </Link>
              ))}

              {/* Programs Dropdown */}
              <div
                className='relative'
                onMouseEnter={() => setIsProgramsOpen(true)}
                onMouseLeave={() => setIsProgramsOpen(false)}
              >
                <button className='text-gray-700 hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1'>
                  Programs
                  <FaChevronDown className='text-xs' />
                </button>

                <AnimatePresence>
                  {isProgramsOpen && (
                    <motion.div
                      initial='hidden'
                      animate='visible'
                      exit='hidden'
                      variants={dropdownVariants}
                      className='absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5'
                    >
                      {programLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className='md:hidden flex items-center'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='md:hidden overflow-hidden'
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={menuVariants}
          >
            <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={menuItemVariants}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    className={
                      link.label === 'Join Us'
                        ? 'text-white bg-gradient-to-r from-cyan-500 to-sky-500 block px-3 py-2 rounded-md text-base font-medium'
                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium'
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Programs Section for Mobile */}
              <motion.div variants={menuItemVariants}>
                <button
                  onClick={() => setIsProgramsOpen(!isProgramsOpen)}
                  className='text-gray-700 hover:bg-gray-200 hover:text-gray-900 w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center justify-between'
                >
                  Programs
                  <FaChevronDown
                    className={`text-xs transition-transform ${
                      isProgramsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isProgramsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className='overflow-hidden pl-4'
                    >
                      {programLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className='text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-sm'
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;