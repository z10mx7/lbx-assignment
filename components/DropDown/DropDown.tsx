'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Alert } from '@mantine/core';
import MultiSelect from '@/components/DropDown/MultiSelect';
import { initialOptions } from '@/data/options';

const DropDown = () => {
  const [selectedOptions, setSelectedOptions] = useState([initialOptions[3]]);

  return (
    <div className=" w-11/12 mt-24 mr-auto ml-auto sm:w-3/12">
      <MultiSelect
        options={initialOptions}
        selectedOptions={selectedOptions}
        onChange={setSelectedOptions}
        placeholder="Science"
        className="mb-4"
      />

      <div className="mt-6">
        <Alert
          variant="light"
          color="cyan"
          title="Selected Options:"
          icon={<Icon icon="mdi:information" />}
        >
          {selectedOptions.length === 0 ? (
            <p>No options selected</p>
          ) : (
            <ul>
              {selectedOptions.map((option) => (
                <li key={option.id} className="flex items-center mb-1">
                  <span className="mr-2">{option.icon}</span>
                  <span>{option.label}</span>
                </li>
              ))}
            </ul>
          )}
        </Alert>
      </div>
    </div>
  );
};

export default DropDown;
