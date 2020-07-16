import React from 'react';
import Link, { LinkProps } from 'next/link';
import { ButtonProps } from '@material-ui/core/Button';
import { Omit } from '@material-ui/core';

export type NextLinkProps = Omit<ButtonProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>;

const NextLink = React.forwardRef<NextLinkProps, any>(
  ({ href, as, prefetch, ...props }, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <a ref={ref} {...props} />
    </Link>
  )
);

NextLink.displayName = 'NextLink';

export default NextLink;
