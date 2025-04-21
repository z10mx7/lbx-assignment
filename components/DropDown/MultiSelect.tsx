'use client';

import { useEffect, useRef, useState } from 'react';
import { Pill } from '@mantine/core';
import { MultiSelectProps, Option } from '@/types/MultiSelect';

export default function MultiSelect({
  options: initialOptions,
  selectedOptions,
  onChange,
  placeholder = 'Select options',
  className = '',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>(initialOptions);
  const [inputValue, setInputValue] = useState('');
  const [animationClass, setAnimationClass] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Animation effect when opening/closing
  const openDropdown = () => {
    setIsOpen(true);
    // setAnimationClass('animate-slideDown');
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  };

  const closeDropdown = () => {
    // setAnimationClass('animate-slideUp');
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const handleOptionClick = (option: Option) => {
    const isSelected = selectedOptions.some((item) => item.id === option.id);

    if (isSelected) {
      onChange(selectedOptions.filter((item) => item.id !== option.id));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      // Create new option
      const newOption = {
        id: `new-${Date.now()}`,
        label: inputValue.trim(),
        icon: '',
      };

      setOptions([...options, newOption]);
      setInputValue('');
      onChange([...selectedOptions, newOption]);
    }
  };

  const removeTag = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedOptions.filter((item) => item.id !== optionId));
  };

  return (
    <div className={`relative  w-full ${className}`} ref={dropdownRef}>
      {/* Dropdown Header */}
      <div
        className="flex items-center  justify-between p-4 border border-gray-300 rounded-lg bg-white cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex flex-1 flex-wrap gap-2">
          {selectedOptions.length === 0 ? (
            <span className="text-gray-500">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center bg-cyan-100 text-black px-2 py-1 rounded-md"
              >
                {option.icon && <span className="mr-1">{option.icon}</span>}
                <span>{option.label}</span>
                <button
                  className="ml-1 text-red-400 hover:text-red-600"
                  onClick={(e) => removeTag(option.id, e)}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        <div className="text-gray-600">{isOpen ? '▲' : '▼'}</div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className={`absolute left-0 right-0 mt-1 border border-gray-300 rounded-lg bg-white shadow-lg max-h-64 overflow-y-auto z-10 ${animationClass}`}
        >
          {/* Input for adding new items */}
          <div className="p-2 border-b border-gray-200">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Type and press Enter to add"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          {/* Options list */}
          <div>
            {options.map((option) => {
              const isSelected = selectedOptions.some((item) => item.id === option.id);
              return (
                <div
                  key={option.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${isSelected ? 'bg-cyan-50' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option.icon && <span className="mr-2">{option.icon}</span>}
                  <span>{option.label}</span>
                  {isSelected && <span className="ml-auto text-cyan-600">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
