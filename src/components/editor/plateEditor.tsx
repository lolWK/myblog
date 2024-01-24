'use client';

import React, { useRef, RefObject } from 'react';
import { cn } from '@udecode/cn';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { plugins } from '@/lib/plate/plate-plugins';
import { CursorOverlay } from '@/components/plate-ui/cursor-overlay';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import type { TElement } from '@udecode/plate-common';
interface MyPlateEditorProps {
  editorRef?: RefObject<any>; // 나중에 수정하기
  initialValue?: TElement[];
  isReadOnly?: boolean;
}

const INITIAL_VALUE = [{ type: ELEMENT_PARAGRAPH, children: [{ text: '' }] }];

// 초기 값 props로 받게 수정하기
export default function MyPlateEditor({
  editorRef,
  initialValue = INITIAL_VALUE,
  isReadOnly = false,
}: MyPlateEditorProps) {
  const containerRef = useRef(null);

  const editModeStyle = 'min-h-[280px] px-[32px] py-8';
  const ReadModeStyle = 'min-h-[280px] pb-[60px] -px-3';

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        plugins={plugins}
        initialValue={initialValue}
        editorRef={editorRef}
      >
        <div
          ref={containerRef}
          className={cn(
            // Block selection
            '[&_.slate-start-area-left]:!w-[64px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
          )}
        >
          {!isReadOnly && (
            <FixedToolbar>
              <FixedToolbarButtons />
            </FixedToolbar>
          )}

          <Editor
            className={isReadOnly ? ReadModeStyle : editModeStyle}
            autoFocus
            focusRing={false}
            variant='ghost'
            size='md'
            readOnly={isReadOnly}
          />

          <FloatingToolbar>
            <FloatingToolbarButtons />
          </FloatingToolbar>

          <CursorOverlay containerRef={containerRef} />
        </div>
      </Plate>
    </DndProvider>
  );
}
