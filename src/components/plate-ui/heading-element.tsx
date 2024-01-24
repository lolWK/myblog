import React from 'react';
import { withRef, withVariants } from '@udecode/cn';
import { PlateElement } from '@udecode/plate-common';
import { cva } from 'class-variance-authority';

const headingVariants = cva('', {
  variants: {
    variant: {
      h1: 'mb-1 mt-[2em] font-h text-base font-medium',
      h2: 'mb-px mt-[1.4em] font-h text-base font-medium tracking-tight',
      h3: 'mb-px mt-[1em] font-h text-base font-normal tracking-tight',
      h4: 'mt-[0.75em] font-h text-base font-normal tracking-tight',
      h5: 'mt-[0.75em] text-base font-semibold tracking-tight',
      h6: 'mt-[0.75em] text-base font-semibold tracking-tight',
    },
    isFirstBlock: {
      true: 'mt-0',
      false: '',
    },
  },
});

const HeadingElementVariants = withVariants(PlateElement, headingVariants, [
  'isFirstBlock',
  'variant',
]);

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({ variant = 'h1', isFirstBlock, children, ...props }, ref) => {
    const { element, editor } = props;

    const Element = variant!;

    return (
      <HeadingElementVariants
        ref={ref}
        asChild
        variant={variant}
        isFirstBlock={element === editor.children[0]}
        {...props}
      >
        <Element>{children}</Element>
      </HeadingElementVariants>
    );
  }
);
