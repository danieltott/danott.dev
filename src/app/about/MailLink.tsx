'use client';

import type { SvgElementProps } from '@/lib/types';
import { useEffect, useState } from 'react';
import SocialLink from './SocialLink';

function MailIcon(props: SvgElementProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

const realEmail = ['dan', '@', 'danott.dev'].join('');

export default function MailLink() {
  const [interacted, setInteracted] = useState(false);
  useEffect(() => {
    function interact() {
      setInteracted(true);
      removeInteract();
    }

    function removeInteract() {
      document.body.removeEventListener('mousemove', interact);
      document.body.removeEventListener('scroll', interact);
      document.body.removeEventListener('keydown', interact);
      document.body.removeEventListener('click', interact);
      document.body.removeEventListener('touchstart', interact);
    }

    document.body.addEventListener('mousemove', interact);
    document.body.addEventListener('scroll', interact);
    document.body.addEventListener('keydown', interact);
    document.body.addEventListener('click', interact);
    document.body.addEventListener('touchstart', interact);

    return () => {
      removeInteract();
    };
  }, []);

  if (interacted) {
    return (
      <SocialLink
        href={`mailto:${realEmail}`}
        icon={MailIcon}
        className="mt-8 border-t border-stone-100 pt-8 dark:border-stone-700/40"
      >
        {realEmail}
      </SocialLink>
    );
  } else {
    return (
      <li className="mt-8 flex border-t border-stone-100 pt-8 dark:border-stone-700/40">
        <div className="flex text-sm font-medium text-stone-800  dark:text-stone-200">
          <MailIcon className="h-6 w-6 flex-none fill-stone-500 transition group-hover:fill-primary-500" />
          <span className="ml-4">
            <strong>dan</strong> at this domain
          </span>
        </div>
      </li>
    );
  }
}
