import React, { useRef } from 'react';

export const SignOutLink = ({
  token,
  href,
  text,
  children,
}: {
  token: string;
  href: string;
  text: string;
  children: ({ href, text, onClick }: { href: string; text: string; onClick: (e: Event) => void }) => React.ReactNode;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const onClick = (e: Event) => {
    if (formRef.current) {
      formRef.current.submit();
    }
    e.preventDefault();
  };

  return (
    <>
      <form ref={formRef} method="post" action={href} className="hidden">
        <input name="_method" value="delete" type="hidden" />
        <input name="authenticity_token" value={token} type="hidden" />
      </form>

      {children({ href, text, onClick })}
    </>
  );
};
