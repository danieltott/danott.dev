import { forwardRef } from 'react';
import clsx from 'clsx';

const OuterContainer = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function OuterContainer({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx('grid flex-1 sm:px-8', className)}
        {...props}
      >
        <div className="mx-auto grid w-full max-w-7xl lg:px-8">{children}</div>
      </div>
    );
  }
);

const InnerContainer = forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  function InnerContainer({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx('relative grid px-4 sm:px-8 lg:px-12', className)}
        {...props}
      >
        <div className="mx-auto grid w-full max-w-2xl lg:max-w-5xl">
          {children}
        </div>
      </div>
    );
  }
);

const ContainerWrap = forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof OuterContainer>
>(function Container({ children, ...props }, ref) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
});

export const Container: typeof ContainerWrap & {
  Outer: typeof OuterContainer;
  Inner: typeof InnerContainer;
} = Object.assign(ContainerWrap, {
  Outer: OuterContainer,
  Inner: InnerContainer,
});
