'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { TElement } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';

type EditorStateType = {
  value: TElement[];
  setValue: (value: TElement[]) => void;
};

const EditorContext = createContext<EditorStateType | undefined>(undefined);

interface EditorProviderProps {
  children: ReactNode;
}

const EMPTY_VALUE = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [value, setValue] = useState<TElement[]>(EMPTY_VALUE);

  return (
    <EditorContext.Provider value={{ value, setValue }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within a EditorProvider');
  }
  return context;
};
